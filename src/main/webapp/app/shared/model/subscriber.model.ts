export interface ISubscriber {
  id?: string;
  name?: string;
  email?: string;
}

export const defaultValue: Readonly<ISubscriber> = {};
