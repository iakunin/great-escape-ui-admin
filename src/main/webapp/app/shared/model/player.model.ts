import { Moment } from 'moment';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IPlayer {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  birthday?: string;
  gender?: Gender;
  subscriptionAllowed?: boolean;
  internalUserLogin?: string;
  internalUserId?: number;
  companyTitle?: string;
  companyId?: number;
}

export const defaultValue: Readonly<IPlayer> = {
  subscriptionAllowed: false,
};
