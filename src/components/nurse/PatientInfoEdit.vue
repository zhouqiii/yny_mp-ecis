<template>
    <div class="PatientInfoEdit">
        <div class="main">
            <el-scrollbar  v-if="activeName==='first'" :style="{height:listHeight1}">
                <el-form  status-icon  label-width="140px" class="demo-ruleForm">
                    <div class="tabTitle">基本信息</div>
                    <el-form-item label="姓名：" prop="name">
                        <el-input type="name" v-model="patient.name" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="身份证号:" prop="residentIdentityCard">
                        <el-input type="residentIdentityCard" v-model="patient.residentIdentityCard" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="出生日期:" prop="birthday" style="width:50%;">
                        <el-date-picker
                            v-model="patient.birthday"
                            type="date"
                            style="width:100%;"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="急诊卡号:" prop="visitHisCode">
                        <el-input type="visitHisCode" v-model="patient.visitHisCode" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="婚姻状态:" prop="patient.maritalStatus">
                    <el-radio-group v-model="patient.maritalStatus">
                      <el-radio :label="item.value" v-for="(item, i) in maritalStatus" :key="i">{{item.label}}</el-radio>
                    </el-radio-group>
                        <!-- <span>{{patient.maritalStatus}}</span> -->
                        <!-- <el-input type="maritalStatus" v-model="patient.maritalStatus" autocomplete="off"/> -->
                    </el-form-item>
                    <el-form-item label="性别：" prop="gender">
                        <el-radio v-model="patient.gender" v-for="(item,i) in sex" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-form-item>
                    <!-- <el-form-item label="性别:" prop="maritalStatus">
                         <span>{{patient.gender}}</span> 
                        <span v-for="(item,i) in sex" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.nationId">{{item.label}}</span>
                        </span>
                    </el-form-item> -->
                    <el-form-item label="交费方式:" prop="feeType">
                       <el-select
                            v-model="patient.feeType"
                        >
                        <el-option
                            v-for="(item,i) in costType"
                            :label="item.label"
                            :key="i" 
                            :value="item.value"
                        />
                        </el-select>
                        <!-- <span>{{patient.feeType}}</span>
                         <span v-for="(item,i) in costType" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.feeType">{{item.label}}</span>
                        </span> -->
                    </el-form-item>
                    <el-form-item label="民族:" prop="patient.nationId">
                        <!-- <span>{{patient.nationId}}</span> -->
                     <el-select v-model="patient.nationId">
                      <el-option
                        v-for="(item,i) in nations"
                        :label="item.name"
                        :key="i" 
                        :value="+item.id"
                      />
                     </el-select>
                        <!-- <span v-for="(item,i) in nations" :key="i">
                            <span class="patient-list-span-3" v-if="item.id == patient.nationId">{{item.name}}</span>
                        </span> -->
                    </el-form-item>
                    <el-form-item label="年龄:" >
                        <el-input type="age" v-model="patient.age" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="电话:">
                        <el-input type="phone" v-model="patient.phone" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="原籍:" class="form-item-1" style="width:50%;">
                        <el-input type="nativePlace" v-model="patient.nativePlace" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="住址:" class="form-item-1" style="width:50%;">
                        <el-input type="addressDetail" v-model="patient.addressDetail" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="主要状况:" class="form-item-1" style="width:100%;">
                         <el-input type="illnessState" v-model="patient.illnessState" autocomplete="off"/>
                    </el-form-item>
                    <div>
                    <div class="tabTitle">到院信息</div>
                    </div>
                    <el-form-item label="到院时间:">
                         <el-date-picker
                            v-model="patient.arrivalDate"
                            type="datetime"
                            style="width:100%;"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="到院方式:" prop="arrivalMethod">
                        <el-select
                            v-model="patient.arrivalMethod"
                        >
                        <el-option
                            v-for="(item,i) in getToHospitalType"
                            :key="i" 
                            :value="+item.value" 
                            :label="item.label"
                        />
                        </el-select>
                        <!-- <span>{{patient.arrivalMethod}}</span> -->
                        <!-- <el-radio v-model="patient.arrivalMethod" v-for="(item,i) in getToHospitalType" :key="i" :vale="item.value">{{item.label}}</el-radio> -->
                            <!-- <span v-for="(item,i) in getToHospitalType" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.arrivalMethod">{{item.label}}</span>
                        </span> -->
                    </el-form-item>
                    <el-form-item label="绿色通道:">
                        <!-- <span>{{patient.ifGreenChannel}}</span> -->
                         <el-radio v-model="patient.ifGreenChannel" v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                            <!-- <span v-for="(item,i) in isIf" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.ifGreenChannel">{{item.label}}</span> -->
                        <!-- </span> -->
                    </el-form-item>
                    <el-form-item label="首次医疗接触:" prop="firstMedicalContact">
                        <el-select
                            v-model="patient.firstMedicalContact"
                        >
                        <el-option
                            v-for="(item,i) in firstMedicalContact"
                            :key="i"
                            :value="+item.value" 
                            :label="item.label"
                        />
                        </el-select>
                        <!-- <span>{{patient.ifGreenChannel}}</span> -->
                            <!-- <span v-for="(item,i) in firstMedicalContact" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.firstMedicalContact">{{item.label}}</span>
                        </span> -->
                    </el-form-item>
                    <el-form-item label="发热门诊:">
                        <!-- <span>{{patient.ifFever}}</span> -->
                            <!-- <span v-for="(item,i) in isIf" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.ifFever">{{item.label}}</span>
                        </span> -->
                        <el-radio v-model="patient.ifFever" v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-form-item>
                    <el-form-item label="是否胸痛:">
                        <!-- <span>{{patient.ifThoracalgia}}</span> -->
                        <!-- <span v-for="(item,i) in isIf" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.ifThoracalgia">{{item.label}}</span>
                        </span> -->
                        <el-radio v-model="patient.ifThoracalgia" v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-form-item>
                    <el-form-item label="不明原因死亡:">
                        <!-- <span>{{patient.ifNoreasonDeath}}</span> -->
                        <!-- <span v-for="(item,i) in isIf" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.ifNoreasonDeath">{{item.label}}</span>
                        </span> -->
                         <el-radio v-model="patient.ifNoreasonDeath" v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-form-item>
                    <el-form-item label="三无人员:">
                        <!-- <span>{{patient.ifWithoutId}}</span> -->
                        <!-- <span v-for="(item,i) in isIf" :key="i">
                            <span class="patient-list-span-3" v-if="item.value == patient.ifWithoutId">{{item.label}}</span>
                        </span> -->
                        <el-radio v-model="patient.ifWithoutId" v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                    </el-form-item>
                    <el-form-item label="陪送人员:">
                        <el-input type="accompany" v-model="patient.accompany" autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="陪送电话:">
                        <el-input type="accompanyPhone" v-model="patient.accompanyPhone" autocomplete="off"/>
                        <!-- <span>{{patient.accompanyPhone}}</span> -->
                    </el-form-item>
                    <el-form-item label="陪送关系:">
                        <el-input type="accompanyRelation" v-model="patient.accompanyRelation" autocomplete="off"/>
                        <!-- <span>{{patient.accompanyRelation}}</span> -->
                    </el-form-item>
                    <el-form-item label="陪送地址:">
                        <el-input type="accompanyAddress" v-model="patient.accompanyAddress" autocomplete="off"/>
                        <!-- <span>{{patient.accompanyAddress}}</span> -->
                    </el-form-item>
                    <div class="tabTitle">生命体征</div>
                    <el-form-item label="体温(℃):">
                        <el-input type="temperature" v-model="patient.temperature" autocomplete="off"/>
                        <!-- <span>{{patient.temperature}}</span> -->
                    </el-form-item>
                    <el-form-item label="呼吸(次/分):">
                    <el-input type="breathe" v-model="patient.breathe" autocomplete="off"/>
                        <!-- <span>{{patient.breathe}}</span> -->
                    </el-form-item>
                    <el-form-item label="血压(mmHg):">
                        <!-- <el-input :value="patient.systolicPressure"/> -->
                        <span>{{patient.systolicPressure}}/{{patient.diastolicPressure}}</span>
                    </el-form-item>
                    <el-form-item label="心率(次/分):">
                    <el-input type="heartRate" v-model="patient.heartRate" autocomplete="off"/>
                        <!-- <span>{{patient.heartRate}}</span> -->
                    </el-form-item>
                    <el-form-item label="血氧饱和度(%):">
                        <el-input type="so2" v-model="patient.so2" autocomplete="off"/>
                        <!-- <span>{{patient.so2}}</span> -->
                    </el-form-item> 
                    <el-button type="primary"  @click="saveDate" style="margin-left:45%;margin-top:10px;">保存</el-button>
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
export default class PatientInfoEdit extends Vue {
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
    .PatientInfoEdit{
        .el-form-item {
            margin-bottom: 0px;
             margin-top: 2px;
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
    .PatientInfoEdit{
        height:calc(~"100% - 95px");
        width: calc(~"100% - 270px");
        background-color: #f5f5f5;
        position: absolute;
        right: 0px;
        top: 95px;
        .main{
            margin-left:0px;
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
