import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {PageHeaderComponent} from "./page-header/page-header.component";
import {PageFooterComponent} from "./page-footer/page-footer.component";
import {PageContentComponent} from "./page-content/page-content.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    PageHeaderComponent,
    PageFooterComponent,
    PageContentComponent
  ],
  exports: [
    PageHeaderComponent,
    PageFooterComponent,
    PageContentComponent
  ]
})
export class LayoutModule {
}
