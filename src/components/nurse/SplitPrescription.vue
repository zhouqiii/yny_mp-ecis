<template>
  <div class="Prescription">
    <el-scrollbar :style="{height:listHeight}">
      <el-table :data="tableData" highlight-current-row border @row-click="onGetRowData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <split-prescription-drug-table :tableData="props.row.items">
              <template slot-scope="scope">
                <SplitPrescriptionTool @click="onClickTool" :scope="scope" :list="['打印']"></SplitPrescriptionTool>
              </template>
            </split-prescription-drug-table>
          </template>
        </el-table-column>
        <el-table-column label="单号" prop="patientPrescriptionHisCode" />
        <el-table-column label="类别" prop="type">
          <!-- <template slot-scope="scope">
                        {{scope.row.type|dict('prescription_type')}}
                    </template> -->
        </el-table-column>
        <el-table-column label="医生" prop="doctorName"></el-table-column>
        <el-table-column label="下达时间" prop="beginDate" />
        <el-table-column label="状态" prop="status" />
      </el-table>
    </el-scrollbar>
    <table id="print" style="font-size:12px">
      <tr>
        <td>
          <div id="printimg"></div>
          <div v-for="(item, i) in selectRow" :key="i">
            <div>{{i+1}}使用药品-药名：{{item.medicineOfferHisName}}-用法：{{item.usageMethod}}-频次：{{item.frequency}}-剂量：{{item.dosage}}-单位：{{item.unit}}</div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SplitPrescriptionDrugTable from '@/components/nurse/SplitPrescriptionDrugTable.vue';
import SplitPrescriptionTool from '@/components/nurse/SplitPrescriptionTool.vue';
@Component({
  components: { SplitPrescriptionDrugTable, SplitPrescriptionTool }
})
export default class SplitPrescription extends Vue {
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
  public selectRow = [];
  // {
  //     medicineOfferId: '',
  //     medicineOfferName: '',
  //     usageMethod: '',
  //     frequency: '',
  //     dosage: '',
  //     unit: ''
  // };
  public mounted() {
    $(window).resize(() => {
      this.listHeight = window.innerHeight - 105 + 'px';
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
  public configPrescription(rows: any) {
    if (Number(rows[0].status) > 2) {
      this.$message.warning('该医嘱已配药');
      return;
    }
    if (Number(rows[0].status) < 2) {
      this.$message.warning('该医嘱未接药');
      return;
    }
    this.$store.dispatch('EditSplitPrescriptionStatus', { status: '3', objList: rows }).then(({ data }) => {
      // this.$emit('onclick', this.getPatient.visitId);
      if (data.code === 0) {
        this.$message.success('配药成功');
        return;
      }
      this.$message.warning('配药失败');
    });
  }
  /**
   * 用药
   */
  public usePrescription(row: any) {
    if (Number(row.status) > 3) {
      this.$message.warning('该医嘱已用药');
    }
    if (Number(row.status) < 2) {
      this.$message.warning('该医嘱未接药');
    }
    this.$store.dispatch('EditSplitPrescriptionStatus', { status: '4', objList: row }).then(({ data }) => {
      // this.$emit('onclick', this.getPatient.visitId);
      if (data.code === 0) {
        this.$message.success('用药成功');
        return;
      }
      this.$message.warning('用药失败');
    });
  }
  /**
   * 拔针
   */
  public pullNeedle(row: any) {
    if (Number(row.status) > 4) {
      this.$message.warning('该医嘱已拔针');
      return;
    }
    if (Number(row.status) < 2) {
      this.$message.warning('该医嘱未接药');
      return;
    }
    this.$store.dispatch('EditSplitPrescriptionStatus', { status: '5', objList: row }).then(({ data }) => {
      this.$emit('onclick', this.getPatient.visitId);
      if (data.code === 0) {
        this.$message.success('拔针成功');
        return;
      }
      this.$message.warning('拔针失败');
    });
  }
  /**
   * html打印
   */
  public prientTagHtml(row: any) {
    this.selectRow = row;
    const print = $('#print');
    const printimg = print.find('#printimg');
    print.show();
    printimg.qrcode({
      width: 100,
      height: 100,
      text: JSON.stringify(row.map((item: any) => item.id))
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
  public toolFun(scope: any) {
    return [
      // 打印
      () => this.prientTagHtml(scope.data.row),
      // 配药
      () => this.configPrescription(scope.data.row),
      // 用药
      () => this.usePrescription(scope.data.row),
      // 拔针
      () => this.pullNeedle(scope.data.row)
    ];
  }
  public onClickTool({ index, scope }: any) {
    this.toolFun(scope)[index]();
  }
}

</script>
<style lang="less" scoped>
.Prescription {
  height: calc(~'100% - 95px');
  width: calc(~'100% - 270px');
  background-color: #fff;
  position: absolute;
  right: 0px;
  top: 95px;
  .menu-tools {
    height: 30px;
    line-height: 30px;
    span {
      font-weight: bold;
      font-size: 16px;
    }
  }
  .menu-right {
    width: auto;
    height: 100%;
    // float:right;
    div {
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
  #print {
    display: none;
    position: relative;
    width: 500px;
    font-size: 20px;
    td {
      width: 50%;
    }
  }
}
</style>
<style lang="less">
.Prescription {
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
  .el-table__expanded-cell[class*='cell'] {
    padding: 5px 15px;
  }
  .el-form--label-left .el-form-item__label {
    text-align: right;
  }
  .el-table {
    margin: 10px;
    width: calc(~'100% - 20px');
  }
}
</style>
