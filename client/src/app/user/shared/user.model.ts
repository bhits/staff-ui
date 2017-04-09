import {Address} from "../../shared/address.model";
import {UserRole} from "app/user/shared/user-role.model";
import {Language} from "app/user/shared/language.model";

export class User {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  birthDate: Date;
  genderCode: string;
  socialSecurityNumber?: string;
  phone?: string;
  address?: Address;
  userRole: UserRole;
  language: Language;
}
