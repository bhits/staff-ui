import {Component, OnInit} from "@angular/core";
import {Profile} from "../../core/profile.model";

@Component({
  selector: 'c2s-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public profile: Profile;

  constructor() {
    //Todo: Add the handler
    this.profile = new Profile("c2s-admin@mailinator.com");
  }

  ngOnInit() {
  }

}
