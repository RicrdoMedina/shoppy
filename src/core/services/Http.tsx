// tslint:disable: no-any
// Libraries
import axios, { AxiosInstance } from 'axios';
// Utils
import { config } from '@core/features/config';
import Response from './Response';

const API_URL = config.apiUrl;

export default class Http {
  http: AxiosInstance;
  response: Response;

  constructor({ Response }: { Response: Response }) {
    this.http = axios.create({
      baseURL: API_URL,
      // withCredentials: true,
      // timeout: 3000000,
      headers: {
        common: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    });

    this.response = Response;
  }

  get(url: string): Promise<Response> {
    const response = this.response;

    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .then(res => {
          response.setResponse(res);
          resolve(response);
        })
        .catch(err => {
          const error = response.handleErrorResponse(err);
          reject(error);
        });
    });
  }

  post(url: string, data?: any, auth?: any): Promise<Response> {
    const response = this.response;

    return new Promise((resolve, reject) => {
      this.http
        .post(url, data, auth)
        .then(res => {
          response.setResponse(res);
          resolve(response);
        })
        .catch(err => {
          const error = response.handleErrorResponse(err);
          reject(error);
        });
    });
  }

  patch(url: string, data: any): Promise<Response> {
    const response = this.response;

    return new Promise((resolve, reject) => {
      this.http
        .patch(url, data)
        .then(res => {
          response.setResponse(res);
          resolve(response);
        })
        .catch(err => {
          const error = response.handleErrorResponse(err);
          reject(error);
        });
    });
  }

  put(url: string, data: any): Promise<Response> {
    const response = this.response;

    return new Promise((resolve, reject) => {
      this.http
        .put(url, data)
        .then(res => {
          response.setResponse(res);
          resolve(response);
        })
        .catch(err => {
          const error = response.handleErrorResponse(err);
          reject(error);
        });
    });
  }

  delete(url: string): Promise<Response> {
    const response = this.response;

    return new Promise((resolve, reject) => {
      this.http
        .delete(url)
        .then(res => {
          response.setResponse(res);
          resolve(response);
        })
        .catch(err => {
          const error = response.handleErrorResponse(err);
          reject(error);
        });
    });
  }
}
