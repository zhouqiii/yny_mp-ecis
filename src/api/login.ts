/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */
import request from '@/router/axios';

export const loginByUsername = (username: string, password: string, code: string, randomStr: string) => {
  const grantType = 'password';
  const scope = 'server';
  return request({
    url: '/api/auth/oauth/token',
    headers: {
      'TENANT_ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: { username, password, randomStr, code, grant_type: grantType, scope }
  });
};

export const loginByToken = () => {
  return request({
    url: '/api/auth/oauth/token',
    headers: {
      'TENANT_ID': '1',
      'Authorization': 'Basic cGlnOnBpZw=='
    },
    method: 'post',
    params: { grant_type: 'refresh_token', refresh_token: store.get('refresh_token') }
  });
};

// export const loginByMobile = (mobile: string, code: string) => {
//   let grant_type = 'mobile';
//   return request({
//     url: '/auth/mobile/token/sms',
//     headers: {
//       'TENANT_ID': '1',
//       'Authorization': 'Basic cGlnOnBpZw=='
//     },
//     method: 'post',
//     params: { mobile: 'SMS@' + mobile, code, grant_type }
//   })
// }

// export const loginBySocial = (state: string, code: string) => {
//   const grantType = 'mobile';
//   return request({
//     url: '/auth/mobile/token/social',
//     headers: {
//       TENANT_ID: '1',
//       Authorization: 'Basic cGlnOnBpZw=='
//     },
//     method: 'post',
//     params: { mobile: state + '@' + code, grantType }
//   })
// };

// export const getUserInfo = () => {
//   return request({
//     url: '/admin/user/info',
//     method: 'get'
//   })
// };

export const logout = () => {
  return request({
    url: '/api/auth/token/logout',
    method: 'delete'
  });
};
