import {getVisitNumber} from '@/api/nurse/statistics/duty';

const Duty = {
  actions: {
      /**
       * 统计
       */
      GetVisitNumber({ commit }: { commit: any }, date: string) {
          return getVisitNumber(date);
      },
  }
};
export default Duty;
