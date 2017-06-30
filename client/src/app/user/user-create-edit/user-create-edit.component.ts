import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "app/user/shared/user.service";

import {User} from "app/user/shared/user.model";
import {NotificationService} from "app/shared/notification.service";
import {UtilityService} from "app/shared/utility.service";
import {ApiUrlService} from "app/shared/api-url.service";
import {Role} from "app/user/shared/role.model";
import {ActivatedRoute} from "@angular/router";
import {ValidationRules} from "../../shared/validation-rules.model";
import {ConfirmDialogService} from "app/shared/confirm-dialog.service";
import {Observable} from "rxjs/Observable";
import {ValidationService} from "../../shared/validation.service";
import {UserCreationLookupInfo} from "../shared/user-creation-lookup-info.model";
import {BaseUserCreationLookup} from "../shared/base-user-creation-lookup.model";
import {IdentifierSystem} from "../shared/IdentifierSystem.model";

@Component({
  selector: 'c2s-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss']
})
export class UserCreateEditComponent implements OnInit {
  private readonly DEFAULT_ROLE: string = "patient";
  private userId: number;
  private toSubmit: boolean = false;
  public createEditUserFrom: FormGroup;
  public editingUser: User;
  public isOpenOnFocus: boolean = true;
  public FORMAT: string = "MM/dd/y";
  public genders: BaseUserCreationLookup[];
  public locales: BaseUserCreationLookup[];
  public states: BaseUserCreationLookup[];
  public countries: BaseUserCreationLookup[];
  public roles: Role[];
  public isEditMode: boolean = false;
  public phoneErrorMessage: string = ValidationRules.PHONE_MESSAGE;
  public ssnErrorMessage: string = ValidationRules.SSN_MESSAGE;
  public zipErrorMessage: string = ValidationRules.ZIP_MESSAGE;
  public identifierSystems: IdentifierSystem[];
  public title: string = "Create User";
  //Todo: Will remove when support multiple roles
  public disabledRoles: string[];
  public oneEmailRequiredMessage: string = "At least one email address needed";
  public emailErrorMessage: string = ValidationRules.EMAIL_MESSAGE;

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
    let userCreationLookupInfo: UserCreationLookupInfo = this.route.snapshot.data['userCreationLookupInfo'];
    this.roles = userCreationLookupInfo.roles;
    this.genders = userCreationLookupInfo.genderCodes;
    this.locales = userCreationLookupInfo.locales;
    this.states = userCreationLookupInfo.stateCodes;
    this.countries = userCreationLookupInfo.countryCodes;
    this.disabledRoles = userCreationLookupInfo.roles
                                              .filter(role => role.code != "patient")
                                              .map(role => role.code);

    this.identifierSystems = userCreationLookupInfo.identifierSystems
      .map(identifierSystem => {
        identifierSystem.requiredIdentifierSystemsByRole = this.utilityService.convertJsonObjToStrMap(identifierSystem.requiredIdentifierSystemsByRole);
        return identifierSystem;
      })
      .filter(identifierSystem => identifierSystem.requiredIdentifierSystemsByRole)
      .filter(identifierSystem => identifierSystem.requiredIdentifierSystemsByRole.size > 0)
      .filter(identifierSystem => identifierSystem.requiredIdentifierSystemsByRole.has(this.DEFAULT_ROLE))
      .filter(identifierSystem => identifierSystem.requiredIdentifierSystemsByRole.get(this.DEFAULT_ROLE).filter(requiredIdentifierSystem => requiredIdentifierSystem.algorithm === "NONE").length > 0);

    this.createEditUserFrom = this.initCreateEditFormGroup();
    //Set patient as default role
    this.createEditUserFrom.controls['roles'].setValue([this.roles.filter(role => role.code === this.DEFAULT_ROLE).pop().code]);
    //Set English as default locale
    this.createEditUserFrom.controls['locale'].setValue(this.locales.filter(locale => locale.code === "en").pop().code);


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

  private initCreateEditFormGroup() {
    let createEditFormGroupConfig: any = {
      firstName: [null,
        [
          Validators.minLength(ValidationRules.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NAME_MAX_LENGTH),
          Validators.required
        ]
      ],
      middleName: [null,
        [
          Validators.minLength(ValidationRules.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NAME_MAX_LENGTH)
        ]
      ],
      lastName: [null,
        [
          Validators.minLength(ValidationRules.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationRules.NAME_MAX_LENGTH),
          Validators.required
        ]
      ],
      homeEmail: [null, Validators.pattern(ValidationRules.EMAIL_PATTERN)],
      registrationPurposeEmail: [null, Validators.pattern(ValidationRules.EMAIL_PATTERN)],
      genderCode: [null, Validators.required],
      birthDate: [null, Validators.compose([
        Validators.required,
        ValidationService.pastDateValidator])
      ],
      socialSecurityNumber: [null, Validators.pattern(ValidationRules.SSN_PATTERN)],
      homePhone: [null, Validators.pattern(ValidationRules.PHONE_PATTERN)],
      homeAddress: this.initAddressFormGroup(),
      roles: [null, Validators.required],
      locale: [null, Validators.required]
    };

    if (this.isIdentifiersEnabled()) {
      createEditFormGroupConfig.identifier = this.initIdentifierFormGroup();
    }

    return this.formBuilder.group(createEditFormGroupConfig,{validator: ValidationService.oneEmailRequired('homeEmail', 'registrationPurposeEmail')});
  }

  private initIdentifierFormGroup() {
    return this.formBuilder.group({
      system: [null, Validators.required],
      value: [null, Validators.required]
    });
  }



  onIdentifierSystemChange(event: any) {
    this.createEditUserFrom.get("identifier.value").setValue(null);
  }

  private initAddressFormGroup() {
    return this.formBuilder.group({
      line1: [null, Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH)],
      line2: [null, Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH)],
      city: [null, Validators.minLength(ValidationRules.NORMAL_MIN_LENGTH)],
      stateCode: null,
      postalCode: [null, Validators.pattern(ValidationRules.ZIP_PATTERN)],
      countryCode: null
    });
  }

  private setValueOnEditUserForm(user: User) {
    let patientIdentifiers = user.identifiers.filter(identifier => identifier.system !== "https://bhits.github.io/consent2share" && identifier.system !== "http://hl7.org/fhir/sid/us-ssn");
    if (user.homeAddress != null) {
      let value: any = {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        homeEmail: user.homeEmail,
        registrationPurposeEmail: user.registrationPurposeEmail,
        genderCode: user.genderCode,
        birthDate: new Date(user.birthDate),
        socialSecurityNumber: user.socialSecurityNumber,
        homePhone: user.homePhone,
        homeAddress: {
          line1: user.homeAddress.line1,
          line2: user.homeAddress.line2,
          city: user.homeAddress.city,
          stateCode: user.homeAddress.stateCode,
          postalCode: user.homeAddress.postalCode,
          countryCode: user.homeAddress.countryCode
        },
        roles: user.roles,
        locale: user.locale
      };

      if (this.isIdentifiersEnabled()) {
        value.identifier = {
          system: patientIdentifiers[0].system,
          value: patientIdentifiers[0].value
        };
      }
      this.createEditUserFrom.setValue(value)
    } else {
      let value:any = {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        homeEmail: user.homeEmail,
        registrationPurposeEmail: user.registrationPurposeEmail,
        genderCode: user.genderCode,
        birthDate: new Date(user.birthDate),
        socialSecurityNumber: user.socialSecurityNumber,
        homePhone: user.homePhone,
        homeAddress: {
          line1: null,
          line2: null,
          city: null,
          stateCode: null,
          postalCode: null,
          countryCode: null
        },
        roles: user.roles,
        locale: user.locale
      };
      if (this.isIdentifiersEnabled()) {
        value.identifier = {
          system: patientIdentifiers[0].system,
          value: patientIdentifiers[0].value
        }
      }
      this.createEditUserFrom.setValue(value)
    }

    if (this.isIdentifiersEnabled()) {
      //Disable identifier system when in Patient Edit Mode
      this.createEditUserFrom.get("identifier.system").disable();
    }
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

  private filterEmptyStringValue(field: string) {
    return field === '' ? null : field;
  }

  private prepareCreateEditUser(): User {
    const formModel = this.createEditUserFrom.value;
    let identifiers = [];
    identifiers.push(formModel.identifier);
    let user: User =  {
      firstName: formModel.firstName,
      middleName: this.filterEmptyStringValue(formModel.middleName),
      lastName: formModel.lastName,
      homeEmail: this.filterEmptyStringValue(formModel.homeEmail) ,
      registrationPurposeEmail: this.filterEmptyStringValue(formModel.registrationPurposeEmail),
      birthDate: formModel.birthDate,
      genderCode: formModel.genderCode,
      socialSecurityNumber: this.filterEmptyStringValue(formModel.socialSecurityNumber) ,
      homePhone: this.filterEmptyStringValue(formModel.homePhone),
      homeAddress: this.filterEmptyStringValueForAddress(formModel.homeAddress) ,
      roles: formModel.roles,
      locale: formModel.locale,
      identifiers: []
    };

    if (this.isIdentifiersEnabled()) {
      let identifiers = [];
      identifiers.push(this.createEditUserFrom.getRawValue().identifier);
      user.identifiers = identifiers;
    }
    return user;
  }

  private filterEmptyStringValueForAddress(homeAddress) {
    homeAddress.line1 = this.filterEmptyStringValue(homeAddress.line1);
    homeAddress.line2 = this.filterEmptyStringValue(homeAddress.line2);
    homeAddress.city = this.filterEmptyStringValue(homeAddress.city);
    homeAddress.stateCode = this.filterEmptyStringValue(homeAddress.stateCode);
    homeAddress.postalCode = this.filterEmptyStringValue(homeAddress.postalCode);
    homeAddress.countryCode = this.filterEmptyStringValue(homeAddress.countryCode);
    return homeAddress;
  }

  public isIdentifiersEnabled(): boolean {
    if(this.identifierSystems && this.identifierSystems.length > 0){
      return true;
    }
    return false;
  }

}
