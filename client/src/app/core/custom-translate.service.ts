import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

import {Http} from "@angular/http";
import {ApiUrlService} from "../shared/api-url.service";
import {ExceptionService} from "../shared/exception.service";
import {ProfileService} from "../security/shared/profile.service";
import {UmsProfile} from "../security/shared/ums-profile.model";

//staff custom-translate service
@Injectable()
export class CustomTranslateService {
  constructor(  private apiUrlService: ApiUrlService,
                private translateService: TranslateService,

  ) {


  }
}
