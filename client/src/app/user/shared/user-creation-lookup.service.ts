import {Injectable} from "@angular/core";
import {ExceptionService} from "../../shared/exception.service";
import {Http, Response} from "@angular/http";
import {ApiUrlService} from "../../shared/api-url.service";
import {Gender} from "./gender.model";
import {Observable} from "rxjs/Observable";

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
}
