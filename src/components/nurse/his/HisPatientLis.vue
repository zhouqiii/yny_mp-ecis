<template>
  <div class="HisPatientLis">
    <div class="box">
      <div class="tool">
      </div>
      <el-table :data="tableData" border style="width: 100%" :height="tableHeight">
        <!-- <el-table-column fixed prop="testNo" label="申请序号"/> -->
        <!-- <el-table-column prop="itemNo" label="项目序号"/> -->
        <!-- <el-table-column prop="printOrder" label="打印序号"/> -->
        <el-table-column prop="reportItemName" label="报告项目名称"/>
        <el-table-column prop="reportItemCode" label="报告项目代码"/>
        <el-table-column prop="result" label="检验结果值"/>
        <el-table-column prop="units" label="检验结果单位"/>
        <!-- <el-table-column prop="abnormalIndicator" label="结果正常标志"/> -->
        <!-- <el-table-column prop="instrumentId" label="仪器编号"/> -->
        <!-- <el-table-column prop="resultDateTime" label="检验日期及时间"/> -->
        <el-table-column prop="refRange" label="参考值范围"/>
        <!-- <el-table-column prop="reportItemName2" label="报告结果项目2名称"/>
        <el-table-column prop="reportItemCode2" label="检验报告项目2代码"/>
        <el-table-column prop="lowerLimit" label="下限"/>
        <el-table-column prop="upperLimit" label="上限"/> -->
      </el-table>
    </div>
  </div>
</template>

<script lang = 'ts'>
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
@Component
export default class HisPatientLis extends Vue {
  @Prop()
  private rowData!: any;
  private spacingHeight = 200;
  private tableHeight = window.innerHeight - this.spacingHeight;
  private tableData = [];
  private onresize() {
      this.tableHeight = window.innerHeight - this.spacingHeight;
  }
  private mounted() {
    $(window).resize(this.onresize);
  }
  private async getData(testNo: string) {
      if (!testNo) {
        return;
      }
      const resData = await this.$store.dispatch('HisPatientLisGet', {testNo});
      this.tableData = resData && resData.data.data ? resData.data.data : [];
  }
  @Watch('rowData')
  private watchRowData(newVal: any) {
    this.getData(newVal.testNo);
  }
}
</script>
<style lang="less" scoped>
.HisPatientLis {
  .box{
    padding: 0 10px;
  }
  .tool{
    padding: 23px 10px 0 10px;
  }
}
</style>

