import { BookingStatus } from 'app/shared/model/enumerations/booking-status.model';

export interface IBooking {
  id?: string;
  status?: BookingStatus;
  price?: number;
  discountInPercents?: number;
  commissionInPercents?: number;
  slotDateTimeLocal?: string;
  slotId?: string;
  questTitle?: string;
  questId?: string;
  playerPhone?: string;
  playerId?: string;
}

export const defaultValue: Readonly<IBooking> = {};
