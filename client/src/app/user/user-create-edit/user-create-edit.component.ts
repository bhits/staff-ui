import {Component, OnInit, ViewContainerRef} from "@angular/core";
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
import {ActivatedRoute} from "@angular/router";
import {Gender} from "app/user/shared/gender.model";
import {GENDERS} from "app/user/shared/genders.model";
import {ValidationRules} from "../../shared/validation-rules.model";
import {ConfirmDialogService} from "app/shared/confirm-dialog.service";
import {Observable} from "rxjs/Observable";
import {ValidationService} from "../../shared/validation.service";

@Component({
  selector: 'c2s-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss']
})
export class UserCreateEditComponent implements OnInit {
  private userId: number;
  private toSubmit: boolean = false;
  public createEditUserFrom: FormGroup;
  public editingUser: User;
  public isOpenOnFocus: boolean = true;
  public FORMAT: string = "MM/dd/yyyy";
  public genders: Gender[];
  public languages: Language[];
  public userRoles: UserRole[];
  public isEditMode: boolean = false;
  public phoneErrorMessage: string = ValidationRules.PHONE_MESSAGE;
  public ssnErrorMessage: string = ValidationRules.SSN_MESSAGE;
  public zipErrorMessage: string = ValidationRules.ZIP_MESSAGE;
  public title: string = "Create User";

  constructor(private apiUrlService: ApiUrlService,
              private confirmDialogService: ConfirmDialogService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private userService: UserService,
              private viewContainerRef: ViewContainerRef,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.genders = GENDERS;
    this.languages = LANGUAGES;
    this.userRoles = USER_ROLES;
    this.createEditUserFrom = this.formBuilder.group({
      firstName: ['',
        [
          Validators.minLength(ValidationRules.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NAME_MAX_LENGTH),
          Validators.required
        ]
      ],
      middleName: ['',
        [
          Validators.minLength(ValidationRules.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NAME_MAX_LENGTH)
        ]
      ],
      lastName: ['',
        [
          Validators.minLength(ValidationRules.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NAME_MAX_LENGTH),
          Validators.required
        ]
      ],
      email: ['', Validators.email],
      genderCode: ['', Validators.required],
      birthDate: ['', Validators.compose([
        Validators.required,
        ValidationService.pastDateValidator])
      ],
      socialSecurityNumber: ['', Validators.pattern(ValidationRules.SSN_PATTERN)],
      phone: ['', Validators.pattern(ValidationRules.PHONE_PATTERN)],
      address: this.initAddressFormGroup(),
      userRole: ['', Validators.required],
      language: ['', Validators.required]
    });
    this.route.params
      .subscribe(
        params => {
          if (params['userId']) {
            // Edit mode
            this.title = "Edit User";
            let user: User = this.route.snapshot.data['user'];
            this.isEditMode = user.id != null;
            this.userId = user.id;
            this.editingUser = user;
            this.setValueOnEditUserForm(user);
          }
        });
  }

  private initAddressFormGroup() {
    return this.formBuilder.group({
      line1: ['', Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH)],
      line2: ['', Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH)],
      city: ['', Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH)],
      state: ['', Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH)],
      postalCode: ['', Validators.pattern(ValidationRules.ZIP_PATTERN)],
      country: ['', Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH)]
    });
  }

  private setValueOnEditUserForm(user: User) {
    this.createEditUserFrom.setValue({
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      genderCode: user.genderCode,
      birthDate: user.birthDate,
      socialSecurityNumber: user.socialSecurityNumber,
      phone: user.phone,
      address: {
        line1: user.address.line1,
        line2: user.address.line2,
        city: user.address.city,
        state: user.address.state,
        postalCode: user.address.postalCode,
        country: user.address.country
      },
      userRole: user.userRole,
      language: user.language
    })
  }

  cancel(): void {
    this.utilityService.navigateTo(this.apiUrlService.getUserListUrl());
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.toSubmit) {
      return true;
    } else if (this.createEditUserFrom.dirty) {
      const confirmTitle: string = "Confirm Navigation";
      const confirmMessage: string = "You will lose all unsaved work, Are you sure you want to leave this page?";
      return this.confirmDialogService.confirm(confirmTitle, confirmMessage, this.viewContainerRef);
    } else {
      return true;
    }
  }

  createEditUser(): void {
    this.toSubmit = true;
    if (this.isEditMode) {
      this.userService.updateUser(this.userId, this.prepareCreateEditUser())
        .subscribe(
          () => {
            this.utilityService.navigateTo(this.apiUrlService.getUserListUrl())
          },
          err => {
            this.notificationService.show("Error in updating user.");
            console.log(err);
          }
        );
    } else {
      this.userService.createUser(this.prepareCreateEditUser())
        .subscribe(
          () => {
            this.utilityService.navigateTo(this.apiUrlService.getUserListUrl())
          },
          err => {
            this.notificationService.show("Error in creating user.");
            console.log(err);
          }
        );
    }
  }

  private prepareCreateEditUser(): User {
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
