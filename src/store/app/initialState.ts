import {IUser, IError} from '@src/types';

export interface IAppState {
  hasInternet: boolean;
  user: IUser;
  token: string;
  loading: boolean;
  error: IError;
}
