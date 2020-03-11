<template>
  <div class="Analysis">
    <el-row>
      <el-col :span="12">
        <h1>检验</h1>
				<HisPatientAnalysisList :tableData="tableData" @clickRow="clickRow"></HisPatientAnalysisList>
      </el-col>
      <el-col :span="12">
        <h1>Lis结果</h1>
				<HisPatientLis :rowData="rowData"></HisPatientLis>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import HisPatientAnalysisList from '@/components/nurse/his/HisPatientAnalysisList.vue';
import HisPatientLis from '@/components/nurse/his/HisPatientLis.vue';

@Component({
  components: {
    HisPatientAnalysisList,
    HisPatientLis
  }
})
export default class Analysis extends Vue {
  private tableData: any[] = [];
  private rowData = {};
   private tableHeight = window.innerHeight - 160;
  private async getData(patientId: string) {
      if (!patientId) {
        return;
      }
      const resData = await this.$store.dispatch('HisPatientAnalysisLastGet', {patientId});
      this.tableData = resData && resData.data ? resData.data : [];
  }
  private mounted() {
    this.$store.commit('SET_OPBTN_VALUE', []);
    const patient = JSON.parse(sessionStorage.getItem('currentPatient') as string);
    this.getData(patient.hisCode);
  }
  @Watch('$store.getters.GET_PATIENT')
  private watchPatient(newVal: any) {
    this.getData(newVal.hisCode);
  }
  private clickRow(row: any) {
    this.rowData = row;
  }
}
</script>

<style lang="less" scoped>
.Analysis {
  height: calc(~"(100% - 95px)");
  width: calc(~"(100% - 270px)");
  position: absolute;
  left: 270px;
  top: 95px;
  h1 {
    text-align: center;
  }
  
}
</style>
