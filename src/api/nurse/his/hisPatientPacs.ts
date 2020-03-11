import request from '@/router/axios';

/**
 * 查询PACS结果
 */
export const hisPatientPacsGet = (data: any) => {
  return request.get(`/api/core/hisPatientPacs/page`,
  {params: data});
};
