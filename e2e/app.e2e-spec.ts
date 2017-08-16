import { YourNamePage } from './app.po';

describe('your-name App', function() {
  let page: YourNamePage;

  beforeEach(() => {
    page = new YourNamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('参加者の名は。');
  });
});
