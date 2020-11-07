import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class LocationUpdatePage {
  pageTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.location.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  addressInput: ElementFinder = element(by.css('input#location-address'));
  addressExplanationInput: ElementFinder = element(by.css('textarea#location-addressExplanation'));
  citySelect: ElementFinder = element(by.css('select#location-city'));
  metroSelect: ElementFinder = element(by.css('select#location-metro'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setAddressExplanationInput(addressExplanation) {
    await this.addressExplanationInput.sendKeys(addressExplanation);
  }

  async getAddressExplanationInput() {
    return this.addressExplanationInput.getAttribute('value');
  }

  async citySelectLastOption() {
    await this.citySelect.all(by.tagName('option')).last().click();
  }

  async citySelectOption(option) {
    await this.citySelect.sendKeys(option);
  }

  getCitySelect() {
    return this.citySelect;
  }

  async getCitySelectedOption() {
    return this.citySelect.element(by.css('option:checked')).getText();
  }

  async metroSelectLastOption() {
    await this.metroSelect.all(by.tagName('option')).last().click();
  }

  async metroSelectOption(option) {
    await this.metroSelect.sendKeys(option);
  }

  getMetroSelect() {
    return this.metroSelect;
  }

  async getMetroSelectedOption() {
    return this.metroSelect.element(by.css('option:checked')).getText();
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
    await this.setAddressInput('address');
    expect(await this.getAddressInput()).to.match(/address/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAddressExplanationInput('addressExplanation');
    expect(await this.getAddressExplanationInput()).to.match(/addressExplanation/);
    await this.citySelectLastOption();
    // this.metroSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
