import {Injectable} from "@angular/core";
import {SessionStorageService} from "./session-storage.service";
import {AuthorizationResponse} from "./authorization-response.model";

@Injectable()
export class TokenService {
  private ACCESS_TOKEN_KEY: string = 'c2s-access-token';
  private MASTER_UI_LOGIN: string = 'c2s-master-ui-login';

  constructor(private sessionStorageService: SessionStorageService) {
  }

  public getOauthToken(): AuthorizationResponse {
    return this.sessionStorageService.retrieve(this.ACCESS_TOKEN_KEY);
  }

  public setOauthToken(authorizationResponse: AuthorizationResponse): void {
    this.sessionStorageService.store(this.ACCESS_TOKEN_KEY, authorizationResponse);
  }

  public deleteOauthToken(): void {
    this.sessionStorageService.clear(this.ACCESS_TOKEN_KEY);
  }

  public hasScope(scope: string): boolean {
    if (this.getOauthToken()) {
      const uaaToken: AuthorizationResponse = this.getOauthToken();
      return uaaToken.scope.includes(scope);
    }
    return false;
  }

  public deleteAccessToken(): void {
    this.sessionStorageService.clear(this.ACCESS_TOKEN_KEY);
  }

  public getMasterUiLoginUrl(): string {
    return this.sessionStorageService.retrieve(this.MASTER_UI_LOGIN);
  }
}
