import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BookingUpdatePage {
  pageTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.booking.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  statusSelect: ElementFinder = element(by.css('select#booking-status'));
  priceInput: ElementFinder = element(by.css('input#booking-price'));
  discountInPercentsInput: ElementFinder = element(by.css('input#booking-discountInPercents'));
  commissionInPercentsInput: ElementFinder = element(by.css('input#booking-commissionInPercents'));
  slotSelect: ElementFinder = element(by.css('select#booking-slot'));
  questSelect: ElementFinder = element(by.css('select#booking-quest'));
  playerSelect: ElementFinder = element(by.css('select#booking-player'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect.all(by.tagName('option')).last().click();
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

  async slotSelectLastOption() {
    await this.slotSelect.all(by.tagName('option')).last().click();
  }

  async slotSelectOption(option) {
    await this.slotSelect.sendKeys(option);
  }

  getSlotSelect() {
    return this.slotSelect;
  }

  async getSlotSelectedOption() {
    return this.slotSelect.element(by.css('option:checked')).getText();
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

  async playerSelectLastOption() {
    await this.playerSelect.all(by.tagName('option')).last().click();
  }

  async playerSelectOption(option) {
    await this.playerSelect.sendKeys(option);
  }

  getPlayerSelect() {
    return this.playerSelect;
  }

  async getPlayerSelectedOption() {
    return this.playerSelect.element(by.css('option:checked')).getText();
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
    await this.statusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setPriceInput('5');
    expect(await this.getPriceInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDiscountInPercentsInput('5');
    expect(await this.getDiscountInPercentsInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCommissionInPercentsInput('5');
    expect(await this.getCommissionInPercentsInput()).to.eq('5');
    await this.slotSelectLastOption();
    await this.questSelectLastOption();
    await this.playerSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
