<template>
  <div class="Examine">
    <el-row>
      <el-col :span="12">
        <h1>检查</h1>
        <HisPatientExamineList :tableData="tableData" @clickRow="clickRow"></HisPatientExamineList>
      </el-col>
      <el-col :span="12">
        <h1>Pacs结果</h1>
				<HisPatientPacs :rowData="rowData"></HisPatientPacs>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import HisPatientExamineList from '@/components/nurse/his/HisPatientExamineList.vue';
import HisPatientPacs from '@/components/nurse/his/HisPatientPacs.vue';


@Component({
  components: {
    HisPatientExamineList,
    HisPatientPacs
  }
})
export default class Examine extends Vue {
  private tableData: any[] = [];
  private rowData = {};
   private tableHeight = window.innerHeight - 160;
  private async getData(patientId: string) {
      if (!patientId) {
        return;
      }
      const resData = await this.$store.dispatch('HisPatientExamineLastGet', {patientId});
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
.Examine {
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
