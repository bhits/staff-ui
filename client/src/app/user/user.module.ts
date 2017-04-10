import {NgModule} from "@angular/core";
import {routedComponents, routedResolveServices, UserRoutingModule} from "./user-routing.module";
import {PatientPipe} from "./shared/patient.pipe";
import {PatientService} from "app/user/shared/patient.service";
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
    PatientService,
    UserService
  ]
})
export class UserModule {
}
