import request from '@/router/axios';
import Duty from '@/store/modules/nurse/statistics/duty';

export const adminInfo = () => {
  return request({
    url: '/api/admin/user/info',
    method: 'get'
  });
};
export const updateUser = (obj: any) => {
  // debugger;
  // console.log("============"+obj)
  return request.put('/api/admin/user/edit',obj);
};
