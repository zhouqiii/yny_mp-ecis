<template>
  <div class="ThirdAid">
    <el-scrollbar :style="{height:'100%'}">
      <el-form :model="value" ref="form" label-width="170px" :rules="rules">
        <section>
          <fieldset class="fieldset">
            <legend>初步诊断</legend>
          </fieldset>
          <div style="margin-left:110px;">
            <el-radio-group v-model="value.cpcOutModel.cpDiagnosisCode" :disabled="isDisabled">
              <el-radio v-for="(item,i) in dictFilter('cpDiagnosisCode')" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </div>
          <el-form-item label="确诊时间:" style="width:33.3%">
            <yn-date-time-pick v-model="value.cpcOutModel.diagnosisTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled">
            </yn-date-time-pick>
          </el-form-item>
          <el-form-item label="院内出现心力衰竭：" style="width:66.7%">
            <el-radio-group v-model="value.cpcOutModel.isHeartFailure" :disabled="isDisabled">
              <el-radio v-for="(item,i) in dictFilter('is_if')" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="住院天数：" style="width:33.3%">
            <el-input placeholder="0" v-model="value.cpcOutModel.hod" :disabled="isDisabled">
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
          <el-form-item label="总费用：" style="width:33.3%">
            <el-input placeholder="0" v-model="value.cpcOutModel.totalCost" :disabled="isDisabled">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </section>
        <section>
          <fieldset class="fieldset">
            <legend>患者转归</legend>
          </fieldset>
          <el-form-item label="" style="width:100%">
            <el-radio-group v-model="value.cpcOutModel.outcomeCode" :disabled="isDisabled">
              <el-radio v-for="(item,i) in dictFilter('outcomeCode')" :key="i" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出院时间：" style="width:33.3%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[0].value">
            <yn-date-time-pick v-model="value.cpcOutModel.leaveTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :disabled="isDisabled" />
          </el-form-item>
          <el-form-item label="治疗结果：" style="width:66.7%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[0].value">
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
          <el-form-item label="离开本院大门时间：" style="width:33.3%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[1].value">
            <yn-date-time-pick :disabled="isDisabled" v-model="value.cpcOutModel.leaveTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
            </yn-date-time-pick>
          </el-form-item>
          <el-form-item label="" style="width:33.3%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[1].value">
            <el-checkbox label="网络医院" v-model="value.cpcOutModel.isNetHospital" :disabled="isDisabled"></el-checkbox>
          </el-form-item>
          <el-form-item label="医院名称" style="width:33.3%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[1].value">
            <el-input v-model="value.cpcOutModel.handHospitalName" placeholder="" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="原因 转运PCI:" style="width:33.3%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[1].value">
            <el-radio-group v-model="value.cpcOutModel.isTransPci">
              <el-radio v-for="(item,i) in dictFilter('is_if')" :key="i" :label="item.value" :disabled="isDisabled">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="直达导管室：" style="width:33.3%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[1].value">
            <el-radio-group v-model="value.cpcOutModel.isDirectCatheter">
              <el-radio v-for="(item,i) in dictFilter('is_if')" :key="i" :label="item.value" :disabled="isDisabled">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="转科时间：" style="width:33.3%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[2].value">
            <yn-date-time-pick :disabled="isDisabled" v-model="value.cpcOutModel.transferDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
            </yn-date-time-pick>
          </el-form-item>
          <el-form-item label="接诊科室：" style="width:33.3%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[2].value">
            <el-input v-model="value.cpcOutModel.admissionDept" placeholder="" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="转科原因：" style="width:33.3%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[2].value">
            <el-input v-model="value.cpcOutModel.transferReason" placeholder="" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="死亡时间：" style="width:33.3%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[3].value">
            <yn-date-time-pick :disabled="isDisabled" v-model="value.cpcOutModel.deathTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
            </yn-date-time-pick>
          </el-form-item>
          <!--<el-form-item label="死亡原因：" style="width:33.3%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[3].value">
              <el-input v-model="value.cpcOutModel.deathCauseCode" placeholder=""></el-input>
            </el-form-item>-->
          <el-form-item label="死亡原因：" prop="deathCauseCode" style="width:33.3%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[3].value">
            <el-select :disabled="isDisabled" v-model="value.cpcOutModel.deathCauseCode" placeholder="请选择">
              <el-option v-for="(item,i) in dictFilter('deathCauseCode')" :label="item.label" :key="i" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="描述：" style="width:33.3%" v-if="value.cpcOutModel.outcomeCode===dictFilter('outcomeCode')[3].value">
            <el-input v-model="value.cpcOutModel.deathCauseDesc" placeholder="" :disabled="isDisabled"></el-input>
          </el-form-item>
          <div>
            患者转归，表示此次急救已经结束，如果转送其它网络医院，则系统自动生成新的一个急救，继续下一次的抢救，非网络医院则急救结束，不再进行跟踪！
          </div>
        </section>
      </el-form>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
const df = Vue.filter('dictFilter');
@Component
export default class ThirdAid extends Vue {
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
.ThirdAid {
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
.ThirdAid {
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

