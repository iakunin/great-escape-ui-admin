import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ThematicComponentsPage from './thematic.page-object';
import ThematicUpdatePage from './thematic-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Thematic e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let thematicComponentsPage: ThematicComponentsPage;
  let thematicUpdatePage: ThematicUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    thematicComponentsPage = new ThematicComponentsPage();
    thematicComponentsPage = await thematicComponentsPage.goToPage(navBarPage);
  });

  it('should load Thematics', async () => {
    expect(await thematicComponentsPage.title.getText()).to.match(/Thematics/);
    expect(await thematicComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Thematics', async () => {
    const beforeRecordsCount = (await isVisible(thematicComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(thematicComponentsPage.table);
    thematicUpdatePage = await thematicComponentsPage.goToCreateThematic();
    await thematicUpdatePage.enterData();

    expect(await thematicComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(thematicComponentsPage.table);
    await waitUntilCount(thematicComponentsPage.records, beforeRecordsCount + 1);
    expect(await thematicComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await thematicComponentsPage.deleteThematic();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(thematicComponentsPage.records, beforeRecordsCount);
      expect(await thematicComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(thematicComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
