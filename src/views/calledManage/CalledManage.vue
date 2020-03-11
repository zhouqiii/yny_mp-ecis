<template>
  <div class="callInfo">
    <div class="main">
      <el-tabs v-model="activeName" @tab-click="onTabClick">
        <el-tab-pane label="未叫号信息" name="first">
          <div class="callBefor" v-if="activeName==='first'">
            <div class="callMenu">
              <div class="menu-left">
                <el-form ref="form" :model="form" label-width="90px">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="开始日期：">
                        <yn-date-time-pick v-model="startDate" type="date" placeholder="查询开始日期"></yn-date-time-pick>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="结束日期：">
                        <yn-date-time-pick v-model="endDate" type="date" placeholder="查询结束日期"></yn-date-time-pick>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="姓名/床号：">
                        <el-input class="searchInput" v-model="searchVal" placeholder="病人姓名/病人床号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-button type="primary" @click="searchPatient(0)">查询</el-button>
                      <el-button type="primary" @click="called(0)">叫号</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <div class="bedTable">
              <el-scrollbar :style="{height:listHeight}">
                <el-table :data="tableData1" highlight-current-row border style="width: 100%" @row-click="onGetRowData">
                  <el-table-column prop="visitHisCode" label="急诊ID" width="100">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="120">
                  </el-table-column>
                  <el-table-column prop="gender" label="性别" width="100">
                    <template slot-scope="scope">
                      <span v-for="(item,i) in sex" :key="i">
                        <span v-if="item.value === scope.row.gender">{{item.label}}</span>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="100">
                  </el-table-column>
                  <el-table-column prop="severityLevelSys" label="等级" width="100">
                    <template slot-scope="scope">
                      <el-button size="mini" :class="levelStyle(scope.row)"> {{scope.row.severityLevelSys}}级</el-button>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="section" label="病区" width="100">
                  </el-table-column> -->
                  <el-table-column prop="status" label="状态" width="120">
                    <template slot-scope="scope">
                      <span v-for="(item,i) in visitStatus" :key="i">
                        <span v-if="item.value === scope.row.status">{{item.label}}</span>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="treatDate" label="分诊时间" width="120">
                  </el-table-column>
                  <el-table-column prop="illnessState" label="科室" width="">
                    <template slot-scope="scope">
                      <el-button size="mini" :class="scope.row.departmentId===12?'text-color-red':'text-color-blue'"> {{scope.row.department}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="symptomName" label="主要状况" width="">
                  </el-table-column>
                </el-table>
              </el-scrollbar>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已叫号信息" name="second">
          <div class="callBefor" v-if="activeName==='second'">
            <div class="callMenu">
              <div class="menu-left">
                <el-form ref="form" :model="form" label-width="90px">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="开始日期：">
                        <yn-date-time-pick v-model="startDate" type="date" placeholder="查询开始日期"></yn-date-time-pick>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="结束日期：">
                        <yn-date-time-pick v-model="endDate" type="date" placeholder="查询结束日期"></yn-date-time-pick>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="姓名/床号：">
                        <el-input class="searchInput" v-model="searchVal" placeholder="病人姓名/病人床号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-button type="primary" @click="searchPatient(1)">查询</el-button>
                      <el-button type="primary" @click="visitPatient('2')">转流水</el-button>
                      <el-button type="primary" @click="visitPatient('999')">接诊完成</el-button>
                      <el-button type="primary" @click="onPastNum">过号</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <div class="bedTable">
              <el-scrollbar :style="{height:listHeight}">
                <el-table :data="tableData2" highlight-current-row border style="width: 100%" @row-click="onGetRowData">
                  <el-table-column prop="visitHisCode" label="急诊ID" width="100">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="120">
                  </el-table-column>
                  <el-table-column prop="gender" label="性别" width="100">
                    <template slot-scope="scope">
                      <span v-for="(item,i) in sex" :key="i">
                        <span v-if="item.value === scope.row.gender">{{item.label}}</span>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="100">
                  </el-table-column>
                  <el-table-column prop="severityLevelSys" label="等级" width="100">
                    <template slot-scope="scope">
                      <el-button size="mini" :class="levelStyle(scope.row)"> {{scope.row.severityLevelSys}}级</el-button>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="section" label="病区" width="100">
                    <template>
                        {{'观察区'}}
                     </template>
                  </el-table-column> -->
                  <el-table-column prop="status" label="状态" width="120">
                    <template slot-scope="scope">
                      <span v-for="(item,i) in visitStatus" :key="i">
                        <span v-if="item.value === scope.row.status">{{item.label}}</span>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="treatDate" label="分诊时间" width="120">
                  </el-table-column>
                  <el-table-column prop="illnessState" label="科室" width="">
                    <template slot-scope="scope">
                      <el-button size="mini" :class="scope.row.departmentId===12?'text-color-red':'text-color-blue'"> {{scope.row.department}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="symptomName" label="主要状况" width="">
                  </el-table-column>
                </el-table>
              </el-scrollbar>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="流水信息" name="third">
          <div class="callBefor" v-if="activeName==='third'">
            <div class="callMenu">
              <div class="menu-left">
                <el-form ref="form" :model="form" label-width="90px">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="开始日期：">
                        <yn-date-time-pick v-model="startDate" type="date" placeholder="查询开始日期"></yn-date-time-pick>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="结束日期：">
                        <yn-date-time-pick v-model="endDate" type="date" placeholder="查询结束日期"></yn-date-time-pick>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="姓名/床号：">
                        <el-input class="searchInput" v-model="searchVal" placeholder="病人姓名/病人床号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-button type="primary" @click="searchPatient(3)">查询</el-button>
                      <el-button type="primary" @click="called(3)">叫号</el-button>
                      <el-button type="primary" @click="visitPatient('999')">接诊完成</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <div class="bedTable">
              <el-scrollbar :style="{height:listHeight}">
                <el-table :data="tableData4" highlight-current-row border style="width: 100%" @row-click="onGetRowData">
                  <el-table-column prop="visitHisCode" label="急诊ID" width="100">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="120">
                  </el-table-column>
                  <el-table-column prop="gender" label="性别" width="100">
                    <template slot-scope="scope">
                      <span v-for="(item,i) in sex" :key="i">
                        <span v-if="item.value === scope.row.gender">{{item.label}}</span>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="100">
                  </el-table-column>
                  <el-table-column prop="severityLevelSys" label="等级" width="100">
                    <template slot-scope="scope">
                      <el-button size="mini" :class="levelStyle(scope.row)"> {{scope.row.severityLevelSys}}级</el-button>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="section" label="病区" width="100">
                    <template>
                        {{'观察区'}}
                     </template>
                  </el-table-column> -->
                  <el-table-column prop="status" label="状态" width="120">
                    <template slot-scope="scope">
                      <span v-for="(item,i) in visitStatus" :key="i">
                        <span v-if="item.value === scope.row.status">{{item.label}}</span>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="treatDate" label="分诊时间" width="120">
                  </el-table-column>
                  <el-table-column prop="illnessState" label="科室" width="">
                    <template slot-scope="scope">
                      <el-button size="mini" :class="scope.row.departmentId===12?'text-color-red':'text-color-blue'"> {{scope.row.department}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="symptomName" label="主要状况" width="">
                  </el-table-column>
                </el-table>
              </el-scrollbar>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已过号信息" name="fourth">
          <div class="callBefor" v-if="activeName==='fourth'">
            <div class="callMenu">
              <div class="menu-left">
                <el-form ref="form" :model="form" label-width="90px">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="开始日期：">
                        <yn-date-time-pick v-model="startDate" type="date" placeholder="查询开始日期"></yn-date-time-pick>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="结束日期：">
                        <yn-date-time-pick v-model="endDate" type="date" placeholder="查询结束日期"></yn-date-time-pick>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="姓名/床号：">
                        <el-input class="searchInput" v-model="searchVal" placeholder="病人姓名/病人床号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-button type="primary" @click="searchPatient(2)">查询</el-button>
                      <el-button type="primary" @click="called(2)">复叫</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
            <div class="bedTable">
              <el-scrollbar :style="{height:listHeight}">
                <el-table :data="tableData3" highlight-current-row border style="width: 100%" @row-click="onGetRowData">
                  <el-table-column prop="visitHisCode" label="急诊ID" width="100">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" width="120">
                  </el-table-column>
                  <el-table-column prop="gender" label="性别" width="100">
                    <template slot-scope="scope">
                      <span v-for="(item,i) in sex" :key="i">
                        <span v-if="item.value === scope.row.gender">{{item.label}}</span>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="age" label="年龄" width="100">
                  </el-table-column>
                  <el-table-column prop="severityLevelSys" label="等级" width="100">
                    <template slot-scope="scope">
                      <el-button size="mini" :class="levelStyle(scope.row)"> {{scope.row.severityLevelSys}}级</el-button>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="section" label="病区" width="100">
                    <template>
                        {{'观察区'}}
                     </template>
                  </el-table-column> -->
                  <el-table-column prop="status" label="状态" width="120">
                    <template slot-scope="scope">
                      <span v-for="(item,i) in visitStatus" :key="i">
                        <span v-if="item.value === scope.row.status">{{item.label}}</span>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="treatDate" label="分诊时间" width="120">
                  </el-table-column>
                  <el-table-column prop="illnessState" label="科室" width="">
                    <template slot-scope="scope">
                      <el-button size="mini" :class="scope.row.departmentId===12?'text-color-red':'text-color-blue'"> {{scope.row.department}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="symptomName" label="主要状况" width="">
                  </el-table-column>
                </el-table>
              </el-scrollbar>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="选择就诊方式" :visible.sync="isDiagnosisVisible" width="30%">
      <div>
        <el-radio-group v-model="diagnosisState">
          <el-radio label="3" border>离观</el-radio>
          <el-radio label="6" border>留观</el-radio>
          <!-- <el-radio label="999" border>出院</el-radio> -->
          <el-radio label="7" border>住院</el-radio>
        </el-radio-group>
        <h1 v-if="diagnosisState == 7">住院科室</h1>
        <el-radio-group v-model="deptInpatient" v-if="diagnosisState == 7">
          <span v-for="(item,i) in deptList" :key="i">
            <el-row v-if="item.id===15" class="deptInpatient">
              <span v-for="(obj,ii) in item.children" :key="ii">
                <template v-if="obj.id===40">
                  <el-col class="deptInpatient_btn" :span="6" v-for="(o,index) in obj.children" :key="index">
                    <el-radio :label="o.id" border style="width:100%">{{o.name}}</el-radio>
                  </el-col>
                </template>
                <template v-if="obj.id===41">
                  <el-col class="deptInpatient_btn" :span="6" v-for="(o,index) in obj.children" :key="index">
                    <el-radio :label="o.id" border style="width:100%">{{o.name}}</el-radio>
                  </el-col>
                </template>
                <template v-if="obj.id===26">
                  <el-col class="deptInpatient_btn" :span="6">
                    <el-radio :label="obj.id" border style="width:100%">{{obj.name}}</el-radio>
                  </el-col>
                </template>
              </span>
            </el-row>
          </span>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onDiagnosisVisible">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator';
const df = Vue.filter('dictFilter');
interface TableData {
  visitId: string;
  section: string;
  name: string;
  gender: string;
  status: number;
  age: string;
  severityLevelSys: string;
  illnessState: string;
  symptomName: string;
}
@Component({})
export default class CallInfo extends Vue {
  /**
   * 表格数据
   */
  public tableData1: TableData[] = [];
  public tableData2: TableData[] = [];
  public tableData3: TableData[] = [];
  public tableData4: TableData[] = [];
  public deptInpatient = '';
  public form = {};
  public activeName = 'first';
  public searchVal = ''; // 查询条件
  public startDate = ''; // 查询开始时间
  public endDate = ''; // 查询结束时间
  public visitStatus = df('visit_status'); // 病人状态
  public sex = df('sex');
  public listHeight = window.innerHeight - 175 + 'px';
  public deptList: any = [];
  /**
   * 接诊完成的诊断状态
   */
  private diagnosisState = '3';
  /**
   * 接诊完成接诊完成之后的弹窗开关
   */
  private isDiagnosisVisible = false;
  public mounted() {
    this.getMessage();
    this.onTabClick('0');
    $(window).resize(() => {
      this.listHeight = window.innerHeight - 175 + 'px';
    });
  }
  public onTabClick(val: any) {
    sessionStorage.removeItem('/nurse/calledManage');
    if (val.index === undefined) {
      this.searchPatient(Number(val));
      return;
    }
    if (val.index === '0') {
      this.searchPatient(0);
      return;
    }
    if (val.index === '1') {
      this.searchPatient(1);
      return;
    }
    if (val.index === '2') {
      this.searchPatient(3);
      return;
    }
    if (val.index === '3') {
      this.searchPatient(2);
      return;
    }
  }
  public levelStyle(item: any) {
    return `color${item.severityLevelSys}`;
  }
  /**
   * 病人查询操作
   */
  public searchPatient(val: number) {
    let sd = '';
    let ed = '';
    if (!this.searchVal) {
      ed = new Date(new Date()).format('yyyy-MM-dd') + ' 23:59:59';
      sd = new Date(new Date().setDate(new Date().getDate() - 1)).format('yyyy-MM-dd') + ' 00:00:00';
    }
    if (this.startDate) {
      sd = new Date(this.startDate as any).format('yyyy-MM-dd') + ' 00:00:00';
    } else {
      if (this.endDate) {
        this.$message.warning('开始时间和结束时间必须均有日期值');
        return;
      }
    }
    if (this.endDate) {
      ed = new Date(this.endDate as any).format('yyyy-MM-dd') + ' 23:59:59';
    } else {
      if (this.startDate) {
        this.$message.warning('开始时间和结束时间必须均有日期值');
        return;
      }
    }
    const param = {
      searchText: this.searchVal,
      startDate: sd,
      endDate: ed,
      flag: val
    };
    this.$store.dispatch('GetPatientListByParam', param).then(({ data }) => {
      if (val === 0) {
        this.tableData1 = data.data;
        this.tableData1.forEach((item) => this.department(item));
      }
      if (val === 1) {
        this.tableData2 = data.data;
        this.tableData2.forEach((item) => this.department(item));
      }
      if (val === 2) {
        this.tableData3 = data.data;
        this.tableData3.forEach((item) => this.department(item));
      }
      if (val === 3) {
        this.tableData4 = data.data;
        this.tableData4.forEach((item) => this.department(item));
      }
    });
  }
  /**
   * 获取行数据
   */
  public onGetRowData(row: any) {
    sessionStorage.setItem('/nurse/calledManage', JSON.stringify(row));
  }
  // 叫号
  public called(val: number) {
    let patient = {
      visitId: '',
      status: '',
      severityLevelSys: '',
      callDate: null
    };

    if (sessionStorage.getItem('/nurse/calledManage')) {
      patient = JSON.parse((sessionStorage.getItem('/nurse/calledManage') as string));
    } else {
      this.$message.warning('未选中相应对象！');
    }
    if (patient.visitId !== '') {
        patient.callDate = new Date(new Date()).format('yyyy-MM-dd hh:mm:ss');
        patient.status = '1';
        this.$store.dispatch('Called', patient).then(({ data }) => {
          if (data.code === 0) {
            this.sendMessage(patient.visitId, '1');
            this.searchPatient(val);
            this.$message.success('叫号成功！');
          }
        });
    } else {
      this.$message.warning('请选择病人！');
    }
  }

  // 流水(接诊完成)
  public visitPatient(val: string) {
    let patient = {
      visitId: '',
      status: '',
      severityLevelSys: '',
      callDate: null
    };
    if (!sessionStorage.getItem('/nurse/calledManage')) {
      this.$message.warning('未选中相应对象！');
      return;
    }
    patient = JSON.parse((sessionStorage.getItem('/nurse/calledManage') as string));
    if (!patient.visitId) {
      this.$message.warning('请选择病人！');
      return;
    }
    patient.status = val;
    if (val === '2') {
      this.$store.dispatch('RemovePatient', patient).then(({ data }) => {
      if (data.code !== 0) {
        return;
      }
      this.sendMessage(patient.visitId, val);
      this.onTabClick(1);
      this.$message.success('接诊成功！');
    });
    } else {
      this.isDiagnosisVisible = true;
    }
    return;
  }
  /**
   * 接诊完成弹窗
   */
  public async onDiagnosisVisible() {
    if (Number(this.diagnosisState) === 7 && this.deptInpatient === '') {
      this.$message.warning('请输入住院的科室');
      return;
    }
    const patient = JSON.parse((sessionStorage.getItem('/nurse/calledManage') as string));
    patient.status = this.diagnosisState;
    patient.departmentId = this.deptInpatient;
    const { data }: any = await this.$store.dispatch('RemovePatient', patient);
    this.isDiagnosisVisible = false;
    this.deptInpatient = '';
    if (data.code !== 0) {
      return;
    }
    this.sendMessage(patient.visitId, patient.status);
    this.onTabClick(3);
    this.onTabClick(1);
    this.$message.success('接诊完成！');
  }
  /**
   * 已过号 status=5
   */
  public onPastNum() {
    let patient = {
      visitId: '',
      status: '',
      severityLevelSys: '',
      callDate: null
    };
    if (sessionStorage.getItem('/nurse/calledManage')) {
      patient = JSON.parse((sessionStorage.getItem('/nurse/calledManage') as string));
    } else {
      this.$message.warning('未选中相应对象！');
    }
    if (patient.visitId !== '') {
      patient.status = '5';
      this.$store.dispatch('RemovePatient', patient).then(({ data }) => {
        if (data.code === 0) {
          this.sendMessage(patient.visitId, '5');
          this.searchPatient(1);
          this.$message.success('已过号！');
        }
      });
    } else {
      this.$message.warning('请选择病人！');
    }
  }
  public sendMessage(Vid: string, st: string) {
    this.$webSocket((stompClient: StompClient) => {
      stompClient.send('/chatCalled', {}, JSON.stringify({ status: st }));
      stompClient.send('/chat', {});
      stompClient.send('/status', {}, JSON.stringify({ status: st }));
      stompClient.disconnect();
    });
  }
  /**
   * 科室
   */
  public async department(patient: any) {
    let deptList: string | any[] | null = sessionStorage.getItem('deptList');
    if (!deptList) {
      deptList = (await this.$store.dispatch('DeptList') as any).data.data;
      if (!deptList) {
        return;
      }
      sessionStorage.setItem('deptList', JSON.stringify(deptList));
    } else {
      deptList = (JSON.parse(deptList) as any[]);
    }
    this.deptList = deptList;
    for (const item of deptList) {
      if (item.id !== 1) {
        return;
      }
      const depart = (item.children as any[]).find((obj) =>
        String(obj.id) === String(patient.departmentId));
      if (depart) {
        patient.department = depart.name;
        return;
      }
    }
  }

  /**
   * 请求数据
   */
  public getMessage() {
    // 地址+端点路径，构建websocket链接地址
    const socket = new SockJS('/api/core/bullet');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame: any) => {
      // 监听的路径以及回调
      stompClient.subscribe('/toAll/patientList',
        ({ body }: any) => {
          const patient = JSON.parse(body);
          if (patient.status === '0') {
            this.onTabClick(0);
            this.notice(patient);
          }
          // if (patient.status === '1') {
          //   this.tableData2.unshift(patient);
          // }
          if (patient.status === '2') {
            this.onTabClick(3);
          }
        });
      // 更改状态
      // stompClient.subscribe('/toAll/patientStatus',
      //   ({ body }: any) => {
      //     const patient = JSON.parse(body);
      //     debugger
      //     // 叫号操作
      //     if (patient.status === '1') {
      //       for (let i = 0; i < this.tableData1.length; i++) {
      //         if (this.tableData1[i].visitId === patient.visitId) {
      //           this.tableData1[i].status = patient.status;
      //           if (patient.status === '1') {
      //             this.tableData2.unshift(this.tableData1[i]);
      //           }
      //           this.tableData1.splice(i, 1);
      //         }
      //       }
      //       // for (let i = 0; i < this.tableData3.length; i++) {
      //       //   if (this.tableData3[i].visitId === patient.visitId) {
      //       //     this.tableData3[i].status = patient.status;
      //       //     if (patient.status === '1') {
      //       //       this.tableData2.unshift(this.tableData3[i]);
      //       //     }
      //       //     this.tableData3.splice(i, 1);
      //       //   }
      //       // }
      //     }
      //     // 接诊或过号操作
      //     if (patient.status === '2' || patient.status === '5') {
      //       for (let i = 0; i < this.tableData2.length; i++) {
      //         if (this.tableData2[i].visitId === patient.visitId) {
      //           this.tableData2[i].status = patient.status;
      //           if (patient.status === '5') {
      //             this.tableData3.unshift(this.tableData2[i]);
      //           }
      //           if (patient.status === '2') {
      //             this.tableData4.unshift(this.tableData2[i]);
      //           }
      //           this.tableData2.splice(i, 1);
      //         }
      //       }
      //     }
      //     // 接诊完成操作
      //     if (patient.status === '999' || patient.status === '3' || patient.status === '6') {
      //       for (let i = 0; i < this.tableData4.length; i++) {
      //         if (this.tableData4[i].visitId === patient.visitId) {
      //           this.tableData4[i].status = patient.status;
      //           this.tableData4.splice(i, 1);
      //         }
      //       }
      //     }
      //   });
      // this.stompClient.send('/patient', {}, {});
    });
  }
  public notice(msg: any) {
    this.$notify.info({
        title: '待叫号',
        message: '病人姓名：' + msg.name,
        position: 'bottom-right',
        duration: 30000
    });
  }
}
</script>
<style lang="less">
.callInfo {
	.el-form-item {
		margin-bottom: 0px;
		float: left;
	}
	.el-form-item__label {
		font-weight: bold;
		color: #0071bc;
	}
	.callMenu {
		.el-button {
			padding: 10px 20px;
		}
	}

	.el-button--mini,
	.el-button--small {
		color: #fff;
	}
}
</style>
<style lang="less" scoped>
.callInfo {
	height: calc(~'100% - 65px');
	width: 100%;
	background-color: #f5f5f5;
	position: absolute;
	right: 0px;
  top: 65px;
  .deptInpatient{
    border:1px solid #ddd;
    padding-bottom:10px;
    padding-right:10px;
    .deptInpatient_btn{
      padding-left:10px;
      padding-top:10px;
    }
  }
	.color1 {
		background: #c1272d;
	}
	.color2 {
		background: #c1272d;
	}
	.color3 {
		background: #ff931e;
	}
	.color4 {
		background: #009245;
	}
	.main {
		margin-left: 10px;
		margin-right: 10px;
		.form-item-1 {
			width: 100%;
		}
		.bedTable {
			margin-top: 10px;
			.el-scrollbar {
				background-color: #fff;
			}
		}
		.callMenu {
			height: 35px;
			width: 100%;
			background-color: #e6e6e6;
			overflow: hidden;
			line-height: 35px;
			.menu-left {
				width: 100%;
			}
			.menu-right {
				width: auto;
				height: 100%;
				background-color: #3fa9f5;
				float: left;
				div {
					float: right;
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
	}
}
</style>
