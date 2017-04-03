import {Injectable} from "@angular/core";
import {ApiUrlService} from "app/shared/api-url.service";
import {Headers, Http, Response, URLSearchParams} from "@angular/http";
import {ExceptionService} from "app/shared/exception.service";
import {Observable} from "rxjs";
import {AuthorizationResponse} from "app/security/shared/authorization-response.model";
import {UserInfoResponse} from "./user-info-response.model";
import {TokenService} from "./token.service";
import {UtilityService} from "../../shared/utility.service";

@Injectable()
export class AuthenticationService {
  //Todo: get from configuration
  private AUTHORIZATION_HEADER: string = 'c3RhZmYtYWRtaW4tdWk6Y2hhbmdlaXQ=';

  constructor(private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http,
              private tokenService: TokenService,
              private utilityService: UtilityService) {
  }

  public login(username: string, password: string): Observable<AuthorizationResponse> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);
    params.set('grant_type', 'password');
    params.set('response_type', 'token');

    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Authorization', 'Basic '.concat(this.AUTHORIZATION_HEADER));

    return this.http.post(this.apiUrlService.getUaaTokenUrl(), params, {headers: headers})
      .map((resp: Response) => <AuthorizationResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public logout() {
    this.tokenService.deleteOauthToken();
    this.utilityService.navigateTo(this.apiUrlService.getLoginUrl());
  }

  public getUserInfo(): Observable<UserInfoResponse> {
    return this.http.get(this.apiUrlService.getUaaUserInfoUrl())
      .map((resp: Response) => <UserInfoResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
