import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class UtilityService {

  constructor(private router: Router) {
  }

  public navigateTo(url: string) {
    this.router.navigate([url]);
  }

  redirectInSameTab(path: string) {
    let url:string = this.composeUrl().concat(path);
    window.location.replace(url);
  }

  private composeUrl():string{
    let protocol:string = window.location.protocol;
    let host:string = window.location.host;
    let port:string = window.location.port;
    return protocol.concat("//").concat(host).concat( port? ":".concat(port).concat("/"): "/");
  }

  public formatZipCode(zipCode: string): string {
    if (zipCode.length > 5) {
      zipCode = zipCode.slice(0, 5) + "-" + zipCode.slice(5);
    }
    return zipCode;
  }

  getSupportedLocaleCode(supportedLocales: any) {
    let localeCode: string [] = [];
    supportedLocales.forEach(locale => {
      localeCode.push(locale.code);
    });
    return localeCode;
  }

  public convertJsonObjToStrMap(jsonStr) {
    const strMap = new Map();
    for (let k of Object.keys(jsonStr)) {
      strMap.set(k, jsonStr[k]);
    }
    return strMap;
  }


}
