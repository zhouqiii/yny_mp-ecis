// tslint:disable-next-line:max-line-length
import { postCpc, getCpc, putCpc } from '@/api/cpc';
const Cpc = {
  state: {
  },
  actions: {
    // 急救信息
    GetCpc({ commit }: { commit: any }, visitId: number) {
      return getCpc(visitId);
    },
    PutCpc({ commit }: { commit: any }, obj: any) {
      return putCpc(obj);
    },
    PostCpc({ commit }: { commit: any }, obj: any) {
      return postCpc(obj);
    }
  },
  mutations: {
  },
  getters: {
  }
};
export default Cpc;
