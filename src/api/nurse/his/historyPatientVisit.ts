import request from '@/router/axios';

/**
 * 获取his就诊历史记录列表
 */
export const hisPatientVisitGet = (data: any) => {
  return request.get(`/api/core/hispatientvisit/page`,
  {params: data});
};
