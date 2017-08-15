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
      ["UmsBaseUrl", "/staff-ui-api/ums"],
      ["uaaBaseUrl", "/staff-ui-api/uaa"],
      ["uaaUserInfoUrl", "/uaa/userinfo"]
    ]
  );

  constructor() {
  }

  getLoginUrl(): string {
    return this.urls.get('loginUrl');
  }

  getHomeUrl(): string {
    return this.urls.get('homeUrl');
  }

  getUserListUrl(): string {
    return this.urls.get('userListUrl');
  }

  getUmsBaseUrl(): string {
    return this.urls.get('UmsBaseUrl');
  }

  getUaaBaseUrl(): string {
    return this.urls.get('uaaBaseUrl');
  }

  getUaaUserInfoUrl(): string {
    return this.urls.get('uaaUserInfoUrl');
  }
}
