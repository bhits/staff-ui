import {Component, Input, OnInit} from "@angular/core";
import {User} from "../shared/user.model";

@Component({
  selector: 'c2s-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {

  @Input()
  public user: User;

  constructor() {
  }

  ngOnInit() {
  }

}
