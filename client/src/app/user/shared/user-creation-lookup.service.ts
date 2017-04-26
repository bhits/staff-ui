import {Injectable} from "@angular/core";
import {ExceptionService} from "../../shared/exception.service";
import {Http, Response} from "@angular/http";
import {ApiUrlService} from "../../shared/api-url.service";
import {Gender} from "./gender.model";
import {Observable} from "rxjs/Observable";
import {Locale} from "./locale.model";
import {Role} from "app/user/shared/role.model";

@Injectable()
export class UserCreationLookupService {
  private umsUserUrl: string = this.apiUrlService.getUmsBaseUrl();

  constructor(private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public getGenderCodes(): Observable<Gender[]> {
    return this.http.get(this.umsUserUrl.concat("/gendercodes"))
      .map((resp: Response) => <Gender[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public getLocales(): Observable<Locale[]> {
    return this.http.get(this.umsUserUrl.concat("/locales"))
      .map((resp: Response) => <Locale[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public getRoles(): Observable<Role[]> {
    return this.http.get(this.umsUserUrl.concat("/roles"))
      .map((resp: Response) => <Role[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
