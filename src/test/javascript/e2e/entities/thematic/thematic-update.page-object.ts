import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ThematicUpdatePage {
  pageTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.thematic.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  slugInput: ElementFinder = element(by.css('input#thematic-slug'));
  titleInput: ElementFinder = element(by.css('input#thematic-title'));

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
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
