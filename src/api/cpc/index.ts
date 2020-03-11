import request from '@/router/axios';

/**
 * 急救信息
 */
export const postCpc = (obj: any) => {
  return request.post('/api/core/cpc', obj);
};
/**
 * 急救信息
 */
export const getCpc = (visitId: number) => {
  return request.get(`/api/core/cpc/${visitId}`);
};
/**
 * 急救信息
 */
export const putCpc = (obj: any) => {
  return request.put(`/api/core/cpc/`, obj);
};
