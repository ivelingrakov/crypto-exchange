import { notification } from 'antd';
import { NotificationType } from './types';

export const showNotification = (
  type: NotificationType,
  ...[message, description]: string[]
): void => notification[type]({ message, description });