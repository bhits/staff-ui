import {Injectable} from "@angular/core";
import {TokenService} from "./token.service";
import {GlobalEventManagementService} from "app/core/global-event-management.service";
import {ProfileService} from "./profile.service";
import {CustomTranslateService} from "../../core/custom-translate.service";
import {UtilityService} from "../../shared/utility.service";
import {Profile} from "../../core/profile.model";
import {UmsProfile} from "./ums-profile.model";

@Injectable()
export class AuthorizationService {

  constructor(private globalEventManagementService: GlobalEventManagementService,
              private profileService: ProfileService,
              private customTranslateService: CustomTranslateService,
              private utilityService: UtilityService,
              private tokenService: TokenService) {
  }

  public canAccess(): boolean {
    const ADMIN_ACCESS_SCOPE: string = "staffUi.access";
    let uaaProfile:Profile =  this.tokenService.getProfileToken();

    if (this.tokenService.hasScope(ADMIN_ACCESS_SCOPE) && uaaProfile) {
      let umsProfile:UmsProfile = this.profileService.getProfileFromSessionStorage();
      if(umsProfile){
        this.customTranslateService.addSupportedLanguages(this.utilityService.getSupportedLocaleCode(umsProfile.supportedLocales));
        this.customTranslateService.setDefaultLanguage(umsProfile.userLocale);
      }
      this.globalEventManagementService.setShowHeader(true);
      this.globalEventManagementService.setProfile(uaaProfile);
      return true;
    } else {
      this.tokenService.deleteOauthToken();
      return false;
    }
  }
}
