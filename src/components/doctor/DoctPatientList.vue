<template>
    <div class="DoctPatientList">
        <div class="menu-left">
            <div>一二级</div>
            <div>三四级</div>
            <div>已完成</div>
            <div>全部</div>
        </div>
        <div class="menu-right">
            <div class="search">
                <span class="search-title">全部病人</span>
                <el-input class="search-input" suffix-icon="el-icon-search" v-model="searchVal" placeholder="病人姓名/病人床号"></el-input>
            </div>
            <el-scrollbar :style="{height:listHeight}">
            <ul class="patient-list">
                <li v-for="(patient, index) in patientList" :key="index" :class="levelStyle(patient)">
                    <div>
                        <span v-text="patient.name" class="patient-list-span-1"></span>
                        <span v-text="patient.severityLevelMannul" class="patient-list-span-2"></span>
                    </div>
                    <div>
                        <span class="patient-list-span-3">状态:{{patient.status}}</span>
                        <span class="patient-list-span-4">病区:{{patient.section}}</span>
                    </div>
                </li>
            </ul>
            </el-scrollbar>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
    props: {
        patientList: Array
    }
})
export default class DoctPatientList extends Vue {
    public searchVal = '';
    public listHeight = window.innerHeight - 95 + 'px';
    public levelStyle(item: any) {
        // if()
        return `color${item.severityLevelMannul}`;
    }
    public mounted() {
        $(window).resize(() => {
            this.listHeight = window.innerHeight - 95 + 'px';
        });
    }
}
</script>
<style lang="less">
    .DoctPatientList{
        .menu-right{
            .el-input {
              width: 135px;
              margin-left: 35px;
            }
            input::-webkit-input-placeholder{
                color: #363636;
                font-size: 12px;
            }
           input{
                // border:none;
                // border-radius: 0px;
                // border-bottom: 1px solid #2c3e50;
                background-color: #b3b3b3;
                height: 20px;
                line-height: 20px;
                padding: 0 15px 0 2px;
            }
        }
        .el-input__suffix {
            right: -5px;
        }
        .el-input__prefix, .el-input__suffix {
            top:-10px;
            color:#2c3e50;
        }
    }
</style>

<style lang="less" scoped>
    .DoctPatientList{
        width: 260px;
        height: 100%;
        overflow: hidden;
        .menu-left{
            background-color: #0d3754;
            width: 20px;
            float: left;
            height: 100%;
            div{
                color: #f2f2f2;
                font-size:12px;
                font-weight:bold;
                border-bottom:1px solid white;
                padding-bottom:5px;
                margin: 2px 0px;
                text-align: center;
                &:hover{
                    background-color:#125984;
                    cursor: pointer;
                }
            }
        }
        .menu-right{
            float: left;
            background-color: #dcdcdc;
            width: calc(~"100% - 20px");
            height: 100%;
            .search{
                background-color: #b3b3b3;
                padding-top:5px;
                height: 30px;
                overflow: hidden;
                .search-title{
                    margin-left:5px;
                    float: left;
                    font-size: 14px;
                }
                .search-input{
                    float: left;
                }
            }
            .patient-list{
                list-style-type:none;
                // height: calc(~"100% - 165px");
                margin:0px;
                padding:0px 5px;
                li{
                    height:60px;
                    &:hover{
                        box-shadow:1px 1px 10px #666;
                        cursor: pointer;
                    }
                    // background-color:green;
                    // box-shadow:5px 5px 10px black;
                    // ['#c1272d', '#c1272d', '#ff931e', '#009245', '#f2f2f2']
                    &.color1{
                        background: #c1272d;
                        &:hover{
                            background: #d8333a;
                        }
                    }
                    &.color2{
                        background: #c1272d;
                        &:hover{
                            background: #d8333a;
                        }
                    }
                    &.color3{
                        background: #ff931e;
                        &:hover{
                            background: #fb9a31;
                        }
                    }
                    &.color4{
                        background: #009245;
                        &:hover{
                            background: #03b959;
                        }
                    }
                    &.color5{
                        background: #f2f2f2;
                        &:hover{
                            background: #fff;
                        }
                    }
                    div{
                        margin: 10px 5px;
                        color:#f2f2f2;
                        font-size: 14px;
                    }
                    .patient-list-span-1{
                        font-size: 16px;
                        font-weight:bold;
                        display: inline-block;
                        width: 60px;
                    }
                    .patient-list-span-3{
                        display: inline-block;
                        width: 100px;
                    }
                }
            }
        }
    }
</style>

