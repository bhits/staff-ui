import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {CoreModule} from "app/core/core.module";
import {LayoutModule} from "./layout/layout.module";
import {HomeModule} from "./home/home.module";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {UserModule} from "app/user/user.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations/";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserAnimationsModule,
    BrowserModule,

    // Third Party Modules

    // Staff UI Modules
    CoreModule,
    HomeModule,
    LayoutModule,
    UserModule,
    AppRoutingModule // Order matters, this must in the end
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
