<template>
    <div class="PatientInfo">
        <div class="main">
            <el-tabs v-model="activeName">
                <el-tab-pane label="基本信息" name="first">
                     <el-scrollbar  v-if="activeName==='first'" :style="{height:listHeight1}">
                        <el-form  status-icon  label-width="100px" class="demo-ruleForm">
                            <el-form-item label="姓名:">
                                <span>黄云云太</span>
                            </el-form-item>
                            <el-form-item label="身份证号:">
                                <span>370123199308076789</span>
                            </el-form-item>
                            <el-form-item label="出生日期:">
                                <span>1993-08-07 00:00:00</span>
                            </el-form-item>
                            <el-form-item label="婚姻状态:">
                                <span>已婚</span>
                            </el-form-item>
                            <el-form-item label="急诊卡号:">
                                <span>20181218001</span>
                            </el-form-item>
                            <el-form-item label="交费方式:">
                                <span>医保</span>
                            </el-form-item>
                            <el-form-item label="性别:">
                                <span>女</span>
                            </el-form-item>
                            <el-form-item label="民族:">
                                <span>汉族</span>
                            </el-form-item>
                            <el-form-item label="年龄:">
                                <span>31岁</span>
                            </el-form-item>
                            <el-form-item label="电话:">
                                <span>13398765432</span>
                            </el-form-item>
                            <el-form-item label="原籍:" class="form-item-1">
                                <span>天津市津南区林景家园</span>
                            </el-form-item>
                            <el-form-item label="住址:" class="form-item-1">
                                <span>天津市津南区林景家园</span>
                            </el-form-item>
                            <el-form-item label="主要状况:" class="form-item-1">
                                <span>胸痛,胸闷</span>
                            </el-form-item>
                        </el-form>
                     </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="住院信息" name="second">
                    <el-scrollbar :style="{height:listHeight1}">
                        <el-form  status-icon  label-width="101px" class="demo-ruleForm">
                            <el-form-item label="到院时间:">
                                <span>黄云云太</span>
                            </el-form-item>
                            <el-form-item label="到院方式:">
                                <span>本院</span>
                            </el-form-item>
                            <el-form-item label="绿色通道:">
                                <span>是</span>
                            </el-form-item>
                            <el-form-item label="发热门诊:">
                                <span>是</span>
                            </el-form-item>
                            <el-form-item label="是否胸痛:">
                                <span>是</span>
                            </el-form-item>
                            <el-form-item label="不明原因死亡:">
                                <span>是</span>
                            </el-form-item>
                            <el-form-item label="三无人员:">
                                <span>是</span>
                            </el-form-item>
                            <el-form-item label="陪送人员:">
                                <span>王林</span>
                            </el-form-item>
                            <el-form-item label="陪送电话:">
                                <span>17788996655</span>
                            </el-form-item>
                            <el-form-item label="陪送关系:">
                                <span>亲人</span>
                            </el-form-item>
                            <el-form-item label="陪送地址:">
                                <span></span>
                            </el-form-item>
                        </el-form>
                    </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane label="生命体征" name="third">
                    <el-scrollbar :style="{height:listHeight1}">
                        <el-form  status-icon  label-width="111px" class="demo-ruleForm">
                            <el-form-item label="体温(℃):">
                                <span>38.7</span>
                            </el-form-item>
                            <el-form-item label="呼吸(次/分):">
                                <span>60</span>
                            </el-form-item>
                            <el-form-item label="血压(mmHg):">
                                <span>123/142</span>
                            </el-form-item>
                            <el-form-item label="心率(次/分):">
                                <span>70</span>
                            </el-form-item>
                            <el-form-item label="血氧饱和度(%):">
                                <span>0.3</span>
                            </el-form-item>
                        </el-form>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class PatientInfo extends Vue {
    public  activeName = 'first';
    public listHeight1 = window.innerHeight - 150 + 'px';
    public mounted() {
        $(window).resize(() => {
            this.listHeight1 = window.innerHeight - 150 + 'px';
        });
    }
}
</script>
<style lang="less">
    .PatientInfo{
        .el-form-item {
            margin-bottom: 0px;
            width: 50%;
            float: left;
        }
        .el-form-item__label {
            font-weight: bold;
            color:#0071bc;
        }
    }
</style>
<style lang="less" scoped>
    .PatientInfo{
        height:calc(~"100% - 95px");
        width: calc(~"100% - 270px");
        background-color: #f5f5f5;
        position: absolute;
        right: 0px;
        top: 95px;
        .main{
            margin-left:10px;
            .form-item-1{
                width:100%;
            }
        }
    }
</style>
