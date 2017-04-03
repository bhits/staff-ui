import {NgModule} from "@angular/core";
import {SecurityRoutingModule} from "./security-routing.module";
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "../shared/shared.module";
import {AuthenticationService} from "app/security/shared/authentication.service";
import {TokenService} from "./shared/token.service";
import {SessionStorageService} from "./shared/session-storage.service";

@NgModule({
  imports: [
    SharedModule,
    SecurityRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [
    AuthenticationService,
    SessionStorageService,
    TokenService
  ]
})
export class SecurityModule {
}
