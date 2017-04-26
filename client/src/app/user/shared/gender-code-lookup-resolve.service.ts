import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {UserCreationLookupService} from "./user-creation-lookup.service";
import {Observable} from "rxjs/Observable";
import {Gender} from "./gender.model";

@Injectable()
export class GenderCodeLookupResolveService implements Resolve<any> {

  constructor(public userCreationLookupService: UserCreationLookupService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Gender[]> {
    return this.userCreationLookupService.getGenderCodes()
      .do((genderCodes: Gender[]) => {
        return genderCodes;
      });
  }
}
