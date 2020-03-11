<template>
  <div id="MainScreen">
    <canvas id="star" />
    <header>
      <nav>
        <BottonScreen>科室管理</BottonScreen>
        <BottonScreen>科室质控</BottonScreen>
        <BottonScreen>院前急救</BottonScreen>
        <BottonScreen>物质管理</BottonScreen>
      </nav>
      <h1>胸科医院急诊大数据平台</h1>
      <nav>
        <BottonScreen>院外协同</BottonScreen>
        <BottonScreen>远程抢救</BottonScreen>
        <BottonScreen>医护资源</BottonScreen>
        <BottonScreen>病人信息</BottonScreen>
      </nav>
    </header>
    <section>
      <div class="s-cloumn">
        <div class="s-row">
          <MainScreenBox title="急诊人次统计">
            <PeopleChart lable="今日" :value="toDayVisitNo.number" :maxValue="toDayVisitNo.toolNumber" color="rgba(91,184,247,1)"></PeopleChart>
            <PeopleChart lable="本周" :value="754" :maxValue="1000" color="#e3ff0e"></PeopleChart>
            <PeopleChart lable="本月" :value="3054" :maxValue="4000" color="rgba(88,255,195,1)"></PeopleChart>
          </MainScreenBox>
        </div>
        <div class="s-row">
          <MainScreenBox title="急诊各级患者比例">
            <EChart :option="option"/>
          </MainScreenBox>
        </div>
        <div class="s-row">
          <MainScreenBox title="急诊PCI手术量">
            <EChart :option="option1"/>
          </MainScreenBox>
        </div>
      </div>
      <div class="s-cloumn s-cloumn-max">
        <div class="s-row s-row-max">
          <MainScreenBox title="设备实时监控" >
            <center>
              <embed class= "hospital" src="\img\hospital.svg" width="80%"/>
            </center>
          </MainScreenBox>
        </div>
        <div class="s-row">
          <MainScreenBox title="急诊统计分析">
            <div class="s-cloumn s-cloumn-max">
              <EChart :option="option5"/>
            </div>
            <div class="s-cloumn s-cloumn-max">
              <div class="analysis">
                 <BottonScreenup><center>总收入<br><span>100</span></center></BottonScreenup>
                 <BottonScreenup><center>去年同期收入<br><span>100</span></center></BottonScreenup>
                 <BottonScreenup><center>完成情况<br><span>100</span></center></BottonScreenup>
              </div>
              <div  class="analysis">
               <EChart :option="option6"/>
              </div>
            </div>
          </MainScreenBox>
        </div>
      </div>
      <div class="s-cloumn">
        <div class="s-row">
          <MainScreenBox title="患者总数">
            <EChart :option="option3"/>
          </MainScreenBox>
        </div>
        <div class="s-row">
          <MainScreenBox title="科室支出情况">
            <EChart :option="option4"/>
          </MainScreenBox>
        </div>
        <div class="s-row">
          <MainScreenBox title="投诉情况">
            <Tagclound/>
          </MainScreenBox>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainScreenBox from '@/components/bigScreen/MainScreenBox.vue';
import BottonScreen from '@/components/bigScreen/BottonScreen.vue';
import BottonScreenup from '@/components/bigScreen/BottonScreenup.vue';
import PeopleChart from '@/components/charts/PeopleChart.vue';
import EChart from '@/components/charts/EChart.vue';
import Tagclound from '@/components/charts/Tagcloud.vue';

const color = ['red', 'red', 'orange', 'green', '#cfffa4'];
@Component({
  components: { MainScreenBox, PeopleChart, EChart, Tagclound, BottonScreen, BottonScreenup }
})
export default class MainScreen extends Vue {
  public option = {
    calculable: true,
    series: [
      {
        color,
        name: '面积模式',
        type: 'pie',
        radius: [5, 60],
        center: ['50%', '45%'],
        roseType: 'area',
        data: [
          { value: 10, name: '一级患者' },
          { value: 5, name: '二级患者' },
          { value: 15, name: '三级患者' },
          { value: 25, name: '四级患者' }
        ]
      }
    ]
  };
  public option1 = {
    color,
    grid: {
      left: '5px',
      right: '35px',
      top: '0',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: '#fff'
        }
      },
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: ['今天', '昨天', '5月31日', '5月30日', '5月29日', '5月28日'],
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: '#fff'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }

    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        name: '2011年',
        type: 'bar',
        data: [10, 6, 2, 4  , 9, 5]
      }
    ]
  };
  public option3 = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '10%',
      bottom: '30%',
      top: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#fff'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#fff'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      }
    ],
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        name: '患者总数',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220, 100, 234, 360, 330, 120],
        itemStyle: {
          normal: {
            color: {              'x': 0, 'y': 0, 'x2': 0, 'y2': 1, 'type': 'linear', 'global': false,
              'colorStops': [
                { 'offset': 0, 'color': '#e85e5a' },
                { 'offset': 0.5, 'color': '#58ffc3' },
                { 'offset': 1, 'color': '#5bb8f7' }]            }
          },
          emphasis: {
            color: {              'x': 0, 'y': 0, 'x2': 0, 'y2': 1, 'type': 'linear', 'global': false,
              'colorStops': [
                { 'offset': 0, 'color': '#5bb8f7' },
                { 'offset': 0.5, 'color': '#58ffc3' },
                { 'offset': 1, 'color': '#e85e5a' }]            }
          }
        }
      }
    ]
  };
  public option4 = {
    grid: {
      left: '3%',
      right: '10%',
      bottom: '30%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: '#fff'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
        textStyle: {
          color: '#fff'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      color: '#5bb8f7',
      areaStyle: {
        normal: {
          color: {            'x': 0, 'y': 0, 'x2': 0, 'y2': 1, 'type': 'linear', 'global': false,
            'colorStops': [
              { 'offset': 0, 'color': '#5bb8f7' },
              { 'offset': 1, 'color': 'rgba(0,0,0,0)' }]          }
        }
      }
    },
    {
      data: [720, 232, 401, 534, 1090, 1530, 920],
      type: 'line',
      color: '#58ffc3',
      areaStyle: {
        normal: {
          color: {            'x': 0, 'y': 0, 'x2': 0, 'y2': 1, 'type': 'linear', 'global': false,
            'colorStops': [
              { 'offset': 0, 'color': '#58ffc3' },
              { 'offset': 1, 'color': 'rgba(0,0,0,0)' }]          }
        }
      }
   }]
  };
  public option5 = {
    color,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 0,
      y: 'center',
      color: '#fff',
      data: ['抢救患者死亡率', '急诊科护患比', '急诊科医患比', 'ROSC成功率', '非计划重返抢救室率'],
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '12',

            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: '抢救患者死亡率' },
          { value: 310, name: '急诊科护患比' },
          { value: 234, name: '急诊科医患比' },
          { value: 135, name: 'ROSC成功率' },
          { value: 1548, name: '非计划重返抢救室率' }
        ]
      }
    ]
  };
  public option6 = {
    tooltip: {
      show: false
    },
    color: ['#5bb8f7', 'rgba(0,0,0,0)'],
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['67%', '70%'],
        center: ['15%', '50%'],
        avoidLabelOverlap: false,
        startAngle: 225,
        label: {
          normal: {
            position: 'center',
            show: true,
            textStyle: {
              fontSize: '12',
              fontWeight: 'bold'
            },
            formatter: '{c}'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: '直接访问' },
          { value: 60, name: '邮件营销' },
        ]
      },
      {
        name: '访问来源',
        type: 'pie',
        radius: ['67%', '70%'],
        center: ['33%', '50%'],
        avoidLabelOverlap: false,
        startAngle: 225,
        label: {
          normal: {
            position: 'center',
            show: true,
            textStyle: {
              fontSize: '12',
              fontWeight: 'bold'
            },
            formatter: '{c}'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: '直接' },
          { value: 60, name: '邮件营销' },
        ]
      },
      {
        name: '访问来源',
        type: 'pie',
        radius: ['67%', '70%'],
        center: ['65%', '50%'],
        avoidLabelOverlap: false,
        startAngle: 225,
        label: {
          normal: {
            position: 'center',
            show: true,
            textStyle: {
              fontSize: '12',
              fontWeight: 'bold'
            },
            formatter: '{b}\n{c}'
          }
        },
      itemstyle: {
        color: '#f3ce0e'
      },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: '直接访问' },
          { value: 60, name: '邮件营销' },
        ]
      },
      {
        name: '访问来源',
        type: 'pie',
        radius: ['67%', '70%'],
        center: ['83%', '50%'],
        avoidLabelOverlap: false,
        startAngle: 225,
        label: {
          normal: {
            position: 'center',
            show: true,
            textStyle: {
              fontSize: '12',
              fontWeight: 'bold'
            },
            formatter: '{c}'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: '直接访问' },
          { value: 60, name: '邮件营销' },
        ]
      }
    ]
  };
  private toDayVisitNo: Screen.VisitNumber = {
    number: 0,
    toolNumber: 0
  };
  public mounted() {
    $.getScript('/js/star.js');
  }
   private getData() {
     this.$webSocket((stompClient: StompClient) => {
        stompClient.subscribe('/toAll/bedList', ({body}: any) => {
          const data = JSON.parse(body);
          });
        });
  }
}
</script>

<style lang="less" scoped>
#MainScreen {
  position: relative;
  height: 100%;
  background-size: cover;
  background: #17293a;
  #star {
    position: absolute;
  }
  header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    position: relative;
  }
  nav,
  h1 {
    display: inline-block;
    width: 33.3%;
    text-align: center;
  }
  nav {
    > div {
      padding: 8px 10px;
      margin: 0 10px;
    }
  }
  h1 {
    font-size: 30px;
    margin: 15px 0;
    color: #3398db;
  }
  section {
    height: calc(100% - 90px);
    padding: 5px;
    overflow: hidden;
    .s-cloumn {
      width: 24.8%;
      float: left;
      height: 100%;
      .BottonScreenup{
        margin-right: 16px;
        &:last-child{
          margin-right: 0px;
        }
      }
      center{
        line-height: 1.5;
        span{color:dodgerblue;}
      }
      .analysis{
        padding-left:10px;
      }
      &.s-cloumn-max {
        width: 50%;
      }
    }
    .s-row {
      height: 33.3%;
      position: relative;
      &.s-row-max {
        .hosptial{
          position: absolute;
          text-align: center;
          width: 100%;
        }
        height: 67.3%;
      }
      h2 {
        position: absolute;
        width: 100%;
        text-align: center;
        margin: 0;
        padding: 5px;
        color: #fff;
      }
    }
  }
}
#botton {
  display: inline-block;
  height: 19px;
  top: -2px;
  padding: 10px 20px;
  position: relative;
  &:hover{
    cursor: pointer;
    color: #ecb056;
    .box-left-top,
    .box-left-bottom,
    .box-right-top,
    .box-right-bottom {
      color: #ecb056;
    }
  }
  .box-left-top,
  .box-left-bottom,
  .box-right-top,
  .box-right-bottom {
    position: absolute;
    width: 5px;
    height: 5px;
    color: #ccc;
  }
  .box-left-top {
    left: 0px;
    top: 0px;
    border-left: 1px solid;
    border-top: 1px solid;
  }
  .box-left-bottom {
    left: 0px;
    bottom: 0px;
    border-left: 1px solid ;
    border-bottom: 1px solid ;
  }
  .box-right-top {
    right: 0px;
    top: 0px;
    border-right: 1px solid;
    border-top: 1px solid;
  }
  .box-right-bottom {
    right: 0px;
    bottom: 0px;
    border-right: 1px solid;
    border-bottom: 1px solid;
  }
}
</style>
