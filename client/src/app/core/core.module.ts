import {NgModule} from "@angular/core";
import {SecurityModule} from "../security/security.module";
import {SlimLoadingBarModule, SlimLoadingBarService} from "ng2-slim-loading-bar";
import {Http, RequestOptions, XHRBackend} from "@angular/http";
import {httpInterceptorServiceFactory} from "./http-interceptor.service";
import {TokenService} from "../security/shared/token.service";

@NgModule({
  imports: [
    SecurityModule,
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [],
  providers: [
    {
      provide: Http,
      useFactory: httpInterceptorServiceFactory,
      deps: [XHRBackend, RequestOptions, SlimLoadingBarService, TokenService]
    }
  ],
  exports: [SlimLoadingBarModule]
})
export class CoreModule {
}
