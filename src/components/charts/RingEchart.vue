<template>
  <div class="RingEchart">
    <EChart :option="option"></EChart>
    <div class="echartTitle">{{val}}/{{total}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import EChart from '@/components/charts/EChart.vue';
@Component({components: {EChart}})
export default class RingEchart extends Vue {
  @Prop({
    default: () => ['#83bff6', '#188df0']
  })
  private color !: string[];
  @Prop({
    default: 100
  })
  private total !: number;
  @Prop()
  private val !: number;
  private option = {
    tooltip: {
      show: false
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['78%', '90%'],
        avoidLabelOverlap: false,
        hoverOffset: 2,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '12',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {value: this.val, itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              this.color.map((item, i) => ({offset: i, color: item}))
            )
          }}},
          {value: this.total - this.val, itemStyle: {
          normal: {
            color: '#eee'
          }}
          },
        ]
      }
    ]
  };
}
</script>
<style lang="less" scoped>
.RingEchart {
  position: relative;
  width: 100%;
  height: 100%;
  .echartTitle{
    position: absolute;
    width: 100%;
    text-align: center;
    top: 42%;
    font-size: 10px;
    font-family: monospace;
  }
}
</style>
