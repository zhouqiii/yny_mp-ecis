<template>
  <div class="BedNo">
    <!-- <div class="menu"></div> -->
    <el-row class="box">
      <el-col :span="16">
        <el-scrollbar :style="{height:`${h}px`}">
          <el-card shadow="always">
            <h1>{{item.patientName}}</h1>
            <h1 @click="onChangeBed">床号：{{item.code}}</h1>
          </el-card>
          <el-card shadow="always">
            <div slot="header" class="clearfix">
              <h2>住院信息</h2>
            </div>
            <el-row>
              <el-col :span="18">
                <el-row>
                  <el-col :span="8">急诊编号：<b>{{item.patientVisitId}}</b></el-col>
                  <el-col :span="8">年龄：<b>{{item.age}}</b></el-col>
                  <el-col :span="8">性别：<b>{{item.gender}}</b></el-col>
                  <el-col :span="24">入院时间：<b>{{item.arrivalDate}}</b></el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <img src="/img/头像.svg" height="100px"/>
                <div class="section" :class="`back${item.section}`">{{item.section}}级</div>
              </el-col>
            </el-row>
          </el-card>
          <el-card shadow="always">
            <div slot="header" class="clearfix">
              <h2>患者诊断信息</h2>
            </div>
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="12">医生：<b>{{item.doctorName}}</b></el-col>
                  <el-col :span="12">护士：<b>{{item.visitNurseName}}</b></el-col>
                  <el-col :span="24">诊断：<b>{{item.diagnosisName}}</b></el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-scrollbar>
      </el-col>
      <el-col :span="8">
        <el-scrollbar :style="{height:`${h}px`}">
          <ul class="tool">
            <li><h1>预防管路滑脱</h1><p></p><p></p></li>
            <li><h1>预防管路滑脱</h1><p></p><p></p></li>
            <li><h1>预防跌倒坠落</h1><p></p><p></p></li>
            <li><h1>预防跌倒坠落</h1><p></p><p></p></li>
            <li><h1>预防跌倒坠落</h1><p></p><p></p></li>
            <li><h1>预防跌倒坠落</h1><p></p><p></p></li>
          </ul>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class BedNo extends Vue {
  private h = window.innerHeight - 20;
  private data: any[] = [];
  private item: any = {};
  public mounted() {
    $(window).resize(() => this.h = window.innerHeight);
    const bedCode: string| null = this.getbedCode();
    if (bedCode) {
      this.getdata(bedCode);
    }
    this.submitForm();
  }
  private async onChangeBed() {
    const bedCode = await this.$prompt('请输入床位', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /.*/,
      inputErrorMessage: '床位不能为空'
    }) as any;
    this.setbedCode(bedCode.value);
    this.getdata(bedCode.value);
  }
  private getdata(code: string) {
    if (this.data.length === 0) {
      this.$webSocket((stompClient: StompClient) => {
        stompClient.subscribe('/toAll/bedList', ({body}: any) => {
          const data = JSON.parse(body);
          this.data = data.data;
          this.item = this.data.filter((item) => code === item.code)[0];
          [this.item].forEach((obj) => {
            this.visitName(obj, 'ROLE_DOCTOR', 'visitDoctorId', 'visitDoctorName');
            this.visitName(obj, 'ROLE_NURSE', 'visitNurseId', 'visitNurseName');
          });
        });
        stompClient.send('/bed', {});
    });
    } else {
      this.item = this.data.filter((item) => code === item.code)[0];
    }
  }
  private async visitName(obj: any, p: string, objId: string, objName: string) {
    if (!obj[objId]) {
        return obj[objName] = '';
    }
    const userList = (await this.$store.dispatch('UserList')).data.data.records as any[];
    const doctorList: any[] = [];
    userList.forEach((item: {roleList: any[]}) => {
        item.roleList.forEach((role: {roleCode: string}) => {
            if (role.roleCode === p) {
                doctorList.push(item);
            }
        });
    });
    for (const item of doctorList) {
        if (item.userId === obj[objId]) {
            return obj[objName] = item.username;
        }
    }
  }
  private setbedCode(val: string) {
    localStorage.setItem('bedCode', val);
  }
  private getbedCode() {
    return localStorage.getItem('bedCode');
  }
  // 自动登录
   private submitForm() {
      this.$store.dispatch('LoginByUsername', {
        username: 'admin',
        password: '123456'
    });
  }
}
</script>
<style lang="less" scoped>
@color: #796fea;
.BedNo {
  background: url('/img/bedno.png') no-repeat;
  background-size: cover;
  height: 100%;
  .box {
    padding: 10px;
    position: relative;
    .el-card{
      margin-bottom: 10px;
      h1,h2{
        margin: 0;
        color: @color;
      }
      h1{
        font-size: 30px;
        display: inline-block;
        &:last-child{    
          float: right;
        }
      }
    }
    .tool{
      margin: 0;
      list-style: none;
      li{
        height: 133px;
        background-image: url(/img/bednotool.png);
        background-size: cover;
        margin-bottom: 10px;
        &:nth-of-type(even){
          background-image: url(/img/bednotool1.png);
        }
        h1{
          color: white;
          font-size: 20px;
          margin: 0;
          padding: 20px 15px;
        }
        p{
              height: 8px;
              margin: 0px 137px 10px 15px;
              background: #fff;
        }
      }
    }
    .section{
      text-align: center;
      font-size: 19px;
      color: #fff;
      margin-right: 51px;
      border-radius: 47px;
    }
    .back1{
      background: red;
    }
    .back2{
      background: red;
    }
    .back3{
      background: orange;
    }
    .back4{
      background: green;
    }
  }
}
</style>
