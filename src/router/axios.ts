import Config from '@/util/config';
import { Message } from 'element-ui';
import s from '@/store';
import { Loading } from 'element-ui';
let loadPage = {close: () => {
  return;
}};
// 添加一个请求拦截器
axios.interceptors.request.use((config: any) => {
    if(config.method!=='get') {
      loadPage = Loading.service({});
    }
    // Do something before request is sent
    const isToken = (config.data || {}).isToken === false;
    const token = store.get(Config.ACCESS_TOKEN);
    // 禁止带token的路径
    const urls = ['/api/auth/oauth/token'];
    const urlsI = urls.findIndex((value, index, arr) => config.url === value);
    if (token && !isToken && urlsI === -1) {
      // tslint:disable-next-line:no-string-literal
      config.headers['Authorization'] = 'Bearer ' + token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
  }, (error: any) => {
    // Do something with request error
    return Promise.reject(error);
  });

// 添加一个响应拦截器
axios.interceptors.response.use((response: any) => {
    // Do something with response data
    if(response.config.method!=='get') {
      loadPage.close();
    }
    return response;
  }, (error: any) => {
    loadPage.close();
    if (error.response.status === 401) {
      window.location.href = '/login';
      return;
    }
    // 判断token失效并重新登录
    if (error.response.status === 401 && localStorage.getItem(Config.REFRESH_TOKEN)) {
      s.dispatch('LoginByToken');
      return;
    }
    const errorMesArr: any = /.*:(.*)$/g.exec(error.response.data.msg) ?
                     /.*:(.*)$/g.exec(error.response.data.msg) : [];
    const errorMes = errorMesArr.length > 1 ? errorMesArr[1] : (error.response.data.msg as any);
    Message.error(`${error.response.status}-
    ${error.response.data.message ? error.response.data.message : errorMes}`);
    return Promise.reject(error);
});
//  检测是否token失效
const tokenInvalid = setInterval(() => {
  const token = store.get(Config.ACCESS_TOKEN);
  if(!token) {
    clearInterval(tokenInvalid);
    return;
  }
  s.dispatch('UserInfo');
  }, 600000);
export default axios;
