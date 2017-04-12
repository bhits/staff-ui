type ValidatorKeyType = "required" | "requiredTrue" | "email" | "pattern";

export class ValidatorErrorMessage {
  validatorKey: ValidatorKeyType;
  errorMessage: string;
}
