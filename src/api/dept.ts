import request from '@/router/axios';

export const deptList = () => {
  return request({
    url: '/api/admin/dept/tree',
    method: 'get'
  });
};
