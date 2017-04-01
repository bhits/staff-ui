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

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    ApiUrlService,
    ExceptionService,
    UtilityService
  ],
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
