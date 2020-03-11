<template>
  <div id="EmergencyCall">
    <div class="EmergencyCallBox" :style="mainScreenStyle">
      <screen-header :title="title"></screen-header>
      <div class="context">
        <el-container>
          <div class="containerBox left">
            <emergency-call-table number="5"></emergency-call-table>
            <table>
              <thead>
                <tr>
                  <th>姓名</th>
                  <th>就诊级别</th>
                  <th>状态</th>
                  <th>诊室</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>姓名</td>
                  <td>就诊级别</td>
                  <td>状态</td>
                  <td>诊室</td>
                </tr>
                <tr>
                  <td>姓名</td>
                  <td>就诊级别</td>
                  <td>状态</td>
                  <td>诊室</td>
                </tr>
                <tr>
                  <td>姓名</td>
                  <td>就诊级别</td>
                  <td>状态</td>
                  <td>诊室</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="containerBox right">
            <div class="current">
              <div class="h1">当前叫号</div>
              <div class="name">李*刚</div>
            </div>
            <div class="currentConsulting">
              <div class="h1">诊室</div>
              <div class="consultingName">呼吸与危重症科</div>
            </div>
          </div>
        </el-container>
        <footer>
          <div>急诊按病情等级顺序就诊，未叫到号的患者请在大厅耐心等候，请保持大厅安静，请勿大声喧哗</div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class EmergencyCall extends Vue {
  private mainScreenStyle = {
    transform: ''
  };
  private title = '天津市胸科医院急诊叫号系统';
  private onresize() {
    this.mainScreenStyle.transform = `scale(${window.innerWidth / 1920}, ${window.innerHeight / 1080})`;
  }
  private mounted() {
    $(window).resize(this.onresize).resize();
  }
}
</script>
<style lang="less" scoped>
#EmergencyCall {
	.EmergencyCallBox {
		width: 1920px;
		height: 1080px;
		// background-color: rgba(13, 42, 67, 0);
		transform: scale(1.33333, 0.918519);
		transform-origin: left top;
		color: #000;
		.context {
			height: calc(100% - 127px);
			border-radius: 30px;
			margin-top: 10px;
			background: #0075C4;
			.el-container {
				padding: 25px 58px;
				height: calc(100% - 130px);
				.containerBox {
					display: inline-block;
					&.left {
						width: 1197px;
						margin-right: 22px;
						table {
							width: 1195px;
							border-collapse: collapse;
							&:first-child {
								th {
									&:first-child {
										border-radius: 30px 0 0 0;
									}
									&:last-child {
										border-radius: 0 30px 0 0;
									}
								}
							}
							&:last-child {
								tr:last-child {
									td {
										&:first-child {
											border-radius: 0 0 0 30px;
										}
										&:last-child {
											border-radius: 0 0 30px 0;
										}
									}
								}
							}
							th {
								height: 41px;
								font-size: 39px;
								background: linear-gradient(top, #6d7778, #0e0f14);
								color: #fff;
								&:first-child {
									width: 225px;
								}
								&:nth-child(2) {
									width: 346px;
								}
								&:nth-child(3) {
									width: 257px;
								}
							}
							th,
							td {
								padding: 7px 0 18px 0;
								text-align: center;
							}
							td {
								font-weight: bold;
								font-size: 39px;
								font-weight: bold;
								font-size: 47px;
								padding: 6px 0 6px 0;
							}
							tbody {
								tr:nth-child(odd) {
									td {
										background: #134197;
									}
								}
								tr:nth-child(even) {
									td {
										background: #133f8a;
									}
								}
								tr {
									td {
										border-top: 2px solid #042271;
									}
								}
							}
						}
					}
					&.right {
						width: 587px;
						text-align: center;
						.h1 {
							color: #fff;
						}
						.current {
							line-height: 2.3;
							.h1 {
								background: linear-gradient(top, #6d7778, #0e0f14);
								font-size: 35px;
								padding: 0 0px;
								margin: 0;
								border-radius: 30px 30px 0 0;
							}
							.name {
								font-size: 106px;
								font-weight: bold;
								background: #12387f;
								border-radius: 0 0 30px 30px;
								color: #e7f74d;
							}
						}
						.currentConsulting {
							background: #12387f;
							border-radius: 30px;
							margin-top: 6px;
							height: 444px;
							font-weight: bold;
							.h1 {
								font-size: 49px;
								line-height: 2.8;
							}
							.consultingName {
								font-size: 100px;
								color: #e7f74d;
							}
						}
					}
				}
			}
			footer {
				padding: 0 78px;
				height: 103px;
				text-align: center;
				font-size: 39px;
				font-weight: bold;
        line-height: 2.7;
        color: #fff;
        >div{
          background:linear-gradient(#70C6F7,#1293DC,#27A9EA);
          border-radius: 200px;
        }
			}
		}
	}
}
</style>
