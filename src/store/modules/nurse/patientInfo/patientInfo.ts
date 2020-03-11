import {
  called,
  removePatient,
  setArea,
  getPatientList,
  getNursePatientList
} from '@/api/nurse/patientInfo/patientInfo';
const PatientInfo = {
  state: {},
  actions: {
    // 叫号
    Called({ commit }: { commit: any }, obj: any) {
      return called(obj);
    },
    RemovePatient({ commit }: { commit: any }, obj: any) {
      return removePatient(obj);
    },
    SetArea({ commit }: { commit: any }, obj: any) {
      return setArea(obj);
    },
    /**
     * 通过医生id获取病人列表
     * @param param0
     * @param obj {'doctor'}
     */
    GetPatientList(
      { commit }: { commit: any },
      { mark, userId }: { mark: string; userId: number }
    ) {
      return new Promise((resolve, reject) => {
        const markReq = {
          doctor: () => getPatientList({ doctorId: userId }),
          nurse: () => getNursePatientList({ nurseId: userId })
        };
        if (!/(doctor|nurse)/g.test(mark)) {
          return reject('标记参数出现错误，不知道是医生还是护士');
        }
        (markReq as any)
          [mark]()
          .then((response: any) => {
            resolve(response);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    }
  },
  mutations: {},
  getters: {}
};
export default PatientInfo;
