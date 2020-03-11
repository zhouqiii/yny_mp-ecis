import { getBedCardList, getNurses, saveBedCard, delNursingCare, saveBedCardList} from '@/api/nurse/bedCard/bedCard';
const CareData = {
  state: {
  },
  actions: {
    // 病人床位列表
    GetBedCardList() {
      return getBedCardList();
    },
    // 护理数据接口请求
    GetNurses() {
      return getNurses();
    },
    // // 新增保存
    // SaveNursingCare({ commit }: { commit: any }, obj: any) {
    //   return saveNursingCare(obj);
    // },
    // 编辑保存
    SaveBedCard({ commit }: { commit: any }, obj: any) {
      return saveBedCard(obj);
    },
    // 编辑保存多条
    SaveBedCardList({ commit }: { commit: any }, objList: any) {
      return saveBedCardList(objList);
    },
    // // 删除保存
    // DelNursingCare({ commit }: { commit: any }, obj: any) {
    //   return delNursingCare(obj);
    // },
    // // 获取护理列表
    // GetNursingCareList() {
    //   return getNursingCareList();
    // },
  },
  mutations: {
  },
  getters: {
  }
};
export default CareData;
