import {Component, Input, OnInit} from "@angular/core";
import {AbstractControl} from "@angular/forms";
import {ValidationService} from "app/shared/validation.service";

@Component({
  selector: 'c2s-control-validation-error-message',
  templateUrl: './control-validation-error-message.component.html',
  styleUrls: ['./control-validation-error-message.component.scss']
})
export class ControlValidationErrorMessageComponent implements OnInit {
  @Input() control: AbstractControl;

  constructor(private validationService: ValidationService) {
  }

  ngOnInit() {
  }

  get errorMessage() {
    for (const validatorKey in this.control.errors) {
      if (this.control.hasError(validatorKey) && (this.control.dirty || this.control.touched)) {
        return this.validationService.getValidatorErrorMessage(validatorKey, this.control.errors[validatorKey]);
      }
    }
    return null;
  }
}
