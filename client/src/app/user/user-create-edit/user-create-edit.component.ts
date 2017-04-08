import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createEditUserFrom = this.formBuilder.group({
      firstName: ['', [Validators.minLength(2), Validators.required]],
      middleName: ['', Validators.minLength(2)],
      lastName: ['', [Validators.minLength(2), Validators.required]],
      email: ['', Validators.required],
      genderCode: ['', Validators.required],
      birthDate: ['', Validators.required],
      socialSecurityNumber: ['', Validators.minLength(2)],
      phone: ['', Validators.minLength(2)],
      address: this.initAddressFormGroup()
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
}
