import {hisHospitalPatientVisitGet} from '@/api/nurse/his/hisHospitalPatientVisit';
const HisHospitalPatientVisit = {
    actions: {
        /**
         * 获取his病人住院记录
         */
        HisHospitalPatientVisitGet({ commit }: { commit: any }, obj: any) {
            return hisHospitalPatientVisitGet(obj);
        },
    }
};
export default HisHospitalPatientVisit;
