import {ValidatorErrorMessage} from "./validator-error-message.model";

export const VALIDATOR_ERROR_MESSAGES: ValidatorErrorMessage[] = [
  {
    validatorKey: "required",
    errorMessage: "This field is required."
  },
  {
    validatorKey: "requiredTrue",
    errorMessage: "This field value must be true."
  },
  {
    validatorKey: "email",
    errorMessage: "This email does not perform email validation."
  },
  {
    validatorKey: "pattern",
    errorMessage: "This field requires to match a regex to its value."
  }
];
