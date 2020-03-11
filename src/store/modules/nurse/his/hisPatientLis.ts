import {hisPatientLisGet} from '@/api/nurse/his/hisPatientLis';
const HisPatientLis = {
    actions: {
        /**
         * 获取his LIS结果
         */
        HisPatientLisGet({ commit }: { commit: any }, obj: any) {
            return hisPatientLisGet(obj);
        },
    }
};
export default HisPatientLis;
