class TmpVuePlugin {
  install(Vue, options) {
    String.prototype.trim = function () {
      return this.replace(/(^\s*)|(\s*$)/g, '');
    };
    Vue.component('tEdit', {
      template: `<template><div class="tEdit"><div :id="ueid" class="ueditor_ueid"></div>
        <t-mouseup ref="tMouseup">
          <div @click="onDiseaseLog">插入病程</div>
          <div @click="onPacs">插入检查结果</div>
          <div @click="onLis">插入检验结果</div>
          <div @click="onDoctorOrder">插入医嘱</div>
          <div @click="onLoad">插入心电图</div>
          <div @click="onInsertionDiagnosis">插入诊断</div>
          <div @click="onInsertionName">插入签名</div>
        </t-mouseup>
      </template>`,
      props: ['value'],
      data() {
        return {
          ueid: 'u_',
          ue: {}
        };
      },
      methods: {
        ready() {
          this.ue.setContent(this.value ? this.value : '<p></p>');
          const tmpEvent = new TmpEvent(this.ue.container,this.ue);
          this.$refs.tMouseup.addListener(this.ue.container)
          setInterval(()=>{
            this.$emit('input', this.ue.getContent());
          },300);
          this.$emit('ready');
        },
        insertValue(val) {
          window._inputSelection.anchorNode.insertData(window._inputSelection.anchorOffset, val);
        },
        showAlert() {
          window._ue = this.ue;
          vApp.visible = true;
        },
        /**
         * 插入心电图
         */
        onLoad() {
         window.parent.medicalRecord.onLoad(true).then((d)=>{
          //  if(d.filePath==='没有文件'){
          //    this.$message.warning('当前没有文件');
          //    return;
          //  }
           const host = location.href!=='about:srcdoc' ? location.hostname : window.parent.location.hostname;
            const imgHtml = `<p>${d.uploadTime}</p><p><img src="http://${host}:83/${d.url}" style="width:100%"/></p>`;
           // const imgHtml = `<div  style="width:100%"><img src="http://192.168.43.214:83/${d}" style="width:100%"/></div>`;
           this.insertData(imgHtml);
           this.ue.setContent(this.ue.getContent().replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g,'\''))
         });
        },
        /**
         * 插入诊断
         */
        onInsertionDiagnosis(){
          window.parent.medicalRecord.onInsertionDiagnosis().then((d) => {
            this.insertData(d.map((item)=>item.name).join(','));
          }); 
        },
        /**
         * 插入检验
         */
        onLis() {
          window.parent.medicalRecord.onLis().then((d) => {
            this.insertData(d.map((item)=>`${item.reportItemName} ${item.result} ${item.units} ${item.abnormalIndicator} ${item.refRange}`).join(','));
          }); 
        },
        /**
         * 插入检查
         */
        onPacs() {
          window.parent.medicalRecord.onPacs().then((d) => {
            this.insertData(d.map((item)=>`${item.description} ${item.impression}`).join(','));
          }); 
        },
        /**
         * 插入医嘱
         */
        onDoctorOrder(){
          window.parent.medicalRecord.onDoctorOrder().then((d) => {
            const html = d.map((item)=>`${item.itemName?item.itemName:''} ${item.amount?item.amount:''} ${item.units?item.units:''} ${item.usageMethod?item.usageMethod:''} ${item.accountingTotalDosage?item.accountingTotalDosage:''} ${item.frequency?item.frequency:''} `).join(',');
            this.insertData(html);
          }); 
        },
        insertData(html){
          if(window._inputSelection.anchorNode.data){
          window._inputSelection.anchorNode.insertData(window._inputSelection.anchorOffset, html);
          }else{
          window._inputSelection.anchorNode.append(html);
          }
        },
        /**
         * 插入病程
         */
        onDiseaseLog(){
          window.parent.medicalRecord.onDiseaseLog(true).then((d) => {
            // window._inputSelection.anchorNode.insertData(window._inputSelection.anchorOffset, d.map((item)=>item.name).join(','));
            d.forEach((item)=>{
              let html = item.content.replace(/\$\{this\.req\.temperature\}/g,req.temperature).replace(/\$\{this\.req\.breathe\}/g,req.breathe)
              .replace(/\$\{this\.req\.systolicPressure\}/g,req.systolicPressure).replace(/\$\{this\.req\.diastolicPressure\}/g,req.diastolicPressure).replace(/\$\{this\.req\.heartRate\}/g,req.heartRate)
              .replace(/\$\{this\.req\.so2\}/g,req.so2);
              html = `<p>${new Date().format('yyyy-MM-dd hh:mm:ss')}</p><p>${html}</p><p style="margin-left:54%">医生签名：</p>`
              this.ue.setContent(html,true);
            })
          });
        },
        /**
         * 插入签名
        */
        onInsertionName(){
          window.parent.medicalRecord.onInsertionName().then((d) => {
            const host = location.href!=='about:srcdoc' ? location.hostname : window.parent.location.hostname;
            const imgHtml = `<img src="${d}" style="height:20px">`;
            this.insertData(imgHtml);
            this.ue.setContent(this.ue.getContent().replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g,'\''))
          })
        },
        addStyle() {
          if ($('#tEdit').length > 0) {
            return;
          }
          $('head').append(`<style id="tEdit">
          import "/umditor/themes/default/css/umeditor.min.css";
          .tEdit{
            position: relative;
          }
          /*.edui-toolbar{display: none;}*/
          .edui-container {
            border: none;
            box-shadow: none;
          }
          .control_color{
            color: red;
          }
          .el-form-item__content {
            position: static;
          }
          .tEdit .edui-container{
            width: 100%;
          }

          </style>`)
        }
      },
      created() {
        this.ueid = 'u_' + Date.now() + Math.round(Math.random() * 10000);
        this.addStyle();
      },
      mounted() {
        this.ue = UM.getEditor(this.ueid, {
          toolbar:[
            'source | undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
            'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize'
        ],
          autoHeightEnabled: true,
          minFrameHeight: 500,
          initialFrameHeight: 500,
        });
        this.ue.ready(() => this.ready());
      }
    });

    Vue.component('jiancha', {
      template: `<template>
      <el-dialog :title="lis&&lis.length>0?'检查结果':'暂无数据'" :visible.sync="visible" @close="onClose" width="100%">
          <div v-for="(item,i) in lis" :key='i'>
            <div class="box_title">
              <ul>
                <li>申请医生:{{item.analysis.orderingProvider}}</li>
                <li>临床诊断:{{item.analysis.relevantClinicDiag}}</li>
                <li>执行时间:{{item.analysis.executeDate}}</li>
              </ul>
            </div>
            <div>
              <el-table :data="item.lisList" ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="reportItemName" label="名称"></el-table-column>
                  <el-table-column prop="result" label="结果值"></el-table-column>
                  <el-table-column prop="units" label="单位"></el-table-column>
                  <el-table-column prop="abnormalIndicator" label="标志"></el-table-column>
                  <el-table-column prop="resultDateTime" label="日期"></el-table-column>
                  <el-table-column prop="refRange" label="参考"></el-table-column>
                </el-table>
            </div>
            <div><el-button @click="onOk">确定</el-button></div>
          </div>
        </el-dialog>
      </template>`,
      props: ['value', 'visible'],
      data() {
        return {
          multipleSelection: [],
          lis: []
        };
      },
      methods: {
        async getLis() {
          const lisData = await xhr.get(
            `/api/core/patientlis/getLis/${vApp.getForm().hisCode}`,
            window.accessToken
          );
          if (!lisData) {
            return;
          }
          this.lis = lisData;
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          this.$emit('input', val);
        },
        onClose() {
          this.$emit('update:visible', false);
        },
        onOk() {
          this.$emit('submit', this.multipleSelection);
        }
      },
      created() {
        this.multipleSelection = this.value;
      },
      mounted() {
        this.getLis();
      }
    });
    Vue.component('t-mouseup', {
      template: `<template><div v-if="mouseup.show" class="tMouseup">
      <div class="back" @click="mouseup.show=false"></div>
      <div class="box" :style="\`left:\${mouseup.left}px;top:\${mouseup.top}px;\`" @click="mouseup.show=false">
        <slot></slot>
      </div>
    </div></template>`,
      data() {
        return {
          mouseup: {
            show: false,
            left: 0,
            top: 0
          }
        };
      },
      methods: {
        addListener(dom) {
          $(dom).contextmenu(e => {
            this.mouseup = {
              show: true,
              left: e.clientX,
              top: e.clientY
            };
            window._inputSelection = {
              anchorNode: getSelection().anchorNode,
              anchorOffset: getSelection().anchorOffset
            }
            window._selection = getSelection();
            e.preventDefault();
            return false;
          });
        },
        addStyle() {
          if ($('#tMouseup').length > 0) {
            return;
          }
          $('head').append(`<style id="tMouseup">
          .tMouseup .back{
            position: absolute;top:0px;left:0px;width:100%;height:100%;background: rbga(0,0,0,0);z-index: 1000;
          }
          .tMouseup .box{
            position: absolute;z-index: 1000;background: #fff;border:1px solid #ccc;padding: 10px;
          }
          .tMouseup .box>div{
            padding:10px 5px;
            cursor: pointer;
          }
          .tMouseup .box>div:hover{
            background:#ddd;
          }
          </style>`)
        }
      },
      created() {
        this.addStyle();
      }
    });
  }
}
class Xhr {
  ajax(url, type, token) {
    let t = '';
    if (token && token.indexOf("\"") === -1) {
      t = token;
    } else {
      t = token ? `Bearer ${/^"(.*)"$/g.exec(token)[1]}` : null;
    }
    return new Promise((resolve, reject) => {
      $.ajax({
        url,
        beforeSend: function (request) {
          request.setRequestHeader("Authorization", "Bearer " + t);
        },
        type,
        success(data) {
          resolve(data);
        },
        error(e) {
          reject(e);
        }
      });
    });
  }
  get(url, token) {
    return this.ajax(url, 'get', token);
  }
}
/**
 * 部门
 */
class Dept {
  sessionName = 'deptList';
  data = {};
  constructor() {
    sessionData = sessionStorage.getItem(this.sessionName);
    this.data = sessionData ? JSON.parse(sessionData) : {};
  }
  getDept() {
    return new Promise(async (resolve, reject) => {
      if (!$.isEmptyObject(this.data)) return resolve(this.data);
      xhr
        .get('/api/admin/dept/tree')
        .then(({ data }) => {
          this.setItem(data);
          resolve(this.data);
        })
        .catch(error => reject(error));
    });
  }
  setItem(data) {
    this.data = this.recursiveItem(data);
    sessionStorage.setItem(this.sessionName, JSON.stringify(this.data));
  }
  recursiveItem(items /**: { children: any[] }[] */) {
    items.forEach(item =>
      item.children && item.children.length > 0
        ? this.recursiveItem(item.children)
        : delete item.children
    );
    return items;
  }
  select(items, id) {
    let o = {};
    if (!id || !items) return {};
    for (const i in items) {
      const item = items[i];
      if (Number(item.id) === Number(id)) {
        o = item;
        break;
      }
      if (item.children && item.children.length > 0) {
        const obj = this.select(item.children, id);
        if (Number(obj.id) === Number(id)) {
          o = obj;
          break;
        }
      }
    }
    return o;
  }
}
/**
 * 字典
 */
class Dict {
  sessionName = 'dict';
  // 为了和vue框架的数据格式同步
  dataArray = [];
  constructor() {
    this.getDict();
  }
  getDict() {
    if (!sessionStorage.getItem(this.sessionName)) {
      const r = $.ajax({
        url: '/api/admin/dict/list',
        type: 'get',
        async: false
      }).responseText;
      sessionStorage.setItem(
        this.sessionName,
        JSON.stringify({ data: JSON.parse(r) })
      );
    }
    this.dataArray = JSON.parse(
      sessionStorage.getItem(this.sessionName)
    ).data.data;
  }
  filter(d) {
    vApp.$set(vApp.$options.filters, 'dict', val => {
      const o = d.filter(item => item.type === val.type);
      if (!val.value) return '';
      if (val.value === 'all') return o;
      f = o.filter(item => item.value === val.value);
      return f.length > 0 ? f[0].label : '';
    });
  }
}
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
};
