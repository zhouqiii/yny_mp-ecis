<template>
  <div class="MainScreenLineEchart">
    <EChart :option="option" v-if="option"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import EChart from '@/components/charts/EChart.vue';
@Component({ components: { EChart } })
export default class MainScreenLineEchart extends Vue {
  @Prop()
  private data !: Screen.ScreenData;
  private color = ['#F8B28A', '#F97A83'];
  private get option() {
    const tableData: FormOption[] = this.data && this.data.table && this.data.table.length > 0 ? this.data.table : [];
    if (tableData.length === 0) {
      return true;
    }
    return {
      color: this.color,
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '5px',
        right: '15px',
        top: '10px',
        bottom: '10px',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: tableData.map((item) => item.label)// ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: tableData.map((item) => item.value),
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 7,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: this.color.map((item, i) => ({offset: i, color: item})),
            global: false // 缺省为 false
          }
        }
      }]
    };
  }
}
</script>
<style lang="less" scoped>
.MainScreenLineEchart {
  width: 100%;
}
</style>
