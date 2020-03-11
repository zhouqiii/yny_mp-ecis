<template>
  <div id="BottonScreen">
    <slot></slot>
    <div class="box-left-top"/>
    <div class="box-left-bottom"/>
    <div class="box-right-top"/>
    <div class="box-right-bottom"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class BottonScreen extends Vue {
}
</script>

<style lang="less" scoped>
#BottonScreen {
  display: inline-block;
  height: 19px;
  top: -2px;
  padding: 10px 20px;
  position: relative;
  &:hover{
    cursor: pointer;
    color: #ecb056;
    .box-left-top,
    .box-left-bottom,
    .box-right-top,
    .box-right-bottom {
      color: #ecb056;
    }
  }
  .box-left-top,
  .box-left-bottom,
  .box-right-top,
  .box-right-bottom {
    position: absolute;
    width: 5px;
    height: 5px;
    color: #ccc;
  }
  .box-left-top {
    left: 0px;
    top: 0px;
    border-left: 1px solid;
    border-top: 1px solid;
  }
  .box-left-bottom {
    left: 0px;
    bottom: 0px;
    border-left: 1px solid ;
    border-bottom: 1px solid ;
  }
  .box-right-top {
    right: 0px;
    top: 0px;
    border-right: 1px solid;
    border-top: 1px solid;
  }
  .box-right-bottom {
    right: 0px;
    bottom: 0px;
    border-right: 1px solid;
    border-bottom: 1px solid;
  }
}
</style>
