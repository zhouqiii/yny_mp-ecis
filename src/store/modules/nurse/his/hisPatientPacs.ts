import {hisPatientPacsGet} from '@/api/nurse/his/hisPatientPacs';
const HisPatientPacs = {
    actions: {
        /**
         * 获取his LIS结果
         */
        HisPatientPacsGet({ commit }: { commit: any }, obj: any) {
            return hisPatientPacsGet(obj);
        },
    }
};
export default HisPatientPacs;
