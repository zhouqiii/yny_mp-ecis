<template>
  <div class="SecendAid">
    <el-scrollbar :style="{height:'100%'}">
      <el-form :model="value" ref="form" label-width="170px" :rules="rules">
        <section>
          <fieldset class="fieldset">
            <legend>初步诊断1</legend>
          </fieldset>
          <div style="margin-left:120px;">
            <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="2" disabled>STEMI</el-radio>
            <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="3" disabled>NSTEMI</el-radio>
            <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="4" disabled>UA</el-radio>
            <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="5" disabled>主动脉夹层</el-radio>
            <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="6" disabled>肺动脉栓塞</el-radio>
          </div>
          <el-form-item label="本院心内科医生首诊时间（包含远程会诊）：" class="localDocClass">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.firstTreatmentTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled">
            </yn-date-time-pick>
          </el-form-item>
          <el-form-item label="溶栓核查：" style="width:33%">
            <el-radio-group v-model="value.cpcDiagTreatModel.thromCheck">
              <el-radio v-for="(item,i) in dictFilter('ifSuitable')" :key="i" :label="item.value" :disabled="isDisabled">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="24小时强化他汀治疗：" style="width:33%">
            <el-radio-group v-model="value.cpcDiagTreatModel.intensifyStatinsTreat" :disabled="isDisabled">
              <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="β受体阻滞剂使用：" style="width:33%">
            <el-radio-group v-model="value.cpcDiagTreatModel.receptorRetardantUsing" :disabled="isDisabled">
              <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="再灌注措施：" style="width:100%">
                <el-checkbox v-model="value.cpcDiagTreatModel.isEmpci" >急诊PCI</el-checkbox>
                <el-checkbox v-model="value.cpcDiagTreatModel.isThrombolysisDt">溶栓</el-checkbox>
                <el-checkbox v-model="value.cpcDiagTreatModel.isRepci">补救PCI</el-checkbox>
                <el-checkbox v-model="value.cpcDiagTreatModel.isEmradiography">急诊仅造影</el-checkbox>
                <el-checkbox v-model="value.cpcDiagTreatModel.isElpci">择期PCI</el-checkbox>
                <el-checkbox v-model="value.cpcDiagTreatModel.isTpci">转运PCI</el-checkbox>
                <el-checkbox v-model="value.cpcDiagTreatModel.isElradiography">择期仅造影</el-checkbox>
                <el-checkbox v-model="value.cpcDiagTreatModel.isCabg">CABG</el-checkbox>
                <el-checkbox v-model="value.cpcDiagTreatModel.isNoreperfusion">无再灌注措施</el-checkbox>
                <el-checkbox v-model="value.cpcDiagTreatModel.isRepother">其他</el-checkbox>
              </el-form-item>  -->
          <el-form-item label="靶血管血流（TIMI）等级: 手术前：" class="levelClass">
            <el-radio-group v-model="value.cpcDiagTreatModel.preoperativeTimiLevel" :disabled="isDisabled">
              <el-radio v-for="(item,i) in dictFilter('preoperativeTmiLevel')" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手术后：" style="width:33.3%">
            <el-radio-group v-model="value.cpcDiagTreatModel.postoperativeTimiLevel" :disabled="isDisabled">
              <el-radio v-for="(item,i) in dictFilter('postoperativeTimiLevel')" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="远程心电传输：" style="width:33%">
                <el-radio-group v-model="value.cpcEmergenModel.isRemoteEcgtranChecked" @change="onRemoteEcgCheck">
                  <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item> -->
          <!-- <el-form-item label="传输时间：" v-if="ifEcgCheck"  style="width:33%">
                <yn-date-time-pick v-model="value.cpcEmergenModel.tranDate" type="datetime" placeholder="选择日期时间"/>            
              </el-form-item> 
               <el-form-item label="传输方式：" v-if="ifEcgCheck" style="width:33%">
                <el-select
                    v-model="value.cpcEmergenModel.isRemoteEcgtran"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item,i) in dictFilter('isRemoteEcgtran')"
                      :label="item.label"
                      :key="i"
                      :value="item.value"
                    />
                </el-select>
              </el-form-item>
              <el-form-item label="实际开始时间：" style="width:33%">
                <yn-date-time-pick 
                  v-model="value.cpcDiagTreatModel.startInterventionDate"
                  type="datetime"
                  placeholder="选择日期时间">
                </yn-date-time-pick>
              </el-form-item> -->
          <!-- <el-form-item label="决定介入手术时间：" style="width:33%">
                <yn-date-time-pick 
                  v-model="value.decisionOperationTime"
                  type="datetime"
                  placeholder="选择日期时间">
                </yn-date-time-pick>
              </el-form-item> -->
          <!-- <el-form-item v-if="value.isElradiography" label="造影开始时间：" style="width:33%">
                <yn-date-time-pick 
                  v-model="value.startRadiographyTime"
                  type="datetime"
                  placeholder="选择日期时间">
                </yn-date-time-pick>
              </el-form-item>  -->
          <!-- <el-form-item label="介入手术结束时间：" style="width:33%">
                <yn-date-time-pick 
                  v-model="value.endInterventionDate"
                  type="datetime"
                  placeholder="选择日期时间">
                </yn-date-time-pick>
              </el-form-item>  -->
          <el-form-item v-if="value.isRepother||value.isRepci||value.isEmpci||value.isElradiography||value.isEmradiography||value.isElpci" label="其他治疗措施：" style="width:33.3%">
            <el-input type="text" v-model="value.cpcDiagTreatModel.otherTreatmentMeasure" autocomplete="off" :disabled="isDisabled"/>
          </el-form-item>
        </section>
        <section v-if="value.isThrombolysisDt">
          <fieldset class="fieldset">
            <legend>院内溶栓治疗</legend>
          </fieldset>
          <el-form-item label="直达：" style="width:30%">
            <el-radio-group v-model="value.cpcDiagTreatModel.isDirect" :disabled="isDisabled">
              <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="溶栓场所：" style="width:40%">
            <el-radio-group v-model="value.cpcDiagTreatModel.thromTreatmentPlace" @change="onThromTreatmentPlace" :disabled="isDisabled">
              <el-radio v-for="(item,i) in dictFilter('diagnosisUnitCodeDt')" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开始知情同意：" style="width:30%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.thromStartAgreeTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="签署知情同意书：" style="width:33.3%">
            <yn-date-time-pick v-model="value.thromSignAgreeTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="开始溶栓时间：" style="width:33.3%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.thromStartTimeDt" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="溶栓结束时间：" style="width:33.3%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.thromEndTimeDt" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="溶栓后造影时间：" style="width:33.3%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.timeInterval" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="剂量：" class="drugUnitClass" style="width:33.3%">
            <el-radio-group v-model="value.cpcDiagTreatModel.thromDrugCodeDt" :disabled="isDisabled">
              <el-radio v-for="(item,i) in thromDrugUnit" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="溶栓再通：" class="drugUnitClass" style="width:33.3%">
            <el-radio-group v-model="value.cpcDiagTreatModel.isRepatencyDt" :disabled="isDisabled">
              <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="其他治疗措施：" style="width:33.3%">
            <el-input type="text" v-model="value.cpcDiagTreatModel.otherTreatmentMeasure" autocomplete="off" :disabled="isDisabled"/>
          </el-form-item>
        </section>
        <section v-if="value.isCabg">
          <fieldset class="fieldset">
            <legend>CABG</legend>
          </fieldset>
          <el-form-item label="决定CABG时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.decisionCabgTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="开始CABG时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.startCabgTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="CABG结束时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.endCabgTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="其他治疗措施：" style="width:33.3%">
            <el-input type="text" v-model="value.cpcDiagTreatModel.otherTreatmentMeasure" autocomplete="off" :disabled="isDisabled"/>
          </el-form-item>
        </section>
        <section v-if="value.isEmpci||value.isRepci||value.isEmradiography">
          <fieldset class="fieldset">
            <legend>急诊(紧急)PCI</legend>
          </fieldset>
          <el-form-item label="决定医生：" style="width:33%">
            <el-input type="text" v-model="value.cpcDiagTreatModel.doctorName" autocomplete="off" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="介入人员：" style="width:33%">
            <el-input type="age" v-model="value.cpcDiagTreatModel.interventionPerson" autocomplete="off" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="决定介入手术时间时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.decisionOperationTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="启动导管室时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.startConduitTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="开始知情同意时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.startAgreeTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="签署知情同意时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.signAgreeTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="导管室激活时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.activateConduitTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="患者到达导管室：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.arriveConduitTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="开始穿刺时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.startPunctureTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="穿刺成功时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.successPunctureTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="造影开始时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.startRadiographyTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="造影结束时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.endRadiographyTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="导丝通过时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.tranDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="手术结束时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.endOperationTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="D2B时间：" style="width:33%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.dtwobTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="是否延误：">
            <el-checkbox v-model="value.cpcDiagTreatModel.isDelay"></el-checkbox>
          </el-form-item>
          <el-form-item label="进入医院大门到造影开始时间：" class="followSpan">
            <el-input placeholder="" v-model="value.cpcDiagTreatModel.timeInterval" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled">
              <template slot="append">min</template>
            </el-input>
          </el-form-item>
        </section>
        <section v-if="value.isNoreperfusion">
          <fieldset class="fieldset">
            <legend>无再灌溉措施</legend>
          </fieldset>
          <el-form-item label="" style="width:100%">
            <el-radio-group v-model="value.cpcDiagTreatModel.perfusionMeasureCode" :disabled="isDisabled">
              <el-radio v-for="(item,i) in perfusionMeasureCode" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="其他原因：" style="width:50%">
            <el-input type="text" v-model="value.cpcDiagTreatModel.perfusionMeasureOther" autocomplete="off" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="其他治疗措施：" style="width:50%">
            <el-input type="text" v-model="value.cpcDiagTreatModel.otherTreatmentMeasure" autocomplete="off" :disabled="isDisabled"/>
          </el-form-item>
        </section>
      </el-form>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
const df = Vue.filter('dictFilter');
@Component
export default class SecendAid extends Vue {
  public rules = {};
  @Prop({
    default: {
      cpcEmergenModel: {},
      cpcDiagTreatModel: {},
    }
  })
  public value!: any;
  @Prop()
  public isDisabled!: boolean;
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
  public preoperativeTmiLevel = df('preoperativeTmiLevel');
  public postoperativeTimiLevel = df('postoperativeTimiLevel');
  public diagnosisUnitCodeDt = df('diagnosisUnitCodeDt');
  public perfusionMeasureCode = df('perfusionMeasureCode');
  public dictFilter = (type: string) => df(type);
}
</script>
<style lang="less">
.SecendAid {
	.el-form-item {
		width: 25%;
		display: inline-block;
		margin-bottom: 0px;
	}
	.el-form-item.widthAll {
		width: 100%;
	}
	.el-checkbox-group {
		margin-left: 110px;
	}
	.timeBox {
		width: 66.7%;
		.el-form-item__label {
			width: 200px !important;
		}
		.el-form-item__content {
			margin-left: 183px !important;
		}
	}
	.el-form-item__label {
		color: #606266;
	}
	.el-select.el-date-editor.el-input {
		margin-left: 20px;
	}
	.el-input-group__append,
	.el-input-group__prepend {
		background-color: #fff;
		color: #909399;
		vertical-align: middle;
		display: table-cell;
		position: relative;
		border: 0px solid #fff;
		border-radius: 4px;
		padding: 0 20px;
		width: 2px;
		white-space: nowrap;
	}
	.followSpan {
		width: 40%;
		.el-form-item__label {
			width: 270px !important;
		}
		.el-form-item__content {
			margin-left: 270px !important;
		}
	}
	.drugUnitClass {
		.el-form-item__label {
			width: 170px !important;
		}
		.el-form-item__content {
			margin-left: 90px !important;
		}
	}
	.localDocClass {
		width: 70%;
		.el-form-item__label {
			width: 370px !important;
		}
		.el-form-item__content {
			margin-left: 370px !important;
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
.SecendAid {
	height: 100%;
	h1 {
		border-bottom: 1px solid #ccc;
		margin: 0 0 10px;
		padding-bottom: 10px;
	}
	.submitBtn {
		text-align: center;
		display: block;
		width: 100%;
	}
	.fieldset {
		margin-top: 20px;
		margin: 10px 0 0px;
		border-width: 1px 0 0;
		border-color: #409eff;
		border-style: solid;
		padding: 0;
		legend {
			margin-left: 26px;
			padding: 0 5px;
			font-size: 22px;
			font-weight: 300;
			color: #409eff;
		}
	}
	.buttonBox {
		margin: 100px 0;
		text-align: center;
	}
}
</style>

