export interface ICity {
  id?: string;
  slug?: string;
  title?: string;
  timezone?: string;
}

export const defaultValue: Readonly<ICity> = {};
