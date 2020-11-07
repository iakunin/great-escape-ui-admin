import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import QuestPhotoComponentsPage from './quest-photo.page-object';
import QuestPhotoUpdatePage from './quest-photo-update.page-object';
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

describe('QuestPhoto e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let questPhotoComponentsPage: QuestPhotoComponentsPage;
  let questPhotoUpdatePage: QuestPhotoUpdatePage;

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
    questPhotoComponentsPage = new QuestPhotoComponentsPage();
    questPhotoComponentsPage = await questPhotoComponentsPage.goToPage(navBarPage);
  });

  it('should load QuestPhotos', async () => {
    expect(await questPhotoComponentsPage.title.getText()).to.match(/Quest Photos/);
    expect(await questPhotoComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete QuestPhotos', async () => {
        const beforeRecordsCount = await isVisible(questPhotoComponentsPage.noRecords) ? 0 : await getRecordsCount(questPhotoComponentsPage.table);
        questPhotoUpdatePage = await questPhotoComponentsPage.goToCreateQuestPhoto();
        await questPhotoUpdatePage.enterData();

        expect(await questPhotoComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(questPhotoComponentsPage.table);
        await waitUntilCount(questPhotoComponentsPage.records, beforeRecordsCount + 1);
        expect(await questPhotoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
        
        await questPhotoComponentsPage.deleteQuestPhoto();
        if(beforeRecordsCount !== 0) { 
          await waitUntilCount(questPhotoComponentsPage.records, beforeRecordsCount);
          expect(await questPhotoComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(questPhotoComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
