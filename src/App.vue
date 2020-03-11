<template>
  <div id="app" :style="{height:winheight+'px'}">
    <Header v-if="isShowHeader" :title="clientName" :menus="menuList"/>
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Config from './util/config';

@Component({
  components: {
    Header
  },
  metaInfo: {
    title: '壹诺云医疗平台'
  }
})
export default class App extends Vue {
  public winheight = window.innerHeight;
  public menuList: any[] = [];
  public clientName = '';
  private isShowHeader = false;
  public mounted() {
    $(window).resize(() => {
      this.winheight = window.innerHeight;
    });
  }
  @Watch('$route.path')
  public watchPath(newVal: any) {
    this.isShowHeader = /emergency/g.test(newVal);
  }
  public async getMenuList() {
    const list: any[] = [];
    let menuList: any = sessionStorage.getItem(Config.SET_MENU_LIST);
    menuList = menuList ? JSON.parse(menuList) : (await this.$store.dispatch('MenuList'));
    const permissions: any = JSON.parse(localStorage.getItem(Config.ADMININFO) as string).data.permissions;
    menuList.forEach((item: any) => {
      for (const iterator of permissions) {
        if (iterator === item.code) {
          list.push(item);
          return;
        }
      }
    });
    this.menuList = list;
  }
  @Watch('isShowHeader')
  private watchIsShowHeader(newVal: any) {
    if (newVal) {
      this.setRole();
    }
  }
  private setRole() {
    this.$store.dispatch('RoleList').then(({data}: {data: {data: {records: any[]}}}) => {
      const role: any[] = [];
      JSON.parse(localStorage.getItem(Config.ADMININFO) as string).data.roles.forEach((item: any) => {
        data.data.records.forEach((element) => {
          if (element.roleId === item) {
            role.push(element.roleDesc);
          }
        });
      });
      this.clientName = role[0];
      this.getMenuList();
    });
  }
}
</script>


<style lang="less">
@import url('/css/element-ui/lib/theme-chalk/index.css');
@import url('/iconfont/iconfont.css');
@import url('/css/style.css');
@import url('/css/YiNuoUI.css');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
