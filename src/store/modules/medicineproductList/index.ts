import { medicineproductList, medicineOfferList } from '@/api/medicineproduct';
const medicineproduct = {
  state: {
  },
  actions: {
    /**
     * 所有药名
     * @param param0
     */
    MedicineproductList({ commit }: { commit: any }) {
      return medicineproductList();
    },
    /**
     * 药品关系表
     * @param param0
     */
    MedicineOfferList({commit}: {commit: any}) {
        return medicineOfferList();
    }
  },
  mutations: {
  },
  getters: {
  }
};
export default medicineproduct;
