import medicalRecord from '@/api/nurse/medicalRecord/medicalRecord';
import { patientEKG, patientEKGList, electrocardiogrampdfBinding } from '@/api/ekg';
import { Message } from 'element-ui';
import Config from '@/util/config';
const MedicalRecord = {
  state: {
    [Config.MEDICALRECORD_TMP]: sessionStorage.getItem(Config.MEDICALRECORD_TMP) ?
    JSON.parse(sessionStorage.getItem(Config.MEDICALRECORD_TMP) as string) : []
  },
  actions: {
    // 添加病历
    PatientmedicalrecorditemPost({ commit }: { commit: any }, obj: any) {
      return new Promise((resolve, reject) => {
        medicalRecord.patientmedicalrecorditemPost(obj).then((response: any) => {
          Message.success('保存成功');
          resolve(response);
        }).catch((error: any) => {
          reject(error);
        });
      });
    },
    // 修改病历
    PatientmedicalrecorditemPut({ commit }: { commit: any }, obj: any) {
      return medicalRecord.patientmedicalrecorditemPut(obj);
    },
    // 删除病历
    PatientmedicalrecorditemDelete({ commit }: { commit: any }, obj: number|string) {
      return medicalRecord
        .patientmedicalrecorditemDelete(obj)
        .then(() => Message.success('删除成功'));
    },
    // 病历模版
    MedicalRecordTmpList({ commit, state }: { commit: any, state: any }) {
      return new Promise((resolve, reject) => {
        if (state[Config.MEDICALRECORD_TMP].length > 0) {
          return resolve({data: {data: {records: state[Config.MEDICALRECORD_TMP]}}});
        }
        medicalRecord.tmpList().then((response: any) => {
          commit(`SET_${Config.MEDICALRECORD_TMP}`, response.data.data.records);
          resolve(response);
        }).catch((error: any) => {
          reject(error);
        });
      });
    },
    // 查看本人电子病历列表
    PatientmedicalrecorditemList({ commit }: { commit: any }, visitId: string) {
      return medicalRecord.patientmedicalrecorditemList(visitId);
    },
    PatientEKG({ commit }: { commit: any }, {equipmentNo,startDate, endDate }: TimeArea) {
      return new Promise((resolve, reject) => {
        patientEKG({equipmentNo,startDate, endDate}).then((d: any) => {
          resolve(d.data);
        });
      });
    },
    PatientEKGList({ commit }: { commit: any }, p: Page) {
      return patientEKGList(p);
    },
    ElectrocardiogrampdfBinding(r: any,p: any) {
      return electrocardiogrampdfBinding(p);
    },
    /**
     * 获取插入检验信息
     * @param hisCode 病人编码
     */
    GetLis(r: any) {
      return new Promise(async (resolve, reject) => {
        const currentPatient = JSON.parse(sessionStorage.getItem('currentPatient') as string);
        const {data} = await medicalRecord.getLis(currentPatient.hisCode?currentPatient.hisCode:0);
        resolve(data);
      });
    },
    /**
     * 获取插入医嘱信息
     */
    GetDoctorOrder(r: any) {
      return new Promise(async (resolve, reject) => {
        const currentPatient = JSON.parse(sessionStorage.getItem('currentPatient') as string);
        const {data} = await medicalRecord.getDoctorOrder(currentPatient.hisCode?currentPatient.hisCode:0);
        resolve(data);
      });
    },
    /**
     * 获取插入检查信息
     * @param hisCode 病人编码
     */
    GetPacs(r: any) {
      return new Promise(async (resolve, reject) => {
        const currentPatient = JSON.parse(sessionStorage.getItem('currentPatient') as string);
        const response = await medicalRecord.getPacs(currentPatient.hisCode?currentPatient.hisCode:0);
        resolve(response&&response.data?response.data:[]);
      });
    }
  },
  mutations: {
    [`SET_${Config.MEDICALRECORD_TMP}`]: (state: any, data: any) => {
      sessionStorage.setItem(Config.MEDICALRECORD_TMP, JSON.stringify(data));
      state[Config.MEDICALRECORD_TMP] = data;
    }
  },
  getters: {
    [`GET_${Config.MEDICALRECORD_TMP}`]: (state: any) => {
      return {data: {data: {records: state[Config.MEDICALRECORD_TMP]}}};
    }
  }
};
export default MedicalRecord;
