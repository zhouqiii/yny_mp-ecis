<template>
    <div class="Prescription">
        <el-scrollbar :style="{height:listHeight}">
            <el-table :data="tableData" highlight-current-row border @row-click="onGetRowData">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table :data="props.row.items" border >                        
                            <el-table-column label="合并组" prop="groupId" width="60px"></el-table-column>
                            <el-table-column label="次序" prop="currrentDosageCount" width="50px"></el-table-column>
                            <el-table-column label="组" prop="groupFlag" width="35px"></el-table-column>
                            <el-table-column label="药名" prop="medicineOfferId"/>
                            <el-table-column label="用法" prop="usageMethod">
                                <template slot-scope="scope">
                                    {{scope.row.usageMethod+''|dict('usageMethod')}}
                                </template>
                            </el-table-column>
                            <el-table-column label="频次" prop="frequency">
                                <template slot-scope="scope">
                                    {{scope.row.frequency+''|dict('medicineFrequency')}}
                                </template>
                            </el-table-column>
                            <el-table-column label="剂量" prop="dosage">
                                <template slot-scope="scope">
                                    {{scope.row.dosage+''}}
                                </template>
                            </el-table-column>
                            <el-table-column label="单位" prop="unit">
                                <template slot-scope="scope">
                                    {{scope.row.unit+''|dict('medicineUnit')}}
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="是否付费" prop="ifPaid">
                                <template slot-scope="scope">
                                    {{scope.row.ifPaid+''|dict('if12')}}
                                </template>
                            </el-table-column> -->
                            <el-table-column label="剂型">
                                <template slot-scope="scope">
                                    {{scope.row.status+''|dict('dosageForm')}}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="144px">
                                <template slot-scope="scope">
                                    <div>
                                        <el-button
                                        size="mini"
                                        type="primary"
                                        @click="prientTagHtml(scope.$index, scope.row)">打印</el-button>
                                        <el-button
                                        size="mini"
                                        type="primary"
                                        @click="configPrescription(scope.row)">配药</el-button>
                                    </div>
                                    <div style="margin-top:10px;">
                                        <el-button
                                        size="mini"
                                        type="primary"
                                        @click="usePrescription(scope.row)">用药</el-button>
                                        <el-button
                                        size="mini"
                                        type="primary"
                                        @click="pullNeedle(scope.row)">打针</el-button>
                                    </div>
                                    
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column label="单号" prop="patientPrescriptionHisCode"/>
                <el-table-column label="类别" prop="type">
                    <!-- <template slot-scope="scope">
                        {{scope.row.type|dict('prescription_type')}}
                    </template> -->
                </el-table-column>
                <el-table-column label="医生" prop="doctorName"></el-table-column>
                <el-table-column label="下达时间" prop="createdOn"/>
                <el-table-column label="状态" prop="status"/>
            </el-table>
        </el-scrollbar>
        <table id="print">
            <tr>
                <td>
                    <div>使用药品</div>
                    <div>药名：{{selectRow.medicineOfferId}}</div>
                    <div>用法：{{selectRow.usageMethod+''|dict('usageMethod')}}</div>
                    <div>频次：{{selectRow.frequency+''|dict('medicineFrequency')}}</div>
                    <div>剂量：{{selectRow.dosage+''|dict('thromDrugUnit')}}</div>
                    <div>单位：{{selectRow.unit+''|dict('medicineUnit')}}</div>
                </td>
                <td>
                    <div id="printimg"></div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class Prescription extends Vue {
    @Prop()
    public tableData!: any[];
    public rowspan = 0;
    public rowNum = 0;
    public rowspan2 = 0;
    public rowNum2 = 0;
    public splitPrescription = {
        id: '',
        patientPrescriptionId: '',
        groupId: '',
        currrentDosageCount: '',
        status: ''
    };
    public listHeight = window.innerHeight - 105 + 'px';
    public selectRow = {
        medicineOfferId: '',
        usageMethod: '',
        frequency: '',
        dosage: '',
        unit: ''
    };
    public mounted() {
        $(window).resize(() => {
            this.listHeight = window.innerHeight - 105 + 'px';
        });
        this.getDoctorName();
    }
    public getDoctorName() {
        this.$store.dispatch('GetDoctors').then(({data}) => {
            const map: any = {};
            data.data.forEach((item: any) => map[item.userId] = item.username);
            this.tableData.forEach((item) => item.doctorName = map[item.doctorId]);
            this.tableData = JSON.parse(JSON.stringify(this.tableData));
        });
    }
    /**
     * 获取病人信息
     */
    public get getPatient() {
        return this.$store.getters.GET_PATIENT;
    }
    /**
     * 获取行数据
     */
    public onGetRowData(row: any) {
        sessionStorage.setItem('/nurse/splitPrescription', JSON.stringify(row));
    }
    /**
     * 获取列表中选中的数据
     */
    public getSplitPrescription(row: any) {
        if (1 === row.groupId) {
            this.splitPrescription.patientPrescriptionId = row.patientPrescriptionId;
            this.splitPrescription.groupId = row.groupId;
            this.splitPrescription.currrentDosageCount = row.currrentDosageCount;
            this.splitPrescription.id = '';
            return;
        }
        this.splitPrescription.patientPrescriptionId = row.patientPrescriptionId;
        this.splitPrescription.groupId = '';
        this.splitPrescription.id = row.id;
        this.splitPrescription.currrentDosageCount = row.currrentDosageCount;
        return;
    }
    /**
     * 配药
     */
    public configPrescription(row: any) {
        // debugger;
        this.getSplitPrescription(row);
        if ('2' === row.status) {
            this.splitPrescription.status = '3';
            this.$store.dispatch('EditSplitPrescriptionStatus', this.splitPrescription).then(({data}) => {
                this.$emit('onclick', this.getPatient.visitId);
                if (data.code === 0) {
                    this.$message.success('配药成功');
                    return;
                }
                this.$message.warning('配药失败');
            });
        } else if (Number(row.status) > 2) {
            this.$message.warning('该医嘱已配药');
        } else if (Number(row.status) < 2) {
            this.$message.warning('该医嘱未接药');
        }
    }
    /**
     * 用药
     */
    public usePrescription(row: any) {
        this.getSplitPrescription(row);
        if ('3' === row.status) {
            this.splitPrescription.status = '4';
            this.$store.dispatch('EditSplitPrescriptionStatus', this.splitPrescription).then(({data}) => {
                this.$emit('onclick', this.getPatient.visitId);
                if (data.code === 0) {
                    this.$message.success('用药成功');
                    return;
                }
                this.$message.warning('用药失败');
            });
        } else if (Number(row.status) > 3) {
            this.$message.warning('该医嘱已用药');
        } else if (Number(row.status) < 2) {
            this.$message.warning('该医嘱未接药');
        }
    }
    /**
     * 拔针
     */
    public pullNeedle(row: any) {
        this.getSplitPrescription(row);
        if ('4' === row.status) {
            this.splitPrescription.status = '5';
            this.$store.dispatch('EditSplitPrescriptionStatus', this.splitPrescription).then(({data}) => {
                this.$emit('onclick', this.getPatient.visitId);
                if (data.code === 0) {
                    this.$message.success('拔针成功');
                    return;
                }
                this.$message.warning('拔针失败');
            });
        } else if (Number(row.status) > 4) {
            this.$message.warning('该医嘱已拔针');
        } else if (Number(row.status) < 2) {
            this.$message.warning('该医嘱未接药');
        }
    }


    /**
     * 打印标签
     */
    public prientTag(index: number, row: any) {
        // debugger;
        let drugName = '';
        for (let i = 0; i < (this.tableData.length); i++) {
            if (this.tableData[i].patientPrescriptionHisCode === row.patientPrescriptionHisCode) {// 获取需要展示的拆分数据
                const splitData = this.tableData[i].items;
                for (let j = 0; j < (splitData.length); j++) {
                    if (row.id === splitData[j].id) {// 获取当前行数据
                        // drugName = row.medicineOfferId;
                        if (1 === row.groupId) {
                            // const r = j;
                            for (let s = j; s < (splitData.length); s++) {
                                if (1 === splitData[s].groupId) {
                                    drugName += splitData[s].medicineOfferId + ',';
                                } else {
                                    break;
                                }
                            }
                        } else {
                            drugName = row.medicineOfferId;
                        }
                    }
                }
            }
        }
        const LODOP = window.getLodop();
        if (LODOP === null || LODOP === undefined) {
            return;
        }
        LODOP.PRINT_INIT('dangedayin');               // 首先一个初始化语句
        LODOP.SET_PRINT_PAGESIZE(0, 800, 600, '');
        let qRCode = '';
        let tempValue = 40;
        const splitId = 'splitId:' + row.id;
        tempValue += 15;
        // LODOP.ADD_PRINT_TEXTA("devcodeh",tempValue,20,180,10,splitId);
        const patientVisitId = '病人诊号:' + this.getPatient.visitId;
        tempValue += 15;
        LODOP.ADD_PRINT_TEXTA('devcodeh', tempValue, 20, 180, 10, patientVisitId);
        const patientName = '姓名:' + this.getPatient.name;
        tempValue += 15;
        LODOP.ADD_PRINT_TEXTA('devcodeh', tempValue, 20, 180, 10, patientName);
        qRCode += splitId;
        const medicineName = '药名:' + drugName;
        // qRCode+=(medicineName);
        tempValue += 15;
        LODOP.ADD_PRINT_TEXTA('devcodeh', tempValue, 20, 180, 10, medicineName);
        // const medicineName2 = '用法:' + drugName;
        // // qRCode+=(medicineName);
        // tempValue += 15;
        // LODOP.ADD_PRINT_TEXTA('devcodeh', tempValue, 20, 180, 10, medicineName2);
        LODOP.ADD_PRINT_BARCODE(20, 180, 130, 130, 'QRCode', qRCode, 7);
        LODOP.SET_PRINT_STYLEA(0, 'Stretch', 2); // 按原图比例(不变形)缩放模式
        LODOP.SET_PRINT_STYLEA('devcodeh', 'FontSize', 6);
        LODOP.SET_PRINT_STYLEA('devcodeh', 'FontName', '黑体');
        LODOP.PREVIEW();
        //    LODOP.PRINT();

    }
    /**
     * html打印
     */
    public prientTagHtml(index: number, row: any) {
        this.selectRow = row;
        const print = $('#print');
        const printimg = print.find('#printimg');
        print.show();
        printimg.qrcode({
            width: 100,
            height: 100,
            text: `药名：${this.selectRow.medicineOfferId},
            用法：${this.selectRow.usageMethod},
            频次：${this.selectRow.frequency},
            剂量：${this.selectRow.dosage},
            单位：${this.selectRow.unit}`
        });
        const convertCanvasToImage = (canvas: any) => {
            const image = new Image();
            image.src = canvas.toDataURL('image/png');
            return image;
        };
        const img = convertCanvasToImage(printimg.find('canvas').get(0));
        printimg.html(img);
        setTimeout(() => {
            print.jqprint();
            print.hide();
        }, 400);
    }
    /**
     * 合并单元格
     */
    public objectSpanMethod({ row, column, rowIndex, columnIndex }: any) {
        if (columnIndex !== 0) {
            return;
        }
    }
}

</script>
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
        #print{
            display: none;
            position: relative;
            width: 500px;
            font-size:20px;
            td{
                width:50%;
            }
        }
    }
</style>
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
