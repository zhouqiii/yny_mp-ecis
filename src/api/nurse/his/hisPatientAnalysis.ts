import request from '@/router/axios';

/**
 * 获取his病人检验记录列表
 */
export const hisPatientAnalysisGet = (data: any) => {
  return request.get(`/api/core/hisPatientAnalysis/page`,
  {params: data});
};
/**
 * 获取his 病人检验的最近一次记录
 */
export const hisPatientAnalysisLastGet = (data: any) => {
  return request.get(`/api/core/hisPatientAnalysis/last`,
  {params: data});
};
