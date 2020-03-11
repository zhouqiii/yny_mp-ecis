import request from '@/router/axios';

export const menuList = () => request.get('/api/admin/menu/tree');
