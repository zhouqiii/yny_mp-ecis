import vue from 'vue';
declare global {
  /**
   * 大屏数据对象
   */
  namespace Screen {
    /**
     * 列表卡片
     */
    interface ScreenCard {
      url: string;
      title: string;
      img: string;
      icon: string;
    }
    /**
     * 大屏数据
     */
    interface ScreenData {
      chart?: FormOption | undefined;
      table?: FormOption[] | undefined;
    }
    /**
     * 大屏数据
     */
    interface VisitNumber {
      number?: number;
      toolNumber?: number;
    }
  }
}
export default Screen;
