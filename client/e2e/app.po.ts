import { browser, element, by } from 'protractor';

export class StaffAdminUiPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('c2s-root h1')).getText();
  }
}
