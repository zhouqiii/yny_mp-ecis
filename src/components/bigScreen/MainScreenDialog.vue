<template>
  <div class="MainScreenDialog">
    <header :style="{paddingLeft,paddingRight:paddingLeft}">
      <h1>{{title}}</h1>
    </header>
    <el-container :style="{paddingLeft,paddingRight:paddingLeft}">
      <slot></slot>
    </el-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class MainScreenDialog extends Vue {
  @Prop()
  private title !: string;
  @Prop({
    default: () => '40px'
  })
  private paddingLeft!: string;
}
</script>
<style lang="less" scoped>
.MainScreenDialog {
	// background: #fff;
	border-radius: 5px;
	box-shadow: 0px 0px 5px #eee;
	header {
		padding: 19px 40px 0 40px;
		h1 {
			font-size: 15px;
			margin: 0;
			padding-bottom: 7px;
			border-bottom: 1px solid #ccc;
    }
  }
  .el-container{
    height: 226px;
  }
}
</style>
