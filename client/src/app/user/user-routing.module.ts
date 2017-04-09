import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "app/user/users/users.component";
import {CanActivateAuthGuardService} from "../security/shared/can-activate-auth-guard.service";
import {PatientListComponent} from "app/user/patient-list/patient-list.component";
import {UserCreateEditComponent} from "app/user/user-create-edit/user-create-edit.component";
import {UserResolveService} from "app/user/shared/user-resolve.service";

const userRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [CanActivateAuthGuardService],
    canActivateChild: [CanActivateAuthGuardService],
    children: [
      {
        path: '',
        component: PatientListComponent
      },
      {
        path: 'create',
        component: UserCreateEditComponent
      },
      {
        path: 'edit/:userId',
        component: UserCreateEditComponent,
        resolve: {
          user: UserResolveService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

export const routedComponents = [
  UsersComponent,
  PatientListComponent,
  UserCreateEditComponent
];
