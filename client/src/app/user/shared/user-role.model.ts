type UserRoleType = "PATIENT" | "PARENT" | "GUARDIAN" | "STAFF";

export class UserRole {
  roleCode: UserRoleType;
  roleValue: string;
}
