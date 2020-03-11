<template>
    <div class="bed">
      
      <div class="BedMenu">      
        <span class="menu-title">          
          大屏展示
          <i class="icon iconfont icon-chuang"/>
        </span>
        <div class="menu-right">
          <div @click="onAddBeds()">新建</div>
          <div @click="onEditBeds()">编辑</div>
          <div @click="onDelBeds()">删除</div>
          <div @click="onRefresh()">刷新</div>
        </div>
      </div>
      <div class="bedTable">
        <el-scrollbar :style="{height:listHeight}">
          <el-table
            :data="tableData"
            highlight-current-row
            border
            style="width: 100%"          
            @row-click="onGetRowData">          
            <el-table-column
              prop="code"
              label="床位编码"
              width="">
            </el-table-column>
            <el-table-column
              prop="section"
              label="床位区域"
              width="">
              <template slot-scope="scope">
                <span v-for="(item,i) in bedSection" :key="i">
                  <span v-if="item.value === scope.row.section">{{item.label}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="doctorName"
              label="默认责任医生"
              width="">
            </el-table-column>
            <el-table-column
              prop="nurseName"
              label="默认责任护士"
              width="">
            </el-table-column>
            <el-table-column
              prop="status"
              label="床位状态"
              width="">
              <template slot-scope="scope">
                <span v-for="(item,i) in bedStatus" :key="i">
                  <span v-if="item.value === scope.row.status">{{item.label}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="createdOn"
              label="创建时间"
              width="">
            </el-table-column>
            <el-table-column
              prop="modifiedOn"
              label="修改时间"
              width="">
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
interface TableData {
  code: string;
  section: string;
  doctorName: string;
  nurseName: string;
  status: number;
  createdOn: string| Date;
  modifiedOn: string| Date;
}
const df = Vue.filter('dictFilter');
@Component({
  metaInfo: {
    titleTemplate: '%s-床位管理'
  }
})
export default class Bed extends Vue {
  /**
   * 表格数据
   */
  public tableData: TableData[] = [];
  public bedStatus = df('bed_status');
  public bedSection = df('bed_section');
  public listHeight = window.innerHeight - 125 + 'px';
  /**
   * 操作按钮分布
   */
  public mounted() {
    this.onGetBedList();
    $(window).resize(() => {
      this.listHeight = window.innerHeight - 125 + 'px';
    });
    // this.$store.commit('SET_OPBTN_VALUE', [{name: '新建', event: 'onAddNotes'},
    // {name: '编辑', event: 'onEditNotes'}, {name: '删除', event: 'onDelNotes'},
    // {name: '刷新', event: 'onRefresh'}]);
  }
  /**
   * 获取数据列表
   */
  public onGetBedList() {
    this.$store.dispatch('GetBedList').then(({data}) => {
      this.tableData = data.data;
    });
  }
  /**
   * 获取行数据
   */
  public onGetRowData(row: any) {
    sessionStorage.setItem('/emergency/systemSetting/beds', JSON.stringify(row));
  }
  /**
   * 刷新页面
   */
  public onRefresh() {
    this.onGetBedList();
  }
  /**
   * 新建页面
   */
  public onAddBeds() {
        this.$router.push('/emergency/systemSetting/beds/add');
  }
  /**
   * 编辑页面
   */
  public onEditBeds() {
        this.$router.push('/emergency/systemSetting/beds/edit');
  }
  /**
   * 删除页面
   */
  public onDelBeds() {
    if (sessionStorage.getItem('/emergency/systemSetting/beds')) {
       const bed = JSON.parse((sessionStorage.getItem('/emergency/systemSetting/beds') as string));
       this.$store.dispatch('DelBed', bed.id).then(({data}) => {
        if (data.code === 0) {
          sessionStorage.setItem('/emergency/systemSetting/beds', '');
          this.onGetBedList();
          this.$message.success('删除成功');
        }
      });
    } else {
      this.$message.warning('未选中相应对象，删除失败!');
      this.$router.push('/emergency/notes');
    }
  }
}
</script>

<style lang="less" scoped>
  .bed{
    height:calc(~"(100% - 60px)");
    .BedMenu{
        height: 35px;
        width: 100%;
        background-color: #e6e6e6;
        overflow: hidden;
        line-height:35px;
        span{
            font-size:18px;
             display: inline-block;
        }
        .menu-title{
            font-weight:bold;
            color:#0071bc;
            width:200px;
            margin-left:30px;
            .iconfont{
              font-size: 18px;
            }
        }
        .menu-value{
            padding-right: 10px;
        }
        .dig{
            color : red;
        }
        .menu-right{
            width:auto;
            height:100%;
            background-color:#3fa9f5;
            float:right;
            div{
                float: left;
                padding:0px 10px;
                color:#f2f2f2;
                font-size:14px;
                cursor: pointer;
                &:hover{
                    background:#0480d2;
                }
            }
        }
    }
    .bedTable{
      margin: 10px;
      height: 100%;
      background-color: #fff;
    }
    .vig{
      margin: 10px;
      width:70%;
      text-align: center;
      float:left;
      // height:400px;
    }
    .opmenu{
      width:25%;
      margin-top: 10px;
      margin-right: 10px;
      float: right;
      background-color: #ffffff;
    }
  }
</style>

<style lang="less">
  .bed{
    .el-button{
               margin-top:5px;
               margin-left:10px;
               background:#0071bc;
               color:#fff;
               padding:6px 10px;
           }
  }
</style>
