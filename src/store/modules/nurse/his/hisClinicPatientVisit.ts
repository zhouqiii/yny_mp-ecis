import {hisClinicPatientVisitGet, hisLogGet} from '@/api/nurse/his/hisClinicPatientVisit';
const HisClinicPatientVisit = {
    actions: {
        /**
         * 获取his门急诊挂号记录
         */
        HisClinicPatientVisitGet({ commit }: { commit: any }, obj: any) {
            return hisClinicPatientVisitGet(obj);
        },
        HisLogGet({ commit }: { commit: any }, obj: any) {
          return hisLogGet(obj);
      }
    }
};
export default HisClinicPatientVisit;
