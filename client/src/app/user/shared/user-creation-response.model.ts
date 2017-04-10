export class UserCreationResponse {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  birthDate: Date;
  genderCode: string;
  verificationCode: string;
  emailTokenExpiration: string;
  verified: boolean;
}
