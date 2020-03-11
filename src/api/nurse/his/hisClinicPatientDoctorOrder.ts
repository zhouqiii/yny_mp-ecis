import request from '@/router/axios';

/**
 * 获取his门急诊病人医嘱列表
 */
export const hisClinicPatientDoctorOrderGet = (data: any) => {
  return request.get(`/api/core/hisClinicPatientDoctorOrder/page`,
  {params: data});
};
