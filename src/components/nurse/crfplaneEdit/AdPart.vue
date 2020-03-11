<template>
    <div class="AdPart">
     <el-scrollbar :style="{height:'100%'}">
      <el-form :model="value" ref="form" label-width="170px" :rules="rules">
          <section>
            <fieldset class="fieldset">
            <legend>急诊CT</legend>
            </fieldset>
            <el-form-item label="通知CT时间：" prop="ctNoticeDate"  style="width:33.3%">
                <yn-date-time-pick
                  v-model="value.cpcDiagTreatModel.ctNoticeDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </yn-date-time-pick>
              </el-form-item>
              <el-form-item label="CT室完成准备时间：" prop="ctFinishDate" style="width:33.3%">
                <yn-date-time-pick
                  v-model="value.cpcDiagTreatModel.ctFinishDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </yn-date-time-pick>
              </el-form-item>
              <el-form-item label="CT人员到达时间：" prop="userArriveDate"  style="width:33.3%">
                <yn-date-time-pick
                  v-model="value.cpcDiagTreatModel.userArriveDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </yn-date-time-pick>
              </el-form-item>
              <el-form-item label="患者到达CT室时间：" prop="ctArriveDate" style="width:33.3%">
                <yn-date-time-pick
                  v-model="value.cpcDiagTreatModel.ctArriveDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </yn-date-time-pick>
              </el-form-item>
              <el-form-item label="CT扫描开始时间：" prop="ctScanDate" style="width:33.3%">
                <yn-date-time-pick
                  v-model="value.cpcDiagTreatModel.ctScanDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </yn-date-time-pick>
              </el-form-item>
              <el-form-item label="CT报告时间：" prop="ctReportDate" style="width:33.3%">
                <yn-date-time-pick
                  v-model="value.cpcDiagTreatModel.ctReportDate"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </yn-date-time-pick>
              </el-form-item>
            </section>
            <section>
            <fieldset class="fieldset">
            <legend>夹层</legend>
            </fieldset>
            <el-form-item label="心内科会诊时间：" prop="imcdConsultationDate" style="width:33.3%">
              <el-date-picker
                v-model="value.cpcDiagTreatModel.imcdConsultationDate"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="通知心外科会诊时间：" prop="imcdNoticeDate" style="width:33.3%">
              <el-date-picker
                v-model="value.cpcDiagTreatModel.imcdNoticeDate"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="心外科会诊时间：" prop="eccConsultationDate" style="width:33.3%">
              <el-date-picker
                v-model="value.cpcDiagTreatModel.eccConsultationDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="夹层类型：" style="width:33.3%">
              <el-radio v-model="mezzanineType" label="A">A型</el-radio>
              <el-radio v-model="mezzanineType" label="B">B型</el-radio>
            </el-form-item>
            <el-form-item label="治疗策略：" style="width:45%">
              <el-checkbox label="紧急介入治疗" v-model="treatmentType"></el-checkbox>
              <el-checkbox label="择期介入治疗" v-model="treatmentType"></el-checkbox>
              <el-checkbox label="保守治疗" v-model="treatmentType"></el-checkbox>
              <el-checkbox label="外科手术" v-model="treatmentType"></el-checkbox>
            </el-form-item> -->
            <el-form-item label="介入：进入CCU时间：" style="width:33.3%">
              <el-date-picker
                v-model="value.cpcDiagTreatModel.ccuIntoDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>  
            <el-form-item label="开始介入治疗时间：" style="width:33.3%">
              <el-date-picker
                v-model="value.cpcDiagTreatModel.startTreateDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item> 
            <el-form-item label="支架释放时间：" style="width:33.3%">
              <el-date-picker
                v-model="value.cpcDiagTreatModel.standRidDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="手术：决定手术时间：" style="width:33.3%">
              <el-date-picker
                v-model="value.cpcDiagTreatModel.decisionOperationTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="开始知情同意时间：" style="width:33.3%">
              <el-date-picker
                v-model="value.cpcDiagTreatModel.startAgreeTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="签手术同意书时间：" style="width:33.3%">
              <el-date-picker
                v-model="value.cpcDiagTreatModel.signOperateAgreeTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="手术开始时间：" style="width:33.3%">
              <el-date-picker
                v-model="value.cpcDiagTreatModel.startInterventionDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item> 
            <el-form-item label="手术结束时间：" style="width:33.3%">
              <el-date-picker
                v-model="value.cpcDiagTreatModel.endInterventionDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="手术结果：" style="width:33.3%">
             <el-input type="text" v-model="value.cpcDiagTreatModel.operationResult" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="夹层类型：" style="width:33.3%">
              <el-radio-group v-model="value.cpcDiagTreatModel.interlayerType">
                <el-radio v-for="(item,i) in interlayerType" :key="i" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="治疗策略：" prop="treatmentStrategyCode"  style="width:65%">
                <el-radio-group v-model="value.cpcDiagTreatModel.treatmentStrategyCode">
                  <el-radio v-for="(item,i) in treatmentStrategyCode" :key="i" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
            </el-form-item>
            </section>
            <section>
            <fieldset class="fieldset">
            <legend>肺栓塞</legend>
            </fieldset>  
            <el-form-item label="危险分层：" prop="riskLamination" style="width:66.6%">
                <el-radio-group v-model="value.cpcEmergenModel.riskLamination">
                  <el-radio v-for="(item,i) in riskLamination" :key="i" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="开始抗凝治疗时间：" prop="antiTreatmentDate" style="width:33.3%">
              <el-date-picker
                v-model="value.cpcDiagTreatModel.antiTreatmentDate"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="溶栓：" prop="isThrombolysisDt" style="width:33.3%">
              <el-checkbox v-model="value.cpcRegModel.isThrombolysisDt">有</el-checkbox>
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
export default class AdPart extends Vue {
  @Prop({default: {
    cpcOutModel: {},
    cpcEmergenModel: {},
    cpcDiagTreatModel: {
    cpDiagnosisCodeList: []
    },
  }})
  public value!: any;
  public gg = [];
  public radioUnsafe = '';
  public radioRong = '';
  public value1 = '';
  public value2 = '';
  public value3 = '';
  public radio = '';
  public startKn = '';
  public isIf = df('is_if');
  public helpCode = df('helpCode');
  public cpDiagnosisCode1 = df('cpDiagnosisCode1');
  public firstMedicalContact = df('first_medical_contact');
  public getToHospitalType = df('get_to_hospital_type');
  public treatmentStrategyCode = df('treatmentStrategyCode');
  public interlayerType = df('interlayerType');
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
    .AdPart{
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
    .AdPart{
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
