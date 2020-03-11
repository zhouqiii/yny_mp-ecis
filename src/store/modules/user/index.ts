import { encryption } from '@/util/util';
import { loginByUsername, logout, loginByToken } from '@/api/login';
import { adminInfo,updateUser } from '@/api/adminInfo';
import Config from '@/util/config';
import { userList, getSign } from '@/api/user';
const User = {
  state: {
    adminInfo: store.get(Config.ADMININFO) ? store.get(Config.ADMININFO) : '',
    [Config.USER_LIST]: sessionStorage.getItem(Config.USER_LIST) ?
    JSON.parse(sessionStorage.getItem(Config.USER_LIST) as string) : []
  },
  actions: {
    // 根据用户名登录
    LoginByUsername({ commit, dispatch }: { commit: any, dispatch: any }, userInfo: any) {
      userInfo.code = '1118';
      userInfo.randomStr = '42291546525816675';
      const user = encryption({
        data: userInfo,
        key: 'pigxpigxpigxpigx',
        param: ['password'],
        type: 'password'
      });
      return new Promise((resolve, reject) => {
        loginByUsername(user.username, user.password, user.code, user.randomStr)
          .then((response: any) => {
            const data = response.data;
            commit('SET_ACCESS_TOKEN', data.access_token);
            commit('SET_REFRESH_TOKEN', data.refresh_token);
            dispatch('UserInfo').then((d: any) => resolve(d));
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    },
    // 获得用户信息
    UserInfo({ commit }: { commit: any }) {
      return new Promise((resolve, reject) => {
        adminInfo().then((response: any) => {
          const data = response.data;
          commit('SET_ADMIN_INFO', data);
          resolve(data);
        }).catch((error: any) => {
          reject(error);
        });
      });
    },
    // 用户退出
    Logout({ commit }: { commit: any }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_ACCESS_TOKEN', null);
          commit('SET_REFRESH_TOKEN', null);
          commit('SET_ADMIN_INFO', null);
          localStorage.clear();
          sessionStorage.clear();
          resolve();
        }).catch((error: any) => {
          reject(error);
        });
      });
    },
    // token登录
    LoginByToken({ commit }: { commit: any }) {
      return new Promise((resolve, reject) => {
        loginByToken().then((response: any) => {
          const data = response.data;
          commit('SET_ACCESS_TOKEN', data.access_token);
          commit('SET_REFRESH_TOKEN', data.refresh_token);
          resolve();
        }).catch((error: any) => {
          reject(error);
        });
      });
    },
   UserList({ commit, state }: { commit: any, state: any }) {
      return new Promise((resolve, reject) => {
        if (state[Config.USER_LIST].length > 0) {
          return resolve(state[Config.USER_LIST]);
        }
        userList().then(({data}: any) => {
          commit(`SET_${Config.USER_LIST}`, data.data.records);
          resolve(data.data.records);
        }).catch((error: any) => {
          reject(error);
        });
      });
    },
    UpdateUser({ commit, state }: { commit: any, state: any },data: any) {
      updateUser(data).then((d: any) => {
      // console.log(d);
      });
    },
    GetSign({ commit }: { commit: any }, id: number) {
      return getSign(id);
  }
  },
  mutations: {
    SET_ACCESS_TOKEN: (state: any, accessToken: any) => {
      if (accessToken === null) {
        return store.remove(Config.ACCESS_TOKEN);
      }
      store.set(Config.ACCESS_TOKEN, accessToken);
    },
    SET_REFRESH_TOKEN: (state: any, rfToken: any) => {
      if (rfToken === null) {
        return store.remove(Config.REFRESH_TOKEN);
      }
      store.set(Config.REFRESH_TOKEN, rfToken);
    },
    SET_ADMIN_INFO: (state: any, data: any) => {
      if (data === null) {
        return store.remove(Config.ADMININFO);
      }
      store.set(Config.ADMININFO, data);
    },
    [`SET_${Config.USER_LIST}`]: (state: any, data: any) => {
      state[Config.USER_LIST] = data;
      sessionStorage.setItem(Config.USER_LIST, JSON.stringify(data));
    }
  },
  getters: {
    GET_ADMIN_INFO: (state: any) => {
      return state.adminInfo;
    }
  }
};
export default User;
