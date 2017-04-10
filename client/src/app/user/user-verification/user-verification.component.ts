import {Component, Input, OnInit} from "@angular/core";
import {User} from "../shared/user.model";
import {UserService} from "app/user/shared/user.service";
import {NotificationService} from "app/shared/notification.service";

@Component({
  selector: 'c2s-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {
  @Input()
  public user: User;
  public verified: boolean = false;
  public verificationCode: string;
  public accountStatus: string;

  constructor(private notificationService: NotificationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getCurrentUserCreationInfo(this.user.id)
      .subscribe(
        (userCreationResponse) => {
          this.verificationCode = userCreationResponse.verificationCode;
          this.verified = userCreationResponse.verified;
        },
        err => {
          console.log(err);
        }
      );
  }

  public sendVerificationEmail() {
    this.userService.initiateUserCreation(this.user.id)
      .subscribe(
        (userCreationResponse) => {
          this.notificationService.show("Email sent successfully");
          this.verified = userCreationResponse.verified;
          this.verificationCode = userCreationResponse.verificationCode;
        },
        err => {
          this.notificationService.show("Failed to send email, please try again later...");
          console.log(err);
        }
      );
  }
}
