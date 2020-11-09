import { Moment } from 'moment';

export interface ISlot {
  id?: string;
  dateTimeLocal?: string;
  dateTimeWithTimeZone?: string;
  isAvailable?: boolean;
  price?: number;
  discountInPercents?: number;
  commissionInPercents?: number;
  externalId?: string;
  externalState?: any;
  questTitle?: string;
  questId?: string;
}

export const defaultValue: Readonly<ISlot> = {
  isAvailable: false,
};
