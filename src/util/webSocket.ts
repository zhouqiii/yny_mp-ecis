const mpx = {
  install(Vue: any, options: any) {
    Vue.prototype.$webSocket = (
      fun: (stompClient: StompClient) => void
    ) => {
      // if (window.__stompClient) {
      //   window.__stompClient.disconnect();
      // }
      const socket = new SockJS('/api/core/bullet');
      window.__stompClient = Stomp.over(socket);
      window.__stompClient.connect({}, (frame: any) => {
        fun(window.__stompClient);
      });
    };

    Vue.prototype.$wSocket = (
      url: string, onmessage: (evt: any) => void, onopen?: () => void, onclose?: () => void
    ) => {
      const ws = new WebSocket(url);
      ws.onopen = () => {
        if (onopen) {
          onopen();
        }
        ws.onmessage = (evt) => onmessage(evt);
      };
      if (onclose) {
        ws.onclose = () => onclose();
      }
    };
  }
};
export default mpx;
