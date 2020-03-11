import { getNursingCare, getNurses, saveNursingCare,
  getNursingCareList, editNursingCare, delNursingCare} from '@/api/nurse/notes/careNotes';
const CareData = {
  state: {
  },
  actions: {
    // 护理数据接口请求
    GetNursingCare() {
      return getNursingCare();
    },
    // 护理数据接口请求
    GetNurses() {
      return getNurses();
    },
    // 新增保存
    SaveNursingCare({ commit }: { commit: any }, obj: any) {
      return saveNursingCare(obj);
    },
    // 编辑保存
    EditNursingCare({ commit }: { commit: any }, obj: any) {
      return editNursingCare(obj);
    },
    // 删除保存
    DelNursingCare({ commit }: { commit: any }, obj: any) {
      return delNursingCare(obj);
    },
    // 获取护理列表
    GetNursingCareList() {
      return getNursingCareList();
    },
  },
  mutations: {
  },
  getters: {
  }
};
export default CareData;
