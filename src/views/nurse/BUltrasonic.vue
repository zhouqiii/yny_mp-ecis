<template>
  <div class="BUltrasonic">
    <el-scrollbar :style="{height:pageHeight + 'px'}">
      <h1 class="is_center">天津市胸科医院<br />彩色多普勒床旁超声报告单</h1>
      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="姓名" style="width:calc(33.3% - 100px)">
          <span>{{form.name}}</span>
        </el-form-item>
        <el-form-item label="性别" style="width:calc(33.3% - 100px)">
          <span v-if="baseConfig.isPrint">{{form.gender|dict('sex')}}</span>
        </el-form-item>
        <el-form-item label="年龄" style="width:calc(33.3% - 100px)">
          <span>{{form.age}}</span>
        </el-form-item>
        <!-- <el-form-item label="临床科室" style="width:calc(33.3% - 100px)">
          <el-cascader :options="deptList" v-model="form.departmentId"></el-cascader>
        </el-form-item>
        <el-form-item label="检查部位" style="width:calc(33.3% - 100px)">
          <span v-if="baseConfig.isPrint">{{form.jianchabuwei}}</span>
          <el-input v-model="form.jianchabuwei" placeholder="请填写" v-if="!baseConfig.isPrint"></el-input>
        </el-form-item> -->
        <el-form-item label="住院号" style="width:calc(33.3% - 100px)">
          <span>{{form.hisCode}}</span>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="0px">
        <el-form-item>
          <h3>床旁超声</h3>
          <table cellpadding="0" cellspacing="0" style='width:100%;border-collapse:collapse;table-layout:fixed; border: 1px solid;'>
            <tr style='height:55.00pt;'>
              <td class="xl65" height="154.67" width="260" colspan="2" rowspan="2" style='height:116.00pt;width:195.00pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;' x:str>心腔大小</td>
              <td class="xl66" width="815" style='width:611.25pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;' x:str>
                左房
                <span style='mso-spacerun:yes;'>

                  <span v-if="baseConfig.isPrint">{{form.patientBedsideBUltrasonic.leftAtrium}}</span>
                  <el-input v-model="form.patientBedsideBUltrasonic.leftAtrium" style="width:100px" placeholder="请填写" v-if="!baseConfig.isPrint">
                  </el-input>

                </span>&nbsp;&nbsp;&nbsp;&nbsp;mm
                <span style='mso-spacerun:yes;'>&nbsp;&nbsp; </span>右房
                <span style='mso-spacerun:yes;'>
                  <span v-if="baseConfig.isPrint">{{form.patientBedsideBUltrasonic.rightAtrium}}</span>
                  <el-input v-model="form.patientBedsideBUltrasonic.rightAtrium" style="width:100px" placeholder="请填写" v-if="!baseConfig.isPrint">
                  </el-input>

                </span>&nbsp;&nbsp;&nbsp;&nbsp;mm</td>
            </tr>
            <tr height="81.33" style='height:61.00pt;mso-height-source:userset;mso-height-alt:1220;'>
              <td class="xl66" x:str style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;">
                左室
                <span style='mso-spacerun:yes;'>
                  <span v-if="baseConfig.isPrint">{{form.patientBedsideBUltrasonic.leftVentricle}}</span>
                  <el-input v-model="form.patientBedsideBUltrasonic.leftVentricle" style="width:100px" placeholder="请填写" v-if="!baseConfig.isPrint">
                  </el-input>
                </span>&nbsp;&nbsp;&nbsp;&nbsp;mm
                <span style='mso-spacerun:yes;'>&nbsp;&nbsp; </span>右室
                <span style='mso-spacerun:yes;'>
                  <span v-if="baseConfig.isPrint">{{form.patientBedsideBUltrasonic.rightVentricle}}</span>
                  <el-input v-model="form.patientBedsideBUltrasonic.rightVentricle" style="width:100px" placeholder="请填写" v-if="!baseConfig.isPrint">
                  </el-input>
                </span>&nbsp;&nbsp;&nbsp;&nbsp;mm
              </td>
            </tr>
            <tr height="64" style='height:48.00pt;mso-height-source:userset;mso-height-alt:960;'>
              <td class="xl65" height="64" colspan="2" style='height:48.00pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;' x:str>室壁厚度
              </td>
              <td class="xl66" x:str style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;">
                <el-radio v-model="form.patientBedsideBUltrasonic.ventricularWallThickness" label="1" :disabled="baseConfig.isPrint">正常</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.ventricularWallThickness" label="2" :disabled="baseConfig.isPrint">增厚</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.ventricularWallThickness" label="3" :disabled="baseConfig.isPrint">部分变薄</el-radio>
              </td>
            </tr>
            <tr height="93.33" style='height:70.00pt;mso-height-source:userset;mso-height-alt:1400;'>
              <td class="xl65" height="93.33" colspan="2" style='height:70.00pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;' x:str>室壁运动
              </td>
              <td class="xl66" x:str style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;">
                <el-radio v-model="form.patientBedsideBUltrasonic.ventricularWallMotion" label="1" :disabled="baseConfig.isPrint">正常</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.ventricularWallMotion" label="2" :disabled="baseConfig.isPrint">部分减分</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.ventricularWallMotion" label="3" :disabled="baseConfig.isPrint">广泛减低</el-radio>
                <span style='mso-spacerun:yes;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>估测EF
                <span v-if="baseConfig.isPrint">{{form.patientBedsideBUltrasonic.ventricularWallMotionEf}}</span>
                <el-input v-model="form.patientBedsideBUltrasonic.ventricularWallMotionEf" style="width:100px" placeholder="请填写" v-if="!baseConfig.isPrint">
                </el-input>%
              </td>
            </tr>
            <tr height="96" style='height:72.00pt;mso-height-source:userset;mso-height-alt:1440;'>
              <td class="xl65" height="354.67" rowspan="5" style='height:266.00pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;' x:str>瓣膜情况
              </td>
              <td class="xl65" rowspan="2" style='border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;' x:str>二尖瓣</td>
              <td class="xl67" x:str style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;">
                <el-checkbox-group v-model="form.patientBedsideBUltrasonic.mitralValve" :disabled="baseConfig.isPrint">
                  <el-checkbox label="正常"></el-checkbox>
                  <el-checkbox label="钙化"></el-checkbox>
                  <el-checkbox label="狭窄"></el-checkbox>
                  (
                  <el-radio v-model="form.patientBedsideBUltrasonic.mitralValveStenosis" label="1" :disabled="baseConfig.isPrint">轻度</el-radio>
                  <el-radio v-model="form.patientBedsideBUltrasonic.mitralValveStenosis" label="2" :disabled="baseConfig.isPrint">中度以上</el-radio>)
                  <el-checkbox label="反流"></el-checkbox>
                  (
                  <el-radio v-model="form.patientBedsideBUltrasonic.mitralValveRegurgitation" label="1" :disabled="baseConfig.isPrint">未见</el-radio>
                  <el-radio v-model="form.patientBedsideBUltrasonic.mitralValveRegurgitation" label="2" :disabled="baseConfig.isPrint">轻度</el-radio>
                  <el-radio v-model="form.patientBedsideBUltrasonic.mitralValveRegurgitation" label="3" :disabled="baseConfig.isPrint">中度以上</el-radio>)
                </el-checkbox-group>
                <el-input v-model="form.patientBedsideBUltrasonic.mitralValveEa" style="width:100px" placeholder="请填写" v-if="!baseConfig.isPrint">
                </el-input>E/A
                <el-input v-model="form.patientBedsideBUltrasonic.mitralValveTdi" style="width:100px" placeholder="请填写" v-if="!baseConfig.isPrint">
                </el-input>TDIe/a
              </td>
            </tr>
            <tr height="68" style='height:51.00pt;mso-height-source:userset;mso-height-alt:1020;'>
              <td class="xl67" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;" x:str>
                人工瓣：前向血流速
                <span style='mso-spacerun:yes;'>
                  <!-- <span v-if="baseConfig.isPrint">{{form.rengongban}}</span> -->
                  <el-input v-model="form.patientBedsideBUltrasonic.prostheticMitralValveForwardFlowVelocity" style="width:100px" placeholder="请填写" v-if="!baseConfig.isPrint"></el-input>
                </span>m/s
                <el-radio v-model="form.patientBedsideBUltrasonic.prostheticMitralValveRegurgitation" label="1" :disabled="baseConfig.isPrint">未见反流</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.prostheticMitralValveRegurgitation" label="2" :disabled="baseConfig.isPrint">中心反流</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.prostheticMitralValveRegurgitation" label="3" :disabled="baseConfig.isPrint">瓣周反流</el-radio>
              </td>
            </tr>
            <tr height="61.33" style='height:46.00pt;mso-height-source:userset;mso-height-alt:920;'>
              <td class="xl65" rowspan="2" style='border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;' x:str>主动脉瓣</td>
              <td class="xl66" x:str style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;">
                <el-checkbox-group v-model="form.patientBedsideBUltrasonic.aorticValve">
                  <el-checkbox label="正常" :disabled="baseConfig.isPrint"></el-checkbox>
                  <el-checkbox label="钙化" :disabled="baseConfig.isPrint"></el-checkbox>
                  <el-checkbox label="狭窄" :disabled="baseConfig.isPrint"></el-checkbox>
                  (
                  <el-radio v-model="form.patientBedsideBUltrasonic.aorticValveStenosis" label="1" :disabled="baseConfig.isPrint">轻度</el-radio>
                  <el-radio v-model="form.patientBedsideBUltrasonic.aorticValveStenosis" label="2" :disabled="baseConfig.isPrint">中度以上</el-radio>)
                  <el-checkbox label="反流" :disabled="baseConfig.isPrint"></el-checkbox>
                  (
                  <el-radio v-model="form.patientBedsideBUltrasonic.aorticValveRegurgitation" label="1" :disabled="baseConfig.isPrint">未见</el-radio>
                  <el-radio v-model="form.patientBedsideBUltrasonic.aorticValveRegurgitation" label="2" :disabled="baseConfig.isPrint">轻度</el-radio>
                  <el-radio v-model="form.patientBedsideBUltrasonic.aorticValveRegurgitation" label="3" :disabled="baseConfig.isPrint">中度以上</el-radio>)
                  <el-checkbox label="E/A" :disabled="baseConfig.isPrint"></el-checkbox>
                  <el-checkbox label="TDIe/a" :disabled="baseConfig.isPrint"></el-checkbox>
                </el-checkbox-group>
              </td>
            </tr>
            <tr height="66.67" style='height:50.00pt;mso-height-source:userset;mso-height-alt:1000;'>
              <td class="xl66" x:str style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;">
                人工瓣：前向血流速
                <span style='mso-spacerun:yes;'>
                  <span v-if="baseConfig.isPrint">{{form.patientBedsideBUltrasonic.prostheticAorticValveForwardFlowVelocity}}</span>
                  <el-input v-model="form.patientBedsideBUltrasonic.prostheticAorticValveForwardFlowVelocity" style="width:100px" placeholder="请填写" v-if="!baseConfig.isPrint"></el-input>
                </span>m/s
                <el-radio v-model="form.patientBedsideBUltrasonic.prostheticAorticValveRegurgitation" label="1" :disabled="baseConfig.isPrint">未见反流</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.prostheticAorticValveRegurgitation" label="2" :disabled="baseConfig.isPrint">中心反流</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.prostheticAorticValveRegurgitation" label="3" :disabled="baseConfig.isPrint">瓣周反流</el-radio>
              </td>
            </tr>
            <tr height="62.67" style='height:47.00pt;mso-height-source:userset;mso-height-alt:940;'>
              <td class="xl65" x:str style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;">三尖瓣
              </td>
              <td class="xl66" x:str style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;">反流（
                <el-radio v-model="form.patientBedsideBUltrasonic.tricuspidValveRegurgitation" label="1" :disabled="baseConfig.isPrint">未见</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.tricuspidValveRegurgitation" label="2" :disabled="baseConfig.isPrint">轻度</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.tricuspidValveRegurgitation" label="3" :disabled="baseConfig.isPrint">中度以上</el-radio>
                ）
                <span style='mso-spacerun:yes;'>&nbsp; </span>估测PAP
                <span style='mso-spacerun:yes;'>
                  <span v-if="baseConfig.isPrint">{{form.patientBedsideBUltrasonic.tricuspidValveRegurgitationPap}}</span>
                  <el-input v-model="form.patientBedsideBUltrasonic.tricuspidValveRegurgitationPap" style="width:100px" placeholder="请填写" v-if="!baseConfig.isPrint">
                  </el-input>
                </span>mmHg</td>
            </tr>
            <tr height="52" style='height:39.00pt;mso-height-source:userset;mso-height-alt:780;'>
              <td class="xl65" height="52" colspan="2" style='height:39.00pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;' x:str>
                心内异常分流</td>
              <td class="xl66" x:str style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;">
                <el-radio v-model="form.patientBedsideBUltrasonic.intracardiacAbnormalShunt" label="1" :disabled="baseConfig.isPrint">未见</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.intracardiacAbnormalShunt" label="2" :disabled="baseConfig.isPrint">房水平</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.intracardiacAbnormalShunt" label="3" :disabled="baseConfig.isPrint">室水平</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.intracardiacAbnormalShunt" label="4" :disabled="baseConfig.isPrint">动脉水平</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.intracardiacAbnormalShunt" label="5" :disabled="baseConfig.isPrint">其他</el-radio>
                <el-input v-model="form.patientBedsideBUltrasonic.intracardiacAbnormalShuntOther" style="width:100px" placeholder="请填写" v-if="!baseConfig.isPrint">
                </el-input>
              </td>
            </tr>
            <tr height="52" style='height:39.00pt;mso-height-source:userset;mso-height-alt:780;'>
              <td class="xl65" height="52" colspan="2" style='height:39.00pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;' x:str>心包腔
              </td>
              <td class="xl66" x:str style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;">
                <el-radio v-model="form.patientBedsideBUltrasonic.pericardialCavity" label="1" :disabled="baseConfig.isPrint">正常</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.pericardialCavity" label="2" :disabled="baseConfig.isPrint">少量积液</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.pericardialCavity" label="3" :disabled="baseConfig.isPrint">中量及以上积液</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.pericardialCavity" label="4" :disabled="baseConfig.isPrint">其他</el-radio>
              </td>
            </tr>
            <tr height="48" style='height:36.00pt;mso-height-source:userset;mso-height-alt:720;'>
              <td class="xl65" height="48" colspan="2" style='height:36.00pt;border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;' x:str>胸腔积液
              </td>
              <td class="xl66" x:str style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;">
                左（
                <el-radio v-model="form.patientBedsideBUltrasonic.pericardialCavityEffusion" label="1" :disabled="baseConfig.isPrint">未见</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.pericardialCavityEffusion" label="2" :disabled="baseConfig.isPrint">少量</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.pericardialCavityEffusion" label="3" :disabled="baseConfig.isPrint">中量及以上</el-radio>
                <span v-if="baseConfig.isPrint">{{form.patientBedsideBUltrasonic.leftPleuralEffusionAmount}}</span>
                <el-input v-model="form.patientBedsideBUltrasonic.leftPleuralEffusionAmount" style="width:100px" placeholder="请填写" v-if="!baseConfig.isPrint">
                </el-input>cm）
              </td>
            </tr>
            <tr height="57.33" style='height:43.00pt;mso-height-source:userset;mso-height-alt:860;'>
              <td class="xl66" height="57.33" style="height:43.00pt;border-right:1px solid windowtext;border-bottom:1px solid windowtext;"></td>
              <td class="xl66" style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;"></td>
              <td class="xl66" x:str style="border-right:.5pt solid windowtext;border-bottom:.5pt solid windowtext;">
                右（
                <el-radio v-model="form.patientBedsideBUltrasonic.rightPleuralEffusion" label="1" :disabled="baseConfig.isPrint">未见</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.rightPleuralEffusion" label="2" :disabled="baseConfig.isPrint">少量</el-radio>
                <el-radio v-model="form.patientBedsideBUltrasonic.rightPleuralEffusion" label="3" :disabled="baseConfig.isPrint">中量及以上</el-radio>
                <span v-if="baseConfig.isPrint">{{form.patientBedsideBUltrasonic.rightPleuralEffusionAmount}}</span>
                <el-input v-model="form.patientBedsideBUltrasonic.rightPleuralEffusionAmount" style="width:100px" placeholder="请填写" v-if="!baseConfig.isPrint">
                </el-input>cm）
              </td>
            </tr>
          </table>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label=" 超声印象:">
          <div class="is_input" v-if="baseConfig.isPrint">{{form.patientBedsideBUltrasonic.ultrasoundImpression}}</div>
          <el-input v-model="form.patientBedsideBUltrasonic.ultrasoundImpression" placeholder="请填写" v-if="!baseConfig.isPrint"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="400px" :inline="true" class="is_right">
        <el-form-item label="此报告仅供参考，不做判断依据  诊断医生:">
          <div class="is_input" v-if="baseConfig.isPrint">{{form.patientBedsideBUltrasonic.createdBy}}</div>
          <el-input v-model="form.patientBedsideBUltrasonic.createdBy" placeholder="请填写" v-if="!baseConfig.isPrint"></el-input>
        </el-form-item>
        <el-form-item label="检查日期:">
          <div class="is_input" v-if="baseConfig.isPrint">{{form.patientBedsideBUltrasonic.createdOn}}</div>
          <yn-date-time-pick v-model="form.patientBedsideBUltrasonic.createdOn" type="date" placeholder="选择日期" v-if="!baseConfig.isPrint" value-format="yyyy-MM-dd HH:mm:ss"></yn-date-time-pick>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button @click="onReturn">返回</el-button>
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const df = Vue.filter('dictFilter');
@Component({})
export default class BUltrasonic extends Vue {
  private form: {
    visitId?: string,
    departmentId: any[] | string,
    patientBedsideBUltrasonic: {
      visitId: number,
      mitralValve: any[] | string,
      aorticValve: any[] | string
    }
  } = {
      departmentId: [],
      patientBedsideBUltrasonic: {
        visitId: 0,
        mitralValve: [],
        aorticValve: []
      }
    };
  private baseConfig = {
    isPrint: false
  };
  private deptList = [];
  private sex = df('sex');
  private info = '';
  private pageHeight = window.innerHeight - 100;
  private pageType = location.pathname.split('/')[location.pathname.split('/').length - 1] === 'edit';
  private async onSave() {
    // const iframe = $('iframe').get(0);
    const patientBedsideBUltrasonic = JSON.parse(JSON.stringify(this.form.patientBedsideBUltrasonic));
    // iframe.contentWindow.vApp.getForm().patientBedsideBUltrasonic;
    patientBedsideBUltrasonic.visitId = this.form.visitId;
    patientBedsideBUltrasonic.mitralValve = patientBedsideBUltrasonic.mitralValve ?
    patientBedsideBUltrasonic.mitralValve.join(',') : '';
    patientBedsideBUltrasonic.aorticValve = patientBedsideBUltrasonic.aorticValve ?
    patientBedsideBUltrasonic.aorticValve.join(',') : '';
    patientBedsideBUltrasonic.modifiedOn = patientBedsideBUltrasonic.createdOn;
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    const d = await this.$store.dispatch(this.pageType ? 'PutBedside' : 'SaveBedside', patientBedsideBUltrasonic);
    loading.close();
    if (d.data.code === 0) {
      this.$message.success('保存成功');
      this.$router.go(-1);
    }
  }
  // 选择器递归
  private recursion = (dept: any) => {
    return dept.map((item: any) => {
      return {
        label: String(item.name),
        value: String(item.id),
        children: item.children && item.children.length > 0 ? this.recursion(item.children) : null
      };
    });
  }
  /**
   * 查询部门
   */
  private selectDeptList() {
    this.$store.dispatch('DeptList').then(({ data }) => {
      const obj = data.data;
      this.deptList = this.recursion(obj);
    });
  }
  private setForm() {
    if (this.pageType) {
      this.form = JSON.parse(this.$route.query.req as string);
      this.form.departmentId = this.form.departmentId ? [this.form.departmentId] : [];
      this.form.patientBedsideBUltrasonic.mitralValve = this.form.patientBedsideBUltrasonic.mitralValve ?
      (this.form.patientBedsideBUltrasonic.mitralValve as string).split(',') : [];
      this.form.patientBedsideBUltrasonic.aorticValve = this.form.patientBedsideBUltrasonic.aorticValve ?
      (this.form.patientBedsideBUltrasonic.aorticValve as string).split(',') : [];
      return;
    }
    this.form = {
      ...this.form,
      ...JSON.parse(this.$route.query.req as string)
    };
    this.form.patientBedsideBUltrasonic.mitralValve = this.form.patientBedsideBUltrasonic.mitralValve ?
    (this.form.patientBedsideBUltrasonic.mitralValve as string).split(',') : [];
    this.form.patientBedsideBUltrasonic.aorticValve = this.form.patientBedsideBUltrasonic.aorticValve ?
    (this.form.patientBedsideBUltrasonic.aorticValve as string).split(',') : [];
    this.form.departmentId = [];
  }
  private created() {
    if (!this.$route.query.req || !JSON.parse(this.$route.query.req as string).visitId) {
      this.$message.info('请重新选择对象再执行添加编辑操作');
      this.$router.push({ name: 'BUltrasonicList' });
      return;
    }
    this.setForm();
    this.baseConfig.isPrint = this.$route.query.isDisable==='1';
    this.$store.commit('SET_OPBTN_VALUE', [
      { name: '保存', event: 'onSave' }
    ]);
    $(window).resize(() => this.pageHeight = window.innerHeight - 100);
  }
  private mounted() {
    this.selectDeptList();
  }
  private onReturn() {
    this.$router.push('/emergency/b-ultrasonic-list');
  }
}
</script>
<style lang="less" scoped>
.BUltrasonic {
  overflow: auto;
  height: auto;
  h1 {
    text-align: center;
    font-size: 18px;
    margin: 0;
    font-size: 38px;
  }
}
</style>
