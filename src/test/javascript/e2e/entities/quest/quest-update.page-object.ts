import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class QuestUpdatePage {
  pageTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.quest.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  slugInput: ElementFinder = element(by.css('input#quest-slug'));
  titleInput: ElementFinder = element(by.css('input#quest-title'));
  descriptionInput: ElementFinder = element(by.css('textarea#quest-description'));
  playersMinCountInput: ElementFinder = element(by.css('input#quest-playersMinCount'));
  playersMaxCountInput: ElementFinder = element(by.css('input#quest-playersMaxCount'));
  durationInMinutesInput: ElementFinder = element(by.css('input#quest-durationInMinutes'));
  complexitySelect: ElementFinder = element(by.css('select#quest-complexity'));
  fearLevelSelect: ElementFinder = element(by.css('select#quest-fearLevel'));
  typeSelect: ElementFinder = element(by.css('select#quest-type'));
  locationSelect: ElementFinder = element(by.css('select#quest-location'));
  companySelect: ElementFinder = element(by.css('select#quest-company'));
  thematicSelect: ElementFinder = element(by.css('select#quest-thematic'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setSlugInput(slug) {
    await this.slugInput.sendKeys(slug);
  }

  async getSlugInput() {
    return this.slugInput.getAttribute('value');
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setPlayersMinCountInput(playersMinCount) {
    await this.playersMinCountInput.sendKeys(playersMinCount);
  }

  async getPlayersMinCountInput() {
    return this.playersMinCountInput.getAttribute('value');
  }

  async setPlayersMaxCountInput(playersMaxCount) {
    await this.playersMaxCountInput.sendKeys(playersMaxCount);
  }

  async getPlayersMaxCountInput() {
    return this.playersMaxCountInput.getAttribute('value');
  }

  async setDurationInMinutesInput(durationInMinutes) {
    await this.durationInMinutesInput.sendKeys(durationInMinutes);
  }

  async getDurationInMinutesInput() {
    return this.durationInMinutesInput.getAttribute('value');
  }

  async setComplexitySelect(complexity) {
    await this.complexitySelect.sendKeys(complexity);
  }

  async getComplexitySelect() {
    return this.complexitySelect.element(by.css('option:checked')).getText();
  }

  async complexitySelectLastOption() {
    await this.complexitySelect.all(by.tagName('option')).last().click();
  }
  async setFearLevelSelect(fearLevel) {
    await this.fearLevelSelect.sendKeys(fearLevel);
  }

  async getFearLevelSelect() {
    return this.fearLevelSelect.element(by.css('option:checked')).getText();
  }

  async fearLevelSelectLastOption() {
    await this.fearLevelSelect.all(by.tagName('option')).last().click();
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
  async locationSelectLastOption() {
    await this.locationSelect.all(by.tagName('option')).last().click();
  }

  async locationSelectOption(option) {
    await this.locationSelect.sendKeys(option);
  }

  getLocationSelect() {
    return this.locationSelect;
  }

  async getLocationSelectedOption() {
    return this.locationSelect.element(by.css('option:checked')).getText();
  }

  async companySelectLastOption() {
    await this.companySelect.all(by.tagName('option')).last().click();
  }

  async companySelectOption(option) {
    await this.companySelect.sendKeys(option);
  }

  getCompanySelect() {
    return this.companySelect;
  }

  async getCompanySelectedOption() {
    return this.companySelect.element(by.css('option:checked')).getText();
  }

  async thematicSelectLastOption() {
    await this.thematicSelect.all(by.tagName('option')).last().click();
  }

  async thematicSelectOption(option) {
    await this.thematicSelect.sendKeys(option);
  }

  getThematicSelect() {
    return this.thematicSelect;
  }

  async getThematicSelectedOption() {
    return this.thematicSelect.element(by.css('option:checked')).getText();
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
    await this.setSlugInput('slug');
    expect(await this.getSlugInput()).to.match(/slug/);
    await waitUntilDisplayed(this.saveButton);
    await this.setTitleInput('title');
    expect(await this.getTitleInput()).to.match(/title/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPlayersMinCountInput('5');
    expect(await this.getPlayersMinCountInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setPlayersMaxCountInput('5');
    expect(await this.getPlayersMaxCountInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDurationInMinutesInput('5');
    expect(await this.getDurationInMinutesInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.complexitySelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.fearLevelSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.typeSelectLastOption();
    await this.locationSelectLastOption();
    await this.companySelectLastOption();
    // this.thematicSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
