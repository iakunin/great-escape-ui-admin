import { Moment } from 'moment';

export interface ISlot {
  id?: number;
  dateTimeLocal?: string;
  dateTimeWithTimeZone?: string;
  isAvailable?: boolean;
  price?: number;
  discountInPercents?: number;
  commissionInPercents?: number;
  externalId?: string;
  externalState?: any;
  questTitle?: string;
  questId?: number;
}

export const defaultValue: Readonly<ISlot> = {
  isAvailable: false,
};
