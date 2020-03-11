<template>
    <div class="careDetail">
      <el-tabs v-model="activeName">
        <el-tab-pane :label="`${title}护理记录`" name="first" class="tabPannel" >
          <el-form :model="nursingCare" status-icon :rules="rules" ref="nursingCare" label-width="100px">                                 
            <div class="detail"> 
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="护理名称：" prop="nursingCareId">
                            <el-select v-model="nursingCare.nursingCareId" @change="onSetPrice(nursingCare.nursingCareId)" filterable placeholder="请选择">
                              <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="护理人员：" prop="nurseId">
                            <el-select v-model="nursingCare.nurseId" filterable placeholder="请选择">
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
                        <el-form-item label="次数：" prop="times">
                            <el-input-number v-model="nursingCare.times" @change="onChangePrice(nursingCare.times,nursingCare.nursingCareId)" :min="0" :max="100" label="描述文字"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收费：" prop="price">
                            <el-input v-model="nursingCare.price" placeholder="" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>                                               
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="开始时间：" prop="beginDate">
                            <yn-date-time-pick
                            v-model="nursingCare.beginDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00"/>
                        </el-form-item>
                    </el-col> 
                    <el-col :span="12">
                        <el-form-item label="结束时间：" prop="endDate">
                            <yn-date-time-pick
                            v-model="nursingCare.endDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00"/>
                        </el-form-item>
                    </el-col>                                
                </el-row>
                <el-row class="rowBottom">
                    <el-col :span="24">
                        <el-form-item label="处理及病情：" prop="remark">
                            <el-input
                              type="textarea"
                              :rows="2"
                              placeholder="请输入内容"
                              v-model="nursingCare.remark">
                            </el-input>
                        </el-form-item>
                    </el-col>  
                                  
                </el-row>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
interface Options {
  id: number;
  name: string;
  price: number;
}
@Component({
  metaInfo: {
    titleTemplate: '%s-护理记录'
  }
})
export default class Prescription1 extends Vue {
  public activeName = 'first';
  public title = '新建';
  /**
   * 校验规则
   */
  public rules = {
    nursingCareId: [common.rules().required()],
    nurseId: [common.rules().required()],
    times: [common.rules().required()],
    beginDate: [common.rules().required(), common.rules().requiredDate()],
    endDate: [common.rules().required(), common.rules().requiredDate()],
    remark: [common.rules().required()]
  };
  /**
   * 操作对象
   */
  public nursingCare: any = {
    id: '',
    nursingCareId: '',
    nurseId: '',
    times: 0,
    beginDate: '',
    endDate: '',
    remark: ''
  };
  // 获取操作类型
  public isOp = location.pathname.split('/')[location.pathname.split('/').length - 1];
  // 护理类型
  public options: Options[] = [];
  // 护士列表
  public optionsNurse = [];
  /**
   * 操作
   */
  public mounted() {
    this.onGetCareData();
    this.onGetNurses();
    this.$store.commit('SET_OPBTN_VALUE', [{name: '保存', event: 'onSaveNotes'}, {name: '返回', event: 'onReturnNotes'}]);
    // 判断编辑新增页面赋值
    if (this.isOp === common.config.pageStatus.edit) {
      this.title = '编辑';
      if (sessionStorage.getItem('/nurse/notes')) {
        this.nursingCare = JSON.parse((sessionStorage.getItem('/nurse/notes') as string));
      } else {
        this.$message.warning('未选中相应对象，跳转失败！');
        this.$router.push('/nurse/notes');
      }
    }
  }
  /**
   * 传递费用
   */
  public onSetPrice(id: number) {
    const care = this.options.filter((item) => item.id === id);
    this.nursingCare.price = care[0].price * this.nursingCare.times;
  }
  /**
   * 改变费用
   */
  public onChangePrice(times: number, careId: number) {
    const care = this.options.filter((item) => item.id === careId);
    this.nursingCare.price = care[0].price * times;
  }
  /**
   * 获取护理类型
   */
  public onGetCareData() {
    this.$store.dispatch('GetNursingCare').then(({data}) => {
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
  public onSaveNotes() {
    const nursingCare = JSON.parse(JSON.stringify(this.nursingCare));
    nursingCare.beginDate = (new Date(nursingCare.beginDate)).format('yyyy-MM-dd hh:mm:ss');
    nursingCare.endDate = (new Date(nursingCare.endDate)).format('yyyy-MM-dd hh:mm:ss');
    if (nursingCare.id === '') {
      this.$store.dispatch('SaveNursingCare', nursingCare).then(({data}) => {
        if (data.code === 0) {
          this.$router.push('/nurse/notes');
          this.$message.success('保存成功');
        }
      });
    } else {
      this.$store.dispatch('EditNursingCare', nursingCare).then(({data}) => {
        if (data.code === 0) {
          this.$router.push('/nurse/notes');
          this.$message.success('保存成功');
        }
      });
    }
  }
  /**
   * 返回方法
   */
  public onReturnNotes() {
        this.$router.push('/nurse/notes');
  }
}
</script>

<style lang="less" scoped>
  .careDetail{
    height:calc(~"(100% - 95px)");
    width:calc(~"(100% - 270px)");
    position: absolute;
    left: 260px;
    top: 95px;
    .detail{
      height: 100%;
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
  .careDetail{
    .el-form{
      height:calc(~"(100% - 20px)");
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



