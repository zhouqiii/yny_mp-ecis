<template>
  <div id="BottonScreenup" class="BottonScreenup">
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
export default class BottonScreenup extends Vue {
}
</script>

<style lang="less" scoped>
#BottonScreenup {
  display: inline-block;
  top: -2px;
  padding: 10px 20px;
  position: relative;
  font-size: 12px;
  font-weight:bold;
  color:#ccc;
  background-color:rgba(51,52,219,.2);


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
    border-top: 1px solid;
  }
  .box-left-bottom {
    left: 0px;
    bottom: 0px;
    border-bottom: 1px solid ;
  }
  .box-right-top {
    right: 0px;
    top: 0px;
   
    border-top: 1px solid;
  }
  .box-right-bottom {
    right: 0px;
    bottom: 0px;
  
    border-bottom: 1px solid;
  }
}
</style>
