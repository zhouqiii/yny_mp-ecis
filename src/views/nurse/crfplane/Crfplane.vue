<template>
  <div class="Crfplane">
    <div class="CrfMenu">
      <span class="menu-title">
        <i class="el-icon-date" />
        胸痛中心
      </span>
      <div class="menu-right">
        <div @click="onEditCrf">编辑胸痛病历</div>
      </div>
    </div>
    <div class="CrfTable">
      <el-table
        :data="page.records"
        :height="listHeight"
        highlight-current-row
        @current-change="handleCurrentChange"
        border
        style="width: 100%"
        @row-dblclick="onRowDblclick"
      >
        <el-table-column prop="visitId" label="填报编号" width="100"/>
        <el-table-column prop="name" label="姓名" width="100"/>
        <el-table-column label="性别" width="100">
          <template slot-scope="scope">
            {{scope.row.withEcg|dict('sex')}}
          </template>
        </el-table-column>
        <el-table-column label="年龄" width="100">
          <template slot-scope="scope">
            {{scope.row.ageValue|notNull}}
          </template>
        </el-table-column>
        <el-table-column prop="firstMcTime" label="首次医疗接触"/>
        <el-table-column prop="attackTime" label="发病时间"/>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            {{scope.row.status|dict('crfplaneStatus')}}
          </template>
        </el-table-column>
        <el-table-column prop="modifiedOn" label="初步诊断"/>
        <el-table-column prop="isRemoteEcgtranChecked" label="心电传输" width="100">
          <template slot-scope="scope">
              {{scope.row.isRemoteEcgtranChecked|dict('is_if')}}
          </template>
        </el-table-column>
        <el-table-column prop="withEcg" label="心电图" width="100">
            <template slot-scope="scope">
              {{scope.row.withEcg|dict('is_if')}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" 
      :total="page.total" :current-page.sync="page.current" @current-change="cpcInfoList">
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
interface TableData {
  code: string;
  section: string;
  doctorName: string;
  nurseName: string;
  status: number;
  createdOn: string | Date;
  modifiedOn: string | Date;
}
@Component({
  metaInfo: {
    titleTemplate: '胸痛中心-%s'
  }
})
export default class Crfplane extends Vue {
  /**
   * 表格数据
   */
  public tableData: TableData[] = [];
  public listHeight = window.innerHeight - 155 + 'px';
  public selectedRow: any = {};
  private page: Page = {
    current: 1,
    total:0,
    records:[],
    size:15
  };
  /**
   * 编辑病历
   */
  public onEditCrf() {
      if (JSON.stringify(this.selectedRow) === '{}') {
        return this.$message.warning('请选择病人患者');
      }
      this.$router.push({name: 'crfplane_edit', query: {id: this.selectedRow.visitId}});
  }
  /**
   * 获取数据列表
   */
  public cpcInfoList() {
    const p = JSON.parse(JSON.stringify(this.page));
    delete p.records;
    this.$store.dispatch('CpcInfo',p).then(({ data }) => {
      this.tableData = data.data.records;
      this.page = data.data;
    });
  }
  /**
   * 表格改变选中
   */
  public handleCurrentChange(row: any) {
    this.selectedRow = row;
  }
  public mounted() {
    this.cpcInfoList();
    $(window).resize(() => {
      this.listHeight = window.innerHeight - 155 + 'px';
    });
  }
  private onRowDblclick() {
    if (JSON.stringify(this.selectedRow) === '{}') {
        return this.$message.warning('请选择病人患者');
      }
    this.$router.push({name: 'crfplane_edit', query: {id: this.selectedRow.visitId, isDisabled: '1'}});
  }
}
</script>

<style lang="less" scoped>
.Crfplane {
  height: calc(~"(100% - 60px)");
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
  .CrfTable {
    margin: 10px;
    height: 100%;
    background-color: #fff;
  }
  .vig {
    margin: 10px;
    width: 70%;
    text-align: center;
    float: left;
    // height:400px;
  }
  .opmenu {
    width: 25%;
    margin-top: 10px;
    margin-right: 10px;
    float: right;
    background-color: #ffffff;
  }
}
</style>

<style lang="less">
.Crfplane {
  .el-button {
    margin-top: 5px;
    margin-left: 10px;
    background: #0071bc;
    color: #fff;
    padding: 6px 10px;
  }
}
</style>

