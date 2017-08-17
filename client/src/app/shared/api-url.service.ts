import {Injectable} from "@angular/core";

@Injectable()
export class ApiUrlService {
  private urls: Map<string, string> = new Map(
    [
      // Internal routes maps
      ["loginUrl", "/login"],
      ["homeUrl", "/home"],
      ["userListUrl", "/users"],

      // External api Url maps
      ["umsBaseUrl", "/staff-ui-api/ums"],
      ["uaaBaseUrl", "/staff-ui-api/uaa"]
    ]
  );

  constructor() {
  }

  public getLoginUrl(): string {
    return this.urls.get('loginUrl');
  }

  public getHomeUrl(): string {
    return this.urls.get('homeUrl');
  }

  public getUserListUrl(): string {
    return this.urls.get('userListUrl');
  }

  public getUmsBaseUrl(): string {
    return this.urls.get('umsBaseUrl');
  }

  public getUaaBaseUrl(): string {
    return this.urls.get('uaaBaseUrl');
  }
}
