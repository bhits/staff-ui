import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {UserCreationLookupService} from "./user-creation-lookup.service";
import {Observable} from "rxjs/Observable";
import {State} from "./state.model";

@Injectable()
export class StateLookupResolveService implements Resolve<any> {

  constructor(public userCreationLookupService: UserCreationLookupService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<State[]> {
    return this.userCreationLookupService.getStateCodes()
      .do((stateCodes: State[]) => {
        return stateCodes;
      });
  }
}
