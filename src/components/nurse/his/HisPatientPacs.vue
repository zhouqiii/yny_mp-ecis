<template>
  <div class="HisPatientPacs">
    <div class="box">
      <div class="tool">
      </div>
      <el-table :data="tableData" border style="width: 100%" :height="tableHeight">
        <!-- <el-table-column fixed prop="testNo" label="申请序号"/> -->
        <!-- <el-table-column prop="examPara" label="检查参数"/> -->
        <el-table-column prop="description" label="检查所见"/>
        <el-table-column prop="impression" label="印象"/>
        <!-- <el-table-column prop="recommendation" label="建议"/> -->
        <!-- <el-table-column prop="isAbnormal" label="是否阳性"/>
        <el-table-column prop="useImage" label="报告中图象编号"/>
        <el-table-column prop="memo" label="备注"/> -->
        <el-table-column label="报告地址">
          <template slot-scope="scope">
            <el-button @click="openUrl(scope.row.url)" v-if="scope.row.url">查看报告</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';
@Component
export default class HisPatientPacs extends Vue {
  @Prop()
  private rowData!: any;
  private spacingHeight = 200;
  private tableHeight = window.innerHeight - this.spacingHeight;
  private tableData = [];
  private onresize() {
      this.tableHeight = window.innerHeight - this.spacingHeight;
  }
  private mounted() {
    $(window).resize(this.onresize);
  }
  private async getData(examNo: string) {
      if (!examNo) {
        return;
      }
      const resData = await this.$store.dispatch('HisPatientPacsGet', {examNo});
      this.tableData = resData && resData.data.data ? resData.data.data : [];
  }
   @Watch('rowData')
  private watchRowData(newVal: any) {
    this.getData(newVal.examNo);
  }
  private openUrl(url: string) {
    window.open(url);
  }
}
</script>
<style lang="less" scoped>
.HisPatientPacs {
  .box{
    padding: 0 10px;
  }
  .tool{
    padding: 23px 10px 0 10px;
  }
}
</style>

