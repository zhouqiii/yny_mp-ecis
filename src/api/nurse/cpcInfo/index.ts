import request from '@/router/axios';

/**
 * 新增胸痛上传信息
 */
export const cpcInfoPost = (data: any) => {
  return request.post('/api/core/cpcinfo', data);
};

/**
 * 修改胸痛上传信息
 */
export const cpcInfoPut = (data: any) => {
  return request.put('/api/core/cpcinfo', data);
};

/**
 * 通过id查询胸痛上传信息
 */
export const cpcInfoGet = (visitId: string) => {
  return request.get(`/api/core/cpcinfo/${visitId}`);
};

/**
 * 删除胸痛上传信息
 */
export const cpcInfoDelete = (visitId: string) => {
  return request.delete(`/api/core/cpcinfo/${visitId}`);
};

/**
 * 胸痛上传信息分页查询
 */
export const cpcInfo = (params: Page) => {
  return request.get('/api/core/cpcinfo/page', {params});
};
