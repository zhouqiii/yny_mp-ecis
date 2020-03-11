<template>
    <div class="Prescription1">
        <SplitPrescription :tableData="tableData" @onclick="getListData" v-if="tableData.length>0"/>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import SplitPrescription from '@/components/nurse/SplitPrescription.vue';
@Component({
  components: {
    SplitPrescription
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
    this.$store.commit('SET_OPBTN_VALUE', [
    // {name: '获取医嘱', event: 'getPatientSplitPrescription'},
    // {name: '接药', event: 'receptePrescription'}
    ]);
    this.getPatientSplitPrescription();
  }
  /**
   * 获取拆分医嘱
   */
  public getPatientSplitPrescription = () => this.getListData(this.getPatient.hisCode);
  /**
   * 获取列表中选中的数据
   */
  public getPrescription() {
     if (sessionStorage.getItem('/nurse/splitPrescription')) {
        this.prescription = JSON.parse((sessionStorage.getItem('/nurse/splitPrescription') as string));
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
              this.getPatientSplitPrescription();
              this.$message.success('接药成功');
            } else {
              this.getPatientSplitPrescription();
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
   * 获取列表数据
   */
  public getListData(newVal: any) {
    if (!newVal) {
      // this.$message.warning('请选择病人');
      return;
    }
    axios.get(`/api/core/hisClinicPatientDoctorOrder/getAllDoctorOrder/${newVal}`).then((data: any) => {
      this.tableData = data.data?data.data:[];
    });
    // axios.get(`/api/his/hispatient/sync/${this.getPatient.visitId}`).then(() => {
    //   this.getDateV(newVal);
    // });
  }
  // public getDateV(newVal: any) {
  //   this.$store.dispatch('GetSplitPrescriptionList', newVal).then(({data}) => {
  //     this.tableData = data.data;
  //     axios.all([this.$store.dispatch('MedicineproductList'), axios.get('/api/core/medicineoffer/list')])
  //     .then(axios.spread((medicineProductList: any, medicineOfferList: any) => {
  //       this.tableData.forEach((item: any) => {
  //         item.items.forEach((drugs: any) => {
  //           drugs.forEach((drug: any) => {
  //             for (const medicineOffer of medicineOfferList.data ) {
  //               if (String(drug.medicineOfferId) === String(medicineOffer.id)) {
  //                 for (const medicineProduct of medicineProductList.data) {
  //                   if (String(medicineOffer.medicineProductId) === String(medicineProduct.id)) {
  //                     drug.medicineOfferName = medicineProduct.nameCn;
  //                     return;
  //                   }
  //                 }
  //               }
  //             }
  //           });
  //         });
  //       });
  //     }));
  //     this.tableData = JSON.parse(JSON.stringify(this.tableData));
  //     this.getDoctorName();
  //   });
  // }
  // public getDoctorName() {
  //     this.$store.dispatch('GetDoctors').then(({data}) => {
  //         const map: any = {};
  //         data.data.forEach((item: any) => map[item.userId] = item.username);
  //         this.tableData.forEach((item: any) => item.doctorName = map[item.doctorId]);
  //         this.tableData = JSON.parse(JSON.stringify(this.tableData));
  //     });
  // }

  /**
   * watch监听病人进行请求数据
   */
  @Watch('$store.state.patient.patient.visitId')
  public watchVisitId(newValue: any, oldValue: any) {
      this.getListData(newValue);
  }
}
</script>


