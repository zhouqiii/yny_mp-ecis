import {hisClinicPatientDoctorOrderGet} from '@/api/nurse/his/hisClinicPatientDoctorOrder';
const HisClinicPatientDoctorOrder = {
    actions: {
        /**
         * 获取his门急诊病人医嘱
         */
        HisClinicPatientDoctorOrderGet({ commit }: { commit: any }, obj: any) {
            return hisClinicPatientDoctorOrderGet(obj);
        },
    }
};
export default HisClinicPatientDoctorOrder;
