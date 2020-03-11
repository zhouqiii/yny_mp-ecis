<template>
  <div class="LeavePart">
    <el-scrollbar :style="{height:'100%'}">
      <el-form :model="value" ref="form" label-width="170px" :rules="rules">
        <section>
          <fieldset class="fieldset">
            <legend>患者转归</legend>
          </fieldset>
          <!--<div style="margin-left:110px;">
             <span>患者转归</span> 
                <el-checkbox v-model="value.cpcOutModel.outcomeCode" label="1">出院</el-checkbox>
                <el-checkbox v-model="value.cpcOutModel.outcomeCode" label="2">治愈</el-checkbox>
                <el-checkbox v-model="value.cpcOutModel.outcomeCode" label="3">好转</el-checkbox>
                <el-checkbox v-model="value.cpcOutModel.outcomeCode" label="4">其他离院原因</el-checkbox>
            </div>
          <div style="margin-left:110px;" v-if="value.cpcOutModel.outcomeCode===outcomeCode[3].value">
                <el-checkbox v-model="value.cpcOutModel">脑死亡离院</el-checkbox>
                <el-checkbox v-model="value.cpcOutModel">转送其他医院</el-checkbox>
                <el-checkbox v-model="value.cpcOutModel">死亡</el-checkbox>
          </div>-->
          <el-form-item label="确诊时间：" style="width:33.3%">
            <yn-date-time-pick v-model="value.cpcOutModel.diagnosisTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled">
            </yn-date-time-pick>
          </el-form-item>
          <el-form-item label="出院时间：" style="width:33.3%" >
          <!--v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[0].value"-->
            <yn-date-time-pick v-model="value.cpcOutModel.leaveTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled" />
          </el-form-item>
          <el-form-item label="花费：" style="width:33.3%">
            <el-input placeholder="0" v-model="value.cpcOutModel.totalCost" :disabled="isDisabled">
              <template slot="append">元（精确到小数点后两位）</template>
            </el-input>
          </el-form-item>
          <el-form-item label="住院天数：" style="width:34%">
            <el-input placeholder="0" v-model="value.cpcOutModel.hod" :disabled="isDisabled">
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
          <el-form-item label="院内出现心力衰竭：" style="width:33.3%">
            <el-radio-group v-model="value.cpcOutModel.isHeartFailure" :disabled="isDisabled">
              <el-radio v-for="(item,i) in dictFilter('is_if')" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
		  </section>
		  <section>
		  <fieldset class="fieldset">
        <legend>初步诊断</legend>
      </fieldset>
		  <el-form-item label="患者转归：" style="width:100%">
      <el-radio-group v-model="value.cpcOutModel.outcomeCode" :disabled="isDisabled">
        <el-radio v-for="(item,i) in dictFilter('outcomeCode')" :key="i" :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="出院时间：" style="width:33.3%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[0].value">
        <yn-date-time-pick v-model="value.cpcOutModel.leaveTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled" />
      </el-form-item> -->
      <el-form-item label="治疗结果：" style="width:100%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[0].value">
        <el-radio-group v-model="value.cpcOutModel.treatmentResultName" :disabled="isDisabled">
          <el-radio v-for="(item,i) in dictFilter('treatmentResultCode')" :key="i" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--<el-form-item label="出院带药：" style="width:100%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[0].value">
          <el-radio-group v-model="dischargeMedicationIndex" @change="onChangeDischarge(dischargeMedicationIndex)">
            <el-radio v-for="(item,i) in dictFilter('discharge_medication')" :key="i" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>-->
      <el-form-item label="出院带药：DAPT：" style="width:20%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[0].value">
        <el-radio-group v-model="value.cpcOutModel.outGrugDapt" @change="onChangeDischarge(dischargeMedicationIndex)">
          <el-radio v-for="(item,i) in dictFilter('is_if')" :key="i" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="他汀：" style="width:20%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[0].value">
        <el-radio-group v-model="value.cpcOutModel.outDrugStatins" :disabled="isDisabled">
          <el-radio v-for="(item,i) in dictFilter('is_if')" :key="i" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="ACEI/ARB：" style="width:20%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[0].value">
        <el-radio-group v-model="value.cpcOutModel.outGrugAceiorarb" :disabled="isDisabled">
          <el-radio v-for="(item,i) in dictFilter('is_if')" :key="i" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="β阻滞剂：" style="width:20%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[0].value">
        <el-radio-group v-model="value.cpcOutModel.outDrugRetardant" :disabled="isDisabled">
          <el-radio v-for="(item,i) in dictFilter('is_if')" :key="i" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
		  <div style="width:100%">
			<el-radio-group v-model="value.cpcEmergenModel.cpDiagnosisCode" style="margin-left:110px;">
			 <el-radio v-for="(item,i) in cpDiagnosisCode" :key="i" :label="item.value">{{item.label}}</el-radio>
			</el-radio-group>
          </div>
          <!-- <el-form-item label="出院带药：DAPT：" style="width:20%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[0].value">
            <el-radio-group v-model="value.cpcOutModel.outGrugDapt" :disabled="isDisabled">
              <el-radio v-for="(item,i) in dictFilter('is_if')" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="他汀：" style="width:20%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[0].value">
            <el-radio-group v-model="value.cpcOutModel.outDrugStatins" :disabled="isDisabled">
              <el-radio v-for="(item,i) in dictFilter('is_if')" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="ACEI/ARB：" style="width:20%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[0].value">
            <el-radio-group v-model="value.cpcOutModel.outGrugAceiorarb" :disabled="isDisabled">
              <el-radio v-for="(item,i) in dictFilter('is_if')" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="β阻滞剂：" style="width:20%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[0].value">
            <el-radio-group v-model="value.cpcOutModel.outDrugRetardant" :disabled="isDisabled">
              <el-radio v-for="(item,i) in dictFilter('is_if')" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="margin-left:120px;">
          <span>出院诊断：</span>
                <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="2" >STEMI</el-radio>
                <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="3" >NSTEMI</el-radio>
                <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="4" >UA</el-radio>
                <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="5" >主动脉夹层</el-radio>
                <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="6" >肺动脉栓塞</el-radio>
                <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="7" >非ACS胸痛</el-radio>
                <el-radio v-model="value.cpcDiagTreatModel.cpDiagnosisCode" label="8" >非心源性胸痛</el-radio>
              </div> -->
        </section>
      </el-form>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
const df = Vue.filter('dictFilter');
@Component
export default class LeavePart extends Vue {
  private rules = {};
  @Prop({    default: {
      cpcOutModel: {
        isTransPci: '0',
        isDirectCatheter: '0',
        isHeartFailure: '0',
        outcomeCode: df('outcomeCode')[0].value
      }    }  })
  private value!: any;
  @Prop()
  private isDisabled!: boolean;
  private dischargeMedicationIndex = '';
  private dischargeMedicationList = ['outGrugDapt', 'outGrugAceiorarb', 'outDrugStatins', 'outDrugRetardant'];
  private isFinish = 0;
  private dictFilter = (type: string) => df(type);
  /**
   * 出院带药事件
   */
  private onChangeDischarge(i: string) {
    const outModel: any = this.value.cpcOutModel;
    this.dischargeMedicationList.forEach((item) => outModel[item] = 0);
    outModel[this.dischargeMedicationList[Number(i)]] = 1;
  }
}
</script>
<style lang="less">
.LeavePart {
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
			font-size: 18px;
			font-weight: 300;
			color: #409eff;
		}
	}
	.el-form-item {
		width: 25%;
		display: inline-block;
		margin-bottom: 0px;
	}
	.el-form-item.widthAll {
		margin-left: -20px;
		width: 100%;
	}
	.el-checkbox-group {
		margin-left: 110px;
	}
	.timeBox {
		width: 66.7%;
		.el-form-item__label {
			width: 183px !important;
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
		width: 1px;
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
			width: 290px !important;
		}
		.el-form-item__content {
			margin-left: 290px !important;
		}
	}
}
</style>
<style lang="less" scoped>
.LeavePart{
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
			font-size: 18px;
			font-weight: 300;
			color: #409eff;
		}
	}
	.buttonBox {
		margin: 20px 0;
		text-align: center;
	}
}
</style>

