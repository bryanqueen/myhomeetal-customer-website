import { getCookie, hasCookie } from 'cookies-next';

import { constants } from '@utils/constants';

const authUtils = {
  checkAuthClient: () => hasCookie(constants.AUTH_TOKEN),
  getUserInfo: () => {
    const userCookie = getCookie(constants.USER_INFO);
    if (!userCookie) return {};

    try {
      const user = JSON.parse(decodeURIComponent(userCookie));
      return user;
    } catch (error) {
      console.error('Failed to parse user info from cookies:', error);
      return {};
    }
  },

};

export default authUtils;
