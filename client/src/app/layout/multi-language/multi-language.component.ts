import { Component, OnInit } from '@angular/core';
import {CustomTranslateService} from "../../core/custom-translate.service";

// staff-ui
@Component({
  selector: 'c2s-multi-language',
  templateUrl: './multi-language.component.html',
  styleUrls: ['./multi-language.component.scss']
})
export class MultiLanguageComponent implements OnInit {

  constructor(private customTranslateService : CustomTranslateService) { }

  ngOnInit() {
  }

}
