<template>
  <div class="HisPatientAnalysis">
    <div class="box">
      <div class="tool">
      </div>
      <el-table :data="tableData" border style="width: 100%" :height="tableHeight"
      highlight-current-row @current-change="handleCurrentChange" ref="singleTable">
        <!-- <el-table-column fixed prop="testNo" label="申请序号"/> -->
        <!-- <el-table-column prop="priorityIndicator" label="优先标志"/> -->
        <!-- <el-table-column prop="patientId" label="病人标识号"/> -->
        <!-- <el-table-column prop="visitId" label="本次住院标识"/> -->
        <!-- <el-table-column prop="workingId" label="工作单号"/> -->
        <!-- <el-table-column prop="executeDate" label="执行日期"/> -->
        <el-table-column prop="name" label="姓名"/>
        <!-- <el-table-column prop="namePhonetic" label="姓名拼音"/> -->
        <!-- <el-table-column prop="chargeType" label="费别"/> -->
        <el-table-column prop="sex" label="性别"/>
        <el-table-column label="年龄">
          <template slot-scope="scope">
            {{parseInt(scope.row.age)}}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="testCause" label="检验目的"/> -->
        <!-- <el-table-column prop="relevantClinicDiag" label="临床诊断"/> -->
        <!-- <el-table-column prop="specimen" label="标本"/> -->
        <!-- <el-table-column prop="notesForSpcm" label="标本说明"/> -->
        <!-- <el-table-column prop="spcmReceivedDateTime" label="标本收到日期及时间"/> -->
        <!-- <el-table-column prop="spcmSampleDateTime" label="标本采样日期及时间"/> -->
        <!-- <el-table-column prop="orderingDept" label="申请科室"/> -->
        <el-table-column prop="orderingProvider" label="申请医生"/>
          <el-table-column prop="requestedDateTime" label="申请时间"/>
        <!-- <el-table-column prop="performedBy" label="执行科室"/> -->
        <!-- <el-table-column prop="resultStatus" label="结果状态"/> -->
        <!-- <el-table-column prop="resultsRptDateTime" label="报告日期及时间"/>
        <el-table-column prop="transcriptionist" label="报告者"/> -->
        <!-- <el-table-column prop="verifiedBy" label="校对者"/> -->
        <el-table-column prop="costs" label="费用"/>
        <!-- <el-table-column prop="charges" label="应收费用"/>
        <el-table-column prop="billingIndicator" label="计价标志"/>
        <el-table-column prop="printIndicator" label="打印标志"/> -->
      </el-table>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop , Watch} from 'vue-property-decorator';
@Component
export default class HisPatientAnalysis extends Vue {
  @Prop()
  private rowData!: any;
  @Prop()
  private value!: any;
  private spacingHeight = 200;
  private tableHeight = window.innerHeight - this.spacingHeight;
  private tableData = [];
  private visitId = '';
  private clinicVisitId = '';
  private onresize() {
      this.tableHeight = window.innerHeight - this.spacingHeight;
  }
  private mounted() {
    this.visitId = this.rowData.visitId ? this.rowData.visitId : '';
    this.clinicVisitId = this.rowData.clinicVisitId ? this.rowData.clinicVisitId : '';
    this.getData(this.rowData.patientId, this.visitId, this.clinicVisitId);
    $(window).resize(this.onresize);
  }
  private async getData(patientId: string, visitId: string, clinicVisitId: string) {
      if (!patientId) {
        return;
      }
      const resData = await this.$store.dispatch('HisPatientAnalysisGet', {patientId, visitId, clinicVisitId});
      this.tableData = resData && resData.data.data ? resData.data.data : [];
  }
  private handleCurrentChange(val: any) {
    this.$emit('input', val);
  }
  @Watch('rowData')
  private watchRowData(newVal: any) {
    this.getData(newVal.patientId, newVal.visitId, newVal.clinicVisitId);
  }

}
</script>
<style lang="less" scoped>
.HisPatientAnalysis {
  .box{
    padding: 0 10px;
  }
  .tool{
    padding: 23px 10px 0 10px;
  }
}
</style>

