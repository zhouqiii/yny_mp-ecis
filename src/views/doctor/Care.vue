<template>
    <div class="care">
      <div class="careTable">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="护理类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="护理方法">
          </el-table-column>
          <el-table-column
            prop="address"
            label="护理名称">
          </el-table-column>
          <el-table-column
            prop="address"
            label="护理描述">
          </el-table-column>
          <el-table-column
            prop="address"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="address"
            label="是否收费">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Prescription1 extends Vue {
  public data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      };
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
  }
</style>

<style lang="less">
  .care{
    .careTable{
      
    }
  }
</style>



