<template>
  <div class="DutyTable">
    <header>
      <h1>日夜班报告</h1>
      <ul class="tool">
        <li>急诊科</li>
        <li>
          <el-date-picker v-model="nowTime" align="right" type="date" placeholder="选择日期" 
          :picker-options="pickerOptions" value-format="yyyy-MM-dd">
          </el-date-picker>
        </li>
      </ul>
    </header>
    <el-container>
      <table>
        <tr>
          <th rowspan="4">&nbsp;</th>
          <th>8：00时至16：00时</th>
          <th>16：00时至20：00时</th>
          <th>20：00时至8：00时</th>
        </tr>
        <tr>
          <td>
            <el-col :span="8">接诊：{{morningData.visitTool}}</el-col>
            <el-col :span="8">心内：{{morningData.visitXn}}</el-col>
            <el-col :span="8">胸内：{{morningData.visitHx}}</el-col>
          </td>
          <td>
            <el-col :span="8">接诊：{{afternoonData.visitTool}}</el-col>
            <el-col :span="8">心内：{{afternoonData.visitXn}}</el-col>
            <el-col :span="8">胸内：{{afternoonData.visitHx}}</el-col>
          </td>
          <td>
            <el-col :span="8">接诊：{{nightData.visitTool}}</el-col>
            <el-col :span="8">心内：{{nightData.visitXn}}</el-col>
            <el-col :span="8">胸内：{{nightData.visitHx}}</el-col>
          </td>
        </tr>
        <tr>
          <td>
            <el-col :span="8">入院：{{morningData.hospitalTool}}</el-col>
            <el-col :span="8">心内：{{morningData.hospitalXn}}</el-col>
            <el-col :span="8">胸内：{{morningData.hospitalHx}}</el-col>
          </td>
          <td>
            <el-col :span="8">入院：{{afternoonData.hospitalTool}}</el-col>
            <el-col :span="8">心内：{{afternoonData.hospitalXn}}</el-col>
            <el-col :span="8">胸内：{{afternoonData.hospitalHx}}</el-col>
          </td>
          <td>
            <el-col :span="8">入院：{{nightData.hospitalTool}}</el-col>
            <el-col :span="8">心内：{{nightData.hospitalXn}}</el-col>
            <el-col :span="8">胸内：{{nightData.hospitalHx}}</el-col>
          </td>
        </tr>
        <tr>
          <td>
            <el-col :span="8">急P：{{morningData.jp}}</el-col>
            <el-col :span="8">留观：{{morningData.stayNumber}}</el-col>
            <el-col :span="8">离观：{{morningData.leaveNumber}}</el-col>
          </td>
          <td>
            <el-col :span="8">急P：{{afternoonData.jp}}</el-col>
            <el-col :span="8">留观：{{afternoonData.stayNumber}}</el-col>
            <el-col :span="8">离观：{{afternoonData.leaveNumber}}</el-col>
          </td>
          <td>
            <el-col :span="8">急P：{{nightData.jp}}</el-col>
            <el-col :span="8">留观：{{nightData.stayNumber}}</el-col>
            <el-col :span="8">离观：{{nightData.leaveNumber}}</el-col>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </el-container>
    <el-footer></el-footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class DutyTable extends Vue {
  private dept = '';
  private nowTime = new Date().format('yyyy-MM-dd');
  private morningData = {};
  private afternoonData = {};
  private nightData = {};

  private mounted() {
     this.$store.dispatch('GetVisitNumber', this.nowTime).then(({ data }) => {
        this.morningData = data && data.morning ? data.morning : {};
        this.afternoonData = data && data.after ? data.after : {};
        this.nightData = data && data.night ? data.night : {};
    });
  }
}
</script>
<style lang="less" scoped>
.DutyTable {
  height: calc(100% - 95px);
  font-family: "宋体";
  header {
    padding: 0 20px 10px 20px;
    h1 {
      font-size: 30px;
      text-align: center;
      margin: 0;
    }
    ul {
      overflow: hidden;
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        float: right;
        &:first-child {
          float: left;
        }
      }
    }
  }
  .el-container {
    padding: 0 20px;
    table {
      width: 100%;
      border-top: 1px solid #ddd;
      border-left: 1px solid #ddd;
      td,
      th {
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        height: 50px;
      }
    }
  }
}
</style>
