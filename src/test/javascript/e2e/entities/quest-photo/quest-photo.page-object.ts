import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import QuestPhotoUpdatePage from './quest-photo-update.page-object';

const expect = chai.expect;
export class QuestPhotoDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.questPhoto.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-questPhoto'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class QuestPhotoComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('quest-photo-heading'));
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
    await navBarPage.getEntityPage('quest-photo');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateQuestPhoto() {
    await this.createButton.click();
    return new QuestPhotoUpdatePage();
  }

  async deleteQuestPhoto() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const questPhotoDeleteDialog = new QuestPhotoDeleteDialog();
    await waitUntilDisplayed(questPhotoDeleteDialog.deleteModal);
    expect(await questPhotoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/greatEscapeAdminUiApp.questPhoto.delete.question/);
    await questPhotoDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(questPhotoDeleteDialog.deleteModal);

    expect(await isVisible(questPhotoDeleteDialog.deleteModal)).to.be.false;
  }
}
