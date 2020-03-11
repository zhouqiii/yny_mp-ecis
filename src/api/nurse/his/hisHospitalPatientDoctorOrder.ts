import request from '@/router/axios';

/**
 * 获取his住院病人医嘱
 */
export const hisHospitalPatientDoctorOrderGet = (data: any) => {
  return request.get(`/api/core/hisHospitalPatientDoctorOrder/page`,
  {params: data});
};
