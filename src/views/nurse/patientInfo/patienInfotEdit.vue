<template>
    <div class="PatienInfotEdit">
       <PatientInfoEdit :patient="patient"/>
        <table id="print">
            <tr>
                 <!--<td>
                    <div>病人信息</div>
                    <div>姓名：{{patient.name}}</div>
                    <div>身份证：{{patient.residentIdentityCard}}</div>
                    <div>急诊卡号：{{patient.visitId}}</div>
                    <div>性别：{{patient.sex}}</div>
                    <div>年龄：{{patient.age}}</div>
                </td> -->
                <td>
                    <div id="printimg"></div>
                    <div>编码：{{this.num}}</div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PatientInfoEdit from '@/components/nurse/PatientInfoEdit.vue';
import {encodeUnicode} from '@/util/util';
@Component({
  components: {
    PatientInfoEdit
  }
})
export default class PatienInfotEdit extends Vue {
  public patientStatus = {
    visitId: '',
    status: '',
    callDate: null
  };
  public patientPosition = {
    visitId: '',
    section: ''
  };
  public num = 10000;
  public get patient() {
    return this.$store.getters.GET_PATIENT;
  }
  public mounted() {
    this.$store.commit('SET_OPBTN_VALUE', [
    {name: '打印手环', event: 'onReturnBedCard'},{name: '编辑', event: 'onEdit'},
    {name: '诊区', event: 'onSetDiagArea'}, {name: '留观', event: 'onSetObseArea'},
    {name: '离观', event: 'onLgObseArea'}, {name: '住院', event: 'onOperateBedCard'},
    {name: '出院', event: 'onLeaveHosp'}, {name: '撤销病人', event: 'onRemovePatient'}]);
  }
  // 编辑
  public onEdit() {
      this.$router.push({name: 'patienInfotEdit'});
  }

  // 区域安排诊区
  public onSetDiagArea() {
      if (this.patient.visitId !== '') {
          // if (this.patient.status === '1') {
            this.patientPosition.visitId = this.patient.visitId;
            this.patientPosition.section = '诊区';
            this.$store.dispatch('SetArea', this.patientPosition).then(({data}) => {
            if (data.code === 0) {
                (this.$parent as any).onGetPatientList();
                this.$message.success('诊区安排成功！');
            }
            });
      } else {
      this.$message.warning('请选择病人！');
      }
  }

  // 区域安排留观区
  public onSetObseArea() {
      if (this.patient.visitId !== '') {
            this.patientPosition.visitId = this.patient.visitId;
            this.patientPosition.section = '留观区';
            this.$store.dispatch('SetArea', this.patientPosition).then(({data}) => {
            if (data.code === 0) {
                // (this.$parent as any).onGetPatientList();
                // this.$message.success('留观区安排成功！');
                this.onLiugObseArea();
                }
            });
      } else {
      this.$message.warning('请选择病人！');
      }
  }

  /**
   * 撤销病人
   */
  public onRemovePatient() {
      if (this.patient.visitId !== '') {
          this.patient.status = '888';
          this.$store.dispatch('RemovePatient', this.patient).then(({data}) => {
              if (data.code === 0) {
                  (this.$parent as any).onGetPatientList();
                  this.$message.success('撤销成功！');
              }
              });
      } else {
          this.$message.warning('请选择病人！');
      }
  }
  /**
   * 离观 status=3
   */
  public onLgObseArea() {
    if (this.patient.visitId !== '') {
        this.patient.status = '3';
        this.$store.dispatch('RemovePatient', this.patient).then(({data}) => {
            if (data.code === 0) {
                (this.$parent as any).onGetPatientList();
                this.$message.success('离观成功！');
            }
            });
    } else {
        this.$message.warning('请选择病人！');
    }
  }
    /**
   * 留观 status=6
   */
  public onLiugObseArea() {
    if (this.patient.visitId !== '') {
        this.patient.status = '6';
        this.$store.dispatch('RemovePatient', this.patient).then(({data}) => {
            if (data.code === 0) {
                (this.$parent as any).onGetPatientList();
                this.$message.success('留观成功！');
            }
            });
    } else {
        this.$message.warning('请选择病人！');
    }
  }
  /**
   * 复诊 status=4
   */
  public onFzObseArea() {
      if (this.patient.visitId !== '') {
          this.patient.status = '4';
          this.$store.dispatch('RemovePatient', this.patient).then(({data}) => {
              if (data.code === 0) {
                  (this.$parent as any).onGetPatientList();
                  this.$message.success('复诊成功！');
              }
              });
      } else {
          this.$message.warning('请选择病人！');
      }
  }
  /**
   * 已过号 status=5
   */
  public onPastNum() {
      if (this.patient.visitId !== '') {
          this.patient.status = '5';
          this.$store.dispatch('RemovePatient', this.patient).then(({data}) => {
              if (data.code === 0) {
                  (this.$parent as any).onGetPatientList();
                  this.$message.success('已过号！');
              }
              });
      } else {
          this.$message.warning('请选择病人！');
      }
  }
  /**
   * 出院 status=999
   */
  public onLeaveHosp() {
      if (this.patient.visitId !== '') {
          this.patient.status = '999';
          this.patient.endDate = new Date(new Date()).format('yyyy-MM-dd hh:mm:ss');
          this.$store.dispatch('RemovePatient', this.patient).then(({data}) => {
              if (data.code === 0) {
                  (this.$parent as any).onGetPatientList();
                  this.$message.success('病人出院！');
              }
              });
      } else {
          this.$message.warning('请选择病人！');
      }
  }
    public onReturnBedCard() {
        const print = $('#print');
        const printimg = print.find('#printimg');
        print.show();
        printimg.qrcode({
            width: 100,
            height: 100,
            // text: `{visitId:${encodeUnicode(this.patient.visitId)}}`
            text: `{visitId:"'qwertyuiopasdfghj' + (Math.random() * 1000000000000000)",no:"${++this.num}"}`
        });
        const convertCanvasToImage = (canvas: any) => {
            const image = new Image();
            image.src = canvas.toDataURL('image/png');
            return image;
        };
        const img = convertCanvasToImage(printimg.find('canvas').get(0));
        printimg.html(img);
        setTimeout(() => {
            print.jqprint();
            print.hide();
        }, 400);
    }
}
</script>
<style lang="less" scoped>
    #print{
        display: none;
    }
</style>

