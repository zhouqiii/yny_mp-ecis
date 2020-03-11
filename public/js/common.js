var Common = (function() {
  function Common() {
    this.config = {
      // 根目
      root: '/',
      webSocketUrl: '/api',
      // router跳转配置
      router: {
        Screen: {
          hide: true
        },
        bedNo: {
          hide: true
        },
        login: {
          hide: true
        }
      },
      // 民族
      nations: [
        { id: '1', name: '汉' },
        { id: '2', name: '蒙古' },
        { id: '3', name: '回' },
        { id: '4', name: '藏' },
        { id: '5', name: '维吾尔' },
        { id: '6', name: '苗' },
        { id: '7', name: '彝' },
        { id: '8', name: '壮' },
        { id: '9', name: '布依' },
        { id: '10', name: '朝鲜' },
        { id: '11', name: '满' },
        { id: '12', name: '侗' },
        { id: '13', name: '瑶' },
        { id: '14', name: '白' },
        { id: '15', name: '土家' },
        { id: '16', name: '哈尼' },
        { id: '17', name: '哈萨克' },
        { id: '18', name: '傣' },
        { id: '19', name: '黎' },
        { id: '20', name: '傈僳' },
        { id: '21', name: '佤' },
        { id: '22', name: '畲' },
        { id: '23', name: '高山' },
        { id: '24', name: '拉祜' },
        { id: '25', name: '水' },
        { id: '26', name: '东乡' },
        { id: '27', name: '纳西' },
        { id: '28', name: '景颇' },
        { id: '29', name: '柯尔克孜' },
        { id: '30', name: '土' },
        { id: '31', name: '达斡尔' },
        { id: '32', name: '仫佬' },
        { id: '33', name: '羌' },
        { id: '34', name: '布朗' },
        { id: '35', name: '撒拉' },
        { id: '36', name: '毛难' },
        { id: '37', name: '仡佬' },
        { id: '38', name: '锡伯' },
        { id: '39', name: '阿昌' },
        { id: '40', name: '普米' },
        { id: '41', name: '塔吉克' },
        { id: '42', name: '怒' },
        { id: '43', name: '乌孜别克' },
        { id: '44', name: '俄罗斯' },
        { id: '45', name: '鄂温克' },
        { id: '46', name: '崩龙' },
        { id: '47', name: '保安' },
        { id: '48', name: '裕固' },
        { id: '49', name: '京' },
        { id: '50', name: '塔塔尔' },
        { id: '51', name: '独龙' },
        { id: '52', name: '鄂伦春' },
        { id: '53', name: '赫哲' },
        { id: '54', name: '门巴' },
        { id: '55', name: '珞巴' },
        { id: '56', name: '基诺' }
      ],
      // 页面状态
      pageStatus: {
        add:'add',
        edit:'edit',
        detail:'detail'
      },
      // scriptTemp
      tempScript:{
        ECHARTS:{
          name:'echarts',
          url: '/js/echarts.common.min.js'
        },
        TAGCLOUD:{
          name:'tagcloud',
          url: '/js/tagcloud.js'
        }
      }
    };
  }
  // 校验规则描述
  Common.prototype.rules = function() {
    var regE = function(rule, value, callback) {
      if (!value) return callback();
      if (rule.regExp.test(value)) return callback(new Error(rule.message));
    };
    return {
      required: function() {
        return { required: true, message: '输入的值不能为空', trigger: 'blur' };
      },
      requiredDate: function() {
        return {
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change'
        };
      },
      requiredArray: function() {
        return {
          type: 'array',
          required: true,
          message: '请至少选择一个选项',
          trigger: 'change'
        };
      },
      // 万能的正则
      regExp: function(reg, message, trigger) {
        return {
          validator: regE,
          regExp: reg,
          message: message,
          trigger: trigger
        };
      }
    };
  };
  Common.prototype.getScript = function(obj,fun) {
    if(window[obj.name]){
      fun();
      return;
    }
    $.getScript(obj.url,function (d){
      fun()
    })
  }
  return Common;
})();
var common = new Common();

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
// (new Date()).format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function(fmt) {
  //author: meizz
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return fmt;
};
