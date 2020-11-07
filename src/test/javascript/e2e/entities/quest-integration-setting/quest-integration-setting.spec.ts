import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import QuestIntegrationSettingComponentsPage from './quest-integration-setting.page-object';
import QuestIntegrationSettingUpdatePage from './quest-integration-setting-update.page-object';
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

describe('QuestIntegrationSetting e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let questIntegrationSettingComponentsPage: QuestIntegrationSettingComponentsPage;
  let questIntegrationSettingUpdatePage: QuestIntegrationSettingUpdatePage;

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
    questIntegrationSettingComponentsPage = new QuestIntegrationSettingComponentsPage();
    questIntegrationSettingComponentsPage = await questIntegrationSettingComponentsPage.goToPage(navBarPage);
  });

  it('should load QuestIntegrationSettings', async () => {
    expect(await questIntegrationSettingComponentsPage.title.getText()).to.match(/Quest Integration Settings/);
    expect(await questIntegrationSettingComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete QuestIntegrationSettings', async () => {
        const beforeRecordsCount = await isVisible(questIntegrationSettingComponentsPage.noRecords) ? 0 : await getRecordsCount(questIntegrationSettingComponentsPage.table);
        questIntegrationSettingUpdatePage = await questIntegrationSettingComponentsPage.goToCreateQuestIntegrationSetting();
        await questIntegrationSettingUpdatePage.enterData();

        expect(await questIntegrationSettingComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(questIntegrationSettingComponentsPage.table);
        await waitUntilCount(questIntegrationSettingComponentsPage.records, beforeRecordsCount + 1);
        expect(await questIntegrationSettingComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await questIntegrationSettingComponentsPage.deleteQuestIntegrationSetting();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(questIntegrationSettingComponentsPage.records, beforeRecordsCount);
          expect(await questIntegrationSettingComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(questIntegrationSettingComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
