<template>
    <div class="DoctMenu">
        <span class="menu-title">病人:</span>
        <span class="menu-value">黄云云太</span>
        <span class="menu-title">性别:</span>
        <span class="menu-value">女</span>
        <span class="menu-title">年龄:</span>
        <span class="menu-value">11岁</span>
        <span class="menu-title">床号:</span>
        <span class="menu-value">A67kk</span>
        <span class="menu-title">诊断:</span>
        <span class="menu-value dig">1.肺部感染 2.冠心病心绞痛 3.慢性支气管炎</span>
        <div class="menu-right">
            <div>叫号</div>
            <div>接诊</div>
            <div>打印手环</div>
            <div>留观</div>
            <div>住院</div>
            <div>出院</div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class DoctMenu extends Vue {

}
</script>
<style lang="less">

</style>
<style lang="less" scoped>
    .DoctMenu{
        height: 35px;
        width: calc(~"100% - 270px");
        background-color: #e6e6e6;
        position: absolute;
        right: 0px;
        top: 60px;
        overflow: hidden;
        line-height:35px;
        span{
            font-size:14px;
             display: inline-block;
        }
        .menu-title{
            font-weight:bold;
            color:#0071bc;
            width:35px;
            margin-left:10px;
        }
        .menu-value{
            padding-right: 10px;
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
        .dig{
            color:red;
        }
    }
</style>
