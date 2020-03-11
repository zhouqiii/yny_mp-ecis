import {hisPatientExamineGet, hisPatientExamineLastGet} from '@/api/nurse/his/hisPatientExamine';
const HisPatientExamine = {
    actions: {
        /**
         * 查询病人检查 his
         */
        HisPatientExamineGet({ commit }: { commit: any }, obj: any) {
            return hisPatientExamineGet(obj);
        },
        HisPatientExamineLastGet({ commit }: { commit: any }, obj: any) {
          return hisPatientExamineLastGet(obj);
        }
    }
};
export default HisPatientExamine;
