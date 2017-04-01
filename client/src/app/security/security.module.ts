import {NgModule} from "@angular/core";
import {SecurityRoutingModule} from "./security-routing.module";
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "../shared/shared.module";
import {AuthenticationService} from "app/security/shared/authentication.service";

@NgModule({
  imports: [
    SharedModule,
    SecurityRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [
    AuthenticationService
  ]
})
export class SecurityModule {
}
