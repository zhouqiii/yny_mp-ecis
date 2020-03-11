<template>
    <div class="care">
      <img class="vig" src="/img/vigs.png"/>
      <div class="opmenu">
        <h3 style="margin-left:5px;">时间范围：</h3>
        <yn-date-time-pick
          v-model="value4"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"></yn-date-time-pick>
        <h3 style="margin-left:5px;">体征类型：</h3>
        <el-select v-model="value5" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div >
          <el-button style="margin-top:10px;margin-bottom:10px">查询</el-button>
        </div>      
      </div>
      <div class="careTable">
        <el-table
          :data="tableData"
          highlight-current-row
          border
          style="width: 100%"          
          @row-click="onGetRowData">          
          <el-table-column
            prop="beginDate"
            label="开始时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="endDate"
            label="结束时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="nurseName"
            label="护理人"
            width="100">
          </el-table-column>
          <el-table-column
            prop="careName"
            label="护理名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="careMethod"
            label="护理方法"
            width="250">
          </el-table-column>
          <el-table-column
            prop="times"
            label="次数(/次)"
            width="100">
          </el-table-column>
          <el-table-column
            prop="price"
            label="费用(/元)"
            width="100">
          </el-table-column>
          <el-table-column
            label="是否付费"
            width="100">
            <template slot-scope="scope">
              <span v-for="(item,i) in isIf" :key="i">
                <span v-if="Number(item.value) === scope.row.ifPaid">{{item.label}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="护理描述">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
interface TableData {
  beginDate: string|Date;
  endDate: string|Date;
  nurseName: string;
  careName: string;
  careMethod: string;
  times: number;
  price: number;
  remark: string;
  ifPaid: number;
}
const df = Vue.filter('dictFilter');
@Component({
  metaInfo: {
    titleTemplate: '%s-护理记录'
  }
})
export default class Care extends Vue {
  /**
   * 表格数据
   */
  public tableData: TableData[] = [];
  public isIf = df('if_paid');
  public data() {
    return {
      options: [{
          value: '1',
          label: 'NIBPS'
        }, {
          value: '2',
          label: 'BIBPD'
        }, {
          value: '3',
          label: 'NIBPM'
        }, {
          value: '4',
          label: 'SPO2'
        }, {
          value: '5',
          label: 'PR'
        }, {
          value: '6',
          label: 'TEMP'
        }, {
          value: '7',
          label: 'RR'
        }],
        value5: [],
      value4: ''
    };
  }
  /**
   * 操作按钮分布
   */
  public mounted() {
    this.onGetNursingCareList();
    this.$store.commit('SET_OPBTN_VALUE', [{name: '新建', event: 'onAddNotes'},
    {name: '编辑', event: 'onEditNotes'}, {name: '删除', event: 'onDelNotes'},
    {name: '刷新', event: 'onRefresh'}]);
  }
  /**
   * 获取病人
   */
  public get getPatient() {
    return this.$store.getters.GET_PATIENT;
  }
  /**
   * 获取数据列表
   */
  public onGetNursingCareList() {
    this.$store.dispatch('GetNursingCareList').then(({data}) => {
      this.tableData = data.data;
    });
  }
  /**
   * 获取行数据
   */
  public onGetRowData(row: any) {
    sessionStorage.setItem('/nurse/notes', JSON.stringify(row));
  }
  /**
   * 刷新页面
   */
  public onRefresh() {
    this.onGetNursingCareList();
  }
  /**
   * 新建页面
   */
  public onAddNotes() {
        this.$router.push('/nurse/notes/add');
  }
  /**
   * 编辑页面
   */
  public onEditNotes() {
        this.$router.push('/nurse/notes/edit');
  }
  /**
   * 删除页面
   */
  public onDelNotes() {
    if (sessionStorage.getItem('/nurse/notes')) {
       const nursingCare = JSON.parse((sessionStorage.getItem('/nurse/notes') as string));
       this.$store.dispatch('DelNursingCare', nursingCare.id).then(({data}) => {
        if (data.code === 0) {
          sessionStorage.setItem('/nurse/notes', '');
          this.onGetNursingCareList();
          this.$message.success('删除成功');
        }
      });
    } else {
      this.$message.warning('未选中相应对象，删除失败!');
      this.$router.push('/nurse/notes');
    }
  }

  /**
   * watch监听病人进行请求数据
   */
  @Watch('$store.state.patient.patient.visitId')
  public watchVisitId(newValue: any, oldValue: any) {
      this.onGetNursingCareList();
  }
}
</script>

<style lang="less" scoped>
  .care{
    height:calc(~"(100% - 95px)");
    width:calc(~"(100% - 270px)");
    position: absolute;
    left: 260px;
    top: 95px;
    .careTable{
      margin: 10px;
    }
    .vig{
      margin: 10px;
      width:70%;
      text-align: center;
      float:left;
      // height:400px;
    }
    .opmenu{
      width:25%;
      margin-top: 10px;
      margin-right: 10px;
      float: right;
      background-color: #ffffff;
    }
  }
</style>

<style lang="less">
  .care{
    .el-button{
               margin-top:5px;
               margin-left:10px;
               background:#0071bc;
               color:#fff;
               padding:6px 10px;
           }
  }
</style>
