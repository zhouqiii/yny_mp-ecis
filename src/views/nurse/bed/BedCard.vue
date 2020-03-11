<template>
    <div class="beds">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="`${title}`" name="first" class="tabPannel" >
          <el-form :model="nursingCare" status-icon ref="nursingCare" label-width="100px">                                 
            <div class="detail"> 
                <BedCard :bedCardList.sync="bedList" @dragend="dragend" @savaOne="onSaveBedCard"/>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import BedCard from '@/components/nurse/BedCard.vue';
interface Options {
  id: number;
  name: string;
  price: number;
}
@Component({
  metaInfo: {
    titleTemplate: '%s-分配病人床位'
  },
  components: { BedCard }
})
export default class Beds extends Vue {
  public listHeight = window.innerHeight - 230 + 'px';
  public activeName = 'first';
  public title = '分配病人床位';
  public bedList = [];
  /**
   * 操作对象
   */
  public nursingCare: any = {
    id: '',
    nursingCareId: '',
    nurseId: '',
    times: 0,
    beginDate: '',
    endDate: '',
    remark: ''
  };
  // 获取操作类型
  public isOp = location.pathname.split('/')[location.pathname.split('/').length - 1];
  // 护理类型
  public options: Options[] = [];
  // 护士列表
  public optionsNurse = [];
  /**
   * 获取病人
   */
  public get getPatient() {
    return this.$store.getters.GET_PATIENT;
  }
  public levelStyle(item: any) {
        return `color${item.status}`;
    }
  /**
   * 操作
   */
  public mounted() {
    $(window).resize(() => {
            this.listHeight = window.innerHeight - 230 + 'px';
        });
    // this.onGetNurses();
    this.onGetBedCard();
    this.$store.commit('SET_OPBTN_VALUE', [
    {name: '刷新', event: 'onGetBedCard'}, {name: '返回', event: 'onReturnBedCard'},
     {name: '床位管理', event: 'onOperateBedCard'}]);
  }
  /**
   * 获取病人床位
   */
  public onGetBedCard() {
    this.$store.dispatch('GetBedCardList').then(({data}) => {
      this.bedList = data.data;
    });
  }
  /**
   * 获取护士人员
   */
  // public onGetNurses() {
  //   this.$store.dispatch('GetNurses').then(({data}) => {
  //     this.optionsNurse = data.data;
  //   });
  // }

  /**
   * 保存方法
   */
  public onSaveBedCard({isAdd, patient}: any) {
    const patientTriage = {
      visitId: patient.patientVisitId,
      bedCode: (isAdd === 1) ? patient.code : ''
    };
    this.$store.dispatch('SaveBedCard', patientTriage).then(({data}) => {
      if (data.code === 0) {
        this.onGetBedCard();
        this.$message.success('保存成功');
        this.$webSocket((stompClient: StompClient) => {
          stompClient.send('/bed', {});
          stompClient.disconnect();
        });
      }
    });
  }
  /**
   * 返回方法
   */
  public onReturnBedCard() {
    this.$router.push({name: 'notes'});
  }
  /**
   * 床位管理
   */
  public onOperateBedCard() {
    this.$router.push({name: 'bed'});
  }
  public dragend(d: any, d2: any) {
    const obj = [
      {
        visitId: d.patientVisitId,
        bedCode: d.code
      },
      {
        visitId: d2.patientVisitId,
        bedCode: d2.code
      }
    ];
    this.$store.dispatch('SaveBedCardList', obj).then(({data}) => {
      if (data.code === 0) {
        this.$message.success('保存成功');
        this.$webSocket((stompClient: StompClient) => {
          stompClient.send('/bed', {});
          stompClient.disconnect();
        });
      }
    });
  }
  /**
   * watch监听病人进行请求数据
   */
  @Watch('$store.state.patient.patient.visitId')
  public watchVisitId(newValue: any, oldValue: any) {
      this.onGetBedCard();
  }
}
</script>

<style lang="less" scoped>
  .beds{
    height:calc(~"(100% - 95px)");
    width:calc(~"(100% - 270px)");
    position: absolute;
    left: 270px;
    top: 95px;
    .detail{
      height: 100%;
      margin: 10px;
      background-color: #ffffff;
      .rowBottom{
        margin-bottom:20px;
        margin-top:10px;
      }
      .bedName{
        font-weight: bold;
        margin-left: 10px;
        color: #3fa9f5
      }
    }
  }
</style>

<style lang="less">
  .beds{
    .el-form{
      height:calc(~"(100% - 20px)");
      .el-form-item__label{
                color:#1c81c3;
                padding-right:0px;
            }
            .el-form-item__content{
                padding-right:10px;
            }
            .el-input__inner{
                border-bottom:1px solid #eee;
                height:20px;
                line-height:20px;
            }
            .el-form-item{
                margin-bottom:0px;
            }
    }
    .el-input.is-disabled .el-input__inner{
      color:#000000;
    }
    .el-tabs__nav .is-top{
      margin-left:10px;
    }
    .el-textarea{
      margin-top:10px;
    }
    .el-row{
      padding-top:20px;
    }
    .el-badge{
      margin:20px;
    }
    .el-card{
      border: 1px solid #3fa9f5;
      &:hover{
          box-shadow:1px 1px 10px #666;
          cursor: pointer;
      }
    }
    
  }
</style>



