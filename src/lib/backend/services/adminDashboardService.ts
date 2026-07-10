import type { AdminDashboardService } from "../contracts/admin.contract";
import type { ActorContext, BackendResult } from "../contracts/common.contract";
import type { AdminDashboardStatsDTO } from "../dto/admin.dto";
import { fail, ok, fromThrowable } from "../errors/resultHelpers";
import { authError } from "../errors/createBackendError";

export interface AdminDashboardRepository {
  getDashboardStats(actor: ActorContext): Promise<AdminDashboardStatsDTO>;
}

export function createAdminDashboardService(deps: {
  dashboardRepository: AdminDashboardRepository;
  requirePermission?: (
    actor: ActorContext,
    permission: string
  ) => Promise<BackendResult<true>>;
}): AdminDashboardService {
  const { dashboardRepository, requirePermission } = deps;

  async function checkAccess(actor: ActorContext, permission: string): Promise<BackendResult<true>> {
    if (actor.actorType !== "admin" || !actor.adminId) {
      return fail(authError("Admin access required."));
    }
    if (requirePermission) {
      return await requirePermission(actor, permission);
    }
    return ok(true);
  }

  return {
    async getDashboardStats(actor: ActorContext): Promise<BackendResult<AdminDashboardStatsDTO>> {
      try {
        const accessCheck = await checkAccess(actor, "dashboard.view");
        if (!accessCheck.ok) return fail(accessCheck.error!);

        const stats = await dashboardRepository.getDashboardStats(actor);
        return ok(stats);
      } catch (err) {
        return fail(fromThrowable(err));
      }
    }
  };
}
