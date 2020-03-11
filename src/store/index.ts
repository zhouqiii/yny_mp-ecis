import Vue from 'vue';
import Vuex from 'vuex';
import { dictList } from '@/api/dict';
import { deptList } from '@/api/dept';
import { menuList } from '@/api/menu';
import {
  symptomList,
  workstation,
  lifeCharacteristicsByEquipment
} from '@/api/nurse/common';
import user from '@/store/modules/user';
import opbtn from '@/store/modules/opbtn';
import cpc from '@/store/modules/cpc';
import careNotes from '@/store/modules/nurse/notes/careNotes';
import bedCard from '@/store/modules/nurse/bedCard/bedCard';
import prescription from '@/store/modules/nurse/prescription/prescription';
import patientInfo from '@/store/modules/nurse/patientInfo/patientInfo';
import cpcInfo from '@/store/modules/nurse/cpcInfo';
import beds from '@/store/modules/systemSetting/bed/beds';
import patient from '@/store/modules/patient/patient';
import nurse from '@/store/modules/nurse';
import Config from '@/util/config';
import { say, getCalledPatient } from '@/api/screen';
import MedicalRecord from '@/store/modules/nurse/medicalRecord/medicalRecord';
import medicineproduct from '@/store/modules/medicineproductList';
import Role from '@/store/modules/systemSetting/role';
import HistoryPatientVisit from '@/store/modules/nurse/his/historyPatientVisit';
import HisClinicPatientDoctorOrder from '@/store/modules/nurse/his/hisClinicPatientDoctorOrder';
import HisClinicPatientVisit from '@/store/modules/nurse/his/hisClinicPatientVisit';
import HisHospitalPatientDoctorOrder from '@/store/modules/nurse/his/hisHospitalPatientDoctorOrder';
import HisHospitalPatientVisit from '@/store/modules/nurse/his/hisHospitalPatientVisit';
import HisPatientAnalysis from '@/store/modules/nurse/his/hisPatientAnalysis';
import HisPatientLis from '@/store/modules/nurse/his/hisPatientLis';
import HisPatientExamine from '@/store/modules/nurse/his/hisPatientExamine';
import HisPatientPacs from '@/store/modules/nurse/his/hisPatientPacs';
import Handover from '@/store/modules/nurse/handover/handover';
import HisLogTimes from '@/store/modules/nurse/his/hisLogTimes';
import bultrasonic from '@/store/modules/nurse/bultrasonic/bultrasonic';
import duty from '@/store/modules/nurse/statistics/duty';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    [Config.DEPT]: sessionStorage.getItem(Config.DEPT) ? JSON.parse(sessionStorage.getItem(Config.DEPT) as string) : {}
  },
  mutations: {
    [Config.SET_MENU_LIST](state: any, data: any) {
      sessionStorage.setItem(Config.SET_MENU_LIST, JSON.stringify(data));
    },
    [`SET_${Config.DEPT}`](state: any, data: any) {
      state[Config.DEPT] = data;
      sessionStorage.setItem(Config.DEPT, JSON.stringify(data));
    }
  },
  actions: {
    // 字典数据接口请求
    DictList() {
      return dictList().then((data: any) => {
        sessionStorage.setItem(Config.DICT, JSON.stringify(data));
      });
    },
    // 部门数据接口
    DeptList({ commit, state }: { commit: any; state: any }) {
      return new Promise((resolve, reject) => {
        if (state[Config.DEPT] && state[Config.DEPT].length > 0) {
          resolve({ data: { data: state[Config.DEPT] } });
          return;
        }
        deptList()
          .then((r: any) => {
            r.data.data.forEach((item: any) => item.children.forEach((o: any) => {
              if(!o.children||o.children.length===0) {
                delete o.children;
              }
            }));
            commit(`SET_${Config.DEPT}`, r.data.data);
            resolve(r);
          })
          .catch((error: any) => reject(error));
      });
    },
    // 树状症状
    SymptomList() {
      return symptomList();
    },
    // 工作站
    Workstation() {
      return workstation();
    },
    // 通过设备id获取生命特征
    LifeCharacteristicsByEquipment(commit, p: { id: string }) {
      return lifeCharacteristicsByEquipment(p);
    },
    Say(commit, p: string) {
      return say(p);
    },
    GetCalledPatient() {
      return getCalledPatient();
    },
    // 菜单列表
    MenuList({ commit }: { commit: any }) {
      return new Promise((resolve, reject) => {
        menuList()
          .then(({ data }: { data: { data: any[] } }) => {
            let menus = data.data.filter((item) => item.id === 100000);
            menus = menus.length > 0 ? menus[0].children : [];
            commit(Config.SET_MENU_LIST, menus);
            resolve(menus);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    }
  },
  modules: {
    user,
    opbtn,
    careNotes,
    nurse,
    beds,
    bedCard,
    patient,
    prescription,
    patientInfo,
    MedicalRecord,
    cpcInfo,
    cpc,
    medicineproduct,
    Role,
    HistoryPatientVisit,
    Handover,
    HisClinicPatientDoctorOrder,
    HisClinicPatientVisit,
    HisHospitalPatientDoctorOrder,
    HisHospitalPatientVisit,
    HisPatientAnalysis,
    HisPatientLis,
    HisPatientExamine,
    HisPatientPacs,
    HisLogTimes,
    bultrasonic,
    duty
  }
});
