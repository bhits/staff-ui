import {Injectable} from "@angular/core";
import {SessionStorageService} from "./session-storage.service";
import {AuthorizationResponse} from "./authorization-response.model";

@Injectable()
export class TokenService {
  private OAUTH_TOKEN_KEY: string = 'c2s-oauth-token';
  private USER_INFO_KEY: string = 'c2s-userinfo-token';

  constructor(private sessionStorageService: SessionStorageService) {
  }

  getOauthToken(): AuthorizationResponse {
    return this.sessionStorageService.retrieve(this.OAUTH_TOKEN_KEY);
  }

  setOauthToken(authorizationResponse: AuthorizationResponse): void {
    this.sessionStorageService.store(this.OAUTH_TOKEN_KEY, authorizationResponse);
  }

  deleteOauthToken(): void {
    this.sessionStorageService.clear(this.OAUTH_TOKEN_KEY);
  }
}
