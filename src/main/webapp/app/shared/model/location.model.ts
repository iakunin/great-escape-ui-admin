import { IMetro } from 'app/shared/model/metro.model';

export interface ILocation {
  id?: string;
  address?: string;
  addressExplanation?: any;
  cityTitle?: string;
  cityId?: string;
  metros?: IMetro[];
}

export const defaultValue: Readonly<ILocation> = {};
