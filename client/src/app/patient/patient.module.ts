import {NgModule} from "@angular/core";
import {PatientRoutingModule, routedComponents} from "./patient-routing.module";
import {SharedModule} from "../shared/shared.module";
import {PatientPipe} from "./shared/patient.pipe";
import {PatientService} from "app/patient/shared/patient.service";

@NgModule({
  imports: [
    SharedModule,
    PatientRoutingModule
  ],
  declarations: [routedComponents, PatientPipe],
  providers: [
    PatientService
  ]
})
export class PatientModule {
}
