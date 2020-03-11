<template>
  <div class="nurse">
    <NursePatientList v-if="isRouter"/>
    <NurseMenu v-if="isRouter" @onFresh="onGetPatientList">
      <template slot="opbtn">
          <div v-for="(item,i) in opbtn" :key="i" @click="opbtnClick(item.event)">{{item.name}}</div>
      </template>
    </NurseMenu>
     <router-view name="nurse" ref="nurse"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import NursePatientList from '@/components/nurse/NursePatientList.vue';
import NurseMenu from '@/components/nurse/NurseMenu.vue';
interface PatientVO {
      patientId: string;
      visitId: string;
      name: string;
      gender: string;
      birthday: string;
      age: 0;
      ageMonth: 0;
      ageDay: 0;
      section: string;
      bedCode: string;
      arrivalDate: string;
      severityLevelSys: string;
      diagnosisList: string;
      status: string;
      doctorName: string;
      nurseName: string;
      firstMedicalContact: string;
      endDate: string;
      nationId: string;
      residentIdentityCard: string;
      visitCard: string;
      nativePlace: string;
      addressDetail: string;
      maritalStatus: string;
      feeType: string;
      phone: string;
      arrivalMethod: string;
      ifWithoutId: string;
      accompany: string;
      accompanyAddress: string;
      accompanyPhone: string;
      accompanyRelation: string;
      ifGreenChannel: string;
      ifFever: string;
      ifThoracalgia: string;
      ifNoreasonDeath: string;
      breathe: string;
      temperature: string;
      heartRate: string;
      diastolicPressure: string;
      systolicPressure: string;
      so2: string;
      illnessState: string;
    }
@Component({
  components: {
    NursePatientList,
    NurseMenu
  }
})
export default class Nurse extends Vue {
  public patientList: any = [];
  public patient = {};
  public isRouter = true;
  public stompClient: any = {};
  public mounted() {
    this.onGetPatientList();
    this.sendMessage();
    this.patient = this.$store.getters.GET_PATIENT;
    this.ifRouter();
    // this.$store.commit('SET_OPBTN_VALUE', [{name: '新建', event: 'onAddNotes'},
    // {name: '编辑', event: 'onEditNotes'}, {name: '删除', event: 'onDelNotes'},
    // {name: '刷新', event: 'onRefresh'}]);
  }
  /**
   * 预检分诊路径判断
   */
  public ifRouter() {
    const roles: any = {
      '/emergency': false,
      '/emergency/systemSetting/beds': false,
      '/emergency/systemSetting/beds/add': false,
      '/emergency/systemSetting/beds/edit': false,
      '/emergency/calledManage': false,
      '/emergency/crfplane': false,
      '/emergency/crfplane/edit': false,
      '/emergency/handover/doctor': false,
      '/emergency/handover/nurse': false,
      '/emergency/screenList': false,
      '/emergency/b-ultrasonic': false,
      '/emergency/b-ultrasonic/edit': false,
      '/emergency/duty': false,
      '/emergency/changeMessage': false,
    };
    this.isRouter = roles[window.location.pathname] !== undefined ? roles[window.location.pathname] : true;
    return this.isRouter;
  }
  /**
   * 获取病人列表
   */
  public onGetPatientList() {
    const today = new Date(new Date()).format('yyyy-MM-dd') + ' 23:59:59';
    const yestoday = new Date(new Date().setDate(new Date().getDate() - 1)).format('yyyy-MM-dd') + ' 00:00:00';
    const param = {
      searchText: '',
      startDate: yestoday,
      endDate: today
    };
    this.$store.dispatch('GetPatientListByParam', param).then(({data}) => {
      this.patientList = data.data ? data.data : [];
    });
  }
  /**
   * 计算属性，获取值
   */
  public get opbtn() {
    return this.$store.getters.GET_OPBTN_VALUE ? this.$store.getters.GET_OPBTN_VALUE : [];
  }
  /**
   * 事件共用方法
   */
  public opbtnClick(event: string) {
    (this.$refs.nurse as any)[event]();
  }
  @Watch('isRouter')
  public watchIsRouter(newVal: any, oldVal: any) {
    if (newVal) {
      this.onGetPatientList();
    }
  }
  @Watch('$route.path')
  public watchPath(newVal: any) {
    this.ifRouter();
  }

  /**
   * 请求数据
   */
  public sendMessage() {
    // 地址+端点路径，构建websocket链接地址
    const socket = new SockJS('/api/core/bullet');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: any) => {
      // 监听的路径以及回调
      // 更新病人列表
      this.stompClient.subscribe('/toAll/patientList',
      ({body}: any) => {
        const patient = JSON.parse(body);
        this.patientList.unshift(patient);
      });
      // 更改状态
      this.stompClient.subscribe('/toAll/patientStatus',
      ({body}: any) => {
        const patient = JSON.parse(body);
        for (const entity of this.patientList) {
          if (entity.visitId === patient.visitId) {
            entity.status = patient.status;
          }
        }
      });
    });
  }
}
</script>
<style lang="less" scoped>
  .nurse{
    height: calc(~"100% - 60px");
    background: #f5f5f5;
  }
</style>
