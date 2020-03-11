import { getVitalSignByVisitId } from '@/api/nurse/vitalSign';
const vitalSign = {
  state: {
  },
  actions: {
    // 生命特征
    GetVitalSignByVisitId({ commit }: { commit: any }, visitId: string) {
      return getVitalSignByVisitId(visitId);
    }
  },
  mutations: {
  },
  getters: {
  }
};
export default vitalSign;
