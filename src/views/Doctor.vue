<template>
  <div class="Doctor">
    <DoctPatientList :patientList="patientList"/>
    <DoctMenu/>
    <!-- <PatientInfo/> -->
    <router-view name="doctor"/>
    <!-- <router-view name="patientInfo"/> -->
    <!-- <Prescription/> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DoctPatientList from '@/components/doctor/DoctPatientList.vue';
import DoctMenu from '@/components/doctor/DoctMenu.vue';
import PatientInfo from '@/components/doctor/PatientInfo.vue';
import Prescription from '@/components/doctor/Prescription.vue';

@Component({
  components: {
    DoctPatientList,
    DoctMenu,
    PatientInfo,
    Prescription
  }
})
export default class Doctor extends Vue {
  public patientList = [
    {
        name : '黄运用',
        severityLevelMannul : 1,
        status : '待叫号',
        section : '候诊区',
    },
    {
        name : '华佗',
        severityLevelMannul : 3,
        status : '待叫号',
        section : '候诊区',
    },
    {
        name : '华佗',
        severityLevelMannul : 4,
        status : '待叫号',
        section : '候诊区',
    },
    {
        name : '华佗',
        severityLevelMannul : 3,
        status : '待叫号',
        section : '候诊区',
    },
    {
        name : '华佗',
        severityLevelMannul : 4,
        status : '待叫号',
        section : '候诊区',
    },
    {
        name : '华佗',
        severityLevelMannul : 3,
        status : '待叫号',
        section : '候诊区',
    },
    {
        name : '华佗',
        severityLevelMannul : 4,
        status : '待叫号',
        section : '候诊区',
    },
    {
        name : '华佗',
        severityLevelMannul : 3,
        status : '待叫号',
        section : '候诊区',
    },
    {
        name : '华佗',
        severityLevelMannul : 4,
        status : '待叫号',
        section : '候诊区',
    }
  ];
}
</script>
<style lang="less" scoped>
  .Doctor{
    height: calc(~"100% - 60px");
  }
</style>
