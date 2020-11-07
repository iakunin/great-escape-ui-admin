import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import SlotUpdatePage from './slot-update.page-object';

const expect = chai.expect;
export class SlotDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.slot.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-slot'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class SlotComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('slot-heading'));
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
    await navBarPage.getEntityPage('slot');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateSlot() {
    await this.createButton.click();
    return new SlotUpdatePage();
  }

  async deleteSlot() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const slotDeleteDialog = new SlotDeleteDialog();
    await waitUntilDisplayed(slotDeleteDialog.deleteModal);
    expect(await slotDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/greatEscapeAdminUiApp.slot.delete.question/);
    await slotDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(slotDeleteDialog.deleteModal);

    expect(await isVisible(slotDeleteDialog.deleteModal)).to.be.false;
  }
}
