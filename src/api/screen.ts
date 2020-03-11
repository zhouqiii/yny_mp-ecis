import request from '@/router/axios';

export const say = (sayStr: string) => {
  return request.get(`/api/core/say/stringToSay?say=${sayStr}`);
};

export const getCalledPatient = () => {
  return request({
    url: '/api/core/patientvisit/calledPatient',
    method: 'get'
  });
};
