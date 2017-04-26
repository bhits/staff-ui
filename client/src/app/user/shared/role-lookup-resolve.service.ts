import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {UserCreationLookupService} from "./user-creation-lookup.service";
import {Observable} from "rxjs/Observable";
import {Role} from "./role.model";

@Injectable()
export class RoleLookupResolveService implements Resolve<any> {

  constructor(public userCreationLookupService: UserCreationLookupService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Role[]> {
    return this.userCreationLookupService.getRoles()
      .do((roleCodes: Role[]) => {
        return roleCodes;
      });
  }
}
