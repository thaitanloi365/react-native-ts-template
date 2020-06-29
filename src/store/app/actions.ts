import * as Actions from './actionTypes';
import {IUser, IError} from '@src/types';

export const onSetInternet = (payload: boolean) => ({
  type: Actions.SET_INTERNET,
  payload,
});
export const onLogout = () => ({
  type: Actions.LOG_OUT,
});
export const onSetToken = (payload: string) => ({
  type: Actions.SET_TOKEN,
  payload,
});

export const onSetUserProfile = (payload: IUser) => ({
  type: Actions.SET_USER_PROFILE,
  payload,
});

export const onSetLoading = (payload: boolean) => ({
  type: Actions.SET_LOADING,
  payload,
});

export const onSetError = (payload: IError) => ({
  type: Actions.SET_ERROR,
  payload,
});
