<template>
    <div class="CompanyAid">
     <el-scrollbar :style="{height:'100%'}">
      <el-form :model="value" ref="form" label-width="170px" :rules="rules">
      <section>
        <fieldset class="fieldset">
        <legend>诊断</legend>
        </fieldset>
        <el-form-item label="肌钙蛋白：抽血时间 ：" prop="samplingTime" style="width:33.3%">
          <yn-date-time-pick v-model="value.cpcEmergenModel.samplingTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="报告时间：" prop="reportTime" style="width:33.3%;margin-left:-3%">
          <yn-date-time-pick v-model="value.cpcEmergenModel.reportTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <div>
        <el-form-item label="cTnI：" prop="ctniValue" style="width:30%;">
          <el-input type="ctniValue" v-model="value.cpcEmergenModel.ctniValue" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="单位：" style="width:30.5%">
          <el-select
              v-model="value.cpcEmergenModel.ctniUnit"
              placeholder="ng/ml"
            >
              <el-option
                v-for="(item,i) in dictFilter('ctniUnit')"
                :label="item.label"
                :key="i"
                :value="item.value"
              />
          </el-select>
        </el-form-item>
        </div>
        <div>
        <el-form-item label="血清肌酐：" prop="age" style="width:30%">
          <el-input type="age" v-model="value.cpcEmergenModel.crValue" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="单位：" style="width:30.5%">
          <el-select
          v-model="value.cpcEmergenModel.crUnit"
          placeholder="umol/L"
          >
            <el-option
              v-for="(item,i) in dictFilter('crUnit')"
              :label="item.label"
              :key="i"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        </div>
      </section>
      <section>
        <fieldset class="fieldset">
          <legend>生命体征</legend>
        </fieldset>
          <el-form-item label="意识：" prop="consciousnessType" style="width:30%">
            <el-select
                  v-model="value.cpcEmergenModel.consciousnessType"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item,i) in dictFilter('consciousnessType')"
                    :label="item.label"
                    :key="i"
                    :value="item.value"
                  />
                </el-select>
          </el-form-item>
          <el-form-item label="呼吸：" prop="respirationRate" style="width:35%">
            <el-input placeholder="" v-model="value.cpcEmergenModel.respirationRate">
              <template slot="append">次/分钟</template>
            </el-input>
          </el-form-item>
          <el-form-item label="脉搏：" prop="pulseRate" style="width:35%">
            <el-input placeholder="" v-model="value.cpcEmergenModel.pulseRate">
              <template slot="append">次/分钟</template>
            </el-input>
          </el-form-item>
          <el-form-item label="心率：" prop="heartRate" style="width:31.3%">
            <el-input placeholder="" v-model="value.cpcEmergenModel.heartRate">
              <template slot="append">次/分钟</template>
            </el-input>
          </el-form-item>
          <el-form-item label="血压：" prop="bloodPressure" style="width:35%;margin-left:-1.2%;">
            <el-input placeholder="--/--" v-model="value.cpcEmergenModel.bloodPressure">
              <template slot="append">mmHg格式(--/--) </template>
            </el-input>
        </el-form-item>
        <el-form-item label="Killip分级：" prop="killipLevel" style="width:33.3%">
          <el-select
              v-model="value.cpcEmergenModel.killipLevel"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,i) in dictFilter('killipLevel')"
                :label="item.label"
                :key="i"
                :value="item.value"
              />
          </el-select>
        </el-form-item>
      </section>
    <section>
      <fieldset class="fieldset">
        <legend>检查</legend>
      </fieldset>
        <el-form-item label="急诊超声开始时间：" style="width:33.3%">
          <yn-date-time-pick v-model="value.cpcEmergenModel.outhospitalVisitTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="超声结束时间：" style="width:35%;margin-left:-3%;">
          <yn-date-time-pick v-model="value.cpcEmergenModel.transferTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="诊断时间：" style="width:33.3%">
          <yn-date-time-pick v-model="value.cpcEmergenModel.ambulanceArrivedTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"/>
        </el-form-item>
      <el-form-item label="医生签字：" prop="age" style="width:30%">
          <el-input v-model="value.cpcEmergenModel.firstDoctorName" autocomplete="off"/>
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
export default class CompanyAid extends Vue {
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
    .CompanyAid{
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
    .CompanyAid{
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
