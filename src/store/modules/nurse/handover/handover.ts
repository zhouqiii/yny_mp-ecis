import { putDoctorHandover, putNurseHandover } from '@/api/nurse/handover';
const Handover = {
  state: {},
  actions: {
    // 医生|护士交接
    PutDoctorHandover({ commit }: { commit: any }, { mark, data }: any) {
      return new Promise((resolve, reject) => {
        const markData: any = {
          doctor: () => putDoctorHandover(data),
          nurse: () => putNurseHandover(data)
        };
        if (data.length === 0) {
          return reject('数据不能为空');
        }
        markData[mark]()
          .then((response: any) => resolve(response))
          .catch((error: any) => reject(error));
      });
    }
  },
  mutations: {},
  getters: {}
};
export default Handover;
