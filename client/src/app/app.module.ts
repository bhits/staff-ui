import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {CoreModule} from "app/core/core.module";
import {LayoutModule} from "./layout/layout.module";
import {HomeModule} from "./home/home.module";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {UserModule} from "app/user/user.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations/";

import {Http} from "@angular/http";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {createTranslateLoader,CustomTranslateService} from "./core/custom-translate.service";
import {getBaseHref} from "./shared/common-functions";
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserAnimationsModule,
    BrowserModule,

    // Third Party Modules
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    // Staff UI Modules
    CoreModule,
    HomeModule,
    LayoutModule,
    UserModule,
    AppRoutingModule // Order matters, this must in the end
  ],
  providers: [
    TranslateService,
    CustomTranslateService,
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
