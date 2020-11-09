export interface ICompany {
  id?: string;
  slug?: string;
  title?: string;
  legalName?: string;
  taxpayerNumber?: string;
  discountInPercents?: number;
  commissionInPercents?: number;
}

export const defaultValue: Readonly<ICompany> = {};
