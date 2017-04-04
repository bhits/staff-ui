import {Injectable} from "@angular/core";
import {TokenService} from "./token.service";

@Injectable()
export class AuthorizationService {

  constructor(private tokenService: TokenService) {
  }

  public canAccess(): boolean {
    const ADMIN_ACCESS_SCOPE: string = "staffUi.read";
    return this.tokenService.hasScope(ADMIN_ACCESS_SCOPE);
  }
}
