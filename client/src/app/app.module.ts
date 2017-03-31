import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {CoreModule} from "app/core/core.module";
import {LayoutModule} from "./layout/layout.module";
import {HomeModule} from "./home/home.module";
import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from "./app.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserModule,

    // Third Party Modules

    // C2S Modules
    AppRoutingModule,
    CoreModule,
    HomeModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
