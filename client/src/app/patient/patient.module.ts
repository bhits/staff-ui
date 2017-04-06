import {NgModule} from "@angular/core";
import {PatientRoutingModule, routedComponents} from "./patient-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
    PatientRoutingModule
  ],
  declarations: [routedComponents]
})
export class PatientModule {
}
