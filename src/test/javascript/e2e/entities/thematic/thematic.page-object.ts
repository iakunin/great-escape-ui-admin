import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ThematicUpdatePage from './thematic-update.page-object';

const expect = chai.expect;
export class ThematicDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.thematic.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-thematic'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ThematicComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('thematic-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('thematic');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateThematic() {
    await this.createButton.click();
    return new ThematicUpdatePage();
  }

  async deleteThematic() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const thematicDeleteDialog = new ThematicDeleteDialog();
    await waitUntilDisplayed(thematicDeleteDialog.deleteModal);
    expect(await thematicDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/greatEscapeAdminUiApp.thematic.delete.question/);
    await thematicDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(thematicDeleteDialog.deleteModal);

    expect(await isVisible(thematicDeleteDialog.deleteModal)).to.be.false;
  }
}
