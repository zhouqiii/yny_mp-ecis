<template>
  <div class="HisClinicLog">
    <el-row>
      <el-col :span="18">
        <el-tabs v-model="activeName">
          <el-tab-pane label="挂号记录" name="clinicPatientVisit" :disabled="isClinicPatientVisitDataEmpty">
						<HisClinicPatientVisit :rowData="rowData"></HisClinicPatientVisit>
					</el-tab-pane>
          <el-tab-pane label="急诊医嘱" name="clinicPatientDoctorOrder" :disabled="isRowDataEmpty">
						<HisClinicPatientDoctorOrder v-if="activeName==='clinicPatientDoctorOrder'" :rowData="rowData"></HisClinicPatientDoctorOrder>
					</el-tab-pane>
          <el-tab-pane label="病人检验" name="patientAnalysis" :disabled="isRowDataEmpty">
						<HisPatientAnalysis v-model="patientAnalysisRowData" v-if="activeName==='patientAnalysis'" :rowData="rowData"></HisPatientAnalysis>
					</el-tab-pane>
          <el-tab-pane label="LIS结果" name="patientLis" :disabled="isPatientAnalysisRowDataEmpty">
						<HisPatientLis v-if="activeName==='patientLis'" :rowData="patientAnalysisRowData"></HisPatientLis>
					</el-tab-pane>
          <el-tab-pane label="病人检查" name="patientExamine" :disabled="isRowDataEmpty">	
            <HisPatientExamine v-model="patientExamineRowData" v-if="activeName==='patientExamine'" :rowData="rowData"></HisPatientExamine>
					</el-tab-pane>
          <el-tab-pane label="PACS结果" name="patientPacs" :disabled="isPatientExamineRowDataEmpty">
						<HisPatientPacs v-if="activeName==='patientPacs'" :rowData="patientExamineRowData"></HisPatientPacs>
					</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="6" class="historyList">
        <h1>挂号历史</h1>
        <el-table :data="tableData" border style="width: 100%" :height="tableHeight" highlight-current-row @current-change="handleCurrentChange" ref="singleTable">
          <el-table-column prop="visitDate" label="就诊日期"/>
          <el-table-column prop="registeringDate" label="挂号日期"/>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import HisClinicPatientDoctorOrder from '@/components/nurse/his/HisClinicPatientDoctorOrder.vue';
import HisClinicPatientVisit from '@/components/nurse/his/HisClinicPatientVisit.vue';
import HisPatientAnalysis from '@/components/nurse/his/HisPatientAnalysis.vue';
import HisPatientExamine from '@/components/nurse/his/HisPatientExamine.vue';
import HisPatientLis from '@/components/nurse/his/HisPatientLis.vue';
import HisPatientPacs from '@/components/nurse/his/HisPatientPacs.vue';


@Component({
  components: {
    HisClinicPatientDoctorOrder,
    HisClinicPatientVisit,
    HisPatientAnalysis,
    HisPatientExamine,
    HisPatientLis,
    HisPatientPacs
  }
})
export default class HisClinicLog extends Vue {
  private activeName = 'clinicPatientVisit';
  private tableData: any[] = [];
  private rowData = {};
   private tableHeight = window.innerHeight - 160;
  private patientAnalysisRowData = {};
  private patientExamineRowData = {};
  private form = {
    startDate: '',
    endDate: ''
  };
  private handleCurrentChange(val: any) {
    this.rowData = val;
    this.activeName = 'clinicPatientVisit';
    this.patientAnalysisRowData = {};
    this.patientExamineRowData = {};
  }
  private async getData(patientId: string) {
      if (!patientId) {
        return;
      }
      const resData = await this.$store.dispatch('HisClinicPatientVisitGet', {patientId, ...this.form});
      this.tableData = resData && resData.data.data ? resData.data.data : [];
      const obj = this.tableData ? this.tableData[0] : {};
      (this.$refs.singleTable as any).setCurrentRow(obj);
  }
  private mounted() {
    this.$store.commit('SET_OPBTN_VALUE', []);
    const patient = JSON.parse(sessionStorage.getItem('currentPatient') as string);
    this.getData(patient.hisCode);
  }
  @Watch('$store.getters.GET_PATIENT')
  private watchPatient(newVal: any) {
    this.getData(newVal.hisCode).then(() => this.activeName = 'clinicPatientVisit');
    // this.getData('R28325').then(() => this.activeName = 'clinicPatientVisit');
  }
  private get isPatientAnalysisRowDataEmpty() {
    return $.isEmptyObject(this.patientAnalysisRowData);
  }
  private get isClinicPatientVisitDataEmpty() {
    return $.isEmptyObject(this.tableData);
  }
  private get isRowDataEmpty() {
    return $.isEmptyObject(this.rowData);
  }
  private get isPatientExamineRowDataEmpty() {
    return $.isEmptyObject(this.patientExamineRowData);
  }
}
</script>

<style lang="less" scoped>
.HisClinicLog {
  height: calc(~"(100% - 95px)");
  width: calc(~"(100% - 270px)");
  position: absolute;
  left: 270px;
  top: 95px;
  .historyList {
    position: relative;
    h1 {
      text-align: center;
    }
  }
}
</style>
