<template>
  <div class="HisPatientExamine">
    <div class="box">
      <div class="tool">
      </div>
      <el-table :data="tableData" border style="width: 100%" :height="tableHeight"
      highlight-current-row @current-change="handleCurrentChange" ref="singleTable">
        <!-- <el-table-column fixed prop="examNo" label="申请序号"/>
        <el-table-column prop="localIdClass" label="检查号类别"/>
        <el-table-column prop="patientLocalId" label="检查标识号"/>
        <el-table-column prop="patientId" label="病人标识号"/>
        <el-table-column prop="visitId" label="病人本次住院标识"/> -->
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="sex" label="性别"/>
        <el-table-column prop="dateOfBirth" label="出生日期"/>
        <el-table-column prop="examClass" label="检查类别"/>
        <el-table-column prop="examSubClass" label="检查子类"/>
        <!-- <el-table-column prop="spmRecvedDate" label="标本收到日期及时间"/> -->
        <!-- <el-table-column prop="clinSymp" label="临床症状"/>
        <el-table-column prop="physSign" label="体征"/> -->
        <!-- <el-table-column prop="relevantLabTest" label="相关化验结果"/> -->
        <!-- <el-table-column prop="relevantDiag" label="其他诊断"/>
        <el-table-column prop="clinDiag" label="临床诊断"/> -->
        <!-- <el-table-column prop="examMode" label="检查方式"/> -->
        <!-- <el-table-column prop="examGroup" label="检查分组"/> -->
        <!-- <el-table-column prop="device" label="使用仪器"/> -->
        <!-- <el-table-column prop="performedBy" label="执行科室"/> -->
        <!-- <el-table-column prop="patientSource" label="病人来源"/> -->
        <!-- <el-table-column prop="facility" label="外来医疗单位名称"/>
        <el-table-column prop="reqDateTime" label="申请日期及时间"/>
        <el-table-column prop="reqDept" label="申请科室"/>
        <el-table-column prop="reqPhysician" label="申请医生"/>
        <el-table-column prop="reqMemo" label="申请备注"/>
        <el-table-column prop="scheduledDateTime" label="预约日期及时间"/> -->
        <!-- <el-table-column prop="notice" label="注意事项"/> -->
        <!-- <el-table-column prop="examDateTime" label="检查日期及时间"/>
        <el-table-column prop="reportDateTime" label="报告日期及时间"/> -->
        <!-- <el-table-column prop="technician" label="操作者"/>
        <el-table-column prop="reporter" label="报告者"/> -->
        <!-- <el-table-column prop="resultStatus" label="检查结果状态"/>
        <el-table-column prop="costs" label="费用"/>
        <el-table-column prop="charges" label="应收费用"/> -->
        <!-- <el-table-column prop="chargeIndicator" label="计价标志"/> -->
        <!-- <el-table-column prop="babyNo" label="子病人标识"/>
        <el-table-column prop="clinicVisitId" label="门诊就诊识别号"/>
        <el-table-column prop="examCardno" label="申请预约"/> -->
      </el-table>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
@Component
export default class HisPatientExamine extends Vue {
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
      const resData = await this.$store.dispatch('HisPatientExamineGet', {patientId, visitId, clinicVisitId});
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
.HisPatientExamine {
  .box{
    padding: 0 10px;
  }
  .tool{
    padding: 23px 10px 0 10px;
  }
}
</style>

