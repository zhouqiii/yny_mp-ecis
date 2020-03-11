import request from '@/router/axios';

/**
 * 获取his门急诊挂号记录列表
 */
export const hisClinicPatientVisitGet = (data: any) => {
  return request.get(`/api/core/hisClinicPatientVisit/page`,
  {params: data});
};
/**
 * 获取his 门急诊记录和住院记录
*/
export const hisLogGet = (data: any) => {
  return request.get(`/api/core/patientvisit/getHisLog`,
  {params: data});
};
