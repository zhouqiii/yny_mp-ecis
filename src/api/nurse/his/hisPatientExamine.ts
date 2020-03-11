import request from '@/router/axios';

/**
 * 查询病人检查 his
 */
export const hisPatientExamineGet = (data: any) => {
  return request.get(`/api/core/hisPatientExamine/page`,
  {params: data});
};
/**
 * 获取his 病人检查的最近一次记录
 */
export const hisPatientExamineLastGet = (data: any) => {
  return request.get(`/api/core/hisPatientExamine/last`,
  {params: data});
};
