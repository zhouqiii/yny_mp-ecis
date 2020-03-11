<template>
  <div class="Screen">
    <canvas id="star" />
    <header>
      <div class="logo">天津市胸科医院</div>
      <div class="title">
        <div>耗材统计</div>
      </div>
      <div class="time">{{nowTime}}</div>
    </header>
    <section>
      <img
        class="border-img border-left1"
        src="/img/screen_biankuang.svg"
      />
      <img
        class="border-img border-right1"
        src="/img/screen_biankuang.svg"
      />
      <img
        class="border-img border-left2"
        src="/img/screen_biankuang.svg"
      />
      <img
        class="border-img border-right2"
        src="/img/screen_biankuang.svg"
      />
      <div class="room">
        <img src="/img/screen-keji.svg" />
        <div class="title">总控制台</div>
      </div>
      <div class="leftPart">
        <div class="firstPart">
          <div>
            <i class="el-icon-caret-right"/>
            <span>耗材收入占比</span><br/>
            <span class="enClass">HAO CAI SHOU RU ZHAN BI</span>
          </div>
          <div id="consuablePercent">
              今日
          </div>
        </div>      
        <div class="secendPart">
          <div>
            <i class="el-icon-caret-right"/>
            <span>耗材收入统计</span><br/>
            <span class="enClass">HAO CAI SHOU RU TONG JI</span>
          </div>
          <div class="consuableIncome">
            
          </div>
        </div>
      </div>
      <div class="rightPart">
        <div class="thirdPart">
          <div>
            <i class="el-icon-caret-right"/>
            <span>耗材分类统计</span><br/>
            <span class="enClass">HAO CAI FEN LEI TONG JI</span>
          </div>
          <div class="consuableNum">
            
          </div>
        </div>
        <div class="fourthPart">
          <div>
            <i class="el-icon-caret-right"/>
            <span>耗材使用数量</span><br/>
            <span class="enClass">HAO CAI SHI YONG SHU LIANG</span>
          </div>
          <div class="consuableNum">
            <ul>
              <li>
                <div>
                  <div style="float:left;width:250px;">
                    <div>一次性无菌注射器(带针)</div>
                    <div class="percentNum">100%</div>
                  </div>
                  <div style="float:left;width:40px;font-size:20px;"></div>
                </div>                
                <hr style="width:300px;border-color:red;float:left">
                
              </li>
            </ul>
          </div>
        </div>  
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
  public ifShow = true;
  public mounted() {
    $.getScript('/js/echarts.common.min.js', (d: any) => {
      const dom = document.getElementById('consuablePercent');
      const myChart = echarts.init(dom);
      // var app = {};
      let option = null;
      // d
      // app.title = '环形图';
      const data = [{value: 0.6, name: 335, itemStyle: {}},
                ];
      let a = 0;
      data.forEach((item) => a += item.value);
      data.push({value: a, name: 1, itemStyle: {normal: {color: 'rgba(0,0,0,0)'}}});

      option = {
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
              {
                  name: '访问来源',
                  type: 'pie',
                  startAngle: 180,
                  radius: ['65%', '70%'],
                  center: ['30%', '60%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: true,
                          position: 'center',
                          textStyle: {
                              fontSize: '30',
                              fontWeight: 'bold'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data
              },
              {
                  name: '访问',
                  type: 'pie',
                  startAngle: 180,
                  radius: ['65%', '70%'],
                  center: ['80%', '60%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: true,
                          position: 'center',
                          textStyle: {
                              fontSize: '30',
                              fontWeight: 'bold'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data
              }
          ]
      };
      if (option && typeof option === 'object') {
        myChart.setOption(option, true);
      }
    });
    // this.$store.dispatch('GetDoctors').then(({data}) => this.sendMessage(data.data));
    // 动画
    $.getScript('/js/star.js');
    $(window).resize(() => {
      this.consultationHeight = window.innerHeight / 2 - 100;
    });
    setInterval(() => this.nowTime = new Date().format('yyyy-MM-dd hh:mm:ss'), 1000);
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
  .enClass{
    font-size: 10px;
    color: #a7a0a073;
    margin-left: 5px;
  }
  .leftPart{
    width: 48%;
    height:100%;
    float:left;
    color:#fff;
    margin: 5px;    
    .firstPart{
      height:40%;
      width: 100%;
      float:left;
      margin-top: 15px;
      margin-left: 10px;
      border:1px solid #117ab5;
      margin-right: 20px;
    }
    .secendPart{
      height:50%;
      width: 100%;
      float:left;
      margin-left: 10px;  
      margin-top:5px;    
      border:1px solid #117ab5;
    }
  }
  .rightPart{
    width: 48%;
    height:100%;
    float:left;
    color:#fff;   
    margin: 5px; 
    .thirdPart{
      height:60%;
      width: 100%;
      float:left;
      margin-top: 15px;
      margin-left:20px;
      border:1px solid #117ab5;
    }
    .fourthPart{
      height:30%;
      width: 100%;
      float:left;
      margin-left:20px;
      margin-top:5px;
      border:1px solid #117ab5;
      .percentNum{
        font-size: 10px;
        color: #00BCD4;
      }
    }
  }
  .calledPatient{
    margin-top: 50px;
    .leftClass{
      font-size: 40px;
      color: #fff;
      margin-top: 10px;
      text-align: right;
      padding-right: 20px;
      line-height: 56px;
    }
    .rightClass{
      font-size: 40px;
      color: #fff;
      margin-top: 10px;
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
      width: calc(~"100% - 400px");
      > div {
        width: 40%;
        margin: auto;
        background: #117ab5;
        color: #fff;
        border-radius: 0 0 20px 20px;
        font-size: 27px;
      }
    }
    .time {
      width: 192px;
      margin-left: 27px;
    }
    .logo {
      margin-left: 10px;
      font-size: 27px;
    }
  }
  section {
    height: calc(~"100% - 80px");
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
      transform: scale(-1,-1);
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
      >div{
        height: 100%;
      }
      .boxLeft{
        border-right:1px solid #3fa9f5;
        &:last-child{
          border-right: none;
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
    ul{
      list-style: none;
      // margin: 20px 0;
      padding: 0;
    }
    .titleH{
      font-size: 30px;
      color: #3fa9f5;
      font-weight: bold;
    }
    .infoList{
      text-align: center;
    }
    .critical {
      height: 300px;
      border: 1px solid #3fa9f5;
      height: 200px;
      margin: 0 30px;
      .tit{
        font-size: 30px;
        color: red;
        padding: 0 20px;
        font-weight: bold;
      }
    }
    .txtMarquee-top {
      overflow:hidden; 
      position:relative;
      height: calc(~"100% - 400px");
      .bd{
        font-size: 28px;
        color: #fff;
      }
    }
    .criticalBox{
      text-align: center;
      font-size: 20px;
      color: red;
    }
    .level1{
      color: #f7931e;
    }
    .level2{
      color: green;
    }
  }
}
</style>
