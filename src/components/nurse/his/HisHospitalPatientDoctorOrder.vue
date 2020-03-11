<template>
  <div class="HisHospitalPatientDoctorOrder">
    <div class="box">
      <div class="tool"></div>
      <el-table :data="tableData" border style="width: 100%" :height="tableHeight">
        <el-table-column fixed prop="patientId" label="病人标识"/>
        <el-table-column prop="visitId" label="病人本次住院标识"/>
        <el-table-column prop="itemNo" label="费用项目序号"/>
        <el-table-column prop="itemClass" label="项目类别"/>
        <el-table-column prop="itemCode" label="项目代码"/>
        <el-table-column prop="itemName" label="项目名称"/>
        <el-table-column prop="itemSpec" label="项目规格"/>
        <el-table-column prop="amount" label="数量"/>
        <el-table-column prop="units" label="单位"/>
        <el-table-column prop="orderedBy" label="开单科室"/>
        <el-table-column prop="performedBy" label="执行科室"/>
        <el-table-column prop="costs" label="费用"/>
        <el-table-column prop="charges" label="应收费用"/>
        <el-table-column prop="billingDateTime" label="计价日期及时间"/>
        <el-table-column prop="operatorNo" label="计价员号"/>
        <el-table-column prop="rcptNo" label="对应的结算序号"/>
        <el-table-column prop="stDate" label="入帐日期"/>
        <el-table-column prop="dischgTakingIndicator" label="出院带药标识"/>
        <el-table-column prop="classOnInpRcpt" label="对应的住院收据费用分类"/>
        <el-table-column prop="classOnReckoning" label="对应的核算项目分类"/>
        <el-table-column prop="subjCode" label="对应的会计科目"/>
        <el-table-column prop="classOnMr" label="对应的病案首页费用分类"/>
        <el-table-column prop="babyNo" label="子病人标识"/>
        <el-table-column prop="orderedDoctor" label="对应的开单医生"/>
        <el-table-column prop="performedDoctor" label="对应的执行医生"/>
        <el-table-column prop="itemFlag" label="出院带药标识"/>
        <el-table-column prop="zlyt" label="ZLYT"/>
        <el-table-column prop="itemNoTrans" label="项目编码转换"/>
        <el-table-column prop="returnFlag" label="返回标志"/>
        <el-table-column prop="planNo" label="对应申请号"/>
        <el-table-column prop="equipmentNo" label="设备号"/>
        <el-table-column prop="documentNoImport" label="导入文档编码"/>
        <el-table-column prop="documentNo" label="文档编码"/>
        <el-table-column prop="unitse" label="单位"/>
        <el-table-column prop="operClass" label="手术级别"/>
        <el-table-column prop="batchNo" label="批号"/>
        <el-table-column prop="orderNo" label="对应医嘱号"/>
        <el-table-column prop="orderSubNo" label="对应子医嘱号"/>
        <el-table-column prop="price" label="单价"/>
        <el-table-column prop="refundBillingDateTime" label="原计费时间"/>
      </el-table>
    </div>
  </div>
</template>

<script lang ='ts'>
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
@Component
export default class HisHospitalPatientDoctorOrder extends Vue {
  @Prop()
  private rowData!: any;
  private spacingHeight = 200;
  private tableHeight = window.innerHeight - this.spacingHeight;
  private tableData = [];
  private onresize() {
      this.tableHeight = window.innerHeight - this.spacingHeight;
  }
  private mounted() {
    this.getData(this.rowData.patientId, this.rowData.visitId);
    $(window).resize(this.onresize);
  }
  private async getData(patientId: string, visitId: string) {
      if (!patientId) {
        return;
      }
      const resData = await this.$store.dispatch('HisHospitalPatientDoctorOrderGet', {patientId, visitId});
      this.tableData = resData && resData.data.data ? resData.data.data : [];
  }
  @Watch('rowData')
  private watchRowData(newVal: any) {
    this.getData(newVal.patientId, newVal.visitId);
  }
}
</script>
<style lang="less" scoped>
.HisHospitalPatientDoctorOrder {
  .box{
    padding: 0 10px;
  }
  .tool{
    padding: 23px 10px 0 10px;
  }
}
</style>

