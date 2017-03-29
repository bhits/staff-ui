import { StaffAdminUiPage } from './app.po';

describe('staff-admin-ui App', () => {
  let page: StaffAdminUiPage;

  beforeEach(() => {
    page = new StaffAdminUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('c2s works!');
  });
});
