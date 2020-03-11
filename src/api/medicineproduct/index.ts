import request from '@/router/axios';

/**
 * 查询药品
 */
export const medicineproductList = () => {
  return request.get('/api/core/medicineproduct/list');
};
/**
 * 查询药品关系表
 */
export const medicineOfferList = () => {
    return request.get('/api/core/medicineOfferList/list');
  };
