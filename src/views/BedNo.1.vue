<template>
  <div class="BedNo">
    <section>
     <div>
        <p>姓名：{{item[0].patientName}}</p>
        <p>年龄：{{item[0].age}}</p>
        <p>性别：{{item[0].gender|dict('sex')}}</p>
        <p>急诊号：{{item[0].patientVisitId}}</p>
        <p>入院日期：{{item[0].arrivalDate}}</p>
        <p>医生：{{item[0].visitDoctorName}}</p>
        <p>护士：{{item[0].visitNurseName}}</p>
        <p>诊断：{{item[0].diagnosisName}}</p>
    </div>
    </section>
    <nav>
     <button>预防管路滑脱1</button>
     <button>预防管路滑脱2</button>
     <button>预防跌倒坠脱</button>
    </nav>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class BedNo extends Vue {
  public data: any[] = [];
  public item: any[] = [{}];
  public async onblank() {
    const hh = await this.$prompt('请输入床位', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /.*/,
      inputErrorMessage: '床位不能为空'
    }) as any;
    this.getdata(hh.value);
    // this.$webSocket((stompClient: StompClient) => {
    //   stompClient.subscribe('/toAll/bedList', (date: any[]) => {
    //     this.date = date;
    //   });
    //   stompClient.send('/bed', {});
    // });
  }

  public getdata(code: string) {
    if (this.data.length === 0) {
      this.$webSocket((stompClient: StompClient) => {
        stompClient.subscribe('/toAll/bedList', ({body}: any) => {
          const data = JSON.parse(body);
          this.data = data.data;
          this.item = this.data.filter((item) => code === item.code);
          this.item.forEach((obj) => {
            this.visitName(obj, 'ROLE_DOCTOR', 'visitDoctorId', 'visitDoctorName');
            this.visitName(obj, 'ROLE_NURSE', 'visitNurseId', 'visitNurseName');
          });
        });
        stompClient.send('/bed', {});
    });
    } else {
      this.item = this.data.filter((item) => code === item.code);
    }
  }
  public async visitName(obj: any, p: string, objId: string, objName: string) {
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
  public created() {
    this.onblank();
  }
}
</script>
<style lang="less" scoped>
.BedNo {
  height: 100%;
  position: relative;
  section{
     display: inline-block;
    background-color:rgb(34, 150, 150);
    width:calc(100% - 500px);
    height:100%;
    color:#fff;
    font-size: 32px;
    >div{
          width: 50%;
    position: relative;
    margin: auto;
    top: calc(50% - 298px);
    }
  }
  nav{
    position:absolute;
    top:0;
    display: inline-block;
    width:500px;
    height: 100%;
    >button{
      display:inline-block;
      height: 33.3%;
      width: 100%;
      background-color:rgb(19, 86, 173);
      border: 3px solid rgb(34, 150, 150);
      outline: none;
      font-size: 30px;
      color:#fff;
    }
  }
}
</style>
