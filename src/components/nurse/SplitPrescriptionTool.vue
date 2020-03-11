<template>
  <div class="SplitPrescriptionTool">
    <el-button type="success" plain @click="onClick(i)" v-for="(item,i) in list" :key="i">{{item}}</el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class SplitPrescriptionTool extends Vue {
  @Prop()
  public list!: string[];
  @Prop()
  public scope !: any[];
  public onClick(i: any) {
    this.$emit('click', {index: i, scope: this.scope});
  }
}
</script>
<style lang="less" scoped>
  .SplitPrescriptionTool{
    position: absolute;
    display: inline-block;
    right: 0px;
  }
</style>


