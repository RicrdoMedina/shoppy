import { NotificationBarInterface } from '@core/features/types/';
import { NOTIFICATION_BAR_NONE } from '@core/features/constants/';

export interface HiddenNotificationBarState {
  kind: 'HiddenNotificationState';
  show: boolean;
  config: NotificationBarInterface;
}

export interface ShowNotificationBarState {
  kind: 'ShowNotificationState';
  show: boolean;
  config: NotificationBarInterface;
}

export type NotificationState =
  | ShowNotificationBarState
  | HiddenNotificationBarState;

export const NotificationInitialState: NotificationState = {
  kind: 'HiddenNotificationState',
  show: false,
  config: {
    message: '',
    type: NOTIFICATION_BAR_NONE
  }
};
