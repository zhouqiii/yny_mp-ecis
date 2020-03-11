import {hisHospitalPatientDoctorOrderGet} from '@/api/nurse/his/hisHospitalPatientDoctorOrder';
const HisHospitalPatientDoctorOrder = {
    actions: {
        /**
         * 获取his住院病人医嘱
         */
        HisHospitalPatientDoctorOrderGet({ commit }: { commit: any }, obj: any) {
            return hisHospitalPatientDoctorOrderGet(obj);
        },
    }
};
export default HisHospitalPatientDoctorOrder;
