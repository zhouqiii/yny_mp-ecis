<template>
  <div class="Header">
    <div class="header-log">
      <i class="iconfont icon-logo"></i>
      <span>壹诺云</span>
      <span>急诊信息系统</span>
      <span class="header-log-1">ECIS</span>
      <span>-{{title}}</span>
    </div>
    <div class="header-menu">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        background-color="#0071bc"
        text-color="#f2f2f2"
        active-text-color="#ffd04b"
      >
        <template v-for="(item,i) in menus">
          <el-menu-item
            :index="item.path ? item.path : (''+i)"
            :key="i"
            v-if="i < 6"
          >{{item.name}}</el-menu-item>
        </template>
        <el-submenu index="110">
           <template slot="title"><i class="el-icon-menu"></i></template>
          <template v-for="(item,i) in menus">
            <el-menu-item
              :index="item.path ? item.path : (''+i)"
              :key="i"
              v-if="i >= 6"
            >{{item.name}}</el-menu-item>
          </template>
        </el-submenu>
        <el-submenu index="111">
          <template slot="title">{{userInfo.data.sysUser.username}}</template>
          <el-menu-item index="/emergency/changeMessage">修改信息</el-menu-item>
          <el-menu-item
            index="#"
            @click="logout"
          >退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Config from '@/util/config';
interface Menu {
  name: string;
  url: string;
}
@Component({})
export default class Header extends Vue {
  @Prop()
  public title!: string;
  @Prop()
  public menus!: Menu[];
  public activeIndex: string = window.baseUrl.path;
  public handleSelect(key: string, keyPath: string) {
    if (key === '110') {
      return;
    }
    this.$router.push(key);
  }
  public logout() {
    this.$confirm('是否退出用户', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$store.dispatch('Logout').then(() => {
        if (window.__refreshTokenTimeout__) {
          clearInterval(window.__refreshTokenTimeout__);
          window.__refreshTokenTimeout__ = undefined;
        }
        this.$router.push('/login');
        this.$message.success('退出成功');
      });
    }).catch(() => {
      this.$message.info('取消退出');
    });
  }
  get userInfo() {
    return store.get(Config.ADMININFO);
  }
}
</script>

<style lang="less">
.Header {
  .el-submenu__title {
    padding: 0px 10px;
    i {
      color: #f2f2f2;
    }
  }
  .el-menu-item {
    padding: 0px 10px;
  }
  .el-menu {
    float: right;
  }
}
</style>
<style lang="less" scoped>
.Header {
  background-color: #0071bc;
  overflow: hidden;
  width: 100%;
  height: 60px;
  .header-log {
    width: 333px;
    height: 100%;
    text-align: left;
    margin-left: 10px;
    line-height: 60px;
    font-weight: bold;
    color: white;
    font-size: 18px;
    float: left;
    .header-log-1 {
      font-weight: normal;
      color: rgb(255, 208, 75);
    }
    .icon-logo{
      font-size:30px;
      padding-right:10px;
      color: #c30d23;
      vertical-align: middle;
    }
  }
  .header-menu {
    width: calc(100% - 345px);
    height: 60px;
    float: left;
  }
}
</style>



