<template>
  <div id="mainScreenBox">
    <h2>{{title}}</h2>
    <section>
      <slot></slot>
    </section>
    <div class="box-left-top"/>
    <div class="box-left-bottom"/>
    <div class="box-right-top"/>
    <div class="box-right-bottom"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class MainScreenBox extends Vue {
  @Prop()
  public title!: string;
}
</script>

<style lang="less" scoped>
#mainScreenBox {
  height: calc(100% - 12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 5px;
  h2{
    margin: 0px;
    padding: 3px 0 10px 0;
    color: #fff;
    text-align: center;
    background: url(/img/tupian.png) center 0 no-repeat;
  }
  section {
    height: calc(100% - 35px);
  }
  .box-left-top,.box-left-bottom,.box-right-top,.box-right-bottom{
    position: absolute;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.2);
  }
  .box-left-top{
    left:3px;
    top:-2px;
  }
  .box-left-bottom{
    left:3px;
    bottom:8px;
  }
  .box-right-top{
    right:3px;
    top:-2px;
  }
  .box-right-bottom{
    right:3px;
    bottom:8px;
  }
}
</style>
