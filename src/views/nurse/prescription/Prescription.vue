<template>
    <div class="Prescription1">
        <Prescription :tableData="tableData"/>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Prescription from '@/components/nurse/Prescription.vue';
@Component({
  components: {
    Prescription
  }
})
export default class Prescription1 extends Vue {
  public tableData = [];
  public prescription = {
    id: '',
    status: ''
  };
  public get getPatient() {
    return this.$store.getters.GET_PATIENT;
  }
  /**
   * 执行方法
   */
  public mounted() {
    this.$store.commit('SET_OPBTN_VALUE', [{name: '获取医嘱', event: 'getPatientPrescription'},
    {name: '接药', event: 'receptePrescription'}]);
  }
  /**
   * 获取医嘱
   */
  public async getPatientPrescription() {
    const data = await this.$store.dispatch('GetPrescriptionList');
    this.tableData = data.data;
  }
  /**
   * 获取列表中选中的数据
   */
  public getPrescription() {
    if (sessionStorage.getItem('/nurse/prescription')) {
        this.prescription = JSON.parse((sessionStorage.getItem('/nurse/prescription') as string));
      } else {
        this.$message.warning('未选中相应对象，跳转失败！');
        this.$router.push('/nurse/prescription');
      }
  }
  /**
   * 接药
   */
  public receptePrescription() {
    this.getPrescription();
    if (this.prescription.id) {
      if ('1' === this.prescription.status) {
        this.prescription.status = '2';
        this.$store.dispatch('EditPrescriptionStatus', this.prescription).then(({data}) => {
          if (data.code === 0) {
              // sessionStorage.setItem('/nurse/prescription', '');
              this.getPatientPrescription();
              this.$message.success('接药成功');
            } else {
              this.getPatientPrescription();
              this.$message.warning('接药失败');
            }
        });
      } else if (Number(this.prescription.status) > 1) {
        this.$message.warning('该医嘱已接药');
      }
    } else {
      this.$message.warning('未选中医嘱单号，接药失败');
    }
  }
  /**
   * watch监听病人进行请求数据
   */
  @Watch('$store.state.patient.patient.visitId')
  public watchVisitId(newValue: any, oldValue: any) {
      this.$store.dispatch('GetPrescriptionList', newValue).then(({data}) => {
      this.tableData = data.data;
    });
  }
}
</script>

