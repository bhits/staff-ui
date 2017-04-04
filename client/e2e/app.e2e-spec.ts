import { StaffUiPage } from './app.po';

describe('staff-ui App', () => {
  let page: StaffUiPage;

  beforeEach(() => {
    page = new StaffUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('c2s works!');
  });
});
