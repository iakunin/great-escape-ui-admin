import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CompanyUpdatePage {
  pageTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.company.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  slugInput: ElementFinder = element(by.css('input#company-slug'));
  titleInput: ElementFinder = element(by.css('input#company-title'));
  legalNameInput: ElementFinder = element(by.css('input#company-legalName'));
  taxpayerNumberInput: ElementFinder = element(by.css('input#company-taxpayerNumber'));
  discountInPercentsInput: ElementFinder = element(by.css('input#company-discountInPercents'));
  commissionInPercentsInput: ElementFinder = element(by.css('input#company-commissionInPercents'));

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

  async setLegalNameInput(legalName) {
    await this.legalNameInput.sendKeys(legalName);
  }

  async getLegalNameInput() {
    return this.legalNameInput.getAttribute('value');
  }

  async setTaxpayerNumberInput(taxpayerNumber) {
    await this.taxpayerNumberInput.sendKeys(taxpayerNumber);
  }

  async getTaxpayerNumberInput() {
    return this.taxpayerNumberInput.getAttribute('value');
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
    await this.setLegalNameInput('legalName');
    expect(await this.getLegalNameInput()).to.match(/legalName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setTaxpayerNumberInput('43');
    expect(await this.getTaxpayerNumberInput()).to.match(/43/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDiscountInPercentsInput('5');
    expect(await this.getDiscountInPercentsInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCommissionInPercentsInput('5');
    expect(await this.getCommissionInPercentsInput()).to.eq('5');
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
