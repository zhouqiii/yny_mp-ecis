import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    /**
         * webSocket
         * @param fun
         * @description 使用方法
         * @description
         * stompClient.subscribe('/toAll/bulletScreen',({body}: any) => subscribe(body));
         * @description
            stompClient.send('/chat', {});
        */
    $webSocket: (fun: (stompClient: StompClient) => void) => void;
    $wSocket: (
      url: string,
      onmessage: (evt: any) => void,
      onopen?: () => void,
      onclose?: () => void
    ) => void;
  }
}
// 本地存储
interface Store {
  get(key: string): any;
  set(key: string, val: any): any;
  remove(key: string): void;
  clearAll(): void;
  each(fun: (key: string, val: string) => void): void;
}
// axios 数据
interface Axios {
  defaults: any;
  get(url: string, config?: any): Promise<any>;
  post(url: string, config?: any): Promise<any>;
  put(url: string, config?: any): Promise<any>;
  delete(url: string, config?: any): Promise<any>;
  request(config?: any): Promise<any>;
}
declare global {
  const UE: any;
  const $: any;
  const common: any;
  const objectInfo: any;
  const axios: any;
  const store: Store;
  const CryptoJS: any;
  const refreshTokenTimeout: any;
  const baseUrl: any;
  const websock: WebSocket;
  const SockJS: any;
  const Stomp: any;
  const echarts: any;
  const tagcloud: any;
  const stompClient: any;
  interface Window {
    $: any;
    common: any;
    objectInfo: any;
    axios: any;
    store: Store;
    CryptoJS: any;
    __refreshTokenTimeout__: any;
    __stompClient: any;
    axiosFun: (config?: any) => Promise<any>;
    getLodop: () => any;
    baseUrl: any;
    websock: WebSocket;
    SockJS: any;
    Stomp: any;
  }
  interface Date {
    format: any;
  }
  /**
	 * 规则
	 */
  interface Role {
    createTime: string;
    delFlag: string | null;
    roleCode: string;
    roleDesc: string;
    roleId: number;
    roleName: string;
    updateTime: string;
  }
  /**
	 * 用户
	 */
  interface User {
    userId: string;
    username?: string;
    roleList?: Role[];
  }
  /**
	 * 穿梭框使用的对象
	 */
  interface Transfer {
    key?: number | string;
    label?: string;
    disabled?: boolean;
  }
  /**
	 * 表单名称和数值
	 */
  interface FormOption {
    label: string;
    value?: string | number;
  }
  interface StompClient {
    subscribe: (url: string, f: (data?: any | any[]) => void) => void;
    send: (url: string, header: any | any[], data?: string) => void;
    disconnect: () => void;
  }
  interface Page {
    current: number;
    total?: number;
    records?: any[];
    size?: number;
    visitId?: number;
  }
  interface TimeArea{
    startDate: Date|string|number;
    endDate: Date|string|number;
    equipmentNo?:string;
  }
}
