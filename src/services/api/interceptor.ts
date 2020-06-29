import {API_STATUS_CODE_LOG_OUT} from '@src/config';

export interface IResponseBase<T> {
  data?: T;
}

export interface IPaginationResponseBase<T> {
  has_next: boolean;
  has_prev: boolean;
  next_page: number;
  current_page: number;
  prev_page: number;
  records: Array<T>;
  total_record: number;
  total_page: number;
}

const _onPushLogout = async () => {};

export const handleResponseAxios = (
  res: any,
  header?: any,
): IResponseBase<any> | void | IPaginationResponseBase<any> => {
  if (API_STATUS_CODE_LOG_OUT.includes(res.data.code) && header.token) {
    _onPushLogout();
  } else {
    if (res.data) {
      return res.data;
    }
    return responseDefault;
  }
};
export const handleErrorAxios = (error: AxiosError): ResponseBase<any> => {
  if (error) {
    if (error.code === 'ECONNABORTED') {
      // timeout
      return HandleErrorApi(0);
    }
    if (error.response) {
      return HandleErrorApi(error.response.status);
    } else {
      return HandleErrorApi(ERROR_NETWORK_CODE);
    }
  } else {
    return HandleErrorApi(ERROR_NETWORK_CODE);
  }
};
