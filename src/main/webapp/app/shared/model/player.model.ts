import { Moment } from 'moment';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IPlayer {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  birthday?: string;
  gender?: Gender;
  subscriptionAllowed?: boolean;
  internalUserLogin?: string;
  internalUserId?: string;
  companyTitle?: string;
  companyId?: string;
}

export const defaultValue: Readonly<IPlayer> = {
  subscriptionAllowed: false,
};
