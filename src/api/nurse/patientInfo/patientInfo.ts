
import request from '@/router/axios';

/**
 * 叫号更新状态
 * @param obj
 */
export const called = (obj: any) => {
  return request({
    url: '/api/core/patientvisit/reminder',
    method: 'put',
    data: obj
  });
};
/**
 * 撤销病人
 * @param obj
 */
export const removePatient = (obj: any) => {
  return request({
    url: '/api/core/patientvisit/status',
    method: 'put',
    data: obj
  });
};
/**
 * 设置病区
 * @param obj
 */
export const setArea = (obj: any) => {
  return request({
    url: '/api/core/patientposition/area',
    method: 'put',
    data: obj
  });
};
/**
 * 查看该医生病人信息
 */
export const getPatientList = (data: {doctorId: number}) =>
request.get('/api/core/doctor-has-patient/getPatientList', {params: data});
/**
 * 查看该护士病人信息
 * @param data 护士对象
 */
export const getNursePatientList = (data: {nurseId: number}) =>
request.get('/api/core/nurse-has-patient/getPatientList', {params: data});
