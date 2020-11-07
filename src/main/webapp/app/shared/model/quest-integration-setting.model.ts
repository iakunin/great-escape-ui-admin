import { QuestIntegrationType } from 'app/shared/model/enumerations/quest-integration-type.model';

export interface IQuestIntegrationSetting {
  id?: number;
  type?: QuestIntegrationType;
  settings?: any;
  questTitle?: string;
  questId?: number;
}

export const defaultValue: Readonly<IQuestIntegrationSetting> = {};
