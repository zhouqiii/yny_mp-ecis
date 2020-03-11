import request from '@/router/axios';

/**
 * 获取his LIS结果
 */
export const hisPatientLisGet = (data: any) => {
  return request.get(`/api/core/hisPatientLis/page`,
  {params: data});
};
