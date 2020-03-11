<template>
    <div class="Prescription">
        <el-table :data="tableData5" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <div v-for="(x, index) in props.row.items" :key="index">
                        <div class="group-border">
                            <div class="menu-tools">
                                <span>药名:{{ x.medicineOffer }}</span>
                                <div class="menu-right">
                                    <div>退费</div>
                                    <div>确认退费</div>
                                    <div>已付费</div>
                                    <div>删除</div>
                                </div>
                            </div>
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="用法:"><span>{{ x.usageMethod }}</span></el-form-item>
                                <el-form-item label="频次:"><span>{{ x.frequency }}</span></el-form-item>
                                <el-form-item label="剂量:"><span>{{ x.dosage }}</span></el-form-item>
                                <el-form-item label="单位:"><span>{{ x.unit }}</span></el-form-item>
                                <el-form-item label="次数:"><span>{{ x.dosageCount }}</span></el-form-item>
                                <el-form-item label="使用总量:"><span>{{ x.totalDosage }}</span></el-form-item>
                                <el-form-item label="价格:"><span>{{ x.price }}</span></el-form-item>
                                <el-form-item label="计价单价:"><span>{{ x.accountingUnit }}</span></el-form-item>
                                <el-form-item label="计价总量:"><span>{{ x.accountingTotalDosage }}</span></el-form-item>
                                <el-form-item label="费用:"><span>{{ x.fee }}</span></el-form-item>
                                <el-form-item label="是否付费:"><span>{{ x.ifPaid }}</span></el-form-item>
                                <el-form-item label="状态:"><span>{{ x.status }}</span></el-form-item>
                            </el-form>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="单号" prop="id"/>
            <el-table-column label="类别" prop="prescriptionType"/>
            <el-table-column label="医生" prop="doctor"/>
            <el-table-column label="创建时间" prop="createdOn"/>
        </el-table>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
     props: {
        tableData5: Array
    }
})
export default class Prescription extends Vue {

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
            float:right;
            div{
                cursor: pointer;
                float: left;
                padding:0px 10px;
                color:#f2f2f2;
                font-size:14px;
                margin-left: 5px;
                background-color: #3fa9f5;
                &:hover{
                    background:#0480d2;
                }
            }
        }
    }
</style>
