
import request from '@/router/axios';
/**
 * 获取病人床位列表
 */
export const getBedCardList = () => {
  return request({
    url: '/api/core/bed/bedCard',
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
 * 保存病人床位
 * @param obj
 */
export const saveBedCard = (obj: any) => {
  return request({
    url: '/api/core/patienttriage',
    method: 'put',
    data: obj
  });
};
/**
 * 修改床位编号
 * @param list 互换的床位
 */
export const saveBedCardList = (list: any) => {
  return request({
    url: '/api/core/patienttriage/bedCode',
    method: 'put',
    data: list
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
