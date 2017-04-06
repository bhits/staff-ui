import {Pipe, PipeTransform} from "@angular/core";
import {Patient} from "./patient.model";
import {UtilityService} from "../../shared/utility.service";

type ArgType = "id" | "fullName" | "birthDate" | "genderCode" | "phone" | "address";

@Pipe({
  name: 'patient'
})
export class PatientPipe implements PipeTransform {
  constructor(private utilityService: UtilityService) {
  }

  transform(value: Patient, args?: ArgType): any {
    if (value) {
      switch (args) {
        case "id":
          return value.id;
        case "fullName":
          return PatientPipe.getName(value, 'firstName').concat(' ').concat(PatientPipe.getName(value, 'middleName')).concat(' ').concat(PatientPipe.getName(value, 'lastName'));
        case "birthDate":
          return value.birthDate;
        case "genderCode":
          return value.genderCode;
        case "phone":
          return value.phone;
        case "address":
          const address = [];
          address.push(value.address.street || "");
          address.push(value.address.city || "");
          address.push(value.address.state || "");
          address.push(this.utilityService.formatZipCode(value.address.postalCode || ""));
          address.push(value.address.country || "");
          return address.filter(field => field !== "").join(", ");
      }
    }
    return null;
  }

  private static getName(patient: Patient, key: string): string {
    if (patient !== null && patient[key]) {
      return patient[key];
    }
    return ''
  }
}
