import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PlayerUpdatePage {
  pageTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.player.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#player-name'));
  phoneInput: ElementFinder = element(by.css('input#player-phone'));
  emailInput: ElementFinder = element(by.css('input#player-email'));
  birthdayInput: ElementFinder = element(by.css('input#player-birthday'));
  genderSelect: ElementFinder = element(by.css('select#player-gender'));
  subscriptionAllowedInput: ElementFinder = element(by.css('input#player-subscriptionAllowed'));
  internalUserSelect: ElementFinder = element(by.css('select#player-internalUser'));
  companySelect: ElementFinder = element(by.css('select#player-company'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setBirthdayInput(birthday) {
    await this.birthdayInput.sendKeys(birthday);
  }

  async getBirthdayInput() {
    return this.birthdayInput.getAttribute('value');
  }

  async setGenderSelect(gender) {
    await this.genderSelect.sendKeys(gender);
  }

  async getGenderSelect() {
    return this.genderSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption() {
    await this.genderSelect.all(by.tagName('option')).last().click();
  }
  getSubscriptionAllowedInput() {
    return this.subscriptionAllowedInput;
  }
  async internalUserSelectLastOption() {
    await this.internalUserSelect.all(by.tagName('option')).last().click();
  }

  async internalUserSelectOption(option) {
    await this.internalUserSelect.sendKeys(option);
  }

  getInternalUserSelect() {
    return this.internalUserSelect;
  }

  async getInternalUserSelectedOption() {
    return this.internalUserSelect.element(by.css('option:checked')).getText();
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
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneInput('54645');
    expect(await this.getPhoneInput()).to.match(/54645/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEmailInput('&amp;(@n{#EWA');
    expect(await this.getEmailInput()).to.match(/&amp;(@n{#EWA/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBirthdayInput('01-01-2001');
    expect(await this.getBirthdayInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.genderSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    const selectedSubscriptionAllowed = await this.getSubscriptionAllowedInput().isSelected();
    if (selectedSubscriptionAllowed) {
      await this.getSubscriptionAllowedInput().click();
      expect(await this.getSubscriptionAllowedInput().isSelected()).to.be.false;
    } else {
      await this.getSubscriptionAllowedInput().click();
      expect(await this.getSubscriptionAllowedInput().isSelected()).to.be.true;
    }
    await this.internalUserSelectLastOption();
    await this.companySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
