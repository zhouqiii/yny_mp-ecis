<template>
  <div class="Screen">
    <!-- <canvas id="star" /> -->
    <header>
      <div class="logo">天津市胸科医院</div>
      <div class="title">
        <div>急诊</div>
      </div>
      <div class="time">{{nowTime}}</div>
    </header>
    <section>
      <img class="border-img border-left1" src="/img/screen_biankuang.svg" />
      <img class="border-img border-right1" src="/img/screen_biankuang.svg" />
      <img class="border-img border-left2" src="/img/screen_biankuang.svg" />
      <img class="border-img border-right2" src="/img/screen_biankuang.svg" />
      <div class="room">
        <img src="/img/screen-keji.svg" />
        <div class="title">总控制台</div>
      </div>
      <el-row class="consultation1" v-if="ifShow">
        <el-col class="boxLeft" :span="12" v-for="(item,i) in data" :key="i">
          <h1 class="h1title">{{tabName[i]}}</h1>
          <div class="titleH">
            <ul class="infoList">
              <li>
                <el-row>
                  <el-col :span="2">序</el-col>
                  <el-col :span="5">姓名</el-col>
                  <el-col :span="3">级</el-col>
                  <el-col :span="9">状态</el-col>
                  <el-col :span="5">医师</el-col>
                </el-row>
              </li>
            </ul>
          </div>
          <div>
            <div class="txtMarquee-top">
              <div class="bd">
                <ul class="infoList">
                  <li v-for="(o,i) in item.serious" :key="i" class="criticalBox">
                    <el-row>
                      <el-col :span="2">{{i+1}}</el-col>
                      <el-col :span="5">{{showName(o.name)}}</el-col>
                      <el-col :span="3">{{o.level}}</el-col>
                      <el-col :span="9">等待就诊</el-col>
                      <el-col :span="5">{{ }}</el-col>
                    </el-row>
                  </li>
                  <li v-for="(obj,i) in item.light" :key="i" :class="{level1:obj.level==3,level2:obj.level==4}">
                    <el-row>
                      <el-col :span="2">{{i+1+item.serious.length}}</el-col>
                      <el-col :span="5">{{showName(obj.name)}}</el-col>
                      <el-col :span="3">{{obj.level}}</el-col>
                      <el-col :span="9">等待就诊</el-col>
                      <el-col :span="5">{{ }}</el-col>
                    </el-row>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- <div class="critical">
            <div class="tit">急诊就诊按病情等级顺序</div>
            <el-row class="criticalBox" v-for="(o,i) in item.serious" :key="i">
              <el-col :span="4">序号:{{o.seq}}</el-col>
              <el-col :span="5">姓名:{{o.name}}</el-col>
              <el-col :span="5">等级:{{o.level}}</el-col>
              <el-col :span="5">正在就诊</el-col>
              <el-col :span="5">医师:{{o.doctorId}}</el-col>
            </el-row> 
          </div>-->
        </el-col>
        <el-col class="desc" :span="24">急诊就诊按病情等级顺序</el-col>
      </el-row>
      <div v-if="!ifShow">
        <!-- <el-row class="calledPatient">
          <el-col class="leftClass" :span="12">序号：</el-col>
          <el-col class="rightClass" :span="12">{{patient.seq}}</el-col>
        </el-row> -->
        <el-row class="calledPatient">
          <el-col class="leftClass" :span="12">姓名：</el-col>
          <el-col class="rightClass" :span="12">{{patient.name}}</el-col>
        </el-row>
        <el-row class="calledPatient">
          <el-col class="leftClass" :span="12">医师：</el-col>
          <el-col class="rightClass" :span="12">{{patient.doctorId}}</el-col>
        </el-row>
        <el-row class="calledPatient">
          <el-col class="leftClass" :span="12">科室：</el-col>
          <el-col class="rightClass" :span="12">{{patient.department}}</el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Screen extends Vue {
  public data = [];
  public consultationHeight = window.innerHeight / 2 - 100;
  public stompClient: any = {};
  public nowTime = new Date().format('yyyy-MM-dd hh:mm');
  public flag = false;
  public ifShow = true;
  public patient = {
    visitId: '',
    name: '',
    doctorId: '',
    department: ''
  };
  public isAudio = 0;
  public audioData: any = [];
  public audioIsBusy: any;
  public tabName = ['', ''];
  private status: string = '1';
  public showName(name: string) {
    return name ? (name.length > 2 ? name.replace(/^(.).*(.)$/g, `$1*$2`) : name.replace(/^(.).*$/g, `$1*`))
      : '-';
  }
  /**
   * 请求数据
   */
  public sendMessage(doctors: any[]) {
    // 地址+端点路径，构建websocket链接地址
    const socket = new SockJS('/api/core/bullet');
    const doctorsList = (docs: any, item1: any) => {
      // 遍历医生信息
      for (const o of docs) {
        if (o.userId === item1.doctorId) {
          item1.doctorId = o.username;
          break;
        }
      }
      return item1;
    };
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: any) => {
      // 监听的路径以及回调
      this.stompClient.subscribe('/toAll/bulletScreen',
        ({ body }: any) => {
          this.data = JSON.parse(JSON.parse(body).data);
          this.data.splice(2, 1);
          this.data.forEach((item: { serious: any[], light: any[] }) => {
            item.serious = (item.serious.length <= 5 ? item.serious : item.serious.
              filter((o, i) => i < 5)).map((item2) => doctorsList(doctors, item2));
            item.light = item.light.map((item3) => doctorsList(doctors, item3));
          });
          setTimeout(() => {
            $('.txtMarquee-top').slide({
              mainCell: '.bd ul',
              autoPlay: true,
              effect: 'topMarquee',
              vis: 15,
              interTime: 50,
              trigger: 'click'
            });
          }, 50);
        });
      this.stompClient.subscribe('/toAll/bulletScreenCalled',
        ({ body }: any) => {
          const callData = JSON.parse(JSON.parse(body).data).data;
          this.status = JSON.parse(JSON.parse(JSON.parse(body).data).status).status;
          if (this.status !== '1') {
            return ;
          }
          let firstPatient = {};
          if (callData.length === 3) {
            firstPatient = callData[2];
          }
          const docId = (firstPatient as any).firstItem.doctorId;
          for (const o of doctors) {
            if (o.userId === docId) {
              (firstPatient as any).firstItem.doctorId = o.username;
              break;
            }
          }
          const showDep = (firstPatient as any).showDep === '3' ? '呼吸与危重症科' : '心内科';
          const tmpAudioPatien = {
            visitId : (firstPatient as any).firstItem.visitId,
            name : (firstPatient as any).firstItem.name,
            doctorId : (firstPatient as any).firstItem.doctorId,
            department : showDep,
            text : `请${(firstPatient as any).firstItem.name}到${showDep}诊室找`+
            `${(firstPatient as any).firstItem.doctorId}医师就诊。 。 。 。 。 。 。 。`,
            status : '0'
          };
          this.audioData.push(tmpAudioPatien);
          this.playAudio();
        });
      this.stompClient.subscribe('/toAll/patientStatus',
        ({ body }: any) => {
          const patient = JSON.parse(body);
          if (this.data && this.data[0] && this.data[1] && patient.status === '5' || patient.status === '2') {
            for (let i = 0; i < (this.data[1] as any).light.length; i++) {
              if ((this.data[1] as any).light[i].visitId === patient.visitId) {
                (this.data[1] as any).light.splice(i, 1);
              }
            }
            for (let i = 0; i < (this.data[0] as any).light.length; i++) {
              if ((this.data[0] as any).light[i].visitId === patient.visitId) {
                (this.data[0] as any).light.splice(i, 1);
              }
            }
          }
        });
      this.stompClient.send('/chat', {});
    });
  }
  public deptList(name?: any) {
    this.$store.dispatch('DeptList').then(({ data }) => {
      if (data.data.length === 0) {
        return;
      }
      this.tabName[0] = data.data[0].children[0].name;
      this.tabName[1] = data.data[0].children[1].name;
    });
  }
  public playAudio() {
    if(this.audioData.length === 0) {
      return;
    }
    if(this.audioIsBusy === true) {
      return;
    }
    this.audioIsBusy = true;
    const audioData = this.audioData.shift();
    this.ifShow = false;
    this.patient.visitId = audioData.visitId;
    this.patient.name = audioData.name;
    this.patient.doctorId = audioData.doctorId;
    this.patient.department = audioData.department;
    const audio = new Audio(`http://${location.hostname}:12?say=${audioData.text}`);
    audio.play().catch((e) => {
      //
    });
    let times = 0;
    audio.addEventListener('ended', () => {
      if(times < 2) {
        audio.play().catch((e) => {
          //
        });
        times++;
      } else {
        this.ifShow = true;
        this.audioIsBusy = false;
        this.playAudio();
      }
    });
  }
  public mounted() {
    this.deptList();
    this.$store.dispatch('GetDoctors').then(({ data }) => this.sendMessage(data.data));
    // 动画
    $.getScript('/js/star.js');
    $(window).resize(() => {
      this.consultationHeight = window.innerHeight / 2 - 100;
    });
    setInterval(() => this.nowTime = new Date().format('yyyy-MM-dd hh:mm'), 1000);
  }
}
</script>

<style lang="less" scoped>
@keyframes opacityAnimation {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0.4;
	}
	100% {
		opacity: 1;
	}
}
.Screen {
	height: 100%;
	background: #17293a;
	.calledPatient {
		margin-top: 50px;
		.leftClass {
			font-size: 70px;
			color: #fff;
			margin-top: 35px;
			text-align: right;
			padding-right: 20px;
			line-height: 56px;
		}
		.rightClass {
			font-size: 70px;
			color: #fff;
			margin-top: 35px;
			padding-left: 20px;
			line-height: 56px;
		}
	}
	.el-table {
		padding: 20px;
		font-size: 48px;
	}
	#star {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 0;
	}
	header {
		height: 41px;
		position: relative;
		> div {
			display: inline-block;
			color: #3fa9f5;
			font-size: 20px;
			line-height: 2;
		}
		.title {
			text-align: center;
			width: calc(~'100% - 380px');
			> div {
				width: 40%;
				margin: auto;
				background: #3fa9f5;
				color: #fff;
				border-radius: 0 0 20px 20px;
				font-size: 27px;
			}
		}
		.time {
			width: 162px;
		}
		.logo {
			margin-left: 10px;
			font-size: 27px;
		}
	}
	section {
		height: calc(~'100% - 80px');
		padding: 20px;
		position: relative;
		.border-img {
			position: absolute;
		}
		.border-right1 {
			right: 20px;
			transform: scaleX(-1);
			filter: fliph; /*IE*/
		}
		.border-left2 {
			bottom: 20px;
			transform: scaleY(-1);
		}
		.border-right2 {
			right: 20px;
			bottom: 20px;
			transform: scale(-1, -1);
			filter: fliph; /*IE*/
		}
		.room {
			position: absolute;
			bottom: 30px;
			right: 30px;
			display: none;
			> img {
				opacity: 0.4;
				animation: opacityAnimation 2s linear infinite;
			}
			.title {
				position: absolute;
				font-size: 20px;
				color: #f7931e;
				top: 54px;
				left: 34px;
			}
		}
		.consultation1 {
			height: 100%;
			> div {
				height: calc(100% - 90px);
			}
			.desc {
				font-size: 60px;
				color: #980909;
				text-align: center;
				height: auto;
			}
			.boxLeft {
				border-right: none;
				&:first-child {
					border-right: 1px solid #3fa9f5;
				}
			}
			.h1title {
				display: inline-block;
				font-size: 48px;
				margin: 10px 0 0 50px;
				color: #fff;
			}
			.h1doctor {
				display: inline-block;
				margin-left: 30px;
				color: #fff;
			}
		}
		ul {
			list-style: none;
			margin: 20px 0;
			padding: 0;
		}
		.titleH {
			font-size: 30px;
			color: #3fa9f5;
			font-weight: bold;
		}
		.infoList {
      text-align: center;
      li{
        padding: 10px 0;
				font-size: 45px;
        &.criticalBox {
          text-align: center;
          color: red;
        }
        &.level1 {
          color: #f7931e;
        }
        &.level2 {
          color: green;
        }
      }
		}
		.critical {
			height: 300px;
			border: 1px solid #3fa9f5;
			height: 200px;
			margin: 0 30px;
			.tit {
				font-size: 30px;
				color: red;
				padding: 0 20px;
				font-weight: bold;
			}
		}
		.txtMarquee-top {
			overflow: hidden;
			position: relative;
			height: calc(~'100% - 400px');
			.bd {
				font-size: 28px;
				color: #fff;
			}
		}
	}
}
</style>
