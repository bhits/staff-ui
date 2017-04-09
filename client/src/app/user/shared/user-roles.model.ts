import {UserRole, UserRoleEnum} from "./user-role.model";

export const USER_ROLES: UserRole[] = [
  {
    roleCode: UserRoleEnum.PATIENT,
    roleValue: "Patient"
  },
  {
    roleCode: UserRoleEnum.PARENT,
    roleValue: "Parent"
  },
  {
    roleCode: UserRoleEnum.GUARDIAN,
    roleValue: "Guardian"
  },
  {
    roleCode: UserRoleEnum.STAFF,
    roleValue: "Staff"
  }
];
