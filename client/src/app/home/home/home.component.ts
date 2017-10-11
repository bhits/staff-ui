import {Component, OnInit, ViewChild} from "@angular/core";
import {ApiUrlService} from "../../shared/api-url.service";
import {UtilityService} from "../../shared/utility.service";
import {UserService} from "../../user/shared/user.service";
import {AuthenticationService} from "../../security/shared/authentication.service";
import {SessionStorageService} from "../../security/shared/session-storage.service";
import {Md2Dialog, Md2DialogConfig} from "md2/dialog/dialog";

@Component({
  selector: 'c2s-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public numberOfUsers: number = 0;
  public patientsMapping:any;
  @ViewChild('warningDialog') warningDialog: Md2Dialog;
  private readonly DEMO_DISCLAIMER_DISABLED: string = 'demoDisclaimerDisabled';
  public disabled : boolean =false;

  constructor(private apiUrlService: ApiUrlService,
              private userService: UserService,
              private utilityService: UtilityService,
              private authenticationService: AuthenticationService,
              private sessionStorageService: SessionStorageService,
              ) {
  }

  ngOnInit() {
    let config = new Md2DialogConfig();
    config.disableClose = true;
    this.warningDialog.open(config);


    const FIRST_PAGE: number = 0;
    this.userService.getUsers(FIRST_PAGE)
      .subscribe(
        (users) => {
          this.numberOfUsers = users.totalElements
        },
        (err) => {
          console.log(err);
        }
      );
    this.patientsMapping = {
      '=0': 'HOME.PATIENT_CARD.SINGULAR',
      '=1': 'HOME.PATIENT_CARD.SINGULAR',
      'other': 'HOME.PATIENT_CARD.PLURAL'
    };
  }

  navigateTo() {
    this.utilityService.navigateTo(this.apiUrlService.getUserListUrl());
  }

  public continue(dialog: any): void {
    dialog.close();
    this.sessionStorageService.store(this.DEMO_DISCLAIMER_DISABLED,true);
  }

  public logout(dialog: any): void {
    dialog.close();
    this.authenticationService.logout();
  }

}
