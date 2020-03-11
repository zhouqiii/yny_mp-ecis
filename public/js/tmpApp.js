const controlData = new ControlData();
const dept = new Dept();
const xhr = new Xhr();
const dict = new Dict();
Vue.use(new TmpVuePlugin());
class TmpApp {
  tmpEvent= {};
  // 判断是否需要初始化
  baseConfig = window.baseConfig ? window.baseConfig : {
    isInit: 0,
    isPrint: 0
  };
  // 数据
  req = window.req ? window.req : {};
  methods = {
    maritalStatus(i) {
      return this.marital[i];
    },
    async getDept() {
      this.deptData = await dept.getDept();
    },
    async getVitalsign() {
      if(!this.form.visitId) return;
      const vitalsign = await xhr.get(`/api/core/vitalsign/visitId/${this.form.visitId}`,window.accessToken);
      console.log(vitalsign);
    },
    async getUltrasonic() {
      if(!this.form.visitId) return;
      const {data} = await xhr.get(`/api/core/patient-bedside-b-ultrasonic/getList/${this.form.visitId}`,window.accessToken);
      if(!data||!data.data){
        return;
      }
      this.form.PatientBedsideBUltrasonic = data.data;
    },
    getForm() {
      return JSON.parse(JSON.stringify(this.form));
    },
    ready() {
      if (this.tmpEvent) {
        return;
      }
      // this.tmpEvent = new TmpEvent();
    },
    dictF(m,id){
      const o = dict.dataArray.filter(item => item.type === m);
			if (!id) return '';
      if (id === 'all') return o;
      f = o.filter(item => item.value === id);
      return f.length > 0 ? f[0].label : '';
    },
    submit(varArr){
      const text =varArr.map((item)=>`${item.reportItemName} ${item.result}(${item.units})`).join(`,`)
      window._inputSelection.anchorNode.insertData(window._inputSelection.anchorOffset,text);
      this.visible=false;
    }
  };
  constructor() {
    this._init();
  }
  _init(){
    if (this.baseConfig.isInit !== 0) {
      return;
    }
    this.init();
  }
  init() {
  }

  data() {
    return {
      baseConfig:this.baseConfig,
      form: { ...this.req, departmentId: '' },
      marital: ['未婚', '结婚', '离婚', '未知'],
      deptData: [],
      deptDataProps: {
        label: 'name',
        value: 'id'
      },
      visible:false,
      deptById: {}
    };
  }
  createVue(){
    $('#app').append('<jiancha v-model="form.lisData" @submit="submit" :visible.sync="visible" v-if="visible"></jiancha>')
    window.vApp = new Vue({
      el: '#app',
      data: this.data(),
      methods: this.methods,
      mounted() {
        this.getDept();
        // this.getVitalsign();
        // this.getUltrasonic();
        setInterval(()=>{
          if(this.deptData && this.form&&this.form.departmentId&&this.form.departmentId.length > 0){
            this.deptById = dept.select(this.deptData[0].children, this.form.departmentId[1])
          }
          $('.control').each((i,item)=>{
            if($(item).text()==='请选择'){
              $(item).addClass('control_color');
            }else{
              $(item).removeClass('control_color');
            }
          })
        },500);
      }
    });
  }
}