import {hisPatientAnalysisGet, hisPatientAnalysisLastGet} from '@/api/nurse/his/hisPatientAnalysis';
const HisPatientAnalysis = {
    actions: {
        /**
         * 获取his门急诊挂号记录
         */
        HisPatientAnalysisGet({ commit }: { commit: any }, obj: any) {
            return hisPatientAnalysisGet(obj);
        },
        HisPatientAnalysisLastGet({ commit }: { commit: any }, obj: any) {
          return hisPatientAnalysisLastGet(obj);
        }
    }
};
export default HisPatientAnalysis;
