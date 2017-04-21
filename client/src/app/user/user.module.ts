import {NgModule} from "@angular/core";
import {routedComponents, routedResolveServices, UserRoutingModule} from "./user-routing.module";
import {PatientPipe} from "./shared/patient.pipe";
import {SharedModule} from "app/shared/shared.module";
import {UserService} from "./shared/user.service";
import {UserVerificationComponent} from "./user-verification/user-verification.component";

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    routedComponents,
    PatientPipe,
    UserVerificationComponent
  ],
  providers: [
    routedResolveServices,
    UserService
  ]
})
export class UserModule {
}
