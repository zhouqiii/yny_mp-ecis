const YiNuoUI = {
  install(Vue: any, options: any) {
    Vue.component('ynDateTimePick', {
      props: ['value', 'type', 'placeholder'],
      data() {
        return{
          format: !this.type || (this.type && this.type === 'date') ? 'yyyy-MM-dd' : 'yyyy-MM-dd hh:mm:ss',
          placeholderVal: this.placeholder ? this.placeholder : '选择日期时间'
        };
      },
      methods: {
        onNowDate() {
          const that: any = this;
          that.$emit('input', new Date().format(that.format));

        },
        onChange(val: any) {
          const that: any = this;
          that.$emit('input', new Date(val ? val : null).format(that.format));
        }
      },
      render() {
        const tool = this.format !== 'yyyy-MM-dd' ? <i class='yn-date-icon' onclick={this.onNowDate}>此刻</i> : null;
        return (
          <main class='ynDateTimePick'>
            <el-date-picker
              v-model={this.value}
              type={this.type}
              placeholder={this.placeholderVal}
              onchange={this.onChange}
              style='width:100%'
            />
            {tool}
          </main>
        );
      },
    });
    /**
     * 插入医嘱表格弹窗
     */
    Vue.component('ynDoctorAdviceTable', {
      render() {
        return <div>
          <el-dialog title={this.title} class='ynSelectionDialog' visible={this.isVisible} oninput={this.oninput}
            show-close={false}
          >
            <el-table data={this.data} height='500' tooltip-effect='dark'
            on-selection-change={this.onSelectionChange}>
              <el-table-column type='selection' width='55'></el-table-column>
              <el-table-column prop='reqClass' label='类别'/>
              <el-table-column prop='itemName' label='项目名称'/>
              <el-table-column prop='amount' label='数量'/>
              <el-table-column prop='units' label='单位'/>
              <el-table-column prop='usageMethod' label='用法'/>
              <el-table-column prop='accountingTotalDosage' label='用量'/>
              <el-table-column prop='frequency' label='频率'/>
            </el-table>
            <span slot='footer' class='dialog-footer'>
              <el-button type='primary' onclick={this.onSave}>确 定</el-button>
              <el-button type='primary' onclick={this.onClose}>取 消</el-button>
            </span>
          </el-dialog>
        </div>;
      },
      props: ['data', 'title'],
      data() {
        return{
          isVisible:false,
          selectionData:[]
        };
      },
      methods: {
        oninput(val: any) {
          const that: any = this;
          that.isVisible = val;
        },
        onSelectionChange(d: any) {
          const that: any = this;
          that.selectionData = d;
        },
        onClose() {
          this.oninput(false);
        },
        onSave() {
          const that: any = this;
          that.oninput(false);
          that.$emit('save', that.selectionData);
        }
      }
    });
    /**
     * 插入检查表格弹窗
     */
    Vue.component('ynPacsTable', {
      render() {
        const tabPane = this.data.map((item: any)=> {
          return (
          <el-tab-pane label={item.examine?item.examine.examClass:''+'/'+item.examine?item.examine.examSubClass:''}>
            <el-table data={item.pacsList} height='500' tooltip-effect='dark'
            on-selection-change={this.onSelectionChange}>
              <el-table-column type='selection' width='55'></el-table-column>
              <el-table-column prop='description' label='检查所见'/>
              <el-table-column prop='impression' label='印象'/>
            </el-table>
          </el-tab-pane>
          );
        });
        return <div>
          <el-dialog title={this.title} class='ynSelectionDialog' visible={this.isVisible} oninput={this.oninput}
            show-close={false}
          >
            <el-tabs>
              {tabPane}
            </el-tabs>
            <span slot='footer' class='dialog-footer'>
              <el-button type='primary' onclick={this.onSave}>确 定</el-button>
              <el-button type='primary' onclick={this.onClose}>取 消</el-button>
            </span>
          </el-dialog>
        </div>;
      },
      props: ['data', 'title'],
      data() {
        return{
          isVisible:false,
          selectionData:[]
        };
      },
      methods: {
        oninput(val: any) {
          const that: any = this;
          that.isVisible = val;
        },
        onSelectionChange(d: any) {
          const that: any = this;
          that.selectionData = d;
        },
        onClose() {
          this.oninput(false);
        },
        onSave() {
          const that: any = this;
          that.oninput(false);
          that.$emit('save', that.selectionData);
        }
      }
    });
    /**
     * 插入检验表格弹窗
     */
    Vue.component('ynLisTable', {
      render() {
        const tabPane = this.data&&this.data.length>0?this.data.map((item: any)=> {
          return (
          <el-tab-pane label={item.analysis.itemName}>
            <el-table data={item.lisList} height='500' tooltip-effect='dark'
            on-selection-change={this.onSelectionChange}>
              <el-table-column type='selection' width='55'></el-table-column>
              <el-table-column prop='reportItemName' label='名称'/>
              <el-table-column prop='result' label='结果'/>
              <el-table-column prop='units' label='单位'/>
              <el-table-column prop='abnormalIndicator' label='异常'/>
              <el-table-column prop='refRange' label='参考值'/>
            </el-table>
          </el-tab-pane>
          );
        }):'';
        return <div>
          <el-dialog title={this.title} class='ynSelectionDialog' visible={this.isVisible} oninput={this.oninput}
            show-close={false}
          >
            <el-tabs>
              {tabPane}
            </el-tabs>
            <span slot='footer' class='dialog-footer'>
              <el-button type='primary' onclick={this.onSave}>确 定</el-button>
              <el-button type='primary' onclick={this.onClose}>取 消</el-button>
            </span>
          </el-dialog>
        </div>;
      },
      props: ['data', 'title'],
      data() {
        return{
          isVisible:false,
          selectionData:[]
        };
      },
      methods: {
        oninput(val: any) {
          const that: any = this;
          that.isVisible = val;
        },
        onSelectionChange(d: any) {
          const that: any = this;
          that.selectionData = d;
        },
        onClose() {
          this.oninput(false);
        },
        onSave() {
          const that: any = this;
          that.oninput(false);
          that.$emit('save', that.selectionData);
        }
      }
    });
    /**
     * 插入检验表格弹窗
     */
    Vue.component('screenHeader', {
      render() {
        return (
        <el-header class='screenHeader'>
          <div>
            <time class='nowTime'>{this.header.nowTime}</time>
            <h1  class='title'>{this.title}</h1>
            <time class='nowDate'>{this.header.nowDate}</time>
          </div>
        </el-header>
        );
      },
      props: [ 'title'],
      data() {
        return{
          formatStr:'yyyy年MM月dd日-hh：mm',
          weekday: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
          header: {
            nowTime:'',
            nowDate:''
          }
        };
      },
      methods: {
        interval() {
          const that: any = this;
          const nowDate = new Date();
          const dataArr = nowDate.format(that.formatStr).split('-');
          that.header.nowTime = dataArr[1];
          const ddy = nowDate.getDay();
          that.header.nowDate = dataArr[0]+' '+that.weekday[ddy];
        }
      },
      mounted() {
        this.interval();
        setInterval(()=>this.interval(),1000);
      }
    });
    /**
     * 叫号大屏表格
     */
    Vue.component('emergencyCallTable', {
      render() {
        return (
          <table class={'emergencyCallTable ' + this.topTableClass}>
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
              <td>{this.dataList[0].name}</td>
              <td>{this.dataList[0].level}</td>
              <td>{this.dataList[0].department?'等待就诊':''}</td>
              <td>{this.dataList[0].department}</td>
            </tr>
            <tr>
              <td>{this.dataList[1].name}</td>
              <td>{this.dataList[1].level}</td>
              <td>{this.dataList[1].department?'等待就诊':''}</td>
              <td>{this.dataList[1].department}</td>
            </tr>
            <tr>
              <td>{this.dataList[2].name}</td>
              <td>{this.dataList[2].level}</td>
              <td>{this.dataList[2].department?'等待就诊':''}</td>
              <td>{this.dataList[2].department}</td>
            </tr>
            <tr>
              <td>{this.dataList[3].name}</td>
              <td>{this.dataList[3].level}</td>
              <td>{this.dataList[3].department?'等待就诊':''}</td>
              <td>{this.dataList[3].department}</td>
            </tr>
            <tr>
              <td>{this.dataList[4].name}</td>
              <td>{this.dataList[4].level}</td>
              <td>{this.dataList[4].department?'等待就诊':''}</td>
              <td>{this.dataList[4].department}</td>
            </tr>
          </tbody>
        </table>
        );
      },
      props: [ 'data','number','isTop'],
      data() {
        return{
          dataList:[],
          topTableClass: 'topTable'
        };
      },
      methods: {
        initDataList() {
          const that: any = this;
          for(let i=0;i<that.number;i++) {
            that.dataList.push({});
          }
        },
        getDataList() {
          const that: any = this;
          that.data.forEach((item: any, i: number) => {
            if(i>5) {
              return;
            }
            that.dataList[i] = item;
          });
        }
      },
      created() {
        this.topTableClass=this.isTop?this.topTableClass:'';
        this.initDataList();
        this.getDataList();
      },
      watch:{
        data() {
          const that: any = this;
          that.getDataList();
        },
        number() {
          const that: any = this;
          that.initDataList();
        }
      }
    });
  }
};
export default YiNuoUI;
