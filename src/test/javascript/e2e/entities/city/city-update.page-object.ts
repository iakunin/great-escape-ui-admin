import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CityUpdatePage {
  pageTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.city.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  slugInput: ElementFinder = element(by.css('input#city-slug'));
  titleInput: ElementFinder = element(by.css('input#city-title'));
  timezoneInput: ElementFinder = element(by.css('input#city-timezone'));

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

  async setTimezoneInput(timezone) {
    await this.timezoneInput.sendKeys(timezone);
  }

  async getTimezoneInput() {
    return this.timezoneInput.getAttribute('value');
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
    await this.setTimezoneInput('timezone');
    expect(await this.getTimezoneInput()).to.match(/timezone/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
