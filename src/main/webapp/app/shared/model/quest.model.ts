import { IThematic } from 'app/shared/model/thematic.model';
import { QuestComplexity } from 'app/shared/model/enumerations/quest-complexity.model';
import { FearLevel } from 'app/shared/model/enumerations/fear-level.model';
import { QuestType } from 'app/shared/model/enumerations/quest-type.model';

export interface IQuest {
  id?: number;
  slug?: string;
  title?: string;
  description?: any;
  playersMinCount?: number;
  playersMaxCount?: number;
  durationInMinutes?: number;
  complexity?: QuestComplexity;
  fearLevel?: FearLevel;
  type?: QuestType;
  locationAddress?: string;
  locationId?: number;
  companyTitle?: string;
  companyId?: number;
  thematics?: IThematic[];
}

export const defaultValue: Readonly<IQuest> = {};
