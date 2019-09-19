import { APP_NAME } from '../config/globals';

export const currentUnixTime = () => Math.round(new Date().getTime() / 1000);

export const getAppName = () => {
  if (process.env.NODE_ENV === 'development') {
    return `${APP_NAME}-dev-v1`;
  }
  return APP_NAME;
};
