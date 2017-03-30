import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {PageHeaderComponent} from "./page-header/page-header.component";
import {PageFooterComponent} from "./page-footer/page-footer.component";
import {PageContentComponent} from "./page-content/page-content.component";
import {LogoComponent} from "./logo/logo.component";
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    PageHeaderComponent,
    PageFooterComponent,
    PageContentComponent,
    LogoComponent,
    UserProfileComponent
  ],
  exports: [
    PageHeaderComponent,
    PageFooterComponent,
    PageContentComponent,
    LogoComponent
  ]
})
export class LayoutModule {
}
