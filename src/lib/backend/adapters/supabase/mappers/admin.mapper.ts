import type {
  AdminUserDTO,
  AuditLogDTO,
} from "../../../dto/admin.dto";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToAdminUserDTO(row: any, permissions: string[] = []): AdminUserDTO {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    avatarInitials: row.name ? row.name.substring(0, 2).toUpperCase() : "AD",
    roles: row.roles || [],
    permissions: permissions,
    canReceiveCash: Boolean(row.can_receive_cash),
    canVerifyPayments: Boolean(row.can_verify_payments),
    canManageMembers: Boolean(row.can_manage_members),
    canManageSettings: Boolean(row.can_manage_settings),
    status: row.status,
    lastLoginAt: row.last_login_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToAuditLogDTO(row: any): AuditLogDTO {
  return {
    id: row.id,
    actorAdminId: row.actor_admin_id,
    actorName: row.actor_name,
    action: row.action,
    entityType: row.entity_type,
    entityId: row.entity_id,
    target: row.target,
    summary: row.summary,
    severity: row.severity,
    ip: row.ip,
    device: row.device,
    before: row.before_data,
    after: row.after_data,
    createdAt: row.created_at,
  };
}
