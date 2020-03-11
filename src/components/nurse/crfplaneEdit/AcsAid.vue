<template>
    <div class="AcsAid">
     <el-scrollbar :style="{height:'100%'}">
      <el-form :model="value" ref="form" label-width="170px" :rules="rules">
          <section>
              <fieldset class="fieldset">
              <legend>ACS给药</legend>
            </fieldset>
              <el-form-item label="抗血小板首次药时间：" prop="acsDeliveryTime"  style="width:33.3%">
                <yn-date-time-pick v-model="value.cpcEmergenModel.acsDeliveryTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="阿司匹林：" prop="aspirinDose" style="width:37%">
                <el-input placeholder="" v-model="value.cpcEmergenModel.aspirinDose">
                  <template slot="append">mg</template>
                </el-input>
              </el-form-item>
              <el-form-item label="" class="followSpan" prop="age" style="margin-left:10px;width:16%">
                <el-radio-group v-model="value.cpcEmergenModel.acsDrugType">
                  <el-radio v-for="(item,i) in acsDrugType" :key="i" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="" class="followSpan" style="margin-left:10px;width:12%" prop="age">
                <el-input placeholder="" v-model="value.cpcEmergenModel.acsDrugDose">
                  <template slot="append">mg</template>
                </el-input>
              </el-form-item>
               <el-form-item label="给药时间：" prop="anticoagulationDate" style="width:33.3%">
                <yn-date-time-pick v-model="value.cpcEmergenModel.anticoagulationDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="药物：" prop="anticoagulationDrug" style="width:32.8%">
                <el-select
                    v-model="value.cpcEmergenModel.crUnit"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,i) in dictFilter('anticoagulationDrug')"
                      :label="item.label"
                      :key="i"
                      :value="item.value"
                    />
                </el-select>
              </el-form-item>
              <el-form-item label="剂量（含单位）：" prop="anticoagulationUnit" style="width:33.3%">
                <el-input type="anticoagulationUnit" v-model="value.cpcEmergenModel.anticoagulationUnit" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="开始溶栓时间：" prop="thromCheckDate" style="width:30%">
                <yn-date-time-pick v-model="value.cpcDiagTreatModel.thromCheckDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
              </el-form-item>
              <el-form-item label="首次抗凝给药：" prop="anticoagulationDrug" style="width:80%">
                <el-radio-group v-model="value.cpcEmergenModel.anticoagulationDrug">
                  <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否适合溶栓：" style="width:33%">
              <el-radio-group v-model="value.cpcDiagTreatModel.thromCheck">
                <el-radio v-for="(item,i) in dictFilter('ifSuitable')" :key="i" :label="item.value" :disabled="isDisabled">{{item.label}}</el-radio>
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
export default class AcsAid extends Vue {
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
    .AcsAid{
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
    }
</style>
<style lang="less" scoped>
    .AcsAid{
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
