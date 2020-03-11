<template>
  <div class="HideMenu" :class="hideMenuHide">
    <div class="menuBack animated" :class="isShow ? 'fadeIn' : 'fadeOut'" v-if="hideMenuHide===''">
      <div class="menuBox animated" :class="isShow ? 'bounceInLeft' : 'bounceOutLeft'">
        <header>
          <h1>{{title}}</h1>
          <div class="tools">

            <slot name="tools"/>
            <el-tooltip class="item" effect="dark" content="关闭" placement="bottom-start">
              <el-button icon="el-icon-close" circle size="mini" @click="onClose"></el-button>
            </el-tooltip>
          </div>
          <div class="searchGroup">
            <slot name="searchGroup"/>
          </div>
        </header>
        <section>
          <slot name="section"/>
        </section>
      </div>
    </div>
    <div class="inBtn" @click="onOpen"  v-if="hideMenuHide==='hide' && isHidetools">{{title}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component
export default class HideMenu extends Vue {
  @Prop()
  public title !: string;
  @Prop({
    default: false
  })
  public isHidetools !: string;
  public isShow = true;
  public hideMenuHide = '';
  public hideMenuHeight = window.innerHeight - 118;
  public soso = '';
  public onClose() {
    this.isShow = false;
    setTimeout(() => this.hideMenuHide = 'hide', 300);
  }
  public onOpen() {
    this.isShow = true;
    this.hideMenuHide = '';
  }
}
</script>
<style lang="less" scoped>
.HideMenu {
  position:absolute;
  width: 100%;
  height: calc(~'100% - 60px');
  top: 60px;
  z-index: 1;
  &.hide{
    width: 20px;
  }
  .menuBack{
    background: rgba(0,0,0,.3);
    height: 100%;
    .menuBox{
      width: 600px;
      background: #eee;
      height: 100%;
      position: relative;
      left: 3px;
      header{
        padding: 10px;
        overflow: hidden;
        h1,.tools{
          display: inline-block;
        }
        .tools{
          width: calc(~'100% - 85px');
          text-align: right;
          float: right;
        }
      }
      section{
        padding: 0 10px 10px 10px;
      }
      h1,ul{
        margin: 0;
        padding: 0;
      }
      ul{
        list-style: none;
      }
    }
  }
  .inBtn{
    width:20px;
    background-color:#0071bc;
    border-radius:0 10px 10px 0;
    cursor: pointer;
    position: relative;
    top: calc(~'50% - 57px');
    left: 3px;
    color: #fff;
  }
}
</style>


