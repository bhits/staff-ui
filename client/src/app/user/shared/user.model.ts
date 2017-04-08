import {Address} from "../../shared/address.model";
export class User {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  birthDate: string;
  genderCode: string;
  socialSecurityNumber: string;
  phone: string;
  address: Address;
}
