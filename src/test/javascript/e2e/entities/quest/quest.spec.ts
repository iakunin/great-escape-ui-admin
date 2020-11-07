import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import QuestComponentsPage from './quest.page-object';
import QuestUpdatePage from './quest-update.page-object';
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

describe('Quest e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let questComponentsPage: QuestComponentsPage;
  let questUpdatePage: QuestUpdatePage;

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
    questComponentsPage = new QuestComponentsPage();
    questComponentsPage = await questComponentsPage.goToPage(navBarPage);
  });

  it('should load Quests', async () => {
    expect(await questComponentsPage.title.getText()).to.match(/Quests/);
    expect(await questComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete Quests', async () => {
        const beforeRecordsCount = await isVisible(questComponentsPage.noRecords) ? 0 : await getRecordsCount(questComponentsPage.table);
        questUpdatePage = await questComponentsPage.goToCreateQuest();
        await questUpdatePage.enterData();

        expect(await questComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(questComponentsPage.table);
        await waitUntilCount(questComponentsPage.records, beforeRecordsCount + 1);
        expect(await questComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await questComponentsPage.deleteQuest();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(questComponentsPage.records, beforeRecordsCount);
          expect(await questComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(questComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
