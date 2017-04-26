import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {UserCreationLookupService} from "./user-creation-lookup.service";
import {Observable} from "rxjs/Observable";
import {Locale} from "./locale.model";

@Injectable()
export class LocaleLookupResolveService implements Resolve<any> {

  constructor(public userCreationLookupService: UserCreationLookupService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Locale[]> {
    return this.userCreationLookupService.getLocales()
      .do((localeCodes: Locale[]) => {
        return localeCodes
      });
  }
}
