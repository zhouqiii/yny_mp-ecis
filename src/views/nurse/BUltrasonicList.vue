<template>
  <div class="BUltrasonicList">
    <div>
      <el-header>
        <h1>彩色多普勒床旁超声报告单</h1>
      </el-header>
      <el-container>
        <el-table :data="tableData.records" border highlight-current-row @current-change="handleCurrentChange" @row-dblclick="onRowDbclick">
          <el-table-column label="心腔大小" prop="ventricularWallThickness"></el-table-column>
          <el-table-column label="室壁厚度" prop="ventricularWallThickness"></el-table-column>
          <el-table-column label="诊断医生" prop="createdBy"></el-table-column>
          <el-table-column label="检查日期" prop="createdOn"></el-table-column>
        </el-table>
      </el-container>
      <el-footer>
        <el-pagination background layout="prev, pager, next" :total="tableData.total" :current-page.sync="tableData.current" @current-change="getTableData"></el-pagination>
      </el-footer>
    </div>
  </div>
</template>
<script lang="tsx">
import { Component, Vue, Watch } from 'vue-property-decorator';
const df = Vue.filter('dictFilter');
@Component({
  metaInfo: {
    titleTemplate: '彩色多普勒床旁超声报告单-%s'
  }
})
export default class BUltrasonicList extends Vue {
  private tableData: Page = {
    current: 1,
    records: [],
    visitId: 0,
    total:0
  };
  private currentRow = {
    id: ''
  };
  private get patient() {
    return this.$store.getters.GET_PATIENT;
  }
  private async getTableData() {
    if (!(this.patient && this.patient.visitId)) {
      return;
    }
    const search: Page = JSON.parse(JSON.stringify(this.tableData));
    delete search.records;
    search.visitId = this.patient.visitId;
    const { data } = await this.$store.dispatch('GetBedsideList', search);
    this.tableData = data.data;
  }
  private created() {
    this.$store.commit('SET_OPBTN_VALUE', [
      { name: '添加', event: 'onAdd' },
      { name: '编辑', event: 'onEdit' },
      { name: '删除', event: 'onDelete' }
    ]);
  }
//   private mounted() {
//  }
  private handleCurrentChange(row: any) {
    this.currentRow = row;
  }
  private async onAdd() {
    this.$router.push({ name: 'BUltrasonic', query: { req: JSON.stringify(this.patient), isDisable:'0' } });
  }
  private async onEdit() {
    this.$router.push({ name: 'BUltrasonicEdit', query:
    { req: JSON.stringify({ ...this.patient, patientBedsideBUltrasonic: this.currentRow }), isDisable:'0' } });
  }
  private onDelete() {
    this.$confirm('此操作将永久删除, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      await this.$store.dispatch('DeleteBedsideList', this.currentRow.id);
      this.getTableData();
      this.$message.success('删除成功!');
    }).catch(() => {
      this.$message.warning('取消操作');
    });
  }
  private onRowDbclick() {
    this.$router.push({ name: 'BUltrasonicEdit', query:
    { req: JSON.stringify({ ...this.patient, patientBedsideBUltrasonic: this.currentRow }), isDisable:'1' } });
  }
  @Watch('patient')
  private watchPatient() {
    this.getTableData();
  }
}
</script>
<style>
.BUltrasonicList .el-table td,
.el-table th.is-leaf {
  border: 1px solid #ebeef5;
  border-right: none;
}
.BUltrasonicList .el-table__body-wrapper {
  border-bottom: 1px solid #ebeef5;
}
</style>
<style lang="less" scoped>
.BUltrasonicList {
  height: calc(~"(100% - 95px)");
  width: calc(~"(100% - 250px)");
  position: absolute;
  left: 270px;
  top: 95px;
  width: calc(100% - 270px);
  > div {
    margin: 10px;
    padding: 10px;
    height: calc(100% - 40px);
    background: #fff;
    .el-header {
      padding: 0;
    }
    h1 {
      font-size: 2em;
      margin: 0;
    }
    .el-footer {
      text-align: right;
      padding: 10px 0;
    }
  }
}
</style>
