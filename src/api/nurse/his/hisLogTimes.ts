import request from '@/router/axios';

/**
 * 获取his病人检验记录列表
 */
export const hisLogTimes = (hisCode: string) => {
  return request.get(`/api/core/hisPatientAnalysis/page`, {params: {patientId: hisCode}});
};
export const insertionDiagnosisList = (pinYin: any) => {
  return request.get(`/api/core/diagnosis/list/${pinYin}`);
};
