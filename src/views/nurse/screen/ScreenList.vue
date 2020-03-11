<template>
  <div class="ScreenList">
    <el-row :gutter="40">
      <el-col :span="4" v-for="(o, i) in tableData" :key="i">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="o.img" class="image">
          <div style="padding: 14px;">
            <i :class="o.icon"></i>
            <b class="title">天津市胸科医院{{o.title}}</b>
          </div>
          <button class="bedTool" onClick="return false;">
            <el-button type="primary" icon="el-icon-search" circle @click="onLink(o.url)"></el-button>
          </button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class ScreenList extends Vue {
  private tableData: Screen.ScreenCard[] = [{
    img: `${common.config.root}img/daping.jpg`,
    title: '急诊大数据平台',
    url: `${common.config.root}bigScreen/mainScreen`,
    icon: 'el-icon-pie-chart'
  }, {
    img: `${common.config.root}img/daping.jpg`,
    title: '抢救患者统计平台',
    url: `${common.config.root}bigScreen/mainScreen2`,
    icon: 'el-icon-data-line'
  }, {
    img: `${common.config.root}img/daping.jpg`,
    title: '急诊台等待就诊大屏',
    url: `${common.config.root}screen`,
    icon: 'el-icon-data-line'
  }, {
    img: `${common.config.root}img/daping.jpg`,
    title: '急诊台正在就诊大屏',
    url: `${common.config.root}screencalled`,
    icon: 'el-icon-data-line'
  }];
  private onLink(url: string) {
    window.open(url);
  }
}
</script>
<style lang="less" scoped>
.ScreenList {
	.el-row {
		padding: 40px 40px 0 40px;
		.el-col {
			padding-bottom: 40px;
		}
		.el-card {
			cursor: pointer;
			position: relative;
			&:hover {
				.bedTool {
					display: block;
				}
			}
			i {
				font-size: 17px;
				color: #6b6b6b;
			}
			.title {
				position: absolute;
				right: 10px;
				font-size: 14px;
			}
			.bedTool {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				background: rgba(0, 0, 0, 0.2);
				display: none;
				border: none;
				outline: none;
			}
			.time {
				font-size: 13px;
				color: #999;
			}

			.bottom {
				margin-top: 13px;
				line-height: 12px;
			}

			.button {
				padding: 0;
				float: right;
			}

			.image {
				width: 100%;
				display: block;
				max-height: 200px;
			}

			.clearfix:before,
			.clearfix:after {
				display: table;
				content: '';
			}

			.clearfix:after {
				clear: both;
			}
		}
	}
}
</style>
