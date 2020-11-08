import { ILocation } from 'app/shared/model/location.model';

export interface IMetro {
  id?: string;
  slug?: string;
  title?: string;
  locations?: ILocation[];
}

export const defaultValue: Readonly<IMetro> = {};
