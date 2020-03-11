<template>
    <div class="PatientInfo1">
        <PatientInfo/>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PatientInfo from '@/components/doctor/PatientInfo.vue';
@Component({
  components: {
    PatientInfo
  }
})
export default class PatientInfo1 extends Vue {

}
</script>
