import request from '@/router/axios';
/**
 * 查看模版
 */
export const tmpList = () => {
  return request.get(`/api/core/medicalrecorditemtemplate/page?size=100`);
};
/**
 * 查看模版
 */
export const patientmedicalrecorditemList = (visitId: string) => {
  return request.get(`/api/core/patientmedicalrecorditem/list?patientVisitId=${visitId}`);
};

/**
 * 添加病人病历
 */
export const patientmedicalrecorditemPost = (obj: any) => {
  return request.post('/api/core/patientmedicalrecorditem', obj);
};

/**
 * 修改病人病历
 */
export const patientmedicalrecorditemPut = (obj: any) => {
  return request.put('/api/core/patientmedicalrecorditem', obj);
};

/**
 * 删除病人病历
 */
export const patientmedicalrecorditemDelete = (id: string|number) => {
  return request.delete(`/api/core/patientmedicalrecorditem/${id}`);
};
/**
 * 获取插入检查信息
 * @param hisCode 病人编码
 */
export const getLis = (hisCode: string) => {
  return request.get(`/api/core/patientlis/getLis/${hisCode}`);
};
/**
 * 获取插入医嘱信息
 * @param hisCode 病人编码
 */
export const getDoctorOrder = (hisCode: string) => {
  return request.get(`/api/core/hisClinicPatientDoctorOrder/getDoctorOrder/${hisCode}`);
};
/**
 * 获取插入检验信息
 * @param hisCode 病人编码
 */
export const getPacs = (hisCode: string) => {
  return request.get(`/api/core/hisPatientPacs/getPacs/${hisCode}`);
};
export default {
  tmpList,
  patientmedicalrecorditemPost,
  patientmedicalrecorditemPut,
  patientmedicalrecorditemDelete,
  patientmedicalrecorditemList,
  getLis,
  getDoctorOrder,
  getPacs
};
