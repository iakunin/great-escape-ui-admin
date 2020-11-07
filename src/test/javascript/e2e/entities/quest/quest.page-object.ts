import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import QuestUpdatePage from './quest-update.page-object';

const expect = chai.expect;
export class QuestDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.quest.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-quest'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class QuestComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('quest-heading'));
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
    await navBarPage.getEntityPage('quest');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateQuest() {
    await this.createButton.click();
    return new QuestUpdatePage();
  }

  async deleteQuest() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const questDeleteDialog = new QuestDeleteDialog();
    await waitUntilDisplayed(questDeleteDialog.deleteModal);
    expect(await questDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/greatEscapeAdminUiApp.quest.delete.question/);
    await questDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(questDeleteDialog.deleteModal);

    expect(await isVisible(questDeleteDialog.deleteModal)).to.be.false;
  }
}
