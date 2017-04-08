import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ExceptionService} from "../../shared/exception.service";
import {User} from "app/user/shared/user.model";
import {Observable} from "rxjs/Observable";
import {ApiUrlService} from "app/shared/api-url.service";

@Injectable()
export class UserService {

  constructor(private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public createUser(user: User): Observable<void> {
    const resourceUrl = this.apiUrlService.getCreateUserUrl();
    return this.http.post(resourceUrl, user)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }
}
