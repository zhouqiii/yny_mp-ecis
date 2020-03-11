import request from '@/router/axios';

/**
 * 保存预检分诊
 * @param patientData 预检分诊对象
 */
export const triageInfo = (patientData: any) => {
  return request.post('/api/core/patient/triageInfo', patientData);
};

/**
 * 查询挂号
 */
export const hispatientvisitList = () => {
  // request.interceptors.request.use((config: any) => {
  //   const token = store.get(Config.ACCESS_TOKEN);
  //   config.headers.Authorization = 'Bearer ' + token;
  // });
  return request.get('/api/his/hispatientvisit/list');
};

/**
 * 查询病人列表
 */
// export const getPatientList = () => {
//   return request.get('/api/pretriage/patient/listDetail');
// };

/**
 * 根据条件查询病人列表
 */
export const getPatientListByParam = (params: any) => {
  return request.get('/api/core/patient/listDetail', {params});
};

/**
 * 主诉树形接口
 */
export const symptomTree = () => {
  return request.get('/api/core/symptom/tree');
};
