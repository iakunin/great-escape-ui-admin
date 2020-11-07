import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class QuestIntegrationSettingUpdatePage {
  pageTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.questIntegrationSetting.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  typeSelect: ElementFinder = element(by.css('select#quest-integration-setting-type'));
  settingsInput: ElementFinder = element(by.css('textarea#quest-integration-setting-settings'));
  questSelect: ElementFinder = element(by.css('select#quest-integration-setting-quest'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption() {
    await this.typeSelect.all(by.tagName('option')).last().click();
  }
  async setSettingsInput(settings) {
    await this.settingsInput.sendKeys(settings);
  }

  async getSettingsInput() {
    return this.settingsInput.getAttribute('value');
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
    await this.typeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setSettingsInput('settings');
    expect(await this.getSettingsInput()).to.match(/settings/);
    await this.questSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
