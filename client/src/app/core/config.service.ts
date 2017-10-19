import { Injectable } from '@angular/core';
import { ExceptionService} from "../shared/exception.service";
import { NotificationService} from "../shared/notification.service";
import { Http, Response} from "@angular/http";
import { Config } from "./config.model";
import { Observable} from "rxjs/Observable";
import { ApiUrlService } from "../shared/api-url.service";
import { SessionStorageService} from "../security/shared/session-storage.service";
import { TokenService} from "../security/shared/token.service";

@Injectable()
export class ConfigService {
  private C2S_CONFIG_KEY: string = 'c2s-config';
  constructor(private ApiUrlService : ApiUrlService,
              private exceptionService: ExceptionService,
              private http: Http,
              private notificationService: NotificationService,
              private tokenService: TokenService,
              private sessionStorageService: SessionStorageService) {
  }

  public getConfig(): Observable<Config> {
    const resourceUrl = this.ApiUrlService.getConfigBaseUrl();
    return this.http.get(resourceUrl)
      .map((resp: Response) => <Config>(resp.json()))
      .catch(this.exceptionService.handleError)
  }

  public setConfigInSessionStorage(config: Config): void {
    this.sessionStorageService.store(this.C2S_CONFIG_KEY, config);
  }

  public getConfigInSessionStorage(): Config {
    let config: Config = this.sessionStorageService.retrieve(this.C2S_CONFIG_KEY);
    if (config != null){
      return config;
    } else {
      // If logged in using mater-ui then get config
      if (this.tokenService.getOauthToken()){
        //Get config data once login
        this.getConfig().subscribe(
          (config: Config)=> {
            this.setConfigInSessionStorage(config);
          },
          (err) =>{
            this.notificationService.i18nShow("SHARED.CONFIGURATION_SERVICE_ERROR");
          }
        );
      } else {
        this.notificationService.i18nShow("SHARED.CONFIGURATION_SERVICE_ERROR");
      }
    }
  }
}
