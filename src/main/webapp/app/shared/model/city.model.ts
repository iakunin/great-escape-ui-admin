export interface ICity {
  id?: number;
  slug?: string;
  title?: string;
  timezone?: string;
}

export const defaultValue: Readonly<ICity> = {};
