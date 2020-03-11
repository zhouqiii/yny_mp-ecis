<template>
  <div class="HisHospitalPatientVisit">
    <div class="box">
      <el-table :data="rowData?[rowData]:[]" border style="width: 100%" :height="tableHeight">
        <el-table-column fixed prop="patientId" label="病人标识"/>
        <el-table-column prop="visitId" label="病人本次住院标识"/>
        <el-table-column prop="deptAdmissionTo" label="入院科室"/>
        <el-table-column prop="admissionDateTime" label="入院日期及时间"/>
        <el-table-column prop="deptDischargeFrom" label="出院科室"/>
        <el-table-column prop="dischargeDateTime" label="出院日期及时间"/>
        <el-table-column prop="occupation" label="职业"/>
        <el-table-column prop="maritalStatus" label="婚姻状况"/>
        <el-table-column prop="identity" label="身份"/>
        <el-table-column prop="armedServices" label="军种"/>
        <el-table-column prop="duty" label="勤务"/>
        <el-table-column prop="unitInContract" label="合同单位"/>
        <el-table-column prop="chargeType" label="费别"/>
        <el-table-column prop="workingStatus" label="在职标志"/>
        <el-table-column prop="insuranceType" label="医保类别"/>
        <el-table-column prop="insuranceNo" label="医疗保险号"/>
        <el-table-column prop="serviceAgency" label="工作单位"/>
        <el-table-column prop="mailingAddress" label="通信地址"/>
        <el-table-column prop="zipCode" label="邮政编码"/>
        <el-table-column prop="nextOfKin" label="联系人姓名"/>
        <el-table-column prop="relationship" label="与联系人关系"/>
        <el-table-column prop="nextOfKinAddr" label="联系人地址"/>
        <el-table-column prop="nextOfKinZipcode" label="联系人邮政编码"/>
        <el-table-column prop="nextOfKinPhone" label="联系人电话"/>
        <el-table-column prop="patientClass" label="入院方式"/>
        <el-table-column prop="admissionCause" label="住院目的"/>
        <el-table-column prop="consultingDate" label="接诊日期"/>
        <el-table-column prop="patAdmCondition" label="入院病情"/>
        <el-table-column prop="consultingDoctor" label="门诊医师"/>
        <el-table-column prop="admittedBy" label="办理住院者"/>
        <el-table-column prop="emerTreatTimes" label="抢救次数"/>
        <el-table-column prop="escEmerTimes" label="抢救成功次数"/>
        <el-table-column prop="specLevelNursDays" label="特级护理天数"/>
        <el-table-column prop="firstLevelNursDays" label="一级护理天数"/>
        <el-table-column prop="autopsyIndicator" label="尸检标识"/>
        <el-table-column prop="bloodType" label="血型"/>
        <el-table-column prop="bloodTypeRh" label="Rh血型"/>
        <el-table-column prop="bloodTranTimes" label="输血次数"/>
        <el-table-column prop="bloodTranVol" label="输血总量"/>
        <el-table-column prop="bloodTranReactTimes" label="输血反应次数"/>
        <el-table-column prop="alergyDrugs" label="过敏药物"/>
        <el-table-column prop="adverseReactionDrugs" label="不良反应药物"/>
        <el-table-column prop="mrValue" label="病案价值"/>
        <el-table-column prop="mrQuality" label="病案质量"/>
        <el-table-column prop="followIndicator" label="随诊标志"/>
        <el-table-column prop="followInterval" label="随诊期限"/>
        <el-table-column prop="followIntervalUnits" label="随诊期限单位"/>
        <el-table-column prop="director" label="科主任"/>
        <el-table-column prop="attendingDoctor" label="主治医师"/>
        <el-table-column prop="doctorInCharge" label="经治医师"/>
        <el-table-column prop="dischargeDisposition" label="出院方式"/>
        <el-table-column prop="totalCosts" label="总费用"/>
        <el-table-column prop="totalPayments" label="实付费用"/>
      </el-table>
    </div>
  </div>
</template>
<script lang = 'ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class HisHospitalPatientVisit extends Vue {
  @Prop()
  private rowData!: any;
  private spacingHeight = 200;
  private tableHeight = window.innerHeight - this.spacingHeight;
  private onresize() {
      this.tableHeight = window.innerHeight - this.spacingHeight;
  }
  private mounted() {
    $(window).resize(this.onresize);
  }
}
</script>
<style lang="less" scoped>
.HisHospitalPatientVisit {
  .box{
    padding: 0 10px;
  }
  .tool{
    padding: 23px 10px 0 10px;
  }
}
</style>

