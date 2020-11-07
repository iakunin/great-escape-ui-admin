import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import QuestIntegrationSettingUpdatePage from './quest-integration-setting-update.page-object';

const expect = chai.expect;
export class QuestIntegrationSettingDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('greatEscapeAdminUiApp.questIntegrationSetting.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-questIntegrationSetting'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class QuestIntegrationSettingComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('quest-integration-setting-heading'));
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
    await navBarPage.getEntityPage('quest-integration-setting');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateQuestIntegrationSetting() {
    await this.createButton.click();
    return new QuestIntegrationSettingUpdatePage();
  }

  async deleteQuestIntegrationSetting() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const questIntegrationSettingDeleteDialog = new QuestIntegrationSettingDeleteDialog();
    await waitUntilDisplayed(questIntegrationSettingDeleteDialog.deleteModal);
    expect(await questIntegrationSettingDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /greatEscapeAdminUiApp.questIntegrationSetting.delete.question/
    );
    await questIntegrationSettingDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(questIntegrationSettingDeleteDialog.deleteModal);

    expect(await isVisible(questIntegrationSettingDeleteDialog.deleteModal)).to.be.false;
  }
}
