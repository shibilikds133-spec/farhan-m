import type {
  MemberDTO,
  MemberProfileDTO,
  MemberDirectoryItemDTO,
} from "../../../dto/member.dto";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToMemberDTO(row: any): MemberDTO {
  return {
    id: row.id,
    memberCode: row.member_code,
    name: row.name,
    phone: row.phone,
    alternatePhone: row.alternate_phone,
    age: row.age,
    bloodGroup: row.blood_group,
    isBloodDonor: Boolean(row.is_blood_donor),
    donorAvailable: Boolean(row.donor_available),
    address: row.address,
    area: row.area,
    unit: row.unit,
    sector: row.sector,
    occupation: row.occupation,
    familyCount: row.family_count,
    status: row.status,
    monthlyTier: row.monthly_tier,
    monthlyAmount: Number(row.monthly_amount),
    pinStatus: row.pin_status,
    joinedAt: row.joined_at,
    lastPaidAt: row.last_paid_at,
    duesPending: Number(row.dues_pending || 0),
    lastRemindedAt: row.last_reminded_at,
    reminderCount: Number(row.reminder_count || 0),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToMemberProfileDTO(row: any, familyRows: any[] = []): MemberProfileDTO {
  return {
    id: row.id,
    memberId: row.id,
    memberCode: row.member_code,
    name: row.name,
    initials: row.name ? row.name.substring(0, 2).toUpperCase() : "NA",
    phone: row.phone,
    whatsapp: row.whatsapp,
    age: row.age,
    bloodGroup: row.blood_group,
    address: row.address,
    unit: row.unit,
    sector: row.sector,
    joinedYear: row.joined_at ? new Date(row.joined_at).getFullYear().toString() : undefined,
    occupation: row.occupation,
    biometricEnabled: Boolean(row.biometric_enabled),
    familyMembers: familyRows.map((fam) => ({
      id: fam.id,
      memberId: fam.member_id,
      name: fam.name,
      relationship: fam.relationship,
      age: fam.age,
      bloodGroup: fam.blood_group,
      isBloodDonor: Boolean(fam.is_blood_donor),
      phone: fam.phone,
    })),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapRowToMemberDirectoryItemDTO(row: any): MemberDirectoryItemDTO {
  return {
    id: row.id,
    memberCode: row.member_code,
    name: row.name,
    initials: row.name ? row.name.substring(0, 2).toUpperCase() : "NA",
    area: row.area,
    bloodGroup: row.blood_group,
    isBloodDonor: Boolean(row.is_blood_donor),
    donorAvailable: Boolean(row.donor_available),
    phone: row.phone,
    paymentProgressPercent: row.payment_progress_percent,
  };
}
