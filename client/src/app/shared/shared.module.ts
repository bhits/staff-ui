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
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {ConfirmDialogService} from "app/shared/confirm-dialog.service";
import {ShowHidePasswordComponent} from "./show-hide-password/show-hide-password.component";
import {TranslateModule} from "@ngx-translate/core/index";
import { SocialSecurityMaskDirective } from './social-security-mask.directive';
import { SocialSecurityPipe } from './social-security.pipe';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  declarations: [
    UsPhoneNumberPipe,
    ControlValidationErrorMessageComponent,
    ConfirmDialogComponent,
    ShowHidePasswordComponent,
    SocialSecurityMaskDirective,
    SocialSecurityPipe
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    ApiUrlService,
    ConfirmDialogService,
    ExceptionService,
    NotificationService,
    UtilityService,
    ValidationService,
    SocialSecurityPipe
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
    ShowHidePasswordComponent,
    UsPhoneNumberPipe,
    SocialSecurityMaskDirective,
    SocialSecurityPipe,
    FormsModule
  ]
})
export class SharedModule {
}
