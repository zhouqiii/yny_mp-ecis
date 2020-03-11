<template>
    <div class="bedDetail">
      <div class="BedMenu">      
        <span class="menu-title">
          <i class="icon iconfont icon-chuang"/>
          {{title}}床位
        </span>
        <div class="menu-right">
          <div @click="onSaveBed()">保存</div>
          <div @click="onReturnBeds()">返回</div>
        </div>
      </div>
      <!-- <el-tabs v-model="activeName">
        <el-tab-pane :label="`${title}床位`" name="first" class="tabPannel" > -->
          <el-form :model="bed" status-icon :rules="rules" ref="bed" label-width="100px">                                 
            <div class="detail"> 
                <el-row>
                  <el-col :span="12">
                        <el-form-item label="床位区域：" prop="section">
                            <el-select
                              v-model="bed.section"
                              placeholder="请选择区域"
                            >
                              <el-option
                                v-for="(item,i) in dictFilter('bed_section')"
                                :label="item.label"
                                :key="i"
                                :value="item.value"
                              />
                            </el-select>
                        </el-form-item>
                    </el-col>             
                    <el-col :span="12">
                        <el-form-item label="床位编码：" prop="code">
                          <el-input v-model="bed.code" ></el-input>                            
                        </el-form-item>
                    </el-col>
                                      
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="责任医生：" prop="doctorId">
                            <el-select v-model="bed.doctorId" filterable placeholder="请选择">
                              <el-option
                                v-for="item in options"
                                :key="item.userId"
                                :label="item.username"
                                :value="item.userId">
                              </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="责任护士：" prop="nurseId">
                            <el-select v-model="bed.nurseId" filterable placeholder="请选择">
                              <el-option
                                v-for="item in optionsNurse"
                                :key="item.userId"
                                :label="item.username"
                                :value="item.userId">
                              </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>                                               
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="床位状态：" prop="status">
                           <el-radio-group v-model="bed.status">
                            <el-radio
                              v-for="(item,i) in statusOption"
                              :key="i"
                              :label="item.key"
                            >{{item.value}}</el-radio>
                          </el-radio-group>
                            <!-- <el-select v-model="bed.status" filterable placeholder="请选择">
                              <el-option
                                v-for="item in statusOption"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key">
                              </el-option>
                            </el-select> -->
                        </el-form-item>
                    </el-col>                              
                </el-row>
            </div>
          </el-form>
        <!-- </el-tab-pane>
      </el-tabs> -->
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const df = Vue.filter('dictFilter');
@Component({
  metaInfo: {
    titleTemplate: '%s-床位管理'
  }
})
export default class BedDetail extends Vue {
  public activeName = 'first';
  public title = '新建';
  // 获取操作类型
  public isOp = location.pathname.split('/')[location.pathname.split('/').length - 1];
  // 医生列表
  public options = [];
  // 护士列表
  public optionsNurse = [];
  // 状态列表
  public statusOption = [
    {
      key: '0',
      value: '空床'
    },
    {
      key: '1',
      value: '未空床'
    },
    {
      key: '2',
      value: '禁用'
    }
  ];
  /**
   * 校验规则
   */
  public rules = {
    // code: [common.rules().required()],
    section: [common.rules().required()],
    // doctorId: [common.rules().required()],
    // nurseId: [common.rules().required(), common.rules().requiredDate()],
    status: [common.rules().required()],
    // remark: [common.rules().required()]
  };
  /**
   * 操作对象
   */
  public bed: any = {
    id: '',
    code: '',
    nurseId: '',
    doctorId: '',
    section: '',
    status: '0'
  };
  public dictFilter = (type: string) => df(type);
  /**
   * 操作
   */
  public mounted() {
    this.onGetDoctors();
    this.onGetNurses();
    // 判断编辑新增页面赋值
    if (this.isOp === common.config.pageStatus.edit) {
      this.title = '编辑';
      if (sessionStorage.getItem('beds')) {
        this.bed = JSON.parse((sessionStorage.getItem('beds') as string));
      } else {
        this.$message.warning('未选中相应对象，跳转失败！');
        this.$router.push('/emergency/systemSetting/beds');
      }
    }
  }
  /**
   * 获取护理类型
   */
  public onGetDoctors() {
    this.$store.dispatch('GetDoctors').then(({data}) => {
      this.options = data.data;
    });
  }
  /**
   * 获取护士人员
   */
  public onGetNurses() {
    this.$store.dispatch('GetNurses').then(({data}) => {
      this.optionsNurse = data.data;
    });
  }

  /**
   * 保存方法
   */
  public onSaveBed() {
    const bed = JSON.parse(JSON.stringify(this.bed));
    if (bed.id === '') {
      this.$store.dispatch('SaveBed', bed).then(({data}) => {
        if (data.code === 0) {
          this.$router.push('/emergency/systemSetting/beds');
          this.$message.success('保存成功');
        }
      });
    } else {
      this.$store.dispatch('EditBed', bed).then(({data}) => {
        if (data.code === 0) {
          this.$router.push('/emergency/systemSetting/beds');
          this.$message.success('保存成功');
        }
      });
    }
  }
  /**
   * 返回方法
   */
  public onReturnBeds() {
        this.$router.push('/emergency/systemSetting/beds');
  }
}
</script>

<style lang="less" scoped>
  .bedDetail{
    height:100%;
    width:100%;
    // margin: 10px;
    // background-color: #fff;
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
    .detail{
      height: calc(~"(100% - 55px)");
      margin: 10px;
      background-color: #ffffff;
      .rowBottom{
        margin-bottom:20px;
        margin-top:10px;
      }
    }
  }
</style>

<style lang="less">
  .bedDetail{
    // .el-tabs{
    //   height:100%;
    //   .el-tabs__content{
    //     height:100%;
    //     .tabPannel{
    //       height: 100%;
    //     }
    //   }
    // }
    .el-form{
      height:100%;
      .el-form-item__label{
                color:#1c81c3;
                padding-right:0px;
            }
      .el-form-item__content{
          padding-right:10px;
      }
      .el-input__inner{
          border-bottom:1px solid #eee;
          height:20px;
          line-height:20px;
      }
      .el-form-item{
          margin-bottom:0px;
      }
      .el-row{
        margin-top: 10px;
      }
      
    }
    .el-input.is-disabled .el-input__inner{
      color:#000000;
    }
    .el-tabs__nav .is-top{
      margin-left:10px;
    }
    .el-textarea{
      margin-top:10px;
    }
  }
</style>



