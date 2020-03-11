import request from '@/router/axios';

export const userList = () => request.get('/api/admin/user/page?current=1&size=10000');
export const getSign = (id: number) => {
  return request.get(`/api/admin/user/sign/${id}`);
};
