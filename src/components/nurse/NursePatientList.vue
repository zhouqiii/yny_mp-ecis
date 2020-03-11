<template>
  <div class="NursePatientList">
    <div class="menu-left">
      <div @click="searchPatientList(0)" :class="tab[0]">一二级</div>
      <div @click="searchPatientList(1)" :class="tab[1]">三四级</div>
      <div @click="searchPatientList(2)" :class="tab[2]">已完成</div>
      <div @click="searchPatientList(3)" :class="tab[3]">全部</div>
    </div>
    <div class="menu-right">
      <div class="search">
        <span class="search-title">当前就诊数：{{patientListVo.length}} 人</span>
        <i class="el-icon-refresh" @click="searchPatient" />
        <i class="localIcon" :class="iconFlag ? 'el-icon-caret-top' : 'el-icon-caret-bottom'" @click="changeIcon()" />
      </div>
      <div class="search2" v-if="!searchDiv">
        <yn-date-time-pick v-model="startDate" type="date" placeholder="查询开始日期"></yn-date-time-pick>
        <yn-date-time-pick v-model="endDate" type="date" placeholder="查询结束日期"></yn-date-time-pick>
        <el-input class="searchInput" v-model="searchVal" placeholder="病人姓名/病人床号"></el-input>
        <el-tooltip class="item" effect="dark" content="搜索" placement="bottom-start">
          <el-button type="success" icon="el-icon-search" circle size="mini" @click="searchPatient" />
        </el-tooltip>
      </div>
      <el-scrollbar :style="{height:listHeight}">
        <ul class="patient-list">
          <li v-for="(patient, index) in patientListVo" :key="index" :class="`color${patient.severityLevelSys}`" @click="getPatient(patient,index)">
            <div>
              <span class="patient-list-span-1">{{patient.name}}</span>
              <span class="patient-list-span-2">{{patient.severityLevelSys}}级</span>
              <i class="selected el-icon-circle-check" v-if="selected===index" />
            </div>
            <div>
              <span v-for="(item,i) in visitStatus" :key="i">
                <span class="patient-list-span-3" v-if="item.value == patient.status">状态:{{item.label}}</span>
              </span>
              <span class="patient-list-span-4">科室：{{patient.department}}</span>
            </div>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
const df = Vue.filter('dictFilter');
@Component
export default class NursePatientList extends Vue {
  // @Prop()
  public patientList: any[] = []; // 病人列表
  public listHeight = window.innerHeight - 95 + 'px';
  public selected = -1;
  public visitStatus = df('visit_status'); // 病人状态
  public iconFlag = true; // 收放图标
  public searchDiv = false; // 查询条件展示
  public patientListVo: any[] = []; // 病人列表转换
  public tab: any[] = ['', '', '', 'isSelected']; // 左侧菜单选中标识
  public searchVal = ''; // 查询条件
  public startDate = new Date(Date.now() - 24 * 60 * 60 * 1000).format('yyyy-MM-dd'); // 查询开始时间
  public endDate = new Date().format('yyyy-MM-dd'); // 查询结束时间
  public departmentToOne(patient: any, deptList: any) {
    for (const item of deptList) {
      for (const o of item.children) {
        if (String(o.id) === String(patient.departmentId)) {
          patient.department = o.name;
          return;
        }
      }
    }
  }
  public async department() {
    const loadingResult = this.$loading({});
    const deptList = JSON.parse(JSON.stringify(((await this.$store.dispatch('DeptList')) as any).data.data));
    this.patientListVo.forEach((patient) => this.departmentToOne(patient, deptList));
    this.patientListVo = JSON.parse(JSON.stringify(this.patientListVo));
    loadingResult.close();
  }
  public mounted() {
    $(window).resize(() => {
      this.listHeight = window.innerHeight - 95 + 'px';
    });
    this.searchPatient();
  }
  /**
   * 列表页获取数据
   */
  public getPatient(patient: any, index: number) {
    this.selected = index;
    this.$store.commit('SET_PATIENT', patient);
  }
  /**
   * 查询条件状态改变
   */
  public changeIcon() {
    if (this.iconFlag) {
      this.iconFlag = false;
      this.searchDiv = true;
      return;
    }
    this.iconFlag = true;
    this.searchDiv = false;
  }
  /**
   * 病人查询操作
   */
  public async searchPatient() {
    if(!this.startDate && !this.endDate) {
      this.$message.warning('开始时间和结束时间必须均有日期值');
      return;
    }
    const sd = new Date(this.startDate as any).format('yyyy-MM-dd') + ' 00:00:00';
    const ed = new Date(this.endDate as any).format('yyyy-MM-dd') + ' 23:59:59';
    const param = {
      searchText: this.searchVal,
      startDate: sd,
      endDate: ed,
      type: '1' // 倒序排序
    };
    const { data } = await this.$store.dispatch('GetPatientListByParam', param);
    if (!data.data || (data.data && data.data.length === 0)) {
      this.patientListVo = [];
      const patient = this.$store.getters.GET_PATIENT;
      Object.keys(patient).forEach((key: string) => patient[key] = '');
      this.$store.commit('SET_PATIENT',patient);
      return;
    }
    this.patientListVo = data.data;
    this.getPatient(data.data[0], 0);
    this.tab = this.tab.map((item, i) => item = (3 === i) ? 'isSelected' : '');
    this.department();
  }

  /**
   * 左侧操作
   */
  public searchPatientList(searchVal: number) {
    this.tab = this.tab.map((item, i) => item = (searchVal === i) ? 'isSelected' : '');
    if (0 === searchVal) {
      this.patientListVo = this.patientList.filter((item) =>
        new RegExp('1', 'gi').test(item.severityLevelSys + '') ||
        new RegExp('2', 'gi').test(item.severityLevelSys + ''));
      return;
    }
    if (1 === searchVal) {
      this.patientListVo = this.patientList.filter((item) =>
        new RegExp('3', 'gi').test(item.severityLevelSys + '') ||
        new RegExp('4', 'gi').test(item.severityLevelSys + ''));
      return;
    }
    this.patientListVo = this.patientList;
  }
}
</script>
<style lang="less">
.NursePatientList {
	.menu-right {
		input::-webkit-input-placeholder {
			color: #fff;
			font-size: 12px;
		}
		input {
			border: none;
			border-radius: 0px;
			border-bottom: 1px solid #fff;
			background-color: #5f9ea0;
			height: 20px;
			line-height: 20px;
			padding: 0 15px 0 2px;
			color: #fff;
		}
	}
	.el-input__suffix {
		right: -5px;
	}
	.el-input__prefix {
		top: -10px;
		right: -160px;
		color: #fff;
	}
	.el-date-editor {
		width: 218px;
		margin-left: 10px;
		margin-bottom: 5px;
	}
	.el-input__suffix-inner {
		.el-input__icon {
			height: 100%;
			width: 25px;
			text-align: center;
			transition: all 0.3s;
			line-height: 20px;
		}
	}
	.el-button {
		margin-left: 10px;
	}
	.el-icon-refresh {
		margin-left: 60px;
		cursor: pointer;
	}
}
</style>

<style lang="less" scoped>
.NursePatientList {
	width: 270px;
	height: 100%;
	overflow: hidden;
	.menu-left {
		background-color: #0d3754;
		width: 20px;
		float: left;
		height: 100%;
		div {
			color: #f2f2f2;
			font-size: 12px;
			font-weight: bold;
			border-bottom: 1px solid white;
			padding-bottom: 5px;
			margin: 2px 0px;
			text-align: center;
			&:hover {
				background-color: #125984;
				cursor: pointer;
			}
		}
		.isSelected {
			background-color: #125984;
			cursor: pointer;
		}
	}
	.menu-right {
		float: left;
		background-color: #dcdcdc;
		width: calc(~'100% - 20px');
		height: 100%;
		.search {
			background-color: #14527d;
			padding-top: 5px;
			height: 25px;
			overflow: hidden;
			color: #fff;
			span {
				padding-left: 5px;
			}
			.localIcon {
				margin-left: 20px;
				cursor: pointer;
			}
		}
		.search2 {
			background-color: #5f9ea0;
			padding-top: 5px;
			height: 80px;
			overflow: hidden;
			.searchInput {
				width: 185px;
				margin-left: 10px;
				margin-bottom: 5px;
			}
		}
		.patient-list {
			list-style-type: none;
			// height: calc(~"100% - 165px");
			margin: 0px;
			padding: 0px 5px;
			.selected {
				position: relative;
				top: 10px;
				margin-left: 70px;
				color: rgba(255, 255, 255, 0.7);
				font-size: 20px;
			}
			li {
				height: 60px;
				&:hover {
					box-shadow: 1px 1px 10px #666;
					cursor: pointer;
				}
				// background-color:green;
				// box-shadow:5px 5px 10px black;
				// ['#c1272d', '#c1272d', '#ff931e', '#009245', '#f2f2f2']
				&.color1 {
					background: #c1272d;
					&:hover {
						background: #d8333a;
					}
				}
				&.color2 {
					background: #c1272d;
					&:hover {
						background: #d8333a;
					}
				}
				&.color3 {
					background: #ff931e;
					&:hover {
						background: #fb9a31;
					}
				}
				&.color4 {
					background: #009245;
					&:hover {
						background: #03b959;
					}
				}
				&.color5 {
					background: #f2f2f2;
					&:hover {
						background: #fff;
					}
				}
				div {
					margin: 10px 5px;
					color: #f2f2f2;
					font-size: 14px;
				}
				.patient-list-span-1 {
					font-size: 16px;
					font-weight: bold;
					display: inline-block;
					width: 100px;
				}
				.patient-list-span-3 {
					display: inline-block;
					width: 100px;
				}
			}
		}
	}
}
</style>

