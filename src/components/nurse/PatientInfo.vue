<template>
    <div class="PatientInfo">
        <div class="main">
            <el-scrollbar  v-if="activeName==='first'" :style="{height:listHeight1}">
                <el-form  status-icon  label-width="140px" class="demo-ruleForm">
                    <div class="tabTitle">基本信息</div>
                    <el-form-item label="姓名:">
                        <span>{{patient.name}}</span>
                    </el-form-item>
                    <el-form-item label="身份证号:">
                        <span>{{patient.residentIdentityCard}}</span>
                    </el-form-item>
                    <el-form-item label="出生日期:">
                        <span>{{patient.birthday}}</span>
                    </el-form-item>
                    <el-form-item label="婚姻状态:">
                        <!-- <span>{{patient.maritalStatus}}</span> -->
                            <span v-for="(item,i) in maritalStatus" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.maritalStatus">{{item.label}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="急诊卡号:">
                        <span>{{patient.visitHisCode}}</span>
                    </el-form-item>
                    <el-form-item label="交费方式:">
                        <!-- <span>{{patient.feeType}}</span> -->
                        <span v-for="(item,i) in costType" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.feeType">{{item.label}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="性别:">
                        <!-- <span>{{patient.gender}}</span> -->
                        <span v-for="(item,i) in sex" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.gender">{{item.label}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="民族:">
                        <!-- <span>{{patient.nationId}}</span> -->
                        <span v-for="(item,i) in nations" :key="i">
                            <span class="patient-list-span-3" v-if="item.id == patient.nationId">{{item.name}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="年龄:">
                        <span>{{patient.age}}</span>
                    </el-form-item>
                    <el-form-item label="电话:">
                        <span>{{patient.phone}}</span>
                    </el-form-item>
                    <el-form-item label="原籍:" class="form-item-1">
                        <span>{{patient.nativePlace}}</span>
                    </el-form-item>
                    <el-form-item label="住址:" class="form-item-1">
                        <span>{{patient.addressDetail}}</span>
                    </el-form-item>
                    <el-form-item label="主要状况:" class="form-item-1">
                        <span>{{patient.illnessState}}</span>
                    </el-form-item>

                    <div class="tabTitle">到院信息</div>
                    <el-form-item label="到院时间:">
                        <span>{{patient.arrivalDate}}</span>
                    </el-form-item>
                    <el-form-item label="到院方式:">
                        <!-- <span>{{patient.arrivalMethod}}</span> -->
                            <span v-for="(item,i) in getToHospitalType" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.arrivalMethod">{{item.label}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="绿色通道:">
                        <!-- <span>{{patient.ifGreenChannel}}</span> -->
                            <span v-for="(item,i) in isIf" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.ifGreenChannel">{{item.label}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="首次医疗接触:">
                        <!-- <span>{{patient.ifGreenChannel}}</span> -->
                            <span v-for="(item,i) in firstMedicalContact" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.firstMedicalContact">{{item.label}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="发热门诊:">
                        <!-- <span>{{patient.ifFever}}</span> -->
                            <span v-for="(item,i) in isIf" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.ifFever">{{item.label}}</span>
                        </span>
                        
                    </el-form-item>
                    <el-form-item label="是否胸痛:">
                        <!-- <span>{{patient.ifThoracalgia}}</span> -->
                        <span v-for="(item,i) in isIf" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.ifThoracalgia">{{item.label}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="不明原因死亡:">
                        <!-- <span>{{patient.ifNoreasonDeath}}</span> -->
                        <span v-for="(item,i) in isIf" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.ifNoreasonDeath">{{item.label}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="三无人员:">
                        <!-- <span>{{patient.ifWithoutId}}</span> -->
                        <span v-for="(item,i) in isIf" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.ifWithoutId">{{item.label}}</span>
                        </span>
                    </el-form-item>
                    <el-form-item label="陪送人员:">
                        <span>{{patient.accompany}}</span>
                    </el-form-item>
                    <el-form-item label="陪送电话:">
                        <span>{{patient.accompanyPhone}}</span>
                    </el-form-item>
                    <el-form-item label="陪送关系:">
                        <span>{{patient.accompanyRelation}}</span>
                    </el-form-item>
                    <el-form-item label="陪送地址:">
                        <span>{{patient.accompanyAddress}}</span>
                    </el-form-item>
                    <div class="tabTitle">生命体征</div>
                    <el-form-item label="体温(℃):">
                        <span>{{patient.temperature}}</span>
                    </el-form-item>
                    <el-form-item label="呼吸(次/分):">
                        <span>{{patient.breathe}}</span>
                    </el-form-item>
                    <el-form-item label="血压(mmHg):">
                        <span>{{patient.systolicPressure}}/{{patient.diastolicPressure}}</span>
                    </el-form-item>
                    <el-form-item label="心率(次/分):">
                        <span>{{patient.heartRate}}</span>
                    </el-form-item>
                    <el-form-item label="血氧饱和度(%):">
                        <span>{{patient.so2}}</span>
                    </el-form-item>
                </el-form>
            </el-scrollbar>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
interface Patient {
  birthday: string;
  diagnosisList: string;
  name: string;
  gender: string;
  age: string;
  bedCode: string;
  dig: string;
  residentIdentityCard: string;
  visitCard: string;
  nativePlace: string;
  addressDetail: string;
  maritalStatus: string;
  feeType: string;
  phone: string;
  arrivalDate: string;
  arrivalMethod: string;
  firstMedicalContact: string;
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
  nationId: string;
  status: string;
  visitId: string;
  illnessState: string;
}

const df = Vue.filter('dictFilter');

@Component
export default class PatientInfo extends Vue {
    @Prop()
    public patient!: Patient;

    public isIf = df('is_if');
    public maritalStatus = df('marital_status');
    public sex = df('sex');
    public nations = common.config.nations;
    public getToHospitalType = df('get_to_hospital_type');
    public costType = df('cost_type');
    public firstMedicalContact = df('first_medical_contact');

    public  activeName = 'first';
    public listHeight1 = window.innerHeight - 110 + 'px';
    public mounted() {
        $(window).resize(() => this.listHeight1 = window.innerHeight - 110 + 'px');
    }
}
</script>
<style lang="less">
    .PatientInfo{
        .el-form-item {
            margin-bottom: 0px;
            width: 50%;
            float: left;
        }
        .el-form-item__label {
            font-weight: bold;
            color:#0071bc;
        }
    }
</style>
<style lang="less" scoped>
    .PatientInfo{
        height:calc(~"100% - 95px");
        width: calc(~"100% - 270px");
        background-color: #f5f5f5;
        position: absolute;
        right: 0px;
        top: 95px;
        .main{
            margin-left:10px;
            .form-item-1{
                width:100%;
            }
            .tabTitle{
                font-size: 16px;
                font-weight: 600;
                margin-top: 10px;
                margin-left: 20px;
            }
        }
    }
</style>
