export enum AccountStatus {
  NotActivated,
  Activated,
  Created,
  Disabled
}

export const ACCOUNT_STATUSES: Map<AccountStatus, string> = new Map(
  [
    [AccountStatus.NotActivated, "Account Not Yet Activated"],
    [AccountStatus.Activated, "Activation Email Sent"],
    [AccountStatus.Created, "Account Created"],
    [AccountStatus.Disabled, "Account Disabled"]
  ]
);
