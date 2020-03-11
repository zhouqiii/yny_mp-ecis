<template>
    <div class="UaPart">
     <el-scrollbar :style="{height:'100%'}">
      <el-form :model="value" ref="form" label-width="170px" :rules="rules">
          <section>
              <fieldset class="fieldset">
              <legend>灌注措施</legend>
            </fieldset>
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
            <el-form-item label="实际介入治疗时间：" style="width:33.3%">
              <yn-date-time-pick 
                v-model="value.cpcDiagTreatModel.startInterventionDate"
                type="datetime"
                placeholder="选择日期时间">
              </yn-date-time-pick>
            </el-form-item>
          <el-form-item label="造影开始时间：" style="width:66.6%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.startRadiographyTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="决定CABG时间：" style="width:33.3%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.decisionCabgTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="开始CABG时间：" style="width:33.3%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.startCabgTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
          <el-form-item label="CABG结束时间：" style="width:33.3%">
            <yn-date-time-pick v-model="value.cpcDiagTreatModel.endCabgTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled"/>
          </el-form-item>
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
          </section>
      </el-form>
     </el-scrollbar>   
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

const df = Vue.filter('dictFilter');
@Component({})
export default class UaPart extends Vue {
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
    .UaPart{
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
    .UaPart{
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
