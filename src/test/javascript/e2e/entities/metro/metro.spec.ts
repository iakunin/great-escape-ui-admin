import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MetroComponentsPage from './metro.page-object';
import MetroUpdatePage from './metro-update.page-object';
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

describe('Metro e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let metroComponentsPage: MetroComponentsPage;
  let metroUpdatePage: MetroUpdatePage;

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
    metroComponentsPage = new MetroComponentsPage();
    metroComponentsPage = await metroComponentsPage.goToPage(navBarPage);
  });

  it('should load Metros', async () => {
    expect(await metroComponentsPage.title.getText()).to.match(/Metros/);
    expect(await metroComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Metros', async () => {
    const beforeRecordsCount = (await isVisible(metroComponentsPage.noRecords)) ? 0 : await getRecordsCount(metroComponentsPage.table);
    metroUpdatePage = await metroComponentsPage.goToCreateMetro();
    await metroUpdatePage.enterData();

    expect(await metroComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(metroComponentsPage.table);
    await waitUntilCount(metroComponentsPage.records, beforeRecordsCount + 1);
    expect(await metroComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await metroComponentsPage.deleteMetro();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(metroComponentsPage.records, beforeRecordsCount);
      expect(await metroComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(metroComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
