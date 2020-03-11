<template>
  <div class="MainScreenRingEchart" :class="styleType" v-if="isRender">
    <section>
      <RingEchart class="rEchart" :val="data.table[0].value" :total="data.table[1].value" :color="color" />
      <div class="rEchartVal" :style="{color:color[1]}">
        <b>{{data.chart.label}}</b>
        <h1>{{average}}%</h1>
      </div>
    </section>
    <section>
      <div class="info">
        <ul v-for="(item, i) in data.table" :key="i">
          <li>{{item.label}}</li>
          <li>{{item.value}}</li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import RingEchart from '@/components/charts/RingEchart.vue';
@Component({ components: { RingEchart } })
export default class MainScreenRingEchart extends Vue {
  /**
	 * 标题
	 */
  @Prop()
  private title !: string;
  /**
   * 样式
   */
  @Prop({
    default: () => 'a'
  })
  private styleType !: string;
  /**
   * 间距
   */
  @Prop({
    default: () => '40px'
  })
  private paddingLeft!: string;
  /**
   * 颜色，数组长度为2
   */
  @Prop()
  private color!: string[];
  /**
   * 表格
   */
  @Prop()
  private data!: Screen.ScreenData;
  private get isRender() {
    return (this.data.table && this.data.table.length >= 2 &&
      this.data.table[0].value && this.data.table[1].value && this.color && this.data.chart);
  }
  private get average() {
    if (!this.data.table) {
      return 0;
    }
    const average = Number(this.data.table[0].value) / Number(this.data.table[1].value) * 100;
    return this.data.chart && this.data.chart.value ? this.data.chart.value : Math.round(average);
  }
}
</script>
<style lang="less" scoped>
@huiColor: #dfdde0;
.MainScreenRingEchart {
	padding-bottom: 14px;
	> section {
		.rEchart,
		.rEchartVal {
			display: inline-block;
			vertical-align: top;
		}
		.rEchart {
			width: 90px;
			height: 90px;
			margin: 10px 35px 0 46px;
		}
		.rEchartVal {
			margin-top: 31px;
			h1 {
				margin: 0;
				font-size: 47px;
			}
		}
		&:last-child {
			width: 339px;
			padding: 0 0 0 19px;
			.info {
				ul {
					list-style: none;
					margin: 0 0 8px 0;
					padding: 0;
					background: @huiColor;
					border-radius: 25px;
					padding: 4px 10px;
					li {
						display: inline-block;
						font-size: 12px;
						&:first-child {
							width: 90%;
						}
						&:last-child {
							width: 10%;
							text-align: center;
							font-weight: bold;
							position: relative;
							right: 0;
						}
					}
				}
			}
		}
	}
	&.b {
		.rEchart {
			margin: 24px 0px 0 6px;
		}
		.rEchartVal {
			margin-top: 44px;
			margin-left: 37px;
		}
		section {
			&:last-child {
				width: 335px;
				padding: 0;
				margin: 0 -18px;
			}
		}
	}
}
</style>
