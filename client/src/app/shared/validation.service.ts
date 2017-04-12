import {Injectable} from "@angular/core";
import {VALIDATOR_ERROR_MESSAGES} from "./validator-error-messages.model";

@Injectable()
export class ValidationService {

  constructor() {
  }

  getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
    switch (validatorName) {
      case "minlength":
        return `Minimum length ${validatorValue.requiredLength}`;
      case "maxlength":
        return `Maximum length ${validatorValue.requiredLength}`;
      default :
        return VALIDATOR_ERROR_MESSAGES
          .filter(validatorKeys => validatorName === validatorKeys.validatorKey)
          .map(errorMessages => errorMessages.errorMessage)
          .pop();
    }
  }
}
