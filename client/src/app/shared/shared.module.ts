import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import "hammerjs";

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class SharedModule {
}
