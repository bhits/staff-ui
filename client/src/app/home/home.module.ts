import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {SharedModule} from "../shared/shared.module";
import {HomeRoutingModule} from "./home-routing.module";
import {TranslateModule} from "@ngx-translate/core/index";
import {FormsModule} from "@angular/forms";
@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    TranslateModule,
    FormsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
}
