import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import SubscriberUpdatePage from './subscriber-update.page-object';

const expect = chai.expect;
export class SubscriberDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.subscriber.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-subscriber'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class SubscriberComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('subscriber-heading'));
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
    await navBarPage.getEntityPage('subscriber');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateSubscriber() {
    await this.createButton.click();
    return new SubscriberUpdatePage();
  }

  async deleteSubscriber() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const subscriberDeleteDialog = new SubscriberDeleteDialog();
    await waitUntilDisplayed(subscriberDeleteDialog.deleteModal);
    expect(await subscriberDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/greatEscapeAdminUiApp.subscriber.delete.question/);
    await subscriberDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(subscriberDeleteDialog.deleteModal);

    expect(await isVisible(subscriberDeleteDialog.deleteModal)).to.be.false;
  }
}
