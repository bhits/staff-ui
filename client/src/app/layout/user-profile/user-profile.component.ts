import {Component, OnInit} from "@angular/core";
import {ProfileService} from "../../security/shared/profile.service";

@Component({
  selector: 'c2s-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public userFullName: string;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.userFullName = this.profileService.getFullName();
  }
}
