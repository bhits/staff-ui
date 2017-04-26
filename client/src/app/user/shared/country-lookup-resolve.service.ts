import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {UserCreationLookupService} from "./user-creation-lookup.service";
import {Observable} from "rxjs/Observable";
import {Country} from "./country.model";

@Injectable()
export class CountryLookupResolveService implements Resolve<any> {

  constructor(public userCreationLookupService: UserCreationLookupService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Country[]> {
    return this.userCreationLookupService.getCountryCodes()
      .do((countryCodes: Country[]) => {
        return countryCodes;
      });
  }
}
