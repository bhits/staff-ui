import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import "hammerjs";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule
  ]
})
export class SharedModule {
}
