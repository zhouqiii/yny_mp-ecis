<template>
  <div id="MainScreen">
    <div class="MainScreenBox" :style="mainScreenStyle">
      <div class="back"></div>
      <div class="mainBox">
        <div class="row">
          <div class="col1"></div>
          <div class="col2">
            <h1>全院患者总数</h1>
            <div>
              <span>286</span>
              <span>人</span>
            </div>
            <h1>抢救室滞留时间中位数</h1>
            <div>
              <span>1326</span>
              <span>人</span>
            </div>
          </div>
          <div class="col3">
            <h1>急诊各级患者比例</h1>
            <el-form>
              <el-form-item label="4级患者">
                <el-progress :text-inside="true" :stroke-width="10" :percentage="70" :show-text="false"></el-progress>
              </el-form-item>
              <el-form-item label="3级患者">
                <el-progress :text-inside="true" :stroke-width="10" :percentage="70" :show-text="false"></el-progress>
              </el-form-item>
              <el-form-item label="2级患者">
                <el-progress :text-inside="true" :stroke-width="10" :percentage="70" :show-text="false"></el-progress>
              </el-form-item>
              <el-form-item label="1级患者">
                <el-progress :text-inside="true" :stroke-width="10" :percentage="70" :show-text="false"></el-progress>
              </el-form-item>
            </el-form>
          </div>
          <div class="col4">
            <div>
              <div class="echart-box">
                <RingEchart :val="80" :color="ziColor" />
              </div>
              <div class="yihuanbi">
                <h1>急诊科医患比</h1>
                <div>80%</div>
              </div>
              <div class="info">
                <ul>
                  <li>急诊科固定在岗（本院）医师总数</li>
                  <li>37</li>
                </ul>
                <ul>
                  <li>同期急诊科接诊患者总数（万人次）</li>
                  <li>267</li>
                </ul>
              </div>
            </div>
            <div>
              <div class="echart-box">
                <RingEchart :val="80" :color="huangColor" />
              </div>
              <div class="yihuanbi">
                <h1>急诊科医患比</h1>
                <div>80%</div>
              </div>
              <div class="info">
                <ul>
                  <li>急诊科固定在岗（本院）医师总数</li>
                  <li>37</li>
                </ul>
                <ul>
                  <li>同期急诊科接诊患者总数（万人次）</li>
                  <li>267</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col5">
            <h1>患者死亡情况</h1>
            <table>
              <tr>
                <td>
                  <div>今日死亡</div>
                  <div>
                    <div>0</div>
                    <div>
                      <i class="el-icon-bottom"></i>
                    </div>
                  </div>
                </td>
                <td>
                  <div>本周死亡</div>
                  <div>
                    <div>0</div>
                    <div>
                      <i class="el-icon-bottom"></i>
                    </div>
                  </div>
                </td>
                <td>
                  <div>上周死亡</div>
                  <div>
                    <div>0</div>
                    <div>
                      <i class="el-icon-bottom"></i>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>本月死亡</div>
                  <div>
                    <div>0</div>
                    <div>
                      <i class="el-icon-bottom"></i>
                    </div>
                  </div>
                </td>
                <td>
                  <div>上月死亡</div>
                  <div>
                    <div>0</div>
                    <div>
                      <i class="el-icon-bottom"></i>
                    </div>
                  </div>
                </td>
                <td>
                  <div>本年死亡</div>
                  <div>
                    <div>0</div>
                    <div>
                      <i class="el-icon-bottom"></i>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="row">
          <MainScreenDialog title="急性心肌梗死（STEMI）">
            <MainScreenRingEchart :color="ziColor" :data="mainScreenRingEchartData" />
            <MainScreenRingEchart :color="huangColor" :data="timeRingEchartData" />
          </MainScreenDialog>
          <MainScreenDialog title="ROSC成功率" paddingLeft="25px">
            <MainScreenRingEchart styleType="b" :color="ziColor" :data="roscRingEchartData" />
          </MainScreenDialog>
          <MainScreenDialog title="病人住院科室去向统计" paddingLeft="25px">
            <MainScreenBarEchart :data="barEchartData" />
          </MainScreenDialog>
        </div>
        <div class="row">
          <MainScreenDialog title="患者死亡率">
            <MainScreenRingEchart :color="ziColor" :data="timeRingEchartData" />
            <MainScreenRingEchart :color="huangColor" :data="timeRingEchartData" />
          </MainScreenDialog>
          <MainScreenDialog title="非计划重返抢救室率" paddingLeft="25px">
            <MainScreenRingEchart styleType="b" :color="ziColor" :data="roscRingEchartData" />
          </MainScreenDialog>
          <MainScreenDialog title="急诊人数统计（单位：人次）" paddingLeft="25px">
            <MainScreenLineEchart :data="lineEchartData"/>
          </MainScreenDialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RingEchart from '@/components/charts/RingEchart.vue';
import MainScreenDialog from '@/components/bigScreen/MainScreenDialog.vue';
import MainScreenRingEchart from '@/components/bigScreen/MainScreenRingEchart.vue';
import MainScreenBarEchart from '@/components/bigScreen/MainScreenBarEchart.vue';
import MainScreenLineEchart from '@/components/bigScreen/MainScreenLineEchart.vue';

@Component({  components: {
    RingEchart, MainScreenDialog, MainScreenRingEchart, MainScreenBarEchart, MainScreenLineEchart  }})
export default class MainScreen extends Vue {
  private mainScreenStyle = {
    transform: ''
  };
  private ziColor = ['#CF96FF', '#7670FF'];
  private huangColor = ['#F8B28A', '#F97A83'];
  private mainScreenRingEchartData: Screen.ScreenData = {
    chart: {
      label: 'STEMI'
    },
    table: [
      {
        label: '急诊PCI',
        value: 45
      },
      {
        label: '溶栓',
        value: 99
      },
      {
        label: '药物保守',
        value: 99
      }
    ]
  };
  private timeRingEchartData: Screen.ScreenData = {
    chart: {
      label: 'NST-ACS'
    },
    table: [
      {
        label: '急诊早期PCI',
        value: 37
      },
      {
        label: '24小时PCI',
        value: 267
      },
      {
        label: '72小时PCI',
        value: 267
      }
    ]
  };
  private roscRingEchartData: Screen.ScreenData = {
    chart: {
      label: 'ROSC成功率'
    },
    table: [
      {
        label: 'ROSC成功总例次数',
        value: 45
      },
      {
        label: '同期急诊呼吸心脏骤停患者行心肺复苏术总例次数',
        value: 99
      }
    ]
  };
  private barEchartData = {    table: [
      { label: '心内科', value: 18 },
      { label: '呼吸与危重症医学科', value: 45 },
      { label: '心外科', value: 20 },
      { label: '胸外科', value: 32 },
      { label: '内分泌科', value: 42 }
    ]
  };
  private lineEchartData = {    table: [
      { label: '心内科', value: 18 },
      { label: '呼吸与危重症医学科', value: 45 },
      { label: '心外科', value: 20 },
      { label: '胸外科', value: 32 },
      { label: '内分泌科', value: 42 }
    ]
  };
  private onresize() {
    this.mainScreenStyle.transform = `scale(${window.innerWidth / 1920}, ${window.innerHeight / 1080})`;
  }
  private mounted() {
    $(window).resize(this.onresize).resize();
  }
}
</script>

<style lang="less">
@item1Color: #008000;
@item2Color: #f19149;
@item3Color: #ff0000;
@zi1Color: #cf96ff;
@zi2Color: #7670ff;
@huang1Color: #f8b28a;
@huang2Color: #f97a83;
@huiColor: #dfdde0;
#MainScreen {
  .MainScreenBox{
    width: 1920px;
    height: 1080px;
    background-color: rgba(13, 42, 67, 0);
    transform: scale(1.33333, 0.918519);
    transform-origin: left top;
    color: #000;
  }
	.back {
		background: url('/img/daping.jpg') no-repeat;
		// background: url('/img/审查端-设计_画板 1.png') no-repeat;
		background-size: 100% 100%;
		width: 1920px;
		height: 1080px;
		filter: blur(20px);
		position: absolute;
		z-index: -1;
	}
	.mainBox {
		background-color: rgba(255, 255, 255, 0.8);
		width: 95%;
		height: 80%;
		z-index: 1;
		padding: 170px 60px;
		font-family: sans-serif;
		.row {
			position: relative;
			top: 75px;
			&:first-child {
				top: -2px;
				height: 139px;
				> div {
					position: absolute;
				}
				h1 {
					font-size: 16px;
					margin: 0;
				}
				.col1 {
					background: url(/img/logoScreen.svg) no-repeat;
					background-size: 87%;
					width: 107px;
					height: 128px;
					top: 2px;
					left: 4px;
				}
				.col2 {
					left: 150px;
					> div {
						line-height: 1.2;
						font-weight: bold;
						letter-spacing: 10px;
						padding-bottom: 14px;
						span {
							font-size: 16px;
							&:first-child {
								font-size: 43px;
								text-shadow: 2px 4px 8px #555;
							}
						}
					}
				}
				.col3 {
					width: 300px;
					left: 409px;
					.el-form {
						position: relative;
						top: 24px;
						.el-form-item {
							margin: 0;
							&:first-child {
								.el-form-item__label {
									color: @item1Color;
								}
								.el-progress-bar__inner {
									background: @item1Color;
								}
							}
							&:nth-child(2) {
								.el-form-item__label {
									color: @item2Color;
								}
								.el-progress-bar__inner {
									background: @item2Color;
								}
							}
							&:nth-child(3) {
								.el-form-item__label {
									color: @item3Color;
								}
								.el-progress-bar__inner {
									background: @item3Color;
								}
							}
							&:last-child {
								.el-form-item__label {
									color: @item3Color;
								}
								.el-progress-bar__inner {
									background: @item3Color;
								}
							}
							.el-form-item__label {
								line-height: 26px;
							}
							.el-progress {
								position: relative;
								top: 10px;
							}
						}
					}
				}
				.col4 {
					left: 774px;
					top: -5px;
					width: 490px;
					height: 198px;
					> div {
						position: relative;
						padding-bottom: 10px;
						&:first-child {
							.yihuanbi {
								color: @zi2Color;
							}
						}
						&:last-child {
							.yihuanbi {
								color: @huang2Color;
							}
						}
					}
					.echart-box {
						width: 96px;
						display: inline-block;
						height: 79px;
					}
					.yihuanbi {
						position: absolute;
						left: 95px;
						top: 4px;
						h1 {
							font-size: 15px;
						}
						> div {
							font-size: 42px;
							font-weight: bold;
						}
					}
					.info {
						top: -22px;
						display: inline-block;
						position: relative;
						left: 110px;
						ul {
							list-style: none;
							margin: 8px 0;
							padding: 0;
							background: @huiColor;
							border-radius: 25px;
							padding: 5px 0;
							li {
								display: inline-block;
								&:first-child {
									padding-left: 10px;
									width: 226px;
								}
								&:last-child {
									width: 48px;
									text-align: center;
									font-weight: bold;
								}
							}
						}
					}
				}
				.col5 {
					left: 1309px;
					table {
						width: 493px;
						text-align: center;
						margin-top: 24px;
						border-collapse: collapse;
						border-spacing: 0;
						tr {
							td {
								border-right: 1px solid #ccc;
								&:last-child {
									border-right: none;
								}
								> div {
									margin-bottom: 5px;
									> div {
										display: inline-block;
										&:last-child {
											margin-left: 24px;
										}
									}
								}
							}
							&:first-child {
								border-bottom: 1px solid #ccc;
								td {
									> div:last-child {
										color: @zi2Color;
									}
								}
							}
							&:last-child {
								td {
									> div {
										margin-top: 5px;
										&:last-child {
											color: @huang2Color;
										}
									}
								}
							}
						}
					}
				}
			}
			&:last-child {
				top: 113px;
			}
			.MainScreenDialog {
				width: 348px;
				display: inline-block;
				margin-left: 33px;
				vertical-align: top;
				background: #fff;
				&:first-child {
					width: 871px;
					margin-left: 0;
				}
				&:last-child {
					width: 515px;
				}
				.MainScreenRingEchart:nth-child(2) {
					margin-left: 87px;
				}
				.MainScreenBarEchart {
					height: 192px;
				}
			}
		}
	}
}
</style>
