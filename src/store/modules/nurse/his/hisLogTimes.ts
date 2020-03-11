import {hisLogTimes, insertionDiagnosisList} from '@/api/nurse/his/hisLogTimes';
const HisLogTimesObj = {
    actions: {
        /**
         * 获取his病人住院记录
         */
        HisLogTimes({ commit }: { commit: any }, hisCode: string) {
            return hisLogTimes(hisCode);
        },
        InsertionDiagnosisList({ commit }: { commit: any }, pinYin: string) {
            return new Promise(async (resolve, reject) => {
                const list = await insertionDiagnosisList(pinYin);
                resolve(list.data);
            });
        }
    }
};
export default HisLogTimesObj;
