<template>
  <div class="i">
    你的界面
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class I extends Vue {
}
</script>
<style lang="less" scoped>
.i {
  height:calc(~"(100% - 95px)");
  width:calc(~"(100% - 270px)");
  position: absolute;
  left: 270px;
  top: 95px;
}
</style>
