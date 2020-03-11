<template>
  <div class="BedCardList">
    <el-scrollbar :style="{height:listHeight}">
      <ul class="bedCard-list">
        <li v-for="(bedCard,i) in bedCardListPrivate" :key="i" @drop="drop(i)" @dragover="dragover">
          <div draggable="true" @dragstart="drag(i)">
            <div>
              <span class="bedCard-list-span-1">床位: {{bedCard.code}}</span>
              <span class="bedCard-list-span-2">{{bedCard.patientName}} </span>
              <span
                  class="bedCard-list-span-3"
                  :class="levelStyle(bedCard)"
              >{{bedCard.patientLevel}}</span>
            </div>
            <div>
              <div>
                  <span class="bedCardInfo">性别：</span>
                  <span v-for="(item,i) in sex" :key="i">
                  <span class="menu-value" v-if="item.value == bedCard.gender">{{item.label}}</span>
                  </span>
                  <span class="bedCardInfo">年龄：</span>
                  <span>{{bedCard.age}}</span>
              </div>
              <div>
                  <span class="bedCardInfo">急诊号：</span>
                  <span>{{bedCard.patientVisitId}}</span>
              </div>
              <div>
                  <span class="bedCardInfo">到院时间：</span>
                  <span>{{bedCard.arrivalDate}}</span>
              </div>
              <div>
                  <span class="bedCardInfo">医生：</span>
                  <span>{{bedCard.visitDoctorName}}</span>
                  <span class="bedCardInfo">护士：</span>
                  <span>{{bedCard.visitNurseName}}</span>
              </div>
              <div class="diagClass">
                  <span class="bedCardInfo">诊断：</span>
                  <span>{{bedCard.diagnosisName}}</span>
              </div>
              <i class="icon iconfont icon-dengluyonghuming"/>
            </div>
            <button class="bedTool" onClick="return false;">
              <el-button v-if="!bedCard.patientVisitId" @click="setPatientBed(bedCard)" type="primary" icon="el-icon-plus" circle></el-button>
              <el-button v-if="bedCard.patientVisitId" @click="delPatientBed(bedCard)" type="danger" icon="el-icon-delete" circle></el-button>
            </button>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
const df = Vue.filter('dictFilter');
@Component
export default class BedCardList extends Vue {
  @Prop()
  public bedCardList!: any[];
  public bedCardListPrivate: any[] = [];
  public bedCardListCopy: any[] = [];
  public listHeight = window.innerHeight - 230 + 'px';
  public ulWidth = (window.innerWidth - 280) / 3;
  public sex = df('sex');
  public dragI = 0;
  public levelStyle(item: any) {
    return `color${item.level}`;
  }
  public created() {
    this.bedCardListPrivate = this.bedCardList;
  }
  public mounted() {
    $(window)
      .resize(() => {
        this.listHeight = window.innerHeight - 230 + 'px';
        this.ulWidth = (window.innerWidth - 280) / 3;
      })
      .resize();
  }
  @Watch('bedCardList')
  public watchBedCardList(newVal: any, oldVal: any) {
    if (this.bedCardListCopy.length === 0) {
      this.bedCardListPrivate = this.bedCardList;
      this.bedCardListCopy = JSON.parse(JSON.stringify(newVal));
    }
  }
  /**
   * 获取病人信息
   */
  public get getPatient() {
    return this.$store.getters.GET_PATIENT;
  }
  public drag(i: number) {
    this.dragI = i;
  }
  public drop(i: number) {
    const obj = JSON.parse(JSON.stringify(this.bedCardListPrivate[i]));
    this.bedCardListPrivate[i] = this.bedCardListPrivate[this.dragI];
    this.bedCardListPrivate[this.dragI] = obj;
    this.bedCardListPrivate = JSON.parse(JSON.stringify(this.bedCardListPrivate));
    this.bedCardListPrivate.forEach(
      (item, x) => item.code = this.bedCardListCopy[x] ? this.bedCardListCopy[x].code : item.code
    );
    this.$emit('update:bedCardList', this.bedCardListPrivate);
    this.$emit('dragend', this.bedCardListPrivate[this.dragI], this.bedCardListPrivate[i]);
  }
  public dragover(ev: any) {
    ev.preventDefault();
  }
  /**
   * 分配床位
   */
  public setPatientBed(bedCard: any) {
    if (!this.getPatient.visitId) {
      this.$message.warning(`未选中要分配床位的病人！`);
      return;
    }
    if (!(this.getPatient.bedCode === null || this.getPatient.bedCode === '')) {
      this.$message.warning(`您选中的病人：${this.getPatient.name}，已分配床位，床位：${this.getPatient.bedCode}`);
      return;
    }
    if (bedCard.patientVisitId) {
      this.$message.warning(`您选中的床位：${bedCard.code}，已分配给病人，病人：${bedCard.patientName}`);
      return;
    }
    bedCard.patientName = this.getPatient.name;
    bedCard.patientLevel = this.getPatient.severityLevelSys + '级';
    bedCard.patientVisitId = this.getPatient.visitId;
    bedCard.arrivalDate = this.getPatient.arrivalDate;
    bedCard.dig = this.getPatient.diagnosisList;
    bedCard.level = this.getPatient.severityLevelSys;
    bedCard.bedFlag = true;
    bedCard.visitDoctorName = this.getPatient.doctorName;
    bedCard.visitNurseName = this.getPatient.nurseName;
    bedCard.gender = this.getPatient.gender;
    bedCard.age = this.getPatient.age;
    this.getPatient.bedCode = bedCard.code;
    this.getPatient.bedFlag = true;
    this.levelStyle(bedCard);
    this.$emit('savaOne', {isAdd: 1, patient: bedCard});
  }
  /**
   * 分配床位
   */
  public delPatientBed(bedCard: any) {
    this.$emit('savaOne', {isAdd: 0, patient: bedCard});
    bedCard.patientName = `未安排`;
    bedCard.patientLevel = `空`;
    bedCard.patientVisitId = '';
    bedCard.arrivalDate = '';
    bedCard.dig = '';
    bedCard.level = null;
    bedCard.bedFlag = null;
    this.getPatient.bedCode = '';
    bedCard.visitDoctorName = '';
    bedCard.visitNurseName = '';
    bedCard.gender = '';
    bedCard.age = '';
    return;
  }
}
</script>
<style lang="less">
.BedCardList {
  height: 100%;
  overflow: hidden;
  background-color: #f5f5f5;
  .iconfont {
    font-size: 65px;
    color: #b3b3b3;
    position: absolute;
    left: 220px;
    top: 40px;
  }
  .bedCard-list {
    list-style-type: none;
    margin: auto;
    padding: 0px 30px;
    // width:calc(~"100% - 15px" );
    li {
      background-color: #ffffff;
      display: inline-block;
      margin: 10px;
      position: relative;
      &:hover {
        box-shadow: 1px 1px 10px #666;
        cursor: pointer;
        .bedTool{
          display: block;
        }
      }
      .colornull {
        background: #b3b3b3;
      }
      .color1 {
        background: #c1272d;
      }
      .color2 {
        //   background: #ff931e;
        background: #c1272d;
      }
      .color3 {
        background: #ff931e;
      }
      .color4 {
        background: #009245;
      }
      .bedCard-list-span{
          background-color: #3fa9f5;
      }
      .bedCard-list-span-1 {
        background-color: #3fa9f5;
        color: #fff;
        line-height: 30px;
        font-size: 18px;
        display: inline-block;
        padding-left: 5px;
        width: 160px;
      }
      .bedCard-list-span-2 {
        background-color: #3fa9f5;
        color: #fff;
        line-height: 30px;
        font-size: 18px;
        display: inline-block;
        padding-right: 5px;
        width: 100px;
        text-align: right;
      }
      .bedCard-list-span-3 {
        // background-color:#c1272d;
        background-color: #3fa9f5;
        color: #fff;
        line-height: 30px;
        display: inline-block;
        font-size: 18px;
        text-align: center;
        width: 35px;
      }
      .bedCardInfo {
        color: #0071bc;
        font-weight: bold;
        line-height: 30px;
        font-size: 14px;
        margin-left: 5px;
        width: 70px;
        text-align: right;
        display: inline-block;
      }
      .diagClass {
        display: inline-table;
      }
      .bedTool{
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        left:0;
        background: rgba(0,0,0,0.2);
        display: none;
        border: none;
        outline: none;
      }
    }
  }
}
</style>

