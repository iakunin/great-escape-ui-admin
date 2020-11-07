import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CityComponentsPage from './city.page-object';
import CityUpdatePage from './city-update.page-object';
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

describe('City e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cityComponentsPage: CityComponentsPage;
  let cityUpdatePage: CityUpdatePage;

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
    cityComponentsPage = new CityComponentsPage();
    cityComponentsPage = await cityComponentsPage.goToPage(navBarPage);
  });

  it('should load Cities', async () => {
    expect(await cityComponentsPage.title.getText()).to.match(/Cities/);
    expect(await cityComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Cities', async () => {
    const beforeRecordsCount = (await isVisible(cityComponentsPage.noRecords)) ? 0 : await getRecordsCount(cityComponentsPage.table);
    cityUpdatePage = await cityComponentsPage.goToCreateCity();
    await cityUpdatePage.enterData();

    expect(await cityComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(cityComponentsPage.table);
    await waitUntilCount(cityComponentsPage.records, beforeRecordsCount + 1);
    expect(await cityComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await cityComponentsPage.deleteCity();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(cityComponentsPage.records, beforeRecordsCount);
      expect(await cityComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(cityComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
