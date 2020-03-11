<template>
    <div class="Prescription">
        <el-scrollbar :style="{height:listHeight}">
            <el-table :data="tableData" 
            highlight-current-row border @row-click="onGetRowData">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table :data="props.row.items" border>
                            <el-table-column label="组" prop="groupFlag" width="35px"></el-table-column>
                            <el-table-column label="药名" prop="medicineOffer"/>
                            <el-table-column label="用法" prop="usageMethod"/>
                            <el-table-column label="频次" prop="frequency"/>
                            <el-table-column label="剂量" prop="dosage"/>
                            <el-table-column label="单位" prop="unit"/>
                            <el-table-column label="次数" prop="dosageCount"/>
                            <el-table-column label="使用总量" prop="totalDosage"/>
                            <el-table-column label="价格" prop="price"/>
                            <el-table-column label="计价单价" prop="accountingUnit"/>
                            <el-table-column label="计价总量" prop="accountingTotalDosage"/>
                            <el-table-column label="费用" prop="fee"/>
                            <el-table-column label="是否付费" prop="ifPaid"/>
                            <el-table-column label="状态" prop="status"/>                        -->
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column label="单号" prop="patientPrescriptionHisCode"/>
                <el-table-column label="类别" prop="type"/>
                <el-table-column label="医生" prop="doctorName"/>
                <el-table-column label="下达时间" prop="beginDate"/>
                <el-table-column label="状态" prop="status"/>
            </el-table>
        </el-scrollbar>        
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const df = Vue.filter('dictFilter');
@Component({
    props: {
        tableData: Array
    }
})
export default class Prescription extends Vue {
  public bedStatus = df('bed_status');
  public listHeight = window.innerHeight - 105 + 'px';
  public mounted() {
      $(window).resize(() => {
          this.listHeight = window.innerHeight - 105 + 'px';
      });
  }
  /**
   * 获取行数据
   */
  public onGetRowData(row: any) {
    sessionStorage.setItem('/nurse/prescription', JSON.stringify(row));
  }
}
</script>
<style lang="less">
    .Prescription{
        .demo-table-expand {
            font-size: 0;
        }
        .demo-table-expand label {
            width: 90px;
            color: #0071bc;
        }
        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 15%;
        }
        .el-table__expanded-cell[class*=cell] {
            padding: 5px 15px;
        }
        .el-form--label-left .el-form-item__label {
            text-align: right;
        }
        .el-table {
            margin: 10px;
            width:calc(~"100% - 20px");
        }
    }
</style>
<style lang="less" scoped>
    .Prescription{
        height:calc(~"100% - 95px");
        width: calc(~"100% - 270px");
        background-color: #f5f5f5;
        position: absolute;
        right: 0px;
        top: 95px;
        .menu-tools{
            height: 30px;
            line-height:30px;
            span{
                font-weight:bold;
                font-size:16px;
            }
        }
        .menu-right{
            width:auto;
            height:100%;
            // float:right;
            div{
                // cursor: pointer;
                // float: left;
                // padding:0px 10px;
                // color:#f2f2f2;
                // font-size:14px;
                // margin-left: 5px;
                // background-color: #3fa9f5;
                // &:hover{
                //     background:#0480d2;
                // }
            }
        }
    }
</style>
