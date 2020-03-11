import { triageInfo, hispatientvisitList, getPatientListByParam, symptomTree } from '@/api/nurse';
import { Loading } from 'element-ui';
import Config from '@/util/config';
const CareData = {
state: {
},
actions: {
    // 预检分诊保存接口
    TriageInfo(commit: any, p: any) {
        const loadingInstance = Loading.service(Config.LOADING_OPTIONS);
        const result = triageInfo(p);
        result.then(() => loadingInstance.close()).catch(() => loadingInstance.close());
        return result;
    },
    HispatientvisitList() {
        return hispatientvisitList();
    },
    // GetPatientList() {
    //     return getPatientList();
    // },
    GetPatientListByParam(commit: any, param: any) {
        return getPatientListByParam(param);
    },
    /**
     * 查找主诉
     * @param commit
     */
    SymptomTree(commit: any) {
        return symptomTree();
    }
},
mutations: {
},
getters: {
}
};
export default CareData;
