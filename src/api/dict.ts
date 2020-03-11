import request from '@/router/axios';

export function fetchList() {
  return request({
    url: '/api/admin/dict/page',
    method: 'get',
  });
}
/**
 * 字典列表
 */
export function dictList() {
  return request({
    url: '/api/admin/dict/list',
    method: 'get',
  });
}
export function addObj(obj: any) {
  return request({
    url: '/admin/dict/',
    method: 'post',
    data: obj
  });
}

export function getObj(id: any) {
  return request({
    url: '/admin/dict/' + id,
    method: 'get'
  });
}

export function delObj(row: any) {
  return request({
    url: '/admin/dict/' + row.id + '/' + row.type,
    method: 'delete'
  });
}

export function putObj(obj: any) {
  return request({
    url: '/admin/dict/',
    method: 'put',
    data: obj
  });
}

export function remote(type: any) {
  return request({
    url: '/admin/dict/type/' + type,
    method: 'get'
  });
}
