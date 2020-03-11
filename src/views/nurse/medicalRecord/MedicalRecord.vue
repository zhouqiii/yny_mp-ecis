<template>
  <div class="MedicalRecord">
    <div class="left">
      <el-tabs type="border-card" v-model="selectedTab">
        <el-tab-pane v-for="(item,i) in tmps" :label="item.title" :key="i" :name="item.value">
          <div :style="{height:`${tabHeight}px`}">
            <el-scrollbar :style="{height: 'calc(100% - 10px)'}">
              <el-checkbox-group v-model="selectedIframeList">
                <div v-for="(obj,index) in editableTabs" :key="index">
                  <template v-if="obj.id">
                    <a :id="`t${obj.id}`"></a>
                    <div class="iframeBox" v-if="obj.type==item.value">
                      <div class="tabSlectedTitle">
                        <b>
                          <el-checkbox :label="obj.id">{{obj.title}}</el-checkbox>
                        </b>
                        <div class="tool" >
                          {{obj.createdOn}}
                          <!-- <el-button @click="onPrint" size="mini" round class="tool-btn"> -->
                          <!-- <i class="el-icon-printer" style="color:#409EFF"></i>&nbsp;&nbsp;打印</el-button> -->
                          <el-button @click="showIframe" class="tool-btn" size="mini" round>
                            <i class="el-icon-caret-top" style="color:#409EFF"></i>
                            <span class="value">折叠</span>
                          </el-button>
                          <el-button size="mini" round class="tool-btn" @click="removeTab(index,obj)">
                            <i class="el-icon-delete" style="color:#409EFF"></i>&nbsp;&nbsp;删除</el-button>
                        </div>
                      </div>
                      <iframe :class="`iframe${obj.id}`" :data-print="obj.content" :data-id="obj.id" :srcdoc="onSelectedTmp(obj.content, obj.data ? obj.data : $store.getters.GET_PATIENT,obj.baseConfig)" @load="setIframeHeight" style="overflow:hidden;"></iframe>
                    </div>
                  </template>
                </div>
              </el-checkbox-group>
            </el-scrollbar>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right">
      <h1>文档结构</h1>
      <el-scrollbar :style="{height: 'calc(100% - 60px)'}">
        <div class="tempMenu">
          <div class="tempName" v-for="(item,i) in editableTabs" v-if="item.type==Number(selectedTab)" :key="i" :title="item.title">
            <a :href="`#t${item.id}`">{{item.title}}
              <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
              <!-- <span style="color:#545454">{{item.createdOn}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {{item.createdBy}}</span> -->
            </a>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <el-dialog title="获取心电图" :visible.sync="dialogVisible" width="30%" :show-close="false">
      <p>
        <i class="el-icon-loading"></i>
        <span class="el-icon-name">心电图获取中</span>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
        <!--<el-button type="primary" @click="onSaveVisible = false">确 定</el-button>-->
      </span>
    </el-dialog>
    <el-dialog class="tmpAlert" title="首诊病历" :visible.sync="tmpVisible">
      <el-table :data="tmpsArr" height="500" highlight-current-row @current-change="createClick" v-if="tmpVisible">
        <el-table-column type="expand">
          <template slot-scope="props">
            <iframe :srcdoc="props.row.content" style="width:100%" @load="setIframeHeight"></iframe>
          </template>
        </el-table-column>
        <el-table-column property="id" label="编号"></el-table-column>
        <el-table-column property="title" label="模版名称"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog class="tmpAlert" title="心电图列表" :visible.sync="ekgVisible">
      <div>
        <el-date-picker v-model="ekgTimeArea.startDate" type="datetime" placeholder="选择日期时间" value-format="timestamp" style="width:200px;"></el-date-picker>-
        <el-date-picker v-model="ekgTimeArea.endDate" type="datetime" placeholder="选择日期时间" value-format="timestamp" style="width:200px;"></el-date-picker>
        <el-button @click="onEkgSearch">搜索</el-button>
      </div>
      <el-table :data="ekgList" height="500" highlight-current-row @current-change="onEkgChange" v-if="ekgVisible">
        <el-table-column property="name" label="名称"></el-table-column>
        <el-table-column property="uploadTime" label="检测时间"></el-table-column>
        <el-table-column property="updateTime" label="上传时间"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onEkgSave">确 定</el-button>
      </span>
      <div></div>
    </el-dialog>
    <el-dialog title="诊断" class="InsertionDiagnosis" :visible.sync="isInsertionDiagnosis">
      <div class="tool">
        <div class="code">诊断编号：
          <input v-model="diagnosisValue" style="width:200px" @input="getInsertionDiagnosisList"/>
        </div>
        <el-button class="search" @click="getInsertionDiagnosisList">搜索</el-button>
      </div>
      <el-table :data="diagnosisList" height="500" tooltip-effect="dark" v-if="isInsertionDiagnosis" @selection-change="onDiagnosisChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="name" label="名称"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSaveDiagnosis">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="病程记录" class="diseaseLog" :visible.sync="isDiseaseLog">
      <el-table :data="diseaseLogList" height="500" tooltip-effect="dark" v-if="isDiseaseLog" @selection-change="onDiseaseLogChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="title" label="名称"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onDiseaseLogSave">确 定</el-button>
      </span>
    </el-dialog>
    <yn-doctor-advice-table title="插入医嘱" :data="doctorAdviceData" @save="onDoctorAdviceSave" ref="doctorAdvice" />
    <yn-pacs-table title="插入检查" :data="pacsData" @save="onPacsSave" ref="pacs" />
    <yn-lis-table title="插入检验" :data="lisData" @save="onLisSave" ref="lis" />
  </div>
</template>
<script lang="tsx">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Ueditor from '@/components/Ueditor.vue';
import Config from '../../../util/config';
const df = Vue.filter('dictFilter');
const diagnosis = {
  onSaveDiagnosis: (val: any) => false
};
const diseaseLog = {
  onDiseaseLogSave: (val: any) => false
};
const ekg = {
  onEkgSave: (val: any) => false
};
const doctorAdvice = {
  onDoctorAdviceSave:(val: any)=> Object
};
const test = {
  onSave: (val: any) => false
};
@Component({
  components: { Ueditor }
})
export default class MedicalRecord extends Vue {
  private tmpHtml = '';
  private tmps: any[] = [];
  private ekgList: any[] = [];
  private ekgVisible: boolean = false;
  private form = {
    title: '',
    context: '',
    patientVisitId: 0
  };
  private defaultProps = {
    children: 'children',
    label: 'title'
  };
  private rules = {
    title: [
      { required: true, message: '请输入标题', trigger: 'blur' }
    ]
  };
  private checkData = [
          {name:'凝血全项+DIMER',child:[
            {id:'1',goals: '白细胞',result: '6',unit: 'x10*9/L',error: '',normalval: '5.5-9.5'},
            {id:'2',goals:'中性粒细胞%',result:'7',unit:'%',error:'',mormalval:'40-75'},
            {id:'3',goals: '淋巴细胞%',result: '8',unit: '%',error: '',normalval: '20-50'},
            {id:'4',goals: '单核细胞%',result: '8',unit: '%',error: '',normalval: '2-50'},
            {id:'5',goals: '啫酸粒细胞%',result: '8',unit: '%',error: '',normalval: '20-50'},
            {id:'6',goals: '啫碱粒细胞%',result: '8',unit: '%',error: '',normalval: '20-50'},
            {id:'7',goals: '中性粒细胞绝对值',result: '8',unit: 'x10*9/L',error: '',normalval: '20-50'},
            {id:'8',goals: '淋巴细胞绝对值',result: '8',unit: 'x10*9/L',error: '',normalval: '20-50'},
            {id:'9',goals: '单核细胞绝对值',result: '8',unit: 'x10*9/L',error: '',normalval: '20-50'},
            {id:'10',goals: '啫酸粒细胞绝对值',result: '8',unit: 'x10*9/L',error: '',normalval: '20-50'},
            {id:'11',goals: '啫碱粒细胞绝对值',result: '8',unit: 'x10*9/L',error: '',normalval: '20-50'},
          ]},
          {name:'血常规',child:[
            {id:'2',goals:'中性粒细胞%',result:'7',unit:'%',error:'',mormalval:'40-75'},
          ]},
          {name:'尿常规',child:[{
            id:'3',goals: '淋巴细胞',result: '8',unit: '%',error: '',normalval: '20-50'
          }]},
            ];
  private tmpTabsValue = 'tmp0';
  private editableTabs: any[] = [];
  private scrollbarHeight: number = 0;
  private isView = true;
  private dialogVisible = false;
  private initDate = 0;
  private tabHeight = window.innerHeight - 160;
  // private iframeWidth = window.innerWidth - 500;
  private selectedTab = '1';
  private tmpVisible = false;
  private user = {};
  private rowData = {};
  private isInsertionDiagnosis = false;
  private adviceVisible = false;
  private isDiseaseLog = false;
  private diagnosisList = [];
  private diagnosisValue = '';
  private diagnosisSelection = [];
  private selectedIframeList = [];
  private diseaseLogList: any[] = [];
  private diseaseLogSelection: any[] = [];
  private isDoctorAdvice = false;
  /**
   * 检查信息
   */
  private lisData: any[] = [];
  /**
   * 医嘱信息
   */
  private doctorAdviceData: any[] = [];
  /**
   * 检验信息
   */
  private pacsData: any[] = [];
  private ekgTimeArea: TimeArea = {
    startDate:new Date(new Date().format('yyyy-MM-dd')).getTime(),
    endDate:Date.now(),
    equipmentNo:'G911180203100N0027'
  };
  private get tmpsArr() {
    const tmpArr = this.tmps.filter((item, i) => String(item.value) === String(this.selectedTab));
    return tmpArr.length > 0 ? tmpArr[0].children : [];
  }
  private created() {
    (window as any).medicalRecord = this;
  }
  private onLoad(isHideList: boolean = false) {
    const that: any = this;
    const messageHtml = (<div class='deviceList'>
      <ul>
        <li onClick={that.getIMAC} data-id='G911180203100N0026'>{'0026心电图机'}</li>
        <li onClick={that.getIMAC} data-id='G911180203100N0027'>{'0027心电图机'}</li>
        <li onClick={that.getIMAC} data-id='G911180203100N0028'>{'0028心电图机'}</li>
      </ul>
    </div>);
    return new Promise((resolve, reject) => {
      this.$msgbox({
        title: '获取设备',
        message: messageHtml,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'      }).then((action) => {
        this.$store.dispatch('PatientEKG', this.ekgTimeArea).then((d) => {
          this.ekgVisible = true;
          this.ekgList = d;
          ekg.onEkgSave = (val) => {
            this.$store.dispatch('ElectrocardiogrampdfBinding', {
              equipmentNo: this.ekgTimeArea.equipmentNo,
              fileNames:[val.name]
            }).then(()=> {
              resolve({
                uploadTime:val.uploadTime,
                url:this.ekgTimeArea.equipmentNo+'/'+val.name
              });
              this.ekgVisible = false;
            });
            return false;
          };
        });
      });
    });
  }
  private onEkgSearch() {
    if(!this.ekgTimeArea.startDate||!this.ekgTimeArea.endDate) {
      return this.$message.warning('请输入查询时间');
    }
    this.$store.dispatch('PatientEKG', this.ekgTimeArea).then((d) => {
      this.ekgVisible = true;
      this.ekgList = d;
    });
  }
  private onEkgSave() {
    ekg.onEkgSave(this.rowData);
  }
  private getIMAC(e: any) {
    this.ekgTimeArea.equipmentNo = e.target.dataset.id;
    $(e.target).siblings().removeClass('is-active');
    $(e.target).addClass('is-active');
  }
  private onEkgChange(item: any) {
    // window.open('http://'+location.hostname+':83/'+item.filePath);
    this.rowData = item;
  }
  /**
	 * 获取数据填充模板
	 */
  private onSelectedTmp(html: string, patient: any, baseConfig: { isInit: number, isPrint: number }) {
    if (!patient || (this.$store.getters.GET_PATIENT && !this.$store.getters.GET_PATIENT.visitId)) {
      this.$message.warning('请选择病人！');
      return '';
    }
    // const patient = this.$store.getters.GET_PATIENT;
    const accessToken = localStorage.getItem('access_token');
    Object.keys(patient).forEach((item) => {
      patient[item] = patient[item] ? patient[item] : '';
    });
    const p = JSON.parse(JSON.stringify(patient));
    p.content = '';
    return `<script>var req=${JSON.stringify(p)};var accessToken=${accessToken};
    var baseConfig = ${JSON.stringify(baseConfig)};</` + 'script>' + html;
  }
  private onSave() {
    const patient = this.$store.getters.GET_PATIENT;
    const formList: any[] = [];
    $.each($('iframe'), (i: number, item: any) => {
      if (!item.contentWindow.vApp) {
        return;
      }
      const form = {
        patientVisitId: patient.visitId,
        patientMedicalRecordId: patient.medicalRecordId,
        medicalRecordTemplateId: $(item).attr('data-id'),
        content: JSON.stringify(item.contentWindow.vApp.getForm())
      };
      formList.push(form);
    });
    this.saveDate(formList);
  }
  /**
	 * 保存病历模版
	 */
  private saveDate(data: any[]) {
    this.$store.dispatch('PatientmedicalrecorditemPost', data);
  }
  /**
	 * 获得该病人模版
	 */
  private patientmedicalrecorditemList() {
    const load = this.$loading({ lock: true, text: '加载中' });
    axios.all([this.$store.dispatch('PatientmedicalrecorditemList', this.$store.getters.GET_PATIENT.visitId),
    this.$store.dispatch('MedicalRecordTmpList')]).then(axios.spread((acct: any, perms: any) => {
      (acct.data.data as any).forEach((item: any) => {
        for (const obj of perms.data.data.records) {
          if (obj.id && item.medicalRecordTemplateId === obj.id) {
            this.selectClick(obj, JSON.parse(item.content));
            return;
          }
        }
      });
      load.close();
    }));
  }
  /**
	 * 预览模式
	 */
  // private onView() {
  //     this.isView = !this.isView;
  //     this.$store.commit('SET_OPBTN_VALUE', [
  //         // {name: this.isView ? '普通模式' : '预览模式', event: 'onView'},
  //         {name: '保存', event: 'onSave'},
  //         {name: '返回', event: 'onReturn'}
  //     ]);
  // }
  private createClick(item: any) {
    if (item === null) {
      return;
    }
    item.createdOn = new Date().format('yyyy-MM-dd hh:mm:ss');
    this.selectClick(item);
  }
  private async selectClick(item: any, data: any = null) {
    const load = this.$loading({});
    if (!this.$store.getters.GET_PATIENT ||
      (this.$store.getters.GET_PATIENT && !this.$store.getters.GET_PATIENT.visitId)) {
      this.$message.warning('请选择病人！');
      load.close();
      return '';
    }
    item = item === null ? {} : item;
    item.baseConfig = {
      isInit: 0,
      isPrint: 0
    };
    item.data = null;
    if (data) {
      item.baseConfig = {
        isInit: 1,
        isPrint: 0
      };
      item.data = data;
    }
    this.tmpVisible = false;
    item.createdOn = item.createdOn ? item.createdOn : new Date().format('yyyy-MM-dd hh:mm:ss');
    // item.createdBy = item.createdBy ? item.createdBy : this.$store.getters.GET_ADMIN_INFO.data.sysUser.userId;
    const user: any[] = (await this.$store.dispatch('UserList'));
    const adminInfo = localStorage.getItem('admin_info')?JSON.parse(localStorage.getItem('admin_info') as string):{};
    item.createdName = adminInfo.data.sysUser.username;
    this.editableTabs.push(item);
    load.close();
    this.$message.success('临时添加到所选模版，注意保存');
  }
  private removeTab(i: any, obj: any) {
    this.$confirm('电子病历删除后无法恢复，确定删除？')
          .then(async (_) => {
            if (obj.id) {
              await this.$store.dispatch('PatientmedicalrecorditemDelete', obj.id);
            }
            this.editableTabs.splice(i, 1);
            this.$message.success('删除成功');
          })
          .catch((_) => {
            this.$message.info('取消删除');
          });
  }
  /**
	 * 隐藏已用模板
	 * @param i
	 */
  private onhideTmp(i: number) {
    this.editableTabs[i].status = this.editableTabs[i].status === '1' ? '0' : '1';
  }
  private mounted() {
    this.$store.commit('SET_OPBTN_VALUE', [
      // {name: '普通模式', event: 'onView'},
      { name: '打印', event: 'onPrintAll' },
      { name: '选择模版', event: 'onTmpAlert' },
      // { name: '心电图', event: 'onLoad' },
      { name: '保存', event: 'onSave' },
      { name: '返回', event: 'onReturn' }
    ]);
    this.getMedicalRecordTmpList();
    $(window).resize(() => this.resize());
    this.resize();
    setInterval(() => {
      $('iframe').each((i: any, item: any) => {
        this.setIframeHeight({ target: item });
      });
    }, 60);
  }

  @Watch('$store.state.patient.patient')
  private watchGetPatient() {
    this.editableTabs = [];
    this.patientmedicalrecorditemList();
  }
  private onShowPage() {
    window.open('http://localhost:83/show.pdf?url=p');
  }
  private async getMedicalRecordTmpList() {
    const { data } = await this.$store.dispatch('MedicalRecordTmpList');
    const template: any[] = df('template');
    this.tmps = template.map((item: any) => {
      item.children = (data.data.records as any[]).filter((element) => String(element.type) === String(item.value));
      item.title = item.label;
      return item;
    });
    this.diseaseLogList = (data.data.records as any[]).filter((element) => String(element.type) === String(3));
  }
  private setIframeHeight(e: any) {
    const iframe = e.target;
    if (iframe) {
      const iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
      if (iframeWin.document.body) {
        $(iframe).height($(iframeWin.document.getElementById('app')).height()+'px');
        iframeWin.document.body.style.fontSize = '14px';
        iframeWin.document.body.style.fontFamily = '宋体';
      }
    }
  }
  private showIframe(e: any) {
    const $target = $(e.target);
    const $iframe = $target.parents('.iframeBox').find('iframe');
    $iframe.toggle();
    $target.find('.value').text(
      $target.find('.value').text() === '折叠' ? '展开' : '折叠');
    $target.find('.tool i').toggleClass('el-icon-caret-bottom el-icon-caret-top');
  }
  private onPrint(e: any) {
    const $target = $(e.target);
    const iframe = $target.parents('.iframeBox').find('iframe').get(0);
    iframe.contentWindow.vApp.baseConfig = {
      isInit: 0,
      isPrint: 1
    };
    setTimeout(() => {
      // $(iframe.contentWindow.document.body).jqprint();
      iframe.contentWindow.print();
      iframe.contentWindow.vApp.baseConfig = {
        isInit: 0,
        isPrint: 0
      };
    }, 1000);
  }
  private onTmpAlert() {
    if (!this.$store.getters.GET_PATIENT ||
      (this.$store.getters.GET_PATIENT && !this.$store.getters.GET_PATIENT.visitId)) {
      this.$message.warning('请选择病人！');
      return '';
    }
    this.tmpVisible = true;
  }
  private resize() {
    // this.iframeWidth=window.innerWidth - 500;
    this.tabHeight = window.innerHeight - 160;
    this.scrollbarHeight = window.innerHeight - 120;
  }
  private onPrintAll() {
    const iframes: any[] = [];
    $('iframe:visible').filter(this.selectedIframeList.map((item) => `.iframe${item}`).join(','))
      .each((i: number, item: any) => {
        iframes.push({
          req: item.contentWindow.vApp.getForm(),
          context: $(item).attr('data-print')
        });
      });
    sessionStorage.setItem('printAll', JSON.stringify(iframes));
    window.open('/tmpPrint.html');
  }
  /**
   * 诊断弹窗显示
   */
  private onInsertionDiagnosis() {
    return new Promise((resolve, reject) => {
      this.isInsertionDiagnosis = true;
      this.getInsertionDiagnosisList();
      diagnosis.onSaveDiagnosis = (val) => {
        resolve(val);
        return false;
      };
    });
  }
  private async getInsertionDiagnosisList() {
    const pinYin = this.diagnosisValue ? this.diagnosisValue : 'A';
    const d = await this.$store.dispatch('InsertionDiagnosisList', pinYin);
    this.diagnosisList = d.map((item: any) => ({ name: item }));
  }
  private onDiagnosisChange(val: any) {
    this.diagnosisSelection = val;
  }
  /**
   * 诊断弹窗保存
   */
  private onSaveDiagnosis() {
    this.isInsertionDiagnosis = false;
    diagnosis.onSaveDiagnosis(this.diagnosisSelection);
  }
  /**
   * 病程记录
   */
  private onDiseaseLog() {
    this.isDiseaseLog = true;
    return new Promise((resolve, reject) => {
      diseaseLog.onDiseaseLogSave = (val) => {
        resolve(val);
        return false;
      };
    });
  }
  private onDiseaseLogChange(val: any) {
    this.diseaseLogSelection = val;
  }
  private onDiseaseLogSave(val: any) {
    diseaseLog.onDiseaseLogSave(this.diseaseLogSelection);
    this.isDiseaseLog = false;
  }
  /**
   * 插入检查
   */
  private onPacs() {
    return new Promise(async (resolve, reject) => {
      await this.getPacsData();
      const t: any = this.$refs.pacs;
      t.isVisible = true;
      test.onSave = (val)=> {
        resolve(val);
        return false;
      };
    });
  }
  private onPacsSave(selectionData: any) {
    test.onSave(selectionData);
  }
  private async getPacsData() {
    const d = await this.$store.dispatch('GetPacs');
    this.pacsData = d;
  }
  /**
   * 插入检验
   */
  private onLis() {
    return new Promise(async (resolve, reject) => {
      await this.getLisData();
      const t: any = this.$refs.lis;
      t.isVisible = true;
      test.onSave = (val)=> {
        resolve(val);
        return false;
      };
    });
  }
  private onLisSave(selectionData: any) {
    test.onSave(selectionData);
  }
  private async getLisData() {
    const d = await this.$store.dispatch('GetLis');
    this.lisData = d;
  }
  /**
   * 插入医嘱
   */
  private onDoctorOrder() {
    return new Promise(async (resolve, reject) => {
      await this.getDoctorOrderData();
      const t: any = this.$refs.doctorAdvice;
      t.isVisible=true;
      test.onSave = (val)=> {
        resolve(val);
        return false;
      };
    });
  }
  private onDoctorAdviceSave(selectionData: any) {
    test.onSave(selectionData);
  }
  private async getDoctorOrderData() {
    const data = await this.$store.dispatch('GetDoctorOrder');
    this.doctorAdviceData = data;
  }
  /***
   * 插入签名
  */
  private onInsertionName() {
    const adminInfo = JSON.parse(localStorage.getItem('admin_info') as string);
    return new Promise((resolve, reject) => {
       this.$store.dispatch('GetSign',adminInfo.data.sysUser.userId).then((val)=> {
          resolve(val.data);
       });
    });
  }
}
</script>

<style lang="less" scoped>
.MedicalRecord {
  display: inline-block;
  height: calc(100% - 117px);
  width: calc(100% - 291px);
  position: absolute;
  right: 0;
  top: 96px;
  padding: 10px;
  .left,
  .right {
    position: absolute;
    height: calc(100% - 20px);
    background: #fff;
  }
  .left {
    width: calc(100% - 350px);
    .tabSlectedTitle {
      background: #dfedf9;
      padding: 19px 14px;
      color: #409eff;
      b {
        padding-right: 56px;
      }
    }
    table {
      border-color: #444;
    }
    .tool {
      float: right;
      position: relative;
      top: -5px;
    }
    .iframeBox {
      margin: 10px;
      box-shadow: 0px 2px 11px #666;
      padding: 10px;
      background: #fff;
      .tool-btn {
        font-size: 14px;
      }
    }
    iframe {
      width: 100%;
      border: none;
    }
  }
  .right {
    width: 330px;
    right: 10px;
    h1 {
      padding: 0 10px;
    }
    .tempMenu {
      background: #fff;
      line-height: 2;
      font-size: 12px;
      .tempName {
        overflow: hidden; /*内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
        white-space: nowrap; /*不换行 */
        padding: 0 10px;
        &:hover {
          background: #eee;
        }
        a {
          text-decoration: none;
          color: #409eff;
        }
      }
    }
  }
  .el-icon-loading,
  .el-icon-name {
    display: block;
    text-align: center;
  }
  .el-icon-loading {
    font-size: 30px;
  }
  .el-icon-name {
    margin-top: 4%;
  }
  .InsertionDiagnosis {
    .tool {
      .code {
        display: inline-block;
        width: 300px;
      }
      .search {
        display: inline-block;
      }
    }
  }
}
</style>
<style lang="less">
.MedicalRecord {
  .el-tabs--border-card {
    background: #f0f4ff;
  }
  .el-tabs--border-card > .el-tabs__content {
    padding: 0;
  }
  .el-tabs--border-card > .el-tabs__header {
    background-color: #0c3855;
    border-bottom: none;
    .el-tabs__item {
      width: 200px;
      text-align: center;
      margin-right: 10px;
      background: #5a5c68;
      margin-top: 10px;
      border-radius: 5px 5px 0 0;
      color: #fff;
      &:hover {
        background: #f0f4ff;
      }
      &.is-active {
        background: #f0f4ff;
        color: #409eff;
        font-weight: bold;
      }
    }
  }
  .el-button:focus {
    background-color: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
  }
  .el-button:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .tmpAlert {
    .el-dialog__body {
      padding: 0 20px 20px;
    }
    iframe {
      border: 1px solid #eee;
      width: 100%;
    }
  }
}
.deviceList {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      padding: 10px 10px;
      border: 1px solid #ddd;
      margin-top: 10px;
      cursor: pointer;
      &:first-child {
        margin-top: 0;
      }
      &.is-active {
        border: 1px solid #409eff;
        color: #409eff;
      }
    }
  }
}
</style>
