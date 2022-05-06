import {
  NotificationInitialState,
  NotificationState
} from './NotificationBarState';
import { NOTIFICATION_BAR_NONE } from '@core/features/constants/';

import { Bloc } from '@core/bloc';
import { NotificationBarInterface } from '@core/features/types/';

export class NotificationBarBloc extends Bloc<NotificationState> {
  constructor() {
    super(NotificationInitialState);
  }

  getModalState() {
    const state = this.getState();
    return state;
  }

  hiddenNotification() {
    this.changeState({
      kind: 'HiddenNotificationState',
      show: false,
      config: {
        message: '',
        type: NOTIFICATION_BAR_NONE
      }
    });
  }

  showNotification(config: NotificationBarInterface) {
    this.changeState({
      kind: 'ShowNotificationState',
      config,
      show: true
    });
  }
}
