import { ConnpassCardPage } from './app.po';

describe('connpass-card App', function() {
  let page: ConnpassCardPage;

  beforeEach(() => {
    page = new ConnpassCardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
