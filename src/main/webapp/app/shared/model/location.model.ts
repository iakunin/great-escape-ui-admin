import { IMetro } from 'app/shared/model/metro.model';

export interface ILocation {
  id?: number;
  address?: string;
  addressExplanation?: any;
  cityTitle?: string;
  cityId?: number;
  metros?: IMetro[];
}

export const defaultValue: Readonly<ILocation> = {};
