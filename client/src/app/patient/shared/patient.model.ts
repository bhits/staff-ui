import {Address} from "app/shared/address.model";

export class Patient {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  birthDate: string;
  genderCode: string;
  socialSecurityNumber: string;
  telephone: string;
  address: Address;
}
