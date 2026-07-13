import type { ActorContext } from "../../../contracts/common.contract";
import type { ReceiptRepository } from "../../../contracts/payment.contract";
import type { ReceiptDTO } from "../../../dto/payment.dto";
import { createSupabaseBackendClient } from "../client";
import { mapRowToReceiptDTO } from "../mappers/payment.mapper";

export class SupabaseReceiptRepository implements ReceiptRepository {
  async createForPayment(paymentId: string, actor: ActorContext): Promise<ReceiptDTO> {
    const supabase = createSupabaseBackendClient();
    
    const { data: payment, error: payError } = await supabase.from("payments").select("*").eq("id", paymentId).single();
    if (payError || !payment) throw new Error("Payment not found");
    
    const receiptId = `REC-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    const { data, error } = await supabase.from("receipts").insert([{
      payment_id: paymentId,
      receipt_id: receiptId,
      token: crypto.randomUUID(),
      amount: payment.amount,
      issued_at: new Date().toISOString(),
    }]).select("*").single();
    
    if (error) throw error;
    return mapRowToReceiptDTO(data, payment);
  }

  async findByReceiptIdAndToken(receiptId: string, token: string): Promise<ReceiptDTO | null> {
    const supabase = createSupabaseBackendClient();
    const { data, error } = await supabase.from("receipts").select("*, payments(*)").eq("receipt_id", receiptId).eq("token", token).single();
    if (error || !data) return null;
    return mapRowToReceiptDTO(data, data.payments || {});
  }

  async findForMember(paymentId: string, memberId: string): Promise<ReceiptDTO | null> {
    const supabase = createSupabaseBackendClient();
    const { data: payment } = await supabase.from("payments").select("*").eq("id", paymentId).eq("member_id", memberId).single();
    if (!payment) return null;
    
    const { data, error } = await supabase.from("receipts").select("*").eq("payment_id", paymentId).single();
    if (error || !data) return null;
    return mapRowToReceiptDTO(data, payment);
  }

  async incrementViewCount(receiptId: string): Promise<void> {
    const supabase = createSupabaseBackendClient();
    await supabase.rpc("increment_receipt_view_count", { p_receipt_id: receiptId });
  }
}
