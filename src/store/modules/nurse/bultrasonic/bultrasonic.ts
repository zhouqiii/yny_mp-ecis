import {saveBedside, getBedsideList, deleteBedsideList, putBedside} from '@/api/nurse/bultrasonic/bultrasonic';

const BULtrasonic = {
  actions: {
      /**
       * 新增病人彩色多普勒床旁超声
       */
      SaveBedside({ commit }: { commit: any }, obj: any) {
          return saveBedside(obj);
      },
      /**
       * 病人彩色多普勒床旁超声列表
       */
      GetBedsideList({ commit }: { commit: any }, params: Page) {
        return getBedsideList(params);
      },
      DeleteBedsideList({ commit }: { commit: any }, id: number) {
        return deleteBedsideList(id);
      },
      PutBedside({ commit }: { commit: any }, id: number) {
        return putBedside(id);
      }
  }
};
export default BULtrasonic;
