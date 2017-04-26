import {Address} from "../../shared/address.model";
import {Role} from "app/user/shared/role.model";
import {Locale} from "app/user/shared/locale.model";

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
  //ToDO: One user has multiple roles
  role: Role;
  locale: Locale;
}
