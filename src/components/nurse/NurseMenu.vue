<template>
    <div class="NurseMenu">
        <span class="menu-title">病人:</span>
        <span class="menu-value">{{patient.name ? patient.name : ''}}</span>
        <span class="menu-title">急诊号:</span>
        <span class="menu-value">{{patient.visitHisCode ? patient.visitHisCode : ''}}</span>
        <span class="menu-title">性别:</span>
        <span v-for="(item,i) in sex" :key="i">
            <span class="menu-value" v-if="item.value == patient.gender">{{item.label}}</span>
        </span>
        <!-- <span class="menu-value">{{patient.gender}}</span> -->
        <span class="menu-title">年龄:</span>
        <span class="menu-value">{{patient.age?`${patient.age}岁`:''}}</span>
        <span class="menu-title">床号:</span>
        <span class="menu-value">{{patient.bedCode ? patient.bedCode : ''}}</span>
        <span class="menu-title">状态:</span>
        <span v-for="(item,i) in visitStatus" :key="i">
            <span class="menu-value1" v-if="item.value == patient.status">
            {{item.label}}
            </span>
        </span>
        <div class="menu-right">
            <slot name="opbtn">
                <!-- <div @click="called()">叫号</div>
                <div>接诊</div>
                <div>打印手环</div>
                <div>留观</div>
                <div>住院</div>
                <div>出院</div>
                <div>编辑</div>
                <div @click="onRemovePatient()">撤销病人</div> -->
            </slot>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
const df = Vue.filter('dictFilter');
interface Patient {
  name?: string;
  visitId?: string|number;
  gender?: string|number;
  age?: string|number;
  bedCode?: string|number;
  dig?: string|number;
  status?: string|number;
  illnessState?: string|number;
}
@Component
export default class NurseMenu extends Vue {
public patient: Patient = {};
public sex = df('sex');
public visitStatus = df('visit_status'); // 病人状态
public called() {
    if (this.patient.visitId !== '') {
        if (this.patient.status === '0') {
            this.$store.dispatch('Called', this.patient).then(({data}) => {
            if (data.code === 0) {
                this.$emit('onFresh');
                this.sendMessage();
                this.$message.success('叫号成功！');
            }
            });
        } else {
            this.$message.warning('该病人已叫号！');
        }
    } else {
    this.$message.warning('请选择病人！');
    }
}

/**
 * 撤销病人
 */
public onRemovePatient() {
    if (this.patient.visitId !== '') {
        // let patientVO = this.patient;
        this.patient.status = '888';
        // debugger;
        this.$store.dispatch('RemovePatient', this.patient).then(({data}) => {
            if (data.code === 0) {
                // this.$emit('onFresh');
                this.sendMessage();
                this.$message.success('撤销成功！');
            }
            });
    } else {
        this.$message.warning('请选择病人！');
    }
}

public sendMessage() {
    // 地址+端点路径，构建websocket链接地址
    const socket = new SockJS(common.config.webSocketUrl + '/pretriage/bullet');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame: any) => {
        stompClient.send('/chat', {}, {});
        stompClient.disconnect();
    });
  }
  private mounted() {
      this.patient = this.$store.getters.GET_PATIENT;
  }
  @Watch('$store.getters.GET_PATIENT')
  private watchPatient(newVal: any) {
      this.patient = newVal;
  }
}
</script>
<style lang="less">

</style>
<style lang="less" scoped>
    .NurseMenu{
        height: 35px;
        width: calc(~"100% - 270px");
        background-color: #e6e6e6;
        position: absolute;
        right: 0px;
        top: 60px;
        overflow: hidden;
        line-height:35px;
        span{
            font-size:14px;
             display: inline-block;
        }
        .menu-title{
            font-weight:bold;
            color:#0071bc;
            width:50px;
            margin-left:10px;
        }
        .menu-value{
            padding-right: 10px;
        }
        .menu-value1{
            padding-right: 10px;
            color : rgb(0, 0, 0);
            font-size:14px;
        }
        .dig{
            color : red;
        }
        .menu-right{
            width:auto;
            height:100%;
            background-color:#3fa9f5;
            float:right;
            div{
                float: left;
                padding:0px 10px;
                color:#f2f2f2;
                font-size:14px;
                cursor: pointer;
                &:hover{
                    background:#0480d2;
                }
            }
        }
    }
</style>
