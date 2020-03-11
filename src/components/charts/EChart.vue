<template>
    <div class="EChart">
        <div :id="id" class="EChartBox" style="width: 100%;height:100%;"/>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component
export default class EChart extends Vue {
    @Prop()
    private option !: any;
    private id = 'c' + Date.now() + Math.round(Math.random() * 10000);
    private initEchart() {
        common.getScript(common.config.tempScript.ECHARTS, () => {
            // 基于准备好的dom，初始化echarts实例
            const myChart = echarts.init(document.getElementById(this.id));
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(this.option);
            $(window).resize(() => {
                setTimeout(() => myChart.resize(), 500);
            });
        });
    }
    private mounted() {
        this.initEchart();
    }
}
</script>
<style lang="less" scoped>
.EChart{
    color: #fff;
    position: relative;
    height: 100%;
    .EChartBox{
        position: absolute;
    }
}
</style>
