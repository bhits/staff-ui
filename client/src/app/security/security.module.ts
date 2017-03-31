import {NgModule} from "@angular/core";
import {SecurityRoutingModule} from "./security-routing.module";
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
    SecurityRoutingModule
  ],
  declarations: [LoginComponent]
})
export class SecurityModule {
}
