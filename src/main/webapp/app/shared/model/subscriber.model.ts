export interface ISubscriber {
  id?: number;
  name?: string;
  email?: string;
}

export const defaultValue: Readonly<ISubscriber> = {};
