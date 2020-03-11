import request from '@/router/axios';

/**
 * 获取his住院记录列表
 */
export const hisHospitalPatientVisitGet = (data: any) => {
  return request.get(`/api/core/hisHospitalPatientVisit/page`,
  {params: data});
};
