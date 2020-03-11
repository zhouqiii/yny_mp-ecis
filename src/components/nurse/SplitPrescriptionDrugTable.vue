<template>
  <div class="SplitPrescriptionDrugTable">
    <div v-for="(item,i) in tableData" :key="i">
      <el-row>
          <el-col class="title" :span="12">
              <h1>{{i+1}}组</h1>
          </el-col>
          <el-col class="tool" :span="12">
              <slot :data="{row:item,index:i}"></slot>
          </el-col>
      </el-row>
      <el-table
        :data="item"
        border
      >
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="药名"
          prop="medicineOfferHisName"
        />
        <el-table-column
          label="用法"
          prop="usageMethod"
        >
          <template slot-scope="scope">
            {{scope.row.usageMethod}}
          </template>
        </el-table-column>
        <el-table-column
          label="频次"
          prop="frequency"
        >
          <template slot-scope="scope">
            {{scope.row.frequency}}
          </template>
        </el-table-column>
        <el-table-column
          label="剂量"
          prop="dosage"
        >
          <template slot-scope="scope">
            {{scope.row.dosage}}
          </template>
        </el-table-column>
        <el-table-column
          label="单位"
          prop="unit"
        >
          <template slot-scope="scope">
            {{scope.row.unit}}
          </template>
        </el-table-column>
        <!-- <el-table-column label="是否付费" prop="ifPaid">
                <template slot-scope="scope">
                    {{scope.row.ifPaid+''|dict('if12')}}
                </template>
            </el-table-column> -->
        <el-table-column label="剂型">
          <template slot-scope="scope">
            {{scope.row.status}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class SplitPrescriptionDrugTable extends Vue {
  @Prop()
  public tableData!: any[];
}
</script>
