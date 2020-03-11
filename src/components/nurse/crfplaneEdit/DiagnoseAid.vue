<template>
    <div class="DiagnoseAid">
     <el-scrollbar :style="{height:'100%'}">
      <el-form :model="value" ref="form" label-width="170px" :rules="rules">
          <section>
              <fieldset class="fieldset">
              <legend>诊断</legend>
              </fieldset>
              <div style="width:100%">
              <el-radio-group v-model="value.cpcEmergenModel.cpDiagnosisCode" style="margin-left:110px;">
                <el-radio v-for="(item,i) in cpDiagnosisCode" :key="i" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
              </div>
              <el-form-item label="初步诊断时间：" style="width:33.3%">
                <yn-date-time-pick v-model="value.cpcDiagTreatModel.firstTreatmentTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled">
                </yn-date-time-pick>
              </el-form-item>
               <el-form-item label="医生：" prop="age" style="width:33.3%">
                <el-input v-model="value.cpcEmergenModel.firstDoctorName" autocomplete="off"/>
              </el-form-item>
              <!-- <div style="margin-left:120px;">
                <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="2" >STEMI</el-radio>
                <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="3" >NSTEMI</el-radio>
                <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="4" >UA</el-radio>
                <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="5" >主动脉夹层</el-radio>
                <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="6" >肺动脉栓塞</el-radio>
                <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="7" >非ACS胸痛</el-radio>
                <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="8" >非心源性胸痛</el-radio>
              </div> -->
              <div style="margin-left:110px;" v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[6].value">
                <el-checkbox v-model="value.cpcEmergenModel.arrhythmia" >心律失常</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.dcm">扩张性心肌病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.icm">缺血性心肌病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.hcm">肥厚型心肌病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.carditis">心肌炎</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.chd">冠心病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.avhd">瓣膜性心脏病</el-checkbox>
              </div>
              <div style="margin-left:110px;" v-if="value.cpcEmergenModel.cpDiagnosisCode===cpDiagnosisCode[7].value">
                <el-checkbox v-model="value.cpcEmergenModel.rd" >呼吸系统病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.dsd">消化系统病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.nsd">神经系统病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.pd">精神系统病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.md">肌肉骨骼病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.ssd">皮肤系统病</el-checkbox>
                <el-checkbox v-model="value.cpcEmergenModel.other">其他</el-checkbox>
              </div>
              <el-form-item label="24小时强化他汀治疗：（阿托伐他汀40mg/瑞舒伐他汀20mg）" class="levelClass">
                <el-radio-group v-model="value.cpcDiagTreatModel.intensifyStatinsTreat" :disabled="isDisabled">
                  <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="β受体阻滞剂使用：" style="width:33%">
                <el-radio-group v-model="value.cpcDiagTreatModel.receptorRetardantUsing" :disabled="isDisabled">
                  <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
          </section>
      </el-form>
     </el-scrollbar>   
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

const df = Vue.filter('dictFilter');
@Component({})
export default class DiagnoseAid extends Vue {
  @Prop({default: {
    cpcRegModel: {
      name: ''
    },
    cpcOutModel: {},
    cpcEmergenModel: {},
    cpcDiagTreatModel: {
    cpDiagnosisCodeList: []
    },
  }})
  public value!: any;
  public gg = [];
  public isIf = df('is_if');
  public helpCode = df('helpCode');
  public cpDiagnosisCode1 = df('cpDiagnosisCode1');
  public firstMedicalContact = df('first_medical_contact');
  public getToHospitalType = df('get_to_hospital_type');
  public dispatchUnitCode = df('dispatchUnitCode');
  public firstMcCode = df('firstMcCode');
  public consciousnessType = df('consciousnessType');
  public cpDiagnosisCode = df('cpDiagnosisCode');
  public acsDrugType = df('acsDrugType');
  public sex = df('sex');
  public ifSuitable = df('ifSuitable');
  public riskLamination = df('riskLamination');
  public thromTreatmentPlace = df('thromTreatmentPlace');
  public thromDrug = df('thromDrug');
  public thromDrugUnit = df('thromDrugUnit');
  public dictFilter = (type: string) => df(type);
}
</script>
<style lang="less">
    .DiagnoseAid{
      .el-form-item{
        width: 25%;
        display: inline-block;
        margin-bottom: 0px;
      }
      .el-form-item.widthAll{
        width: 100%;
        margin-left: -20px;
      }
      .el-checkbox-group{
        margin-left: 110px;
      }
      .timeBox{
        width: 66.7%;
        .el-form-item__label{
          width: 183px !important;
        }
        .el-form-item__content{
          margin-left: 183px !important;
        }
      }
      .el-form-item__label{
        color: #606266;
      }
      .el-select.el-date-editor.el-input{
        margin-left: 20px;
      }
      .el-input-group__append, .el-input-group__prepend{
            background-color: #fff;
            color: #909399;
            vertical-align: middle;
            display: table-cell;
            position: relative;
            border: 0px solid #fff;
            border-radius: 4px;
            padding: 0 20px;
            width: 1px;
            white-space: nowrap;
      }
      .followSpan{
        .el-form-item__content{
          margin-left: 10px !important;
        }
      }
      .drugUnitClass{
        .el-form-item__label{
          width:90px !important;
        }
        .el-form-item__content{
          margin-left: 90px !important;
        }
      }
      .levelClass {
		width: 40%;
		.el-form-item__label {
			width: 250px !important;
		}
		.el-form-item__content {
			margin-left: 290px !important;
		}
	}
    }
</style>
<style lang="less" scoped>
    .DiagnoseAid{
      height: 100%;
      h1{
        border-bottom: 1px solid #ccc;
        margin: 0 0 10px;
        padding-bottom: 10px;
      }
      .submitBtn{
        text-align: center;
        display: block;
        width: 100%;
      }
      .fieldset{
        margin-top: 20px;
        margin: 10px 0 0px;
        border-width: 1px 0 0;
        border-color: #409eff;
        border-style: solid;
        padding: 0;
        legend{
          margin-left: 26px;
          padding: 0 5px;
          font-size: 18px;
          font-weight: 300;
          color: #409eff;
        }
      }
      .buttonBox{
        margin: 20px 0;
        text-align: center;
      }
    }
</style>
