import {Component, Input, OnInit} from "@angular/core";
import {User} from "../shared/user.model";
import {UserService} from "app/user/shared/user.service";
import {NotificationService} from "app/shared/notification.service";
import {ACCOUNT_STATUSES, AccountStatus} from "app/user/shared/account-statuses.model";

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
  public accountStatusText: string = ACCOUNT_STATUSES.get(AccountStatus.NotActivated);

  constructor(private notificationService: NotificationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getCurrentUserCreationInfo(this.user.id)
      .subscribe(
        (userCreationResponse) => {
          this.verificationCode = userCreationResponse.verificationCode;
          this.accountStatusText = ACCOUNT_STATUSES.get(AccountStatus.Activated);
          if (userCreationResponse.verified) {
            this.verified = true;
            this.accountStatusText = ACCOUNT_STATUSES.get(AccountStatus.Created);
          }
        },
        err => {
          console.log(err + ": Cause by Account Not Yet Activated.");
        }
      );
  }

  public sendVerificationEmail() {
    this.userService.initiateUserCreation(this.user.id)
      .subscribe(
        (userCreationResponse) => {
          this.notificationService.show("Email sent successfully");
          this.verificationCode = userCreationResponse.verificationCode;
          this.accountStatusText = ACCOUNT_STATUSES.get(AccountStatus.Activated)
        },
        err => {
          this.notificationService.show("Failed to send email, please try again later...");
          console.log(err);
        }
      );
  }
}
