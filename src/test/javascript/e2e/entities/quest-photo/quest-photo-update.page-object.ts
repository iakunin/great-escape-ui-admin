import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class QuestPhotoUpdatePage {
  pageTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.questPhoto.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  urlInput: ElementFinder = element(by.css('input#quest-photo-url'));
  questSelect: ElementFinder = element(by.css('select#quest-photo-quest'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUrlInput(url) {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput() {
    return this.urlInput.getAttribute('value');
  }

  async questSelectLastOption() {
    await this.questSelect.all(by.tagName('option')).last().click();
  }

  async questSelectOption(option) {
    await this.questSelect.sendKeys(option);
  }

  getQuestSelect() {
    return this.questSelect;
  }

  async getQuestSelectedOption() {
    return this.questSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setUrlInput('url');
    expect(await this.getUrlInput()).to.match(/url/);
    await this.questSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
