import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {AuthorizationService} from "app/security/shared/authorization.service";
import {ApiUrlService} from "../../shared/api-url.service";

@Injectable()
export class CanActivateAuthGuardService implements CanActivate, CanActivateChild {

  constructor(private apiUrlService: ApiUrlService,
              private authorizationService: AuthorizationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authorizationService.canAccess()) {
      return true;
    } else {
      this.router.navigate([this.apiUrlService.getLoginUrl()], {queryParams: {redirectUrl: state.url}});
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(childRoute, state);
  }
}
