import request from '@/router/axios';

/**
 * 添加病人彩色多普勒床旁超声
 */
export const saveBedside = (data: any) => {
  return request.post('/api/core/patient-bedside-b-ultrasonic', data);
};
/**
 * 彩色多普勒床旁超声列表
 */
export const getBedsideList = (params: Page) => {
  return request.get(`/api/core/patient-bedside-b-ultrasonic/page`, {params});
};
/**
 * 彩色多普勒床旁超声删除
 */
export const deleteBedsideList = (id: number) => {
  return request.delete(`/api/core/patient-bedside-b-ultrasonic/${id}`);
};
/**
 * 彩色多普勒床旁超声修改
 */
export const putBedside = (data: any) => {
  return request.put(`/api/core/patient-bedside-b-ultrasonic`, data);
};
