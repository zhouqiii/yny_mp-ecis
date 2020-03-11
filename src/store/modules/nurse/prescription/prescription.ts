import { getSplitPrescriptionList, editSplitPrescriptionStatus, getNurses, saveNursingCare,
  getPrescriptionList, editPrescriptionStatus, delNursingCare} from '@/api/nurse/prescription/prescription';
const CareData = {
  state: {
  },
  actions: {
    // 获取拆分医嘱列表
    GetSplitPrescriptionList({ commit }: { commit: any }, obj: any) {
      return getSplitPrescriptionList(obj);
    },
    // 护理数据接口请求
    GetNurses() {
      return getNurses();
    },
    // 新增保存
    SaveNursingCare({ commit }: { commit: any }, obj: any) {
      return saveNursingCare(obj);
    },
    // 编辑医嘱状态
    EditPrescriptionStatus({ commit }: { commit: any }, obj: any) {
      return editPrescriptionStatus(obj);
    },
    // 编辑拆分医嘱状态
    EditSplitPrescriptionStatus({ commit }: { commit: any }, {status, objList}: any) {
      return editSplitPrescriptionStatus(status, objList);
    },
    // 删除保存
    DelNursingCare({ commit }: { commit: any }, obj: any) {
      return delNursingCare(obj);
    },
    // 获取医嘱列表
    GetPrescriptionList({ commit }: { commit: any }, obj: any) {
      return getPrescriptionList(obj);
    },
  },
  mutations: {
  },
  getters: {
  }
};
export default CareData;
