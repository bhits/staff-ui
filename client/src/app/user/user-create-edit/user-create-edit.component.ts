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
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      genderCode: ['', Validators.required],
      birthDate: ['', Validators.required],
      socialSecurityNumber: ['', Validators.required],
      phone: ['', Validators.required],
      address: this.initAddressFormGroup()
    })
  }

  private initAddressFormGroup() {
    return this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  clearForm(): void {
    this.createEditUserFrom.reset();
  }
}
