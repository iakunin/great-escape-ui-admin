import { QuestIntegrationType } from 'app/shared/model/enumerations/quest-integration-type.model';

export interface IQuestIntegrationSetting {
  id?: string;
  type?: QuestIntegrationType;
  settings?: any;
  questTitle?: string;
  questId?: string;
}

export const defaultValue: Readonly<IQuestIntegrationSetting> = {};
