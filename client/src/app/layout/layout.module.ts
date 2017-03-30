import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class LayoutModule {
}
