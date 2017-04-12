import "hammerjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {ApiUrlService} from "app/shared/api-url.service";
import {ExceptionService} from "app/shared/exception.service";
import {UtilityService} from "./utility.service";
import {Ng2PaginationModule} from "ng2-pagination";
import {UsPhoneNumberPipe} from "./us-phone-number.pipe";
import {Md2Module} from "md2";
import {NotificationService} from "app/shared/notification.service";
import {ValidationService} from "app/shared/validation.service";
import {ControlValidationErrorMessageComponent} from "./control-validation-error-message/control-validation-error-message.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UsPhoneNumberPipe, ControlValidationErrorMessageComponent],
  providers: [
    ApiUrlService,
    ExceptionService,
    NotificationService,
    UtilityService,
    ValidationService
  ],
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    ControlValidationErrorMessageComponent,
    FlexLayoutModule,
    MaterialModule,
    Md2Module,
    RouterModule,
    ReactiveFormsModule,
    Ng2PaginationModule,
    UsPhoneNumberPipe
  ]
})
export class SharedModule {
}
