import request from '@/router/axios';

export const patientEKG = ({equipmentNo,startDate, endDate}: TimeArea) => {
  return request({
    url: `/api/core/electrocardiogrampdf/getFiles/${equipmentNo}/${startDate}/${endDate}`,
    method: 'get'
  });
};
export const patientEKGList = (params: Page) => {
  return request.get(`/api/core/electrocardiogrampdf/page`, {params});
};
export const electrocardiogrampdfBinding = ({equipmentNo,fileNames}: any)=> {
  const currentPatient = JSON.parse(sessionStorage.getItem('currentPatient') as string);
  const adminInfo = JSON.parse(localStorage.getItem('admin_info') as string);
  return request.post(`/api/core/electrocardiogrampdf/binding`,{
    equipmentNo,fileNames,dId:currentPatient.visitId,pId:adminInfo.data.sysUser.userId
  });
};
