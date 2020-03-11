interface VitalSign {
  id: number|null;
  /**
   * 就诊ID
   */
  visitId: number;
  /**
   * 设备ID
   */
  equipmentId: number|string[];
  /**
   * 呼吸次数
   */
  breathe: string;
  /**
   * 体温
   */
  temperature: string;
  /**
   * 心率
   */
  heartRate: string;
  /**
   * 舒张压
   */
  diastolicPressure: string;
  /**
   * 收缩压
   */
  systolicPressure: string;
  /**
   * 血氧饱和度
   */
  so2: string;
  /**
   * 采样时间
   */
  samplingDate: string;
  /**
   * 记录时间
   */
  recordDate: string;
  /**
   * 状态
   */
  status: string;
}
/**
 * 对象深拷贝
 */
export const deepClone = (data: any) => {
  const originProto = Object.getPrototypeOf(data);
  return Object.assign(Object.create(originProto), data);
};
/**
 * 加密处理
 */
export const encryption = (params: any) => {
  const {
    data,
    type,
    param,
    key
  } = (params as any);
  const result = JSON.parse(JSON.stringify(data));
  if (type === 'Base64') {
    param.forEach((ele: any) => {
      result[ele] = btoa(result[ele]);
    });
  } else {
    param.forEach((ele: any) => {
      const dataEle = (result[ele] as any);
      const keyEle = CryptoJS.enc.Latin1.parse(key);
      const iv = keyEle;
      // 加密
      const encrypted = CryptoJS.AES.encrypt(
        dataEle,
        keyEle, {
          iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.ZeroPadding
        });
      result[ele] = encrypted.toString();
    });
  }
  return result;
};
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len: number, date: boolean) => {
  let random = '';
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4);
  if (date) {
    random = random + Date.now();
  }
  return random;
};
/**
 * mews评分
 */
export const mews = (vitalSign: VitalSign) => {
  /**
   * mews规则
   */
  const mewsRule: {
    systolicPressure(x: number): number;
    heartRate(x: number): number;
    breathe(x: number): number;
    temperature(x: number): number;
    // so2(x: number): number;
  } = {
    /**
     * 收缩压
     */
    systolicPressure: (x: number) => {
      if (x <= 70) {return 3; }
      if (71 <= x && x <= 80) {return 2; }
      if (81 <= x && x <= 100) {return 1; }
      if (101 <= x && x <= 199) {return 0; }
      if (x >= 200) {return 2; }
      return 2;
    },
    /**
     * 心率
     */
    heartRate: (x: number) => {
      if (x <= 40) {return 2; }
      if (41 <= x && x <= 50) {return 1; }
      if (51 <= x && x <= 100) {return 0; }
      if (101 <= x && x <= 110) {return 1; }
      if (111 <= x && x <= 129) {return 2; }
      if (130 <= x) {return 3; }
      return 2;
    },
    /**
     * 呼吸次数
     */
    breathe: (x: number) => {
      if (x < 9) {return 2; }
      if (9 <= x && x <= 14) {return 0; }
      if (15 <= x && x <= 20) {return 1; }
      if (21 <= x && x <= 29) {return 2; }
      if (30 <= x) {return 3; }
      return 3;
    },
    /**
     * 体温
     */
    temperature: (x: number) => {
      if (x < 35) {return 2; }
      if (35 <= x && x <= 38.4) {return 0; }
      if (38.5 <= x ) {return 2; }
      return 2;
    }
    // so2: (x: number) => {
    //   if (x <= 84) {return 3; }
    //   if (84 < x && x <= 95) {return 1; }
    //   // if (96 <= x && ) {return 0; }
    //   return 0;
    // }
  };
  let val = 0;
  Object.keys(vitalSign).map((item: string) => {
    val += (mewsRule as any)[item] ? (mewsRule as any)[item]((vitalSign as any)[item]) : 0;
  });
  return val;
};
/**
 * 系统分级
 */
export const systemClass = (x: number) => {
  if (x >= 0 && x <= 1) {return 4; }
  if (x === 2) {return 3; }
  if (x >= 3 && x <= 4) {return 2; }
  if (5 <= x ) {return 1; }
  // if (13 <= x && x <= 15) {return 1; }
  return 1;
};


// 转为unicode 编码
export const encodeUnicode = (str: string) => {
  const res: any[] = [];
  for ( let i = 0; i < str.length; i++ ) {
  res[i] = ( '00' + str.charCodeAt(i).toString(16) ).slice(-4);
  }
  return '\\u' + res.join('\\u');
};

export const isHtmlCode = (val: number|string, validateVal: number|string, success?: () => any, error?: () => any) => {
  if (val === validateVal) {
    return success ? success() : true;
  } else {
    return error ? error() : false;
  }
};
