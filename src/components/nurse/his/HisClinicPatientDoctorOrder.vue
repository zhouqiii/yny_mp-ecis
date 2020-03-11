<template>
  <div class="HisClinicPatientDoctorOrder">
    <div class="box">
      <div class="tool"></div>
      <el-table :data="tableData" border style="width: 100%" :height="tableHeight">
        <el-table-column fixed prop="clinicCostItemNo" label="门诊开单项目序号"/>
        <el-table-column prop="clinicVisitId" label="门诊就诊号"/>
        <el-table-column prop="patientId" label="病人标识号"/>
        <el-table-column prop="itemClass" label="项目类别"/>
        <el-table-column prop="itemCode" label="项目代码"/>
        <el-table-column prop="itemName" label="项目名称"/>
        <el-table-column prop="itemSpec" label="项目规格"/>
        <el-table-column prop="amount" label="数量"/>
        <el-table-column prop="units" label="单位"/>
        <el-table-column prop="orderedBy" label="开单科室"/>
        <el-table-column prop="orderedDoctor" label="开单医生"/>
        <el-table-column prop="performedBy" label="执行科室"/>
        <el-table-column prop="costs" label="费用"/>
        <el-table-column prop="charges" label="应收费用"/>
        <el-table-column prop="enteredBy" label="录入人"/>
        <el-table-column prop="inputDateTime" label="录入时间"/>
        <el-table-column prop="billDateTime" label="收费时间"/>
        <el-table-column prop="reqClass" label="开单类别"/>
        <el-table-column prop="reqId" label="开单识别号"/>
        <el-table-column prop="clinicChargeIndicator" label="收费标志"/>
      </el-table>
    </div>
  </div>
</template>
<script lang= 'ts'>
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
@Component
export default class HisClinicPatientDoctorOrder extends Vue {
  @Prop()
  private rowData!: any;
  private spacingHeight = 200;
  private tableHeight = window.innerHeight - this.spacingHeight;
  private tableData = [];
  private onresize() {
      this.tableHeight = window.innerHeight - this.spacingHeight;
  }
  private mounted() {
    this.getData(this.rowData.patientId, this.rowData.clinicId);
    $(window).resize(this.onresize);
  }
  private async getData(patientId: string, clinicId: string) {
      if (!patientId) {
        return;
      }
      const resData = await this.$store.dispatch('HisClinicPatientDoctorOrderGet', {patientId, clinicId});
      this.tableData = resData && resData.data.data ? resData.data.data : [];
  }
  @Watch('rowData')
  private watchRowData(newVal: any) {
    this.getData(newVal.patientId, newVal.clinicId);
  }
}
</script>
<style lang="less" scoped>
.HisClinicPatientDoctorOrder {
  .box{
    padding: 0 10px;
  }
  .tool{
    padding: 23px 10px 0 10px;
  }
}
</style>

