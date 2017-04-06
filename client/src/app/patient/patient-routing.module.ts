import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PatientsComponent} from "app/patient/patients/patients.component";
import {PatientListComponent} from "app/patient/patient-list/patient-list.component";
import {CanActivateAuthGuardService} from "app/security/shared/can-activate-auth-guard.service";

const patientRoutes: Routes = [
  {
    path: 'patients',
    component: PatientsComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    children: [
      {
        path: '',
        component: PatientListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(patientRoutes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {
}

export const routedComponents = [
  PatientsComponent,
  PatientListComponent
];
