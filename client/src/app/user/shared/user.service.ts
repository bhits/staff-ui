import {Injectable} from "@angular/core";
import {Http, Response, URLSearchParams} from "@angular/http";
import {ExceptionService} from "../../shared/exception.service";
import {User} from "app/user/shared/user.model";
import {Observable} from "rxjs/Observable";
import {ApiUrlService} from "app/shared/api-url.service";
import {UserCreationResponse} from "app/user/shared/user-creation-response.model";
import {PageableData} from "../../shared/pageable-data.model";

@Injectable()
export class UserService {
  private umsUserUrl: string = this.apiUrlService.getUmsBaseUrl().concat("/users");
  private umsUserCreationUrl: string = this.apiUrlService.getUmsBaseUrl().concat("/users/creations");

  constructor(private apiUrlService: ApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http) {
  }

  public getUsers(page: number): Observable<PageableData<User>> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', page.toString());
    return this.http.get(this.umsUserUrl, {search: params})
      .map((resp: Response) => <PageableData<User>>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public searchUsers(terms: string): Observable<User[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('term', terms);
    const SEARCH_USER_URL = this.umsUserUrl.concat("/search");
    return this.http.get(SEARCH_USER_URL, {search: params})
      .map((resp: Response) => <User[]>(resp.json()))
      .catch(this.exceptionService.handleError);
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
    const UPDATE_USER_URL = `${this.umsUserUrl}/${userId}`;
    return this.http.put(UPDATE_USER_URL, user)
      .map(() => null)
      .catch(this.exceptionService.handleError);
  }

  public initiateUserCreation(userId: number): Observable<UserCreationResponse> {
    return this.http.post(this.umsUserCreationUrl, JSON.stringify({userId: userId}))
      .map((resp: Response) => <UserCreationResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  public getCurrentUserCreationInfo(userId: number): Observable<UserCreationResponse> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('userId', userId.toString());
    return this.http.get(this.umsUserCreationUrl, {search: params})
      .map((resp: Response) => <UserCreationResponse>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
