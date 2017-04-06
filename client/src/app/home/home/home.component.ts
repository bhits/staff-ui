import {Component, OnInit} from "@angular/core";
import {ApiUrlService} from "../../shared/api-url.service";
import {UtilityService} from "../../shared/utility.service";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiUrlService: ApiUrlService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
  }

  navigateTo() {
    this.utilityService.navigateTo(this.apiUrlService.getPatientListUrl());
  }
}
