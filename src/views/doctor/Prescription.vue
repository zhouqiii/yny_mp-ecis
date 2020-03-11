<template>
    <div class="Prescription1">
        <Prescription :tableData5="tableData5"/>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Prescription from '@/components/doctor/Prescription.vue';
@Component({
  components: {
    Prescription
  }
})
export default class Prescription1 extends Vue {
  public tableData5 = [{
          id: '12987122',
          prescriptionType: '西药',
          doctor: '华佗',
          createdOn: '2018/12/18',
          items: [{
            medicineOffer: '氨酚片',
            price: '10',
            usageMethod: '口服',
            frequency: '一天一次',
            dosage: '1',
            unit: '片',
            dosageCount: '2次',
            totalDosage: '2片',
            accountingUnit: '片',
            accountingTotalDosage: '2',
            fee: '20',
            ifPaid: '已付费',
            status: '已完成',
          }, {
            medicineOffer: '氰化钠注射液',
            price: '10',
            usageMethod: '口服',
            frequency: '一天一次',
            dosage: '1',
            unit: '片',
            dosageCount: '2次',
            totalDosage: '2片',
            accountingUnit: '片',
            accountingTotalDosage: '2',
            fee: '20',
            ifPaid: '已付费',
            status: '已完成',
          }, {
            medicineOffer: '氨基酸',
            price: '10',
            usageMethod: '口服',
            frequency: '一天一次',
            dosage: '1',
            unit: '片',
            dosageCount: '2次',
            totalDosage: '2片',
            accountingUnit: '片',
            accountingTotalDosage: '2',
            fee: '20',
            ifPaid: '已付费',
            status: '已完成',
          }],
        }];
}
</script>

