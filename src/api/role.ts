// http://localhost:8080/admin/role/page?current=1&size=20
import request from '@/router/axios';

export const roleList = () => request.get('/api/admin/role/page?current=1&size=20');
