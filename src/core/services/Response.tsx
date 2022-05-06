// tslint:disable: no-any
// Libraries
import { AxiosError, AxiosResponse } from 'axios';
// Constants
import {
  FAILED_RESPONSE,
  SUCCESSFULL_RESPONSE,
  TOKEN_INVALID_RESPONSE,
  NOTIFICATION_BAR_ERROR,
  NOTIFICATION_BAR_WARNING,
  MESSAGE_STATUS_400,
  MESSAGE_STATUS_401,
  MESSAGE_STATUS_500
} from '@core/features/constants/';
// Utils
import { HistoryHandlerUtils } from '@core/utils/';
import { CookieHandlerUtils } from '@core/utils/';
import { NotificationBarBloc } from '@core/components/notification-bar/NotificationBarBloc';
import { ApiErrorsInterface } from '@core/features/types/';

type ignoreErrorProps = {
  endpoint: string;
  error: string[];
};

export default class Response {
  history: HistoryHandlerUtils;
  notificationBar: NotificationBarBloc;
  requestStatus: string;
  response: AxiosResponse;
  responseError: AxiosError;
  messageStatus400: string;
  messageStatus401: string;
  messageStatus500: string;
  ignoreError: ignoreErrorProps[];

  constructor({
    HistoryHandlerUtils,
    NotificationBarBloc
  }: {
    HistoryHandlerUtils: HistoryHandlerUtils;
    NotificationBarBloc: NotificationBarBloc;
  }) {
    this.messageStatus400 = MESSAGE_STATUS_400;
    this.messageStatus401 = MESSAGE_STATUS_401;
    this.messageStatus500 = MESSAGE_STATUS_500;
    this.history = HistoryHandlerUtils;
    this.notificationBar = NotificationBarBloc;
    this.ignoreError = [{ endpoint: 'signOut', error: ['401'] }];
  }

  setResponse(response: AxiosResponse) {
    this.response = response;
    this.requestStatus = SUCCESSFULL_RESPONSE;
    return this;
  }

  setErrorResponse(response: AxiosError) {
    this.responseError = response;
    this.requestStatus = FAILED_RESPONSE;
    return this;
  }

  getData(): any {
    if (this.requestStatus === FAILED_RESPONSE) {
      const data = this.responseError.response?.data;

      return data;
    }

    return this.response.data;
  }

  getStatus(): number {
    if (this.requestStatus === FAILED_RESPONSE) {
      const status = this.responseError.response?.status;

      return status ? status : 0;
    }

    return this.response.status;
  }

  statusIs200(): boolean {
    const status =
      this.requestStatus === FAILED_RESPONSE
        ? this.responseError.response?.status
        : this.response.status;

    const value = status ? status : 0;

    return value === 200;
  }

  statusIs201(): boolean {
    const status =
      this.requestStatus === FAILED_RESPONSE
        ? this.responseError.response?.status
        : this.response.status;

    const value = status ? status : 0;

    return value === 201;
  }

  statusIs400(): boolean {
    const status =
      this.requestStatus === FAILED_RESPONSE
        ? this.responseError.response?.status
        : this.response.status;

    const value = status ? status : 0;

    return value === 400;
  }

  statusIs401(): boolean {
    const status =
      this.requestStatus === FAILED_RESPONSE
        ? this.responseError.response?.status
        : this.response.status;

    const value = status ? status : 0;

    return value === 401;
  }

  statusIs404(): boolean {
    const status =
      this.requestStatus === FAILED_RESPONSE
        ? this.responseError.response?.status
        : this.response.status;

    const value = status ? status : 0;

    return value === 404;
  }

  statusIs500(): boolean {
    const status =
      this.requestStatus === FAILED_RESPONSE
        ? this.responseError.response?.status
        : this.response.status;

    const value = status ? status : 0;

    return value === 500;
  }

  handleBadRequest(): ApiErrorsInterface {
    const data = this.getData();

    const { field, message: messageServer } = data;
    const message = messageServer ? messageServer : MESSAGE_STATUS_400;
    const showMessage = field ? 'NONE' : 'ERROR';

    const response: ApiErrorsInterface = {
      showMessage,
      message,
      field
    };

    return response;
  }

  handleUnauthorized(): ApiErrorsInterface {
    const { message } = this.getData();
    const { config } = this.response;
    const endpoint = config.url;
    const ignoreError = this.ignoreError;
    let ignore = false;

    ignoreError.forEach(ignored => {
      if (!ignore) {
        if (endpoint?.includes(ignored.endpoint)) {
          ignore = true;
        }
      }
    });

    if (!ignore) {
      if (message === TOKEN_INVALID_RESPONSE) {
        CookieHandlerUtils.delete('token');

        this.notificationBar.showNotification({
          message,
          type: NOTIFICATION_BAR_WARNING
        });

        this.history.push('/');
      }

      this.notificationBar.showNotification({
        message: this.messageStatus401,
        type: NOTIFICATION_BAR_WARNING
      });
    }

    return {
      showMessage: 'NONE',
      message: '',
      field: ''
    };
  }

  handleInternalServer(): ApiErrorsInterface {
    this.notificationBar.showNotification({
      message: this.messageStatus500,
      type: NOTIFICATION_BAR_ERROR
    });

    return {
      showMessage: 'NONE',
      message: '',
      field: ''
    };
  }

  handleErrorResponse(err: AxiosError): ApiErrorsInterface {
    const response = this.setErrorResponse(err);

    switch (response.getStatus()) {
      case 400:
        const badRequest = response.handleBadRequest();
        return badRequest;
        break;

      case 401:
        const unauthorized = response.handleUnauthorized();
        return unauthorized;
        break;

      case 500:
        const internalServer = response.handleInternalServer();
        return internalServer;
        break;

      default:
        return { field: '', message: '', showMessage: 'NONE' };
        break;
    }
  }
}
