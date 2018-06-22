import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryMyUsers() {
  return request('http://10.22.112.182:58157/User/getUsers');
}
