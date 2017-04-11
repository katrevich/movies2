import { Movies2Page } from './app.po';

describe('movies2 App', () => {
  let page: Movies2Page;

  beforeEach(() => {
    page = new Movies2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
