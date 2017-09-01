import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {AuthorizationService} from "app/security/shared/authorization.service";
import {ApiUrlService} from "../../shared/api-url.service";
import {PlatformLocation} from "@angular/common";
import {GlobalEventManagementService} from "../../core/global-event-management.service";

@Injectable()
export class CanActivateAuthGuardService implements CanActivate, CanActivateChild {

  private LOGIN_PATH: string = "/staff-ui/login";

  constructor(private apiUrlService: ApiUrlService,
              private authorizationService: AuthorizationService,
              private router: Router,
              private location: PlatformLocation,
              private globalEventManagementService: GlobalEventManagementService) {

    location.onPopState(() => {
      if(window.location.pathname === this.LOGIN_PATH){
        this.globalEventManagementService.setShowHeader(false);
        sessionStorage.clear();
      }
    });
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
