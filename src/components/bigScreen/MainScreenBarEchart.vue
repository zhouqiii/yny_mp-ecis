<template>
  <div class="MainScreenBarEchart">
    <EChart :option="option1" v-if="option1"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import EChart from '@/components/charts/EChart.vue';
@Component({ components: { EChart } })
export default class MainScreenBarEchart extends Vue {
  @Prop()
  private data!: Screen.ScreenData;
  private get option1() {
    const tableDate = this.data && this.data.table && this.data.table.length === 5 ? this.data.table : [];
    if (tableDate.length === 0) {
      return true;
    }
    return {
      color: ['#A39AFA', '#F8B38A'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '5px',
        right: '15px',
        top: '10px',
        bottom: '10px',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: tableDate.map((item: FormOption) => item.label),
      },
      series: [
        {
          type: 'bar',
          data: [tableDate[0].value, null, tableDate[2].value, null, tableDate[4].value],
          silent: true,
          barWidth: 20,
          barGap: '-100%',
        },
        {
          type: 'bar',
          barWidth: 20,
          data: [null, tableDate[1].value, null, tableDate[3].value, null]
        }
      ]
    };
  }
}
</script>
<style lang="less" scoped>
.MainScreenBarEchart {
	width: 100%;
}
</style>
