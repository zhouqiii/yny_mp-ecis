<template>
  <div class="HistoryPatientVisits">
    <div class="box">
    <div class="tool">
      
    </div>
    <el-table :data="table.records" border style="width: 100%" :height="tableHeight">
      <el-table-column fixed prop="id" label="id"></el-table-column>
      <el-table-column prop="hisCode" label="HIS编码"></el-table-column>
      <el-table-column prop="patientId" label="病人"></el-table-column>
      <el-table-column prop="identityType" label="身份类型 1一般人员"></el-table-column>
      <el-table-column prop="visitType" label="就诊类型：1急诊 2门诊 3住院"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="ifPaid" label="是否付费"></el-table-column>
      <el-table-column prop="visitCode" label="就诊编码"></el-table-column>
      <el-table-column prop="feeType" label="费别"></el-table-column>
      <el-table-column prop="departmentId" label="科室"></el-table-column>
      <el-table-column prop="doctorId" label="主治医生" />
      <el-table-column prop="nurseId" label="责任护士" />
      <el-table-column prop="diagnosis" label="诊断" />
      <el-table-column prop="callDate" label="叫号时间" />
      <el-table-column prop="visitDate" label="接诊时间" />
      <el-table-column prop="endDate" label="结束时间" />
      <el-table-column prop="illnessState" label="病情" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="createdBy" label="创建人" />
      <el-table-column prop="createdOn" label="创建时间" />
      <el-table-column prop="modifiedBy" label="最后修改人" />
      <el-table-column prop="modifiedOn" label="最后修改时间"></el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :total="table.total" :current-page="table.current" :page-size="table.size"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const spacingHeight = 210;
    return {
      spacingHeight,
      tableHeight:  window.innerHeight - spacingHeight,
      table: {
        current: 1,
        pages: 1,
        records: [],
        size: 10,
        total: 0
      }
    };
  },
  methods: {
    /**
     * 分页插件回调方法--按照分页重新加载页面数据
     */
    handleCurrentChange: (current) => this.getData(current),
    /**
     * 屏幕大小改变事件
     */
    onresize() {
      this.tableHeight = window.innerHeight - this.spacingHeight;
    },
    /**
     * 获取数据
     */
    async getData(current = this.table.current, size = this.table.size) {
      this.table.current = current;
      const { data } = await this.$store.dispatch('HisPatientVisitGet', {size, current, ...this.form});
      this.table = data.data;
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        this.getData();
      });
    },
  },
  mounted() {
    this.getData();
    $(window).resize(this.onresize);
  }
};
</script>
<style lang="less" scoped>
.HistoryPatientVisits {
  .box{
    padding: 0 10px;
  }
  .tool{
    padding: 23px 10px 0 10px;
  }
}
</style>
