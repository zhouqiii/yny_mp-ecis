import request from '@/router/axios';
/**
 * 医生交接保存
 */
export const putDoctorHandover = (data: {handoverList: any[]}) =>
    request.put('/api/core/doctor-has-patient/handover', data);
/**
 * 护士交接保存
 */
export const putNurseHandover = (data: {handoverList: any[]}) =>
    request.put('/api/core/nurse-has-patient/handover', data);
