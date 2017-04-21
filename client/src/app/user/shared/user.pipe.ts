import {Pipe, PipeTransform} from "@angular/core";
import {UtilityService} from "../../shared/utility.service";
import {User} from "./user.model";

type ArgType = "id" | "fullName" | "birthDate" | "genderCode" | "phone" | "address";

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  constructor(private utilityService: UtilityService) {
  }

  transform(value: User, args?: ArgType): any {
    if (value) {
      switch (args) {
        case "id":
          return value.id;
        case "fullName":
          return UserPipe.getName(value, 'firstName').concat(' ').concat(UserPipe.getName(value, 'middleName')).concat(' ').concat(UserPipe.getName(value, 'lastName'));
        case "birthDate":
          return value.birthDate;
        case "genderCode":
          return value.genderCode;
        case "phone":
          return value.phone;
        case "address":
          const address = [];
          address.push(value.address.line1 || "");
          address.push(value.address.line2 || "");
          address.push(value.address.city || "");
          address.push(value.address.state || "");
          address.push(this.utilityService.formatZipCode(value.address.postalCode || ""));
          address.push(value.address.country || "");
          return address.filter(field => field !== "").join(", ");
      }
    }
    return null;
  }

  private static getName(user: User, key: string): string {
    if (user !== null && user[key]) {
      return user[key];
    }
    return ''
  }
}
