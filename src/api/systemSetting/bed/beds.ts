
import request from '@/router/axios';
/**
 * 获取床位列表
 */
export const getBedList = () => {
  return request({
    url: '/api/core/bed/list',
    method: 'get'
  });
};
/**
 * 获取医生
 */
export const getdoctors = () => {
  return request({
    url: '/api/admin/user/listDoctor',
    method: 'get'
  });
};
/**
 * 新增床位
 * @param obj
 */
export const saveBed = (obj: any) => {
  return request({
    url: '/api/core/bed',
    method: 'post',
    data: obj
  });
};

/**
 * 编辑床位
 * @param obj
 */
export const editBed = (obj: any) => {
  return request({
    url: '/api/core/bed',
    method: 'put',
    data: obj
  });
};
/**
 * 删除护理记录
 * @param obj
 */
export const delBed = (obj: any) => {
  return request({
    url: '/api/core/bed/' + obj,
    method: 'delete'
  });
};
