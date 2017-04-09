import {NgModule} from "@angular/core";
import {routedComponents, UserRoutingModule} from "./user-routing.module";
import {PatientPipe} from "./shared/patient.pipe";
import {PatientService} from "app/user/shared/patient.service";
import {SharedModule} from "app/shared/shared.module";
import {UserService} from "./shared/user.service";
import {UserResolveService} from "./shared/user-resolve.service";
import {UserVerificationComponent} from "./user-verification/user-verification.component";

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    routedComponents,
    PatientPipe,
    UserVerificationComponent],
  providers: [
    PatientService,
    UserService,
    UserResolveService
  ]
})
export class UserModule {
}
