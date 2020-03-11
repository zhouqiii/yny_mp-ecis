import request from '@/router/axios';

export const symptomList = () => {
  return request({
    url: '/api/core/symptom/tree',
    method: 'get'
  });
};

/**
 * 工作站
 */
export const workstation = () => {
  return request({
    url: '/api/core/workstation/tree',
    method: 'get'
  });
};
/**
 * 通过设备获取生命特征
 */
export const lifeCharacteristicsByEquipment = (param: {id: string}) => {
  return request({
    url: `/api/core/vitalsign/last/${param.id}`,
    method: 'get'
  });
};
