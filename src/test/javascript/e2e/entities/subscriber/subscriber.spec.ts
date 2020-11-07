import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SubscriberComponentsPage from './subscriber.page-object';
import SubscriberUpdatePage from './subscriber-update.page-object';
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

describe('Subscriber e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let subscriberComponentsPage: SubscriberComponentsPage;
  let subscriberUpdatePage: SubscriberUpdatePage;

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
    subscriberComponentsPage = new SubscriberComponentsPage();
    subscriberComponentsPage = await subscriberComponentsPage.goToPage(navBarPage);
  });

  it('should load Subscribers', async () => {
    expect(await subscriberComponentsPage.title.getText()).to.match(/Subscribers/);
    expect(await subscriberComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Subscribers', async () => {
    const beforeRecordsCount = (await isVisible(subscriberComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(subscriberComponentsPage.table);
    subscriberUpdatePage = await subscriberComponentsPage.goToCreateSubscriber();
    await subscriberUpdatePage.enterData();

    expect(await subscriberComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(subscriberComponentsPage.table);
    await waitUntilCount(subscriberComponentsPage.records, beforeRecordsCount + 1);
    expect(await subscriberComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await subscriberComponentsPage.deleteSubscriber();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(subscriberComponentsPage.records, beforeRecordsCount);
      expect(await subscriberComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(subscriberComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
