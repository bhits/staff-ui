import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {CoreModule} from "app/core/core.module";
import {LayoutModule} from "./layout/layout.module";
import {HomeModule} from "./home/home.module";
import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from "./app.component";
import {PatientModule} from "./patient/patient.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Modules
    BrowserModule,

    // Third Party Modules

    // Staff UI Modules
    CoreModule,
    HomeModule,
    LayoutModule,
    PatientModule,
    AppRoutingModule // Order matters, this must in the end
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
