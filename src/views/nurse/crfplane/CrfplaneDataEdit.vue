<template>
  <div class="CrfplaneDataEdit">
    <div class="CrfMenu">
      <span class="menu-title">
        <i class="el-icon-date" /> 胸痛中心
      </span>
      <div class="menu-right">
        <div @click="onSubmit" v-if="isDisabled===0">保存</div>
        <div @click="$router.push({name:'crfplane'})">返回</div>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="急救、急诊" name="four">
        <div :style="{height:winHeight + 'px'}">
          <primary-aid ref="primaryAid" v-model="form" :isDisabled="isDisabled!==0" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="心内科" name="eleven">
        <div :style="{height:winHeight + 'px'}">
          <ua-part ref="uaPart" v-model="form" :isDisabled="isDisabled!==0" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="心外、呼吸科" name="ten">
        <div :style="{height:winHeight + 'px'}">
          <ad-part ref="adPart" v-model="form" :isDisabled="isDisabled!==0" />
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="辅助检查" name="five">
        <div :style="{height:winHeight + 'px'}">
          <company-aid ref="companyAid" v-model="form" :isDisabled="isDisabled!==0" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="诊断" name="six">
        <div :style="{height:winHeight + 'px'}">
          <diagnose-aid ref="diagnoseAid" v-model="form" :isDisabled="isDisabled!==0" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="ACS给药" name="seven">
        <div :style="{height:winHeight + 'px'}">
          <acs-aid ref="acsAid" v-model="form" :isDisabled="isDisabled!==0" />
        </div>
      </el-tab-pane> -->
      <el-tab-pane label="患者出院" name="eight">
        <div :style="{height:winHeight + 'px'}">
          <leave-part ref="leavePart" v-model="form" :isDisabled="isDisabled!==0" />
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="STEMI" name="nine">
        <div :style="{height:winHeight + 'px'}">
          <stemi-part ref="stemiPart" v-model="form" :isDisabled="isDisabled!==0" />
        </div>
      </el-tab-pane> -->
      <el-tab-pane label="急救信息" name="first">
        <div :style="{height:winHeight + 'px'}">
          <first-aid ref="firstAid" v-model="form" :isDisabled="isDisabled!==0" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="胸痛诊疗" name="second">
        <div :style="{height:winHeight + 'px'}">
          <secend-aid ref="secendAid" v-model="form" :isDisabled="isDisabled!==0" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="患者转归" name="third">
        <div :style="{height:winHeight + 'px'}">
          <third-aid ref="thirdAid" v-model="form" :isDisabled="isDisabled!==0" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import firstAid from '@/components/nurse/crfplaneEdit/FirstAid.vue';
import secendAid from '@/components/nurse/crfplaneEdit/SecendAid.vue';
import thirdAid from '@/components/nurse/crfplaneEdit/ThirdAid.vue';
import primaryAid from '@/components/nurse/crfplaneEdit/PrimaryAid.vue';
// import companyAid from '@/components/nurse/crfplaneEdit/CompanyAid.vue';
// import diagnoseAid from '@/components/nurse/crfplaneEdit/DiagnoseAid.vue';
// import acsAid from '@/components/nurse/crfplaneEdit/AcsAid.vue';
import leavePart from '@/components/nurse/crfplaneEdit/LeavePart.vue';
// import stemiPart from '@/components/nurse/crfplaneEdit/StemiPart.vue';
import uaPart from '@/components/nurse/crfplaneEdit/UaPart.vue';
import adPart from '@/components/nurse/crfplaneEdit/AdPart.vue';
const df = Vue.filter('dictFilter');
@Component({
  components: {
     firstAid, secendAid, thirdAid,primaryAid,leavePart,uaPart,adPart
     }
})
export default class CrfplaneEdit extends Vue {
  public activeName = 'four';
  public winHeight = window.innerHeight - 160;
  private isDisabled = 0;
  private form = {
    cpcDiagTreatModel: {
      cpDiagnosisCodeList: [],
      treatmentStrategyCode: [],
    },
    cpcEmergenModel: {
    },
    cpcInfo: {
    },
    cpcOutModel: {
    },
    cpcRegModel: {
      comingWayCode: df('get_to_hospital_type')[2].value,
      name: ''
    }
  };
  public created() {
    this.isDisabled = this.$route.query.isDisabled ? Number(this.$route.query.isDisabled) : 0;
  }
  public mounted() {
    this.getCpc();
    $(window).resize(() => this.winHeight = window.innerHeight - 160);
  }
  public onSubmit() {
    let req: string = 'PostCpc';
    if (!(this.form.cpcRegModel as any).outpatientId) {
      return this.$message.warning('必须输入急诊id');
    }
    if (!this.$route.query.id) {
      return this.$message.warning('丢失了用户编号，请检查路径');
    }
    if (this.$route.query.id) {
      (this.form.cpcDiagTreatModel as any).visitId = this.$route.query.id as string;
      (this.form.cpcEmergenModel as any).visitId = this.$route.query.id as string;
      (this.form.cpcInfo as any).visitId = this.$route.query.id as string;
      (this.form.cpcOutModel as any).visitId = this.$route.query.id as string;
      (this.form.cpcRegModel as any).visitId = this.$route.query.id as string;
      req = 'PutCpc';
    }
    let f = JSON.parse(JSON.stringify(this.form));
    // f.cpcDiagTreatModel.treatmentStrategyCode = f.cpcDiagTreatModel.treatmentStrategyCode;
    f = this.checkboxData(f);
    this.$store.dispatch(req, f).then((item) => this.$message.success('保存成功'));
    this.$router.push('/emergency/crfplanedata');
  }
  public getFData(arr: any[]) {
    return arr ? arr[0] : null;
  }
  public getBit(b: any[]) {
    return b ? 1 : 0;
  }
  public getBoolean(i: number | string) {
    return Number(i) === 1 ? true : false;
  }
  /**
   * 处理复选框的值
   */
  public checkboxData(f: any) {
    // 发病时间无法精确到分钟？
    f.cpcRegModel.isNullAttackDetailTime = this.getBit(f.cpcRegModel.isNullAttackDetailTime);
    // 呼救
    f.cpcRegModel.isHelp = this.getBit(f.cpcRegModel.isHelp);
    // ---
    f.cpcEmergenModel.arrhythmia = this.getBit(f.cpcEmergenModel.arrhythmia);
    f.cpcEmergenModel.dcm = this.getBit(f.cpcEmergenModel.dcm);
    f.cpcEmergenModel.icm = this.getBit(f.cpcEmergenModel.icm);
    f.cpcEmergenModel.hcm = this.getBit(f.cpcEmergenModel.hcm);
    f.cpcEmergenModel.carditis = this.getBit(f.cpcEmergenModel.carditis);
    f.cpcEmergenModel.chd = this.getBit(f.cpcEmergenModel.chd);
    f.cpcEmergenModel.avhd = this.getBit(f.cpcEmergenModel.avhd);
    f.cpcEmergenModel.omi = this.getBit(f.cpcEmergenModel.omi);
    f.cpcEmergenModel.ap = this.getBit(f.cpcEmergenModel.ap);
    f.cpcEmergenModel.palpitate = this.getBit(f.cpcEmergenModel.palpitate);
    f.cpcEmergenModel.af = this.getBit(f.cpcEmergenModel.af);
    f.cpcEmergenModel.hypertension = this.getBit(f.cpcEmergenModel.hypertension);
    f.cpcEmergenModel.hf = this.getBit(f.cpcEmergenModel.hf);
    f.cpcEmergenModel.atrialflutter = this.getBit(f.cpcEmergenModel.atrialflutter);
    f.cpcEmergenModel.vpc = this.getBit(f.cpcEmergenModel.vpc);
    f.cpcEmergenModel.apb = this.getBit(f.cpcEmergenModel.apb);
    f.cpcEmergenModel.st = this.getBit(f.cpcEmergenModel.st);
    // ---
    f.cpcEmergenModel.rd = this.getBit(f.cpcEmergenModel.rd);
    f.cpcEmergenModel.dsd = this.getBit(f.cpcEmergenModel.dsd);
    f.cpcEmergenModel.nsd = this.getBit(f.cpcEmergenModel.nsd);
    f.cpcEmergenModel.pd = this.getBit(f.cpcEmergenModel.pd);
    f.cpcEmergenModel.md = this.getBit(f.cpcEmergenModel.md);
    f.cpcEmergenModel.ssd = this.getBit(f.cpcEmergenModel.ssd);
    f.cpcEmergenModel.other = this.getBit(f.cpcEmergenModel.other);
    // --- Grace评估
    f.cpcEmergenModel.isArrest = this.getBit(f.cpcEmergenModel.isArrest);
    f.cpcEmergenModel.isChange = this.getBit(f.cpcEmergenModel.isChange);
    f.cpcEmergenModel.isRise = this.getBit(f.cpcEmergenModel.isRise);
    // --- 是否延误
    f.cpcDiagTreatModel.isDelay = this.getBit(f.cpcDiagTreatModel.isDelay);
    // ---
    f.cpcOutModel.isNetHospital = this.getBit(f.cpcOutModel.isNetHospital);
    f.cpcEmergenModel.isNetWordHospital = this.getBit(f.cpcOutModel.isNetHospital);
    f.cpcRegModel.isPersistent = this.getBit(f.cpcRegModel.isPersistent);
    f.cpcRegModel.isIntermittent = this.getBit(f.cpcRegModel.isIntermittent);
    f.cpcRegModel.isLaxation = this.getBit(f.cpcRegModel.isLaxation);
    f.cpcRegModel.isBellyache = this.getBit(f.cpcRegModel.isBellyache);
    f.cpcRegModel.isDyspnea = this.getBit(f.cpcRegModel.isDyspnea);
    f.cpcRegModel.isShock = this.getBit(f.cpcRegModel.isShock);
    f.cpcRegModel.isHeartAttack = this.getBit(f.cpcRegModel.isHeartAttack);
    f.cpcRegModel.isMalignantArrhythmia = this.getBit(f.cpcRegModel.isMalignantArrhythmia);
    f.cpcRegModel.isCpr = this.getBit(f.cpcRegModel.isCpr);
    f.cpcRegModel.isHemorrhage = this.getBit(f.cpcRegModel.isHemorrhage);
    f.cpcRegModel.isOther = this.getBit(f.cpcRegModel.isOther);
    return f;
  }
  public getCheckboxData(f: any) {
    f.cpcEmergenModel.arrhythmia = this.getBoolean(f.cpcEmergenModel.arrhythmia);
    f.cpcEmergenModel.dcm = this.getBoolean(f.cpcEmergenModel.dcm);
    f.cpcEmergenModel.icm = this.getBoolean(f.cpcEmergenModel.icm);
    f.cpcEmergenModel.hcm = this.getBoolean(f.cpcEmergenModel.hcm);
    f.cpcEmergenModel.carditis = this.getBoolean(f.cpcEmergenModel.carditis);
    f.cpcEmergenModel.chd = this.getBoolean(f.cpcEmergenModel.chd);
    f.cpcEmergenModel.avhd = this.getBoolean(f.cpcEmergenModel.avhd);
    f.cpcEmergenModel.omi = this.getBoolean(f.cpcEmergenModel.omi);
    f.cpcEmergenModel.ap = this.getBoolean(f.cpcEmergenModel.ap);
    f.cpcEmergenModel.palpitate = this.getBoolean(f.cpcEmergenModel.palpitate);
    f.cpcEmergenModel.af = this.getBoolean(f.cpcEmergenModel.af);
    f.cpcEmergenModel.hypertension = this.getBoolean(f.cpcEmergenModel.hypertension);
    f.cpcEmergenModel.hf = this.getBoolean(f.cpcEmergenModel.hf);
    f.cpcEmergenModel.atrialflutter = this.getBoolean(f.cpcEmergenModel.atrialflutter);
    f.cpcEmergenModel.vpc = this.getBoolean(f.cpcEmergenModel.vpc);
    f.cpcEmergenModel.apb = this.getBoolean(f.cpcEmergenModel.apb);
    f.cpcEmergenModel.st = this.getBoolean(f.cpcEmergenModel.st);
    // ---
    f.cpcEmergenModel.rd = this.getBoolean(f.cpcEmergenModel.rd);
    f.cpcEmergenModel.dsd = this.getBoolean(f.cpcEmergenModel.dsd);
    f.cpcEmergenModel.nsd = this.getBoolean(f.cpcEmergenModel.nsd);
    f.cpcEmergenModel.pd = this.getBoolean(f.cpcEmergenModel.pd);
    f.cpcEmergenModel.md = this.getBoolean(f.cpcEmergenModel.md);
    f.cpcEmergenModel.ssd = this.getBoolean(f.cpcEmergenModel.ssd);
    f.cpcEmergenModel.other = this.getBoolean(f.cpcEmergenModel.other);
    // ----
    f.cpcEmergenModel.isArrest = this.getBoolean(f.cpcEmergenModel.isArrest);
    f.cpcEmergenModel.isChange = this.getBoolean(f.cpcEmergenModel.isChange);
    f.cpcEmergenModel.isRise = this.getBoolean(f.cpcEmergenModel.isRise);
    // --
    f.cpcDiagTreatModel.isDelay = this.getBoolean(f.cpcDiagTreatModel.isDelay);
    f.cpcOutModel.isNetHospital = this.getBoolean(f.cpcOutModel.isNetHospital);
    // --
    f.cpcRegModel.isPersistent = this.getBoolean(f.cpcRegModel.isPersistent);
    f.cpcRegModel.isIntermittent = this.getBoolean(f.cpcRegModel.isIntermittent);
    f.cpcRegModel.isLaxation = this.getBoolean(f.cpcRegModel.isLaxation);
    f.cpcRegModel.isBellyache = this.getBoolean(f.cpcRegModel.isBellyache);
    f.cpcRegModel.isDyspnea = this.getBoolean(f.cpcRegModel.isDyspnea);
    f.cpcRegModel.isShock = this.getBoolean(f.cpcRegModel.isShock);
    f.cpcRegModel.isHeartAttack = this.getBoolean(f.cpcRegModel.isHeartAttack);
    f.cpcRegModel.isMalignantArrhythmia = this.getBoolean(f.cpcRegModel.isMalignantArrhythmia);
    f.cpcRegModel.isCpr = this.getBoolean(f.cpcRegModel.isCpr);
    f.cpcRegModel.isHemorrhage = this.getBoolean(f.cpcRegModel.isHemorrhage);
    f.cpcRegModel.isOther = this.getBoolean(f.cpcRegModel.isOther);
    f.cpcRegModel.isNullAttackDetailTime = this.getBoolean(f.cpcRegModel.isNullAttackDetailTime);
    f.cpcRegModel.isHelp = this.getBoolean(f.cpcRegModel.isHelp);
    return f;
  }
  public getCpc() {
    const load = this.$loading({});
    this.$store.dispatch('GetCpc', this.$route.query.id).then(({ data }) => {
      let d: any = data.data;
      Object.keys(d).forEach((item) => d[item] = d[item] ? d[item] : {});
      d = this.getCheckboxData(d);
      // d.cpcDiagTreatModel.treatmentStrategyCode = [];
      this.form = d;
      load.close();
    });
  }
}
</script>

<style lang="less" scoped>
.CrfplaneDataEdit {
	height: 100%;
	.CrfMenu {
		height: 35px;
		width: 100%;
		background-color: #e6e6e6;
		overflow: hidden;
		line-height: 35px;
		span {
			font-size: 18px;
			display: inline-block;
		}
		.menu-title {
			font-weight: bold;
			color: #0071bc;
			width: 200px;
			margin-left: 30px;
			.iconfont {
				font-size: 18px;
			}
		}
		.menu-value {
			padding-right: 10px;
		}
		.dig {
			color: red;
		}
		.menu-right {
			width: auto;
			height: 100%;
			background-color: #3fa9f5;
			float: right;
			div {
				float: left;
				padding: 0px 10px;
				color: #f2f2f2;
				font-size: 14px;
				cursor: pointer;
				&:hover {
					background: #0480d2;
				}
			}
		}
	}
	.el-tabs {
		padding: 0 30px;
		background: #fff;
	}
}
</style>