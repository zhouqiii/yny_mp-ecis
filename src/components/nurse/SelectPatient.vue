<template>
  <div
    class="SelectPatient"
    :class="hideMenuHide"
  >
    <HideMenu title="选择挂号病人" :isHidetools="true" ref="hideMenu">
      <template slot="tools">
        <el-tooltip class="item" effect="dark" content="搜索" placement="bottom-start">
          <el-button type="success" icon="el-icon-search" circle size="mini" @click="onSearch"/>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="提交" placement="bottom-start">
          <el-button type="success" icon="el-icon-check" circle size="mini" @click="onSubmit"/>
        </el-tooltip>
      </template>
      <template slot="searchGroup">
      <el-input style="width: 100%; "
                class = "soso"
                v-model="soso"
                placeholder="搜索病人"
      >
        <i
                slot="suffix"
                class="el-input__icon el-icon-search"
                @click="onSearch"
        ></i>
      </el-input>
      <yn-date-time-pick v-model="startDate" type="date" placeholder="查询开始日期" style="width: 50%"></yn-date-time-pick>
      <yn-date-time-pick v-model="endDate" type="date" placeholder="查询结束日期" style="width: 50%"></yn-date-time-pick>
      </template>
      <template slot="section">
        <el-table
          v-if="tableData"
          :data="tableDataStorage"
          :height="hideMenuHeight"
          ref="tableData"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column
            prop="visitCode"
            label="挂号"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
          >
          </el-table-column>
          <!-- prop="gender" -->
          <el-table-column
            label="性别"
          >
            <template slot-scope="scope">
              <span v-for="(item,i) in gender" :key="i">
                <span v-if="Number(item.value) == scope.row.gender">{{item.label}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
          >
          </el-table-column>
          <!-- <el-table-column
            prop="departmentId"
            label="科室"
          >
          </el-table-column> -->
        </el-table>
      </template>
    </HideMenu>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import HideMenu from '@/components/HideMenu.vue';
const df = Vue.filter('dictFilter');

@Component({
  components: { HideMenu }
})
export default class SelectPatient extends Vue {
  @Prop()
  public tableData!: any[];
  public tableDataStorage: any[] = [];
  public isShow = true;
  public hideMenuHide = '';
  public hideMenuHeight = window.innerHeight - 119 - 100;
  public soso = '';
  public startDate = new Date(Date.now() - 24 * 60 * 60 * 1000).format('yyyy-MM-dd'); // 查询开始时间
  public endDate = new Date().format('yyyy-MM-dd'); // 查询结束时间
  public currentRow = {};
  public gender = df('sex');
  public onClose() {
    this.isShow = false;
    setTimeout(() => this.hideMenuHide = 'hide', 300);
  }
  public onOpen() {
    this.isShow = true;
    this.hideMenuHide = '';
  }
  public onSearch() {
    this.$emit('search', this.startDate, this.endDate);

    if (!this.soso) {
      return this.tableDataStorage = this.tableData;
    }
    this.tableDataStorage = this.tableData.filter((item) => new RegExp(this.soso, 'gi').test(item.name));
  }
  public onSubmit() {
    if (!$.isEmptyObject(this.currentRow)) {
      this.$emit('submit', this.currentRow);
    }
    (this.$refs.hideMenu as any).onClose();
  }
  public handleCurrentChange(val: any) {
    this.currentRow = val;
  }
  public mounted() {
    this.tableDataStorage = this.tableData;
    $(window).resize(() => this.hideMenuHeight = window.innerHeight - 119);
  }
  @Watch('tableData')
  public WatchTableDataStorage(newVal: any) {
    this.tableDataStorage = newVal;
  }
}
</script>
<style lang="less">
.SelectPatient {
  .el-table {
    .el-table__empty-block {
      width: calc(~"100% - 2px") !important;
    }
  }
}
</style>
<style lang="less" scoped>
.SelectPatient {
  .el-table {
    width: calc(~"100% - 2px" );
  }
  .soso{
    i{
      cursor: pointer;
      &:hover{
        color: #0071bc;
        font-size:18px;
      }
    }
  }
}
</style>


