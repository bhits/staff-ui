import {NgModule} from "@angular/core";
import {routedComponents, routedResolveServices, UserRoutingModule} from "./user-routing.module";
import {SharedModule} from "app/shared/shared.module";
import {UserService} from "./shared/user.service";
import {UserVerificationComponent} from "./user-verification/user-verification.component";
import {UserPipe} from "./shared/user.pipe";

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    routedComponents,
    UserVerificationComponent,
    UserPipe
  ],
  providers: [
    routedResolveServices,
    UserService
  ]
})
export class UserModule {
}
