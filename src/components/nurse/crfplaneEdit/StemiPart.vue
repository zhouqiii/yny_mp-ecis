<template>
    <div class="StemiPart">
     <el-scrollbar :style="{height:'100%'}">
      <el-form :model="value" ref="form" label-width="170px" :rules="rules">
        <section>
        <fieldset class="fieldset">
          <legend>初步诊断</legend>
        </fieldset>
        <el-form-item label="本院心内科医生首诊时间：（包含远程会诊）" class="localDocClass">
          <yn-date-time-pick v-model="value.cpcDiagTreatModel.firstTreatmentTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled">
          </yn-date-time-pick>
        </el-form-item>
        <el-form-item label="溶栓核查：" style="width:33.3%">
          <el-radio-group v-model="value.cpcDiagTreatModel.thromCheck">
            <el-radio v-for="(item,i) in dictFilter('ifSuitable')" :key="i" :label="item.value" :disabled="isDisabled">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="再灌注措施：" style="width:100%">
            <el-checkbox v-model="value.cpcDiagTreatModel.isEmpci" >紧急介入治疗</el-checkbox>
            <el-checkbox v-model="value.cpcDiagTreatModel.isEmradiography">紧急仅造影</el-checkbox>
            <el-checkbox v-model="value.cpcDiagTreatModel.isRepci">24小时介入治疗</el-checkbox>
            <el-checkbox v-model="value.cpcDiagTreatModel.isTpci">72小时介入治疗</el-checkbox>
            <el-checkbox v-model="value.cpcDiagTreatModel.isElradiography">早期仅造影</el-checkbox>
            <el-checkbox v-model="value.cpcDiagTreatModel.isElpci">择期介入治疗</el-checkbox>
            <el-checkbox v-model="value.cpcDiagTreatModel.isCabg">CABG</el-checkbox>
            <el-checkbox v-model="value.cpcDiagTreatModel.isRepother">其他</el-checkbox>
        </el-form-item>
        <el-form-item label="靶血管血流（TIMI）等级：手术前：" class="levelClass">
          <el-radio-group v-model="value.cpcDiagTreatModel.preoperativeTimiLevel" :disabled="isDisabled">
            <el-radio v-for="(item,i) in dictFilter('preoperativeTmiLevel')" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手术后：" style="width:33.3%">
          <el-radio-group v-model="value.cpcDiagTreatModel.postoperativeTimiLevel" :disabled="isDisabled">
            <el-radio v-for="(item,i) in dictFilter('postoperativeTimiLevel')" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        </section>
        <section>
        <fieldset class="fieldset">
          <legend>溶栓</legend>
        </fieldset>
        <el-form-item label="院前溶栓：筛查：" style="width:33.3%">
          <el-radio-group v-model="value.cpcDiagTreatModel.thromCheck">
            <el-radio v-for="(item,i) in dictFilter('ifSuitable')" :key="i" :label="item.value" :disabled="isDisabled">{{item.label}}</el-radio>
          </el-radio-group>
          <el-checkbox v-model="value.cpcRegModel.isThrombolysisDt" style="margin-left:30px;">有</el-checkbox>
        </el-form-item>
        <el-form-item label="溶栓场所：" style="width:40%">
        <el-radio-group v-model="value.cpcDiagTreatModel.thromTreatmentPlace" @change="onThromTreatmentPlace" :disabled="isDisabled">
          <el-radio v-for="(item,i) in dictFilter('diagnosisUnitCodeDt')" :key="i" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
        </el-form-item>
         <el-form-item label="药物：" style="width:33.3%">
          <el-radio-group v-model="value.cpcDiagTreatModel.thromDrugTypeDt" :disabled="isDisabled">
            <el-radio v-for="(item,i) in thromDrug" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="溶栓再通：" class="drugUnitClass" style="width:33.3%">
          <el-radio-group v-model="value.cpcDiagTreatModel.isRepatencyDt" :disabled="isDisabled">
            <el-radio v-for="(item,i) in isIf" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
          <el-form-item label="剂量：" class="drugUnitClass" style="width:33.3%">
          <el-radio-group v-model="value.cpcDiagTreatModel.thromDrugCodeDt" :disabled="isDisabled">
            <el-radio v-for="(item,i) in thromDrugUnit" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="溶栓开始知情同意：" style="width:33.3%">
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
        </section>
        <section>
        <fieldset class="fieldset">
          <legend>急诊PCI</legend>
        </fieldset>
          <el-form-item label="决定医生：" style="width:30%">
          <el-input type="text" v-model="value.cpcDiagTreatModel.doctorName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="介入人员：" style="width:30%;margin-left:3%;">
          <el-input type="age" v-model="value.cpcDiagTreatModel.interventionPerson" autocomplete="off" />
        </el-form-item>
        <div>
        <el-form-item label="决定介入手术时间：" style="width:33%">
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
        </div>
        </section>
      </el-form>
     </el-scrollbar>   
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

const df = Vue.filter('dictFilter');
@Component({})
export default class StemiPart extends Vue {
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
  public thromDrug = df('thromDrug');
  public firstMcCode = df('firstMcCode');
  public consciousnessType = df('consciousnessType');
  public cpDiagnosisCode = df('cpDiagnosisCode');
  public acsDrugType = df('acsDrugType');
  public sex = df('sex');
  public ifSuitable = df('ifSuitable');
  public riskLamination = df('riskLamination');
  public thromTreatmentPlace = df('thromTreatmentPlace');
  public thromDrugUnit = df('thromDrugUnit');
  public dictFilter = (type: string) => df(type);
}
</script>
<style lang="less">
    .StemiPart{
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
    .StemiPart{
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
