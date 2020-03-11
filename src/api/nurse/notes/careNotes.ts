
import request from '@/router/axios';
/**
 * 获取护理类型
 */
export const getNursingCare = () => {
  return request({
    url: '/api/core/nursingcare/list',
    method: 'get'
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
 * 获取护理记录列表
 */
export const getNursingCareList = () => {
  return request({
    url: '/api/core/patientnursingcare/list',
    method: 'get'
  });
};
/**
 * 编辑护理记录
 * @param obj
 */
export const editNursingCare = (obj: any) => {
  return request({
    url: '/api/core/patientnursingcare',
    method: 'put',
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
