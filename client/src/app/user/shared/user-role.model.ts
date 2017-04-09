export enum UserRoleEnum {
  PATIENT,
  PARENT,
  GUARDIAN,
  STAFF
}

export class UserRole {
  roleCode: UserRoleEnum;
  roleValue: string;
}
