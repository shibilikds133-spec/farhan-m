import type { ActorContext, PaginatedResult, PaginationInput } from "../../../contracts/common.contract";
import type { CreatePaymentIntentInput, PaymentRepository, PaymentStatusTransitionInput, RecordCashEntryInput } from "../../../contracts/payment.contract";
import type { CashEntryDTO, MemberPaymentHistoryItemDTO, PaymentDTO, PaymentFilters } from "../../../dto/payment.dto";
import { createSupabaseBackendClient } from "../client";
import { mapRowToCashEntryDTO, mapRowToMemberPaymentHistoryItemDTO, mapRowToPaymentDTO } from "../mappers/payment.mapper";

export class SupabasePaymentRepository implements PaymentRepository {
  async findById(id: string): Promise<PaymentDTO | null> {
    const supabase = createSupabaseBackendClient();
    const { data, error } = await supabase.from("payments").select("*, payment_months(*)").eq("id", id).single();
    if (error || !data) return null;
    return mapRowToPaymentDTO(data, data.payment_months || []);
  }

  async findByReceiptId(receiptId: string): Promise<PaymentDTO | null> {
    const supabase = createSupabaseBackendClient();
    const { data, error } = await supabase.from("payments").select("*, payment_months(*)").eq("receipt_id", receiptId).single();
    if (error || !data) return null;
    return mapRowToPaymentDTO(data, data.payment_months || []);
  }

  async list(filters: PaymentFilters, pagination: PaginationInput): Promise<PaginatedResult<PaymentDTO>> {
    const supabase = createSupabaseBackendClient();
    let query = supabase.from("payments").select("*, payment_months(*)", { count: "exact" });
    
    if (filters.status) query = query.eq("status", filters.status);
    if (filters.method) query = query.eq("method", filters.method);
    if (filters.category) query = query.eq("category", filters.category);
    
    const page = pagination.page || 1;
    const pageSize = pagination.pageSize || 20;
    const { data, count } = await query.range((page - 1) * pageSize, page * pageSize - 1);
    
    return {
      items: (data || []).map((row: any) => mapRowToPaymentDTO(row, row.payment_months || [])),
      total: count || 0,
      page,
      pageSize,
      hasMore: (count || 0) > page * pageSize,
    };
  }

  async listByMember(memberId: string, pagination: PaginationInput): Promise<PaginatedResult<MemberPaymentHistoryItemDTO>> {
    const supabase = createSupabaseBackendClient();
    let query = supabase.from("payments").select("*", { count: "exact" }).eq("member_id", memberId);
    
    const page = pagination.page || 1;
    const pageSize = pagination.pageSize || 20;
    const { data, count } = await query.range((page - 1) * pageSize, page * pageSize - 1);
    
    return {
      items: (data || []).map((row: any) => mapRowToMemberPaymentHistoryItemDTO(row)),
      total: count || 0,
      page,
      pageSize,
      hasMore: (count || 0) > page * pageSize,
    };
  }

  private async resolvePaymentAmount(
    supabase: ReturnType<typeof createSupabaseBackendClient>,
    input: CreatePaymentIntentInput
  ): Promise<number> {
    if (input.category === "special_event" && input.customAmount) {
      if (input.customAmount <= 0) throw new Error("Payment amount must be greater than 0");
      return input.customAmount;
    }
    
    if (input.category === "monthly_dues") {
      throw new Error("Resolving amount for monthly dues is not fully implemented yet. Cannot insert 0.");
    }
    
    if (input.customAmount && input.customAmount > 0) {
       return input.customAmount;
    }

    throw new Error("Unable to resolve valid payment amount for this intent.");
  }

  async createPendingPayment(input: CreatePaymentIntentInput, actor: ActorContext): Promise<PaymentDTO> {
    const supabase = createSupabaseBackendClient();
    const amount = await this.resolvePaymentAmount(supabase, input);

    const { data, error } = await supabase.from("payments").insert([{
      payer_phone: input.payerPhone,
      payer_name: input.payerName,
      category: input.category,
      method: input.method,
      amount: amount,
      status: "pending",
      tier: input.tier,
      event_id: input.eventId,
      collected_by_admin_id: input.receivedByAdminId,
      notes: input.notes,
    }]).select("*").single();
    
    if (error) throw error;
    return mapRowToPaymentDTO(data);
  }

  async recordCashEntry(input: RecordCashEntryInput, actor: ActorContext): Promise<CashEntryDTO> {
    const supabase = createSupabaseBackendClient();
    const { data, error } = await supabase.from("cash_entries").insert([{
      member_id: input.memberId,
      payer_name: input.guestName,
      payer_phone: input.guestPhone,
      category: input.category,
      amount: input.amount,
      months: input.months,
      event_id: input.eventId,
      received_by_admin_id: input.receivedByAdminId,
      notes: input.notes,
      status: "recorded"
    }]).select("*").single();
    
    if (error) throw error;
    return mapRowToCashEntryDTO(data);
  }

  async approve(paymentId: string, actor: ActorContext, notes?: string): Promise<PaymentDTO> {
    const supabase = createSupabaseBackendClient();
    const { data, error } = await supabase.from("payments").update({
      status: "confirmed",
      notes: notes,
      verified_by_admin_id: actor.adminId,
      verified_at: new Date().toISOString()
    }).eq("id", paymentId).select("*").single();
    
    if (error) throw error;
    return mapRowToPaymentDTO(data);
  }

  async reject(paymentId: string, actor: ActorContext, reason?: string): Promise<PaymentDTO> {
    const supabase = createSupabaseBackendClient();
    const { data, error } = await supabase.from("payments").update({
      status: "rejected",
      notes: reason,
      verified_by_admin_id: actor.adminId,
      verified_at: new Date().toISOString()
    }).eq("id", paymentId).select("*").single();
    
    if (error) throw error;
    return mapRowToPaymentDTO(data);
  }

  async cancel(paymentId: string, actor: ActorContext, reason?: string): Promise<PaymentDTO> {
    const supabase = createSupabaseBackendClient();
    const { data, error } = await supabase.from("payments").update({
      status: "cancelled",
      notes: reason
    }).eq("id", paymentId).select("*").single();
    
    if (error) throw error;
    return mapRowToPaymentDTO(data);
  }
}
