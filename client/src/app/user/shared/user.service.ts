import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {ExceptionService} from "../../shared/exception.service";
import {User} from "app/user/shared/user.model";
import {Observable} from "rxjs/Observable";
import {ApiUrlService} from "app/shared/api-url.service";

@Injectable()
export class UserService {
  private umsUserUrl: string = this.apiUrlService.getUmsBaseUrl().concat("/users");

  constructor(private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public createUser(user: User): Observable<void> {
    const CREATE_USER_URL = this.umsUserUrl;
    return this.http.post(CREATE_USER_URL, user)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  public getUser(userId: number): Observable<User> {
    const GET_USER_URL = `${this.umsUserUrl}/${userId}`;
    return this.http.get(GET_USER_URL)
      .map((resp: Response) => <User>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public updateUser(userId: number, user: User): Observable<void> {
    const GET_USER_URL = `${this.umsUserUrl}/${userId}`;
    return this.http.put(GET_USER_URL, user)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }
}
