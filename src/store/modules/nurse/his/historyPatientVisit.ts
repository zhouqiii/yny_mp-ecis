import {hisPatientVisitGet} from '@/api/nurse/his/historyPatientVisit';
const HistoryPatientVisit = {
    actions: {
        /**
         * 获取his就诊历史记录列表
         */
        HisPatientVisitGet({ commit }: { commit: any }, obj: any) {
            return hisPatientVisitGet(obj);
        },
    }
};
export default HistoryPatientVisit;
