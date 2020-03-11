import { getdoctors, saveBed,
  getBedList, editBed, delBed} from '@/api/systemSetting/bed/beds';
const CareData = {
  state: {
  },
  actions: {
    // 医生接口请求
    GetDoctors() {
      return getdoctors();
    },
    // 新增保存
    SaveBed({ commit }: { commit: any }, obj: any) {
      return saveBed(obj);
    },
    // 编辑保存
    EditBed({ commit }: { commit: any }, obj: any) {
      return editBed(obj);
    },
    // 删除保存
    DelBed({ commit }: { commit: any }, obj: any) {
      return delBed(obj);
    },
    // 获取床位列表
    GetBedList() {
      return getBedList();
    },
  },
  mutations: {
  },
  getters: {
  }
};
export default CareData;
