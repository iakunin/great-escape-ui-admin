import { IQuest } from 'app/shared/model/quest.model';

export interface IThematic {
  id?: string;
  slug?: string;
  title?: string;
  quests?: IQuest[];
}

export const defaultValue: Readonly<IThematic> = {};
