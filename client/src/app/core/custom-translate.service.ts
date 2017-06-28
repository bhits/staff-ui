import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ProfileService} from "../security/shared/profile.service";
import {UmsProfile} from "../security/shared/ums-profile.model";


//staff custom-translate service
@Injectable()
export class CustomTranslateService {
  constructor(  private translateService: TranslateService,
                private profileService: ProfileService,
  ) {}

  getCurrentLanguage():string{
    return this.translateService.currentLang;
  }

  getSupportedLanguages(): any[]{
    return this.profileService.getProfileFromSessionStorage().supportedLocales;
  }

  updateDefaultLanguage(locale:string){
    this.translateService.use(locale);
    // TODO Should update backend with selected locale
    this.updateProfileLocale(locale);
  }

  setDefaultLanguage(locale:string){
    this.updateProfileLocale(locale);
    this.translateService.use(locale);
  }

  private updateProfileLocale(locale:string){
    let profile: UmsProfile = this.profileService.getProfileFromSessionStorage();
    if(profile){
      profile.userLocale = locale;
      this.profileService.setProfileInSessionStorage(profile);
    }
  }

  addSupportedLanguages(locales: string[]){
    this.translateService.addLangs(locales);
  }

}
