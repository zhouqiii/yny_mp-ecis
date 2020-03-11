import Vue from 'vue';
import Router from 'vue-router';
import emergency from './emergency';
import Config from '@/util/config';
import storex from './../store';

Vue.use(Router);
const router =  new Router(({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/about',
      name: 'about',
      component: (r: any) => require(['../views/About.vue'], r),
    },
    {
      path: '/bedNo',
      name: 'bedNo',
      component: (r: any) => require(['../views/BedNo.vue'], r),
    },
    {
      path: '/screen',
      name: 'screen',
      component: (r: any) => require(['../views/Screen.vue'], r),
    },
    {
      path: '/screenCalled',
      name: 'screenCalled',
      component: (r: any) => require(['../views/ScreenCalled.vue'], r),
    },
    {
      path: '/bigScreen',
      name: 'bigScreen',
      component: (r: any) => require(['../views/bigScreen/BigScreen.vue'], r),
    },
    {
      path: '/bigScreen/consumables',
      name: 'bigScreen/consumables',
      component: (r: any) => require(['../views/bigScreen/Consumables.vue'], r),
    },
    {
      path: '/bigScreen/mainScreen',
      name: 'bigScreen/MainScreen',
      component: (r: any) => require(['../views/bigScreen/MainScreen.vue'], r),
    },
    {
      path: '/bigScreen/mainScreen2',
      name: 'bigScreen/MainScreen2',
      component: (r: any) => require(['../views/bigScreen/MainScreen2.vue'], r),
    },
    {
      path: '/bigScreen/EmergencyCall',
      name: 'bigScreen/EmergencyCall',
      component: (r: any) => require(['../views/bigScreen/EmergencyCall.vue'], r),
    },
    {
      path: '/login',
      name: 'login',
      component: (r: any) => require(['../views/Login.vue'], r),
    },
    emergency,
    {
      path: '/',
      name: 'index',
      component: (r: any) => require(['../views/Login.vue'], r),
    }
  ]
} as any));
window.objectInfo = {};
router.beforeEach((to: any, from: any, next: any) => {
  window.baseUrl = to;
  if (to.path === '/') {
    return next('/login');
  }
  const objectName: string = to.path.split('/')[1];
  // window.objectInfo = common.config.router.;
  if (objectName === 'login') {
    return next();
  } else {
    // token
    if ((!store.get(Config.ACCESS_TOKEN) || store.get(Config.ACCESS_TOKEN) === '')) {
      // return next('/login');
    }
  }
  // 获得字典表
  if ((!sessionStorage.getItem(Config.DICT)) || sessionStorage.getItem(Config.DICT) === '') {
    storex.dispatch('DictList').then(() => next()).catch(() => next('/login'));
    return;
  }
  next();
});
export default router;
