import request from '@/router/axios';


/**
 * 统计
 */
export const getVisitNumber = (date: any) => {
  return request.get(`/api/core/patientvisit/patientStatistics/${date}`);
};
