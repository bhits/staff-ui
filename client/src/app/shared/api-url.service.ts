import {Injectable} from "@angular/core";

@Injectable()
export class ApiUrlService {
  private urls: Map<string, string> = new Map(
    [
      // Internal Url maps
      ["loginUrl", "/login"],
      ["homeUrl", "/home"],
      //Todo: Change to correct url
      ["patientListUrl", "http://localhost:9999/patients"],
      ["createUserUrl", "http://localhost:9999/users"],
      ["userListUrl", "/users"],
      // External Url maps
      ["uaaTokenUrl", "/uaa/oauth/token"],
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

  getPatientListUrl(): string {
    return this.urls.get('patientListUrl');
  }

  getCreateUserUrl(): string {
    return this.urls.get('createUserUrl');
  }

  getUserListUrl(): string {
    return this.urls.get('userListUrl');
  }

  getUaaTokenUrl(): string {
    return this.urls.get('uaaTokenUrl');
  }

  getUaaUserInfoUrl(): string {
    return this.urls.get('uaaUserInfoUrl');
  }
}
