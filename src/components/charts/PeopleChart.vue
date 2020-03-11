<template>
  <div class="PeopleChart">
    <h3>{{lable}}</h3>
    <div>
      <i v-for="(item,i) in ['','','','','','','','','','']" class="icon iconfont icon-dengluyonghuming" :class="{'show':i<selectedVal}" :key="i" :style="{color:color}" />
    </div>
    <div :style="{color:color}">{{value}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class PeopleChart extends Vue {
  @Prop()
  private lable!: string;
  @Prop()
  private value!: number;
  @Prop()
  private maxValue!: number;
  @Prop()
  private color!: number;
  private get selectedVal(): number {
    return this.value / this.maxValue * 10;
  }
}
</script>
<style lang="less" scoped>
.PeopleChart {
	height: 30px;
	line-height: 30px;
	margin: 0 20px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.6);
	> h3 {
		margin: 0;
		width: 20%;
		color: #fff;
	}
	> div {
		width: 60%;
		i {
			color: #57ccf1;
			opacity: 0.6;
			&.show {
				opacity: 1;
			}
		}
		&:last-child {
			width: 20%;
			text-align: right;
			color: #57ccf1;
		}
	}
	> h3,
	div {
		display: inline-block;
	}
}
</style>
