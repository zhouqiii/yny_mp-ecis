import vue from 'vue';
declare global {
  /**
   * 公共数据配置对象
   */
  namespace common{
    /**
     * 系统配置
     */
    interface config {
      root: string,
      webSocketUrl: string,
      router: common.Router,
      nations:{ id: string, name: string }
    }
    interface Router{
      Screen: {
        hide: boolean
      },
      bedNo: {
        hide: boolean
      },
      login: {
        hide: boolean
      }
    }
  }
}
export default common;