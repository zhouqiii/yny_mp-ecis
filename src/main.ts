import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUi from 'element-ui';
import Meta from 'vue-meta';
import Mpx from './util/filter';
import webSocket from './util/webSocket';
// import VueDND from 'awe-dnd';
import Grid from 'vue-js-grid';
import Print from 'vue-print-nb';
import 'element-ui/lib/theme-chalk/index.css';
import YiNuoUI from './util/YiNuoUI';
Vue.use(Grid as any);
Vue.use(Print as any);

Vue.use(ElementUi);
Vue.use(Meta);
Vue.use(Mpx);
Vue.use(webSocket);
Vue.use(YiNuoUI);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app');
