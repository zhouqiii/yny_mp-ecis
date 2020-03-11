import request from '@/router/axios';

/**
 * 查询生命特征
 * @param visitId 就诊id
 */
export const getVitalSignByVisitId = (visitId: any) => {
  return request.get(`/api/core/vitalsign/visitId/${visitId}`);
};
