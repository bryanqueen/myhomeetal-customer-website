import { getCookie, hasCookie } from 'cookies-next';

import { constants } from '@utils/constants';

const authUtils = {
  checkAuthClient: () => hasCookie(constants.AUTH_TOKEN),
  getUserInfo: () => {
    const user = getCookie(constants.USER_INFO);
    return user ? JSON.parse(user) : {};
  },
};

export default authUtils;
