import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "app/security/shared/authentication.service";
import {UtilityService} from "../../shared/utility.service";

@Component({
  selector: 'c2s-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFrom: FormGroup;
  public unauthorized: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.loginFrom = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    const formModel = this.loginFrom.value;
    const username: string = formModel.username;
    const password: string = formModel.password;
    this.authenticationService.login(username, password)
      .subscribe(
        (res) => {
          this.unauthorized = false;
          this.utilityService.navigateTo('/home');
          console.log(res);
          this.authenticationService.getUserInfo()
            .subscribe(
              (res) => {
                console.log(res);
              },
              error => {
                console.log(error);
              }
            )
        },
        err => {
          this.unauthorized = true;
          this.loginFrom.reset();
          console.log(err);
        }
      );
  }
}
