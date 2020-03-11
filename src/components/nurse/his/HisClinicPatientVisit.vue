<template>
  <div class="HisClinicPatientVisit">
    <div class="box">
      <!-- <div class="tool">
        <el-form :inline="true" :model="form" class="demo-form-inline" ref="form" >
          <el-form-item label="开始时间" prop="startDate">
            <yn-date-time-pick v-model="form.startDate" type="datetime" placeholder="选择开始时间"></yn-date-time-pick>
          </el-form-item>

          <el-form-item label="结束时间" prop="endDate"></el-form-item>
          <yn-date-time-pick v-model="form.endDate" type="datetime" placeholder="选择结束时间" style="width:200px"></yn-date-time-pick>
          <el-form-item label=" ">
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div> -->
      <el-table :data="rowData?[rowData]:[]" border style="width: 100%" :height="tableHeight">
        <el-table-column fixed prop="visitDate" label="就诊日期"/>
        <el-table-column prop="visitNo" label="就诊序号"/>
        <!-- <el-table-column prop="clinicId"/> -->
        <!-- <el-table-column prop="clinicLabel" label="号别"/> -->
        <el-table-column prop="patientId" label="病人标识号"/>
        <el-table-column prop="name" label="姓名"/>
        <!-- <el-table-column prop="namePhonetic" label="姓名拼音"/> -->
        <el-table-column prop="sex" label="性别"/>
        <el-table-column prop="age" label="年龄"/>
        <el-table-column prop="insuranceType" label="医保类别"/>
        <el-table-column prop="identity" label="身份"/>
        <el-table-column prop="chargeType" label="费别"/>
        <el-table-column prop="insuranceNo" label="医疗保险号"/>
        <el-table-column prop="unitInContract" label="合同单位"/>
        <el-table-column prop="clinicType" label="号类"/>
        <el-table-column prop="firstVisitIndicator" label="初诊标志"/>
        <el-table-column prop="visitDept" label="就诊科室"/>
        <el-table-column prop="visitSpecialClinic" label="就诊专科"/>
        <el-table-column prop="doctor" label="医生"/>
        <el-table-column prop="mrProvidedIndicator" label="提供病案标志"/>
        <el-table-column prop="registrationStatus" label="挂号状态"/>
        <el-table-column prop="registeringDate" label="挂号日期"/>
        <el-table-column prop="symptom" label="症状"/>
        <el-table-column prop="clinicClass" label="诊疗类别"/>
        <el-table-column prop="registFee" label="挂号费"/>
        <el-table-column prop="clinicFee" label="诊疗费"/>
        <el-table-column prop="otherFee" label="其它费"/>
        <el-table-column prop="operator" label="挂号员"/>
        <el-table-column prop="returnedDate" label="退号日期"/>
        <el-table-column prop="returnedOperator" label="退号挂号员"/>
        <el-table-column prop="clinicCharge" label="应收费用"/>
        <el-table-column prop="rcptNo" label="流水号"/>
        <el-table-column prop="acctDateTime" label="结账日期"/>
        <el-table-column prop="acctNo" label="结帐号"/>
        <el-table-column prop="returnType" label="返回类型"/>
        <el-table-column prop="sign" label="签名"/>
        <el-table-column prop="mrProvideIndicator" label="病历提供标志"/>
        <el-table-column prop="remainIndicator" label="保留标志"/>
        <el-table-column prop="insurFee" label="医保支付"/>
        <el-table-column prop="payWay" label="支付方式"/>
        <el-table-column prop="transNo" label="交易序号"/>
        <el-table-column prop="visitDeptIni" label="实际接诊科室"/>
        <el-table-column prop="visitSpecialClinicIni" label="实际接诊专科"/>
        <el-table-column prop="doctorIni" label="实际接诊医生"/>
        <el-table-column prop="insurPayCost" label="医保实际支付"/>
        <el-table-column prop="insurAccountCost" label="账户实际支付"/>
      </el-table>
    </div>
  </div>
</template>

<script lang = 'ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class HisClinicPatientVisit extends Vue {
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
}
</script>
<style lang="less" scoped>
.HisClinicPatientVisit {
  .box{
    padding: 0 10px;
  }
  .tool{
    padding: 23px 10px 0 10px;
  }
}
</style>