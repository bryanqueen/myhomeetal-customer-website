const constants = {
  APP_OWNER: 'Myhomeetal',
  APP_NAME: 'Myhomeetal Website',
  AUTH_TOKEN: 'AUTH_TOKEN',
  USER_INFO: 'USER_INFO',
  V1_BASE_API_URL: process.env.NEXT_PUBLIC_V1_BASE_API_URL,
};

const queryKeys = {
  ALL_PRODUCTS: 'getAllProducts',
  USER: 'getUserInformation',
};

export { constants, queryKeys };
