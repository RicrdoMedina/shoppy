export interface ApiErrorsInterface {
  showMessage: 'NONE' | 'ERROR' | 'SUCCESS';
  message: string;
  field: string;
}
