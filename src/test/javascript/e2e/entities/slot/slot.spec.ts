import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SlotComponentsPage from './slot.page-object';
import SlotUpdatePage from './slot-update.page-object';
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

describe('Slot e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let slotComponentsPage: SlotComponentsPage;
  let slotUpdatePage: SlotUpdatePage;

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
    slotComponentsPage = new SlotComponentsPage();
    slotComponentsPage = await slotComponentsPage.goToPage(navBarPage);
  });

  it('should load Slots', async () => {
    expect(await slotComponentsPage.title.getText()).to.match(/Slots/);
    expect(await slotComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete Slots', async () => {
        const beforeRecordsCount = await isVisible(slotComponentsPage.noRecords) ? 0 : await getRecordsCount(slotComponentsPage.table);
        slotUpdatePage = await slotComponentsPage.goToCreateSlot();
        await slotUpdatePage.enterData();

        expect(await slotComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(slotComponentsPage.table);
        await waitUntilCount(slotComponentsPage.records, beforeRecordsCount + 1);
        expect(await slotComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await slotComponentsPage.deleteSlot();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(slotComponentsPage.records, beforeRecordsCount);
          expect(await slotComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(slotComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
