
import request from '@/router/axios';
/**
 * 获取医嘱列表
 */
export const getPrescriptionList = (obj: any) => {
  return request({
    url: '/api/core/patientprescription/list/' + obj,
    method: 'get'
  });
};
/**
 * 获取拆分医嘱列表
 */
export const getSplitPrescriptionList = (obj: any) => {
  return request({
    url: '/api/core/patientprescriptionxitemsplit/list/' + obj,
    method: 'get'
  });
  // return request.get(
  //   `https://www.easy-mock.com/mock/5c10c75620db940942ebda3b/wdwd/core/patientprescriptionxitemsplit/list/${obj}`);
};
/**
 * 更新医嘱状态
 * @param obj
 */
export const editPrescriptionStatus = (obj: any) => {
  return request({
    url: '/api/core/patientprescription/status',
    method: 'put',
    data: obj
  });
};
/**
 * 更新拆分医嘱状态
 * @param objList
 */
export const editSplitPrescriptionStatus = (status: string, objList: any[]) => {
  return request({
    url: `/api/core/patientprescriptionxitemsplit/status/${status}`,
    method: 'put',
    data: objList
  });
};
/**
 * 获取护士类型
 */
export const getNurses = () => {
  return request({
    url: '/api/admin/user/listNurse',
    method: 'get'
  });
};
/**
 * 新增护理记录
 * @param obj
 */
export const saveNursingCare = (obj: any) => {
  return request({
    url: '/api/core/patientnursingcare',
    method: 'post',
    data: obj
  });
};
/**
 * 删除护理记录
 * @param obj
 */
export const delNursingCare = (obj: any) => {
  return request({
    url: '/api/core/patientnursingcare/' + obj,
    method: 'delete'
  });
};
