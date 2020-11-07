import { BookingStatus } from 'app/shared/model/enumerations/booking-status.model';

export interface IBooking {
  id?: number;
  status?: BookingStatus;
  price?: number;
  discountInPercents?: number;
  commissionInPercents?: number;
  slotDateTimeLocal?: string;
  slotId?: number;
  questTitle?: string;
  questId?: number;
  playerPhone?: string;
  playerId?: number;
}

export const defaultValue: Readonly<IBooking> = {};
