import {cpcInfoPost, cpcInfoPut, cpcInfoGet, cpcInfoDelete, cpcInfo} from '@/api/nurse/cpcInfo';
const CpcInfoObj = {
    actions: {
        /**
         * 新增胸痛上传信息
         */
        CpcInfoPost({ commit }: { commit: any }, obj: any) {
            return cpcInfoPost(obj);
        },
        /**
         * 修改胸痛上传信息
         */
        CpcInfoPut({ commit }: { commit: any }, obj: any) {
            return cpcInfoPut(obj);
        },
        /**
         * 通过id查询胸痛上传信息
         */
        CpcInfoGet({ commit }: { commit: any }, visitId: string) {
            return cpcInfoGet(visitId);
        },
        /**
         * 删除胸痛上传信息
         */
        CpcInfoDelete({ commit }: { commit: any }, visitId: string) {
            return cpcInfoDelete(visitId);
        },
        /**
         * 胸痛上传信息分页查询
         */
        CpcInfo({ commit }: { commit: any }, params: Page) {
            return cpcInfo(params);
        }
    }
};
export default CpcInfoObj;
