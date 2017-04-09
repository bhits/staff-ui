import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "app/user/shared/user.service";
import {User} from "app/user/shared/user.model";
import {NotificationService} from "app/shared/notification.service";
import {UtilityService} from "app/shared/utility.service";
import {ApiUrlService} from "app/shared/api-url.service";
import {Language} from "app/user/shared/language.model";
import {UserRole} from "app/user/shared/user-role.model";
import {LANGUAGES} from "app/user/shared/languages.model";
import {USER_ROLES} from "app/user/shared/user-roles.model";

@Component({
  selector: 'c2s-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss']
})
export class UserCreateEditComponent implements OnInit {
  public createEditUserFrom: FormGroup;
  public isOpenOnFocus: boolean = true;
  public FORMAT: string = "MM/dd/yyyy";
  public genderGroup = [
    {genderCode: 'M', genderValue: 'Male'},
    {genderCode: 'F', genderValue: 'Female'}
  ];
  public languages: Language[];
  public userRoles: UserRole[];

  constructor(private apiUrlService: ApiUrlService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private userService: UserService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.languages = LANGUAGES;
    this.userRoles = USER_ROLES;
    this.createEditUserFrom = this.formBuilder.group({
      firstName: ['', [Validators.minLength(2), Validators.required]],
      middleName: ['', Validators.minLength(2)],
      lastName: ['', [Validators.minLength(2), Validators.required]],
      email: ['', Validators.required],
      genderCode: ['', Validators.required],
      birthDate: ['', Validators.required],
      socialSecurityNumber: ['', Validators.minLength(2)],
      phone: ['', Validators.minLength(2)],
      address: this.initAddressFormGroup(),
      userRole: ['', Validators.required],
      language: ['', Validators.required]
    })
  }

  private initAddressFormGroup() {
    return this.formBuilder.group({
      street: ['', Validators.minLength(2)],
      city: ['', Validators.minLength(2)],
      state: ['', Validators.minLength(2)],
      postalCode: ['', Validators.minLength(2)],
      country: ['', Validators.minLength(2)]
    });
  }

  clearForm(): void {
    this.createEditUserFrom.reset();
  }

  createUser(): void {
    this.userService.createUser(this.prepareCreateUser())
      .subscribe(
        () => {
          this.utilityService.navigateTo(this.apiUrlService.getUserListUrl())
        },
        err => {
          this.notificationService.show("Error in create user.");
          console.log(err);
        }
      );
  }

  private prepareCreateUser(): User {
    const formModel = this.createEditUserFrom.value;
    return {
      firstName: formModel.firstName,
      middleName: formModel.middleName,
      lastName: formModel.lastName,
      email: formModel.email,
      birthDate: formModel.birthDate,
      genderCode: formModel.genderCode,
      socialSecurityNumber: formModel.socialSecurityNumber,
      phone: formModel.phone,
      address: formModel.address,
      userRole: formModel.userRole,
      language: formModel.language
    };
  }
}
