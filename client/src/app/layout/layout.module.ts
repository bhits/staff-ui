import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {SharedModule} from "../shared/shared.module";
import {FooterComponent} from "./footer/footer.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule {
}
