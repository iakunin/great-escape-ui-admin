import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class SlotUpdatePage {
  pageTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.slot.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateTimeLocalInput: ElementFinder = element(by.css('input#slot-dateTimeLocal'));
  dateTimeWithTimeZoneInput: ElementFinder = element(by.css('input#slot-dateTimeWithTimeZone'));
  isAvailableInput: ElementFinder = element(by.css('input#slot-isAvailable'));
  priceInput: ElementFinder = element(by.css('input#slot-price'));
  discountInPercentsInput: ElementFinder = element(by.css('input#slot-discountInPercents'));
  commissionInPercentsInput: ElementFinder = element(by.css('input#slot-commissionInPercents'));
  externalIdInput: ElementFinder = element(by.css('input#slot-externalId'));
  externalStateInput: ElementFinder = element(by.css('textarea#slot-externalState'));
  questSelect: ElementFinder = element(by.css('select#slot-quest'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateTimeLocalInput(dateTimeLocal) {
    await this.dateTimeLocalInput.sendKeys(dateTimeLocal);
  }

  async getDateTimeLocalInput() {
    return this.dateTimeLocalInput.getAttribute('value');
  }

  async setDateTimeWithTimeZoneInput(dateTimeWithTimeZone) {
    await this.dateTimeWithTimeZoneInput.sendKeys(dateTimeWithTimeZone);
  }

  async getDateTimeWithTimeZoneInput() {
    return this.dateTimeWithTimeZoneInput.getAttribute('value');
  }

  getIsAvailableInput() {
    return this.isAvailableInput;
  }
  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return this.priceInput.getAttribute('value');
  }

  async setDiscountInPercentsInput(discountInPercents) {
    await this.discountInPercentsInput.sendKeys(discountInPercents);
  }

  async getDiscountInPercentsInput() {
    return this.discountInPercentsInput.getAttribute('value');
  }

  async setCommissionInPercentsInput(commissionInPercents) {
    await this.commissionInPercentsInput.sendKeys(commissionInPercents);
  }

  async getCommissionInPercentsInput() {
    return this.commissionInPercentsInput.getAttribute('value');
  }

  async setExternalIdInput(externalId) {
    await this.externalIdInput.sendKeys(externalId);
  }

  async getExternalIdInput() {
    return this.externalIdInput.getAttribute('value');
  }

  async setExternalStateInput(externalState) {
    await this.externalStateInput.sendKeys(externalState);
  }

  async getExternalStateInput() {
    return this.externalStateInput.getAttribute('value');
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
    await this.setDateTimeLocalInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDateTimeLocalInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setDateTimeWithTimeZoneInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDateTimeWithTimeZoneInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    const selectedIsAvailable = await this.getIsAvailableInput().isSelected();
    if (selectedIsAvailable) {
      await this.getIsAvailableInput().click();
      expect(await this.getIsAvailableInput().isSelected()).to.be.false;
    } else {
      await this.getIsAvailableInput().click();
      expect(await this.getIsAvailableInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setPriceInput('5');
    expect(await this.getPriceInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDiscountInPercentsInput('5');
    expect(await this.getDiscountInPercentsInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCommissionInPercentsInput('5');
    expect(await this.getCommissionInPercentsInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setExternalIdInput('externalId');
    expect(await this.getExternalIdInput()).to.match(/externalId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setExternalStateInput('externalState');
    expect(await this.getExternalStateInput()).to.match(/externalState/);
    await this.questSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
