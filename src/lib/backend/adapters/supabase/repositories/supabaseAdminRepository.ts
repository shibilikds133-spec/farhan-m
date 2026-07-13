import type { PaginatedResult, PaginationInput } from "../../../contracts/common.contract";
import type { AdminRepository, AdminUserFilters } from "../../../contracts/admin.contract";
import type { AdminUserDTO } from "../../../dto/admin.dto";
import { createSupabaseBackendClient } from "../client";
import { mapRowToAdminUserDTO } from "../mappers/admin.mapper";

export class SupabaseAdminRepository implements AdminRepository {
  async findAdminById(id: string): Promise<AdminUserDTO | null> {
    const supabase = createSupabaseBackendClient();
    const { data, error } = await supabase.from("admins").select("*").eq("id", id).single();
    if (error || !data) return null;
    
    const { data: perms } = await supabase.from("admin_permissions").select("permission_code").eq("admin_id", id);
    const permissions = (perms || []).map((p: any) => p.permission_code);
    
    return mapRowToAdminUserDTO(data, permissions);
  }

  async findAdminByPhone(phone: string): Promise<AdminUserDTO | null> {
    const supabase = createSupabaseBackendClient();
    const { data, error } = await supabase.from("admins").select("*").eq("phone", phone).single();
    if (error || !data) return null;
    
    const { data: perms } = await supabase.from("admin_permissions").select("permission_code").eq("admin_id", data.id);
    const permissions = (perms || []).map((p: any) => p.permission_code);
    
    return mapRowToAdminUserDTO(data, permissions);
  }

  async getAdminPermissions(adminId: string): Promise<string[]> {
    const supabase = createSupabaseBackendClient();
    const { data, error } = await supabase.from("admin_permissions").select("permission_code").eq("admin_id", adminId);
    if (error || !data) return [];
    return data.map((p: any) => p.permission_code);
  }

  async listAdmins(filters: AdminUserFilters, pagination: PaginationInput): Promise<PaginatedResult<AdminUserDTO>> {
    const supabase = createSupabaseBackendClient();
    let query = supabase.from("admins").select("*", { count: "exact" });
    
    if (filters.status) query = query.eq("status", filters.status);
    if (filters.role) query = query.contains("roles", [filters.role]);
    
    const page = pagination.page || 1;
    const pageSize = pagination.pageSize || 20;
    const { data, count } = await query.range((page - 1) * pageSize, page * pageSize - 1);
    
    const items = await Promise.all((data || []).map(async (row: any) => {
      const perms = await this.getAdminPermissions(row.id);
      return mapRowToAdminUserDTO(row, perms);
    }));

    return {
      items,
      total: count || 0,
      page,
      pageSize,
      hasMore: (count || 0) > page * pageSize,
    };
  }
}
