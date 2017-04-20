type RoleType = "patient" | "parents" | "guardian" | "provider" | "systemSupport" | "staffUser";

export class Role {
  roleCode: RoleType;
  roleValue: string;
}
