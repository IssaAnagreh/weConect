const port = 4000;
export const ENV = !__DEV__
  ? `http://${localhost}:${port}/api`
  : 'https://baseUrl.com/api';
