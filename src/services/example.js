import { get, request } from '../utils/request';

export function query() {
  
}

export function listUsers(payload) {
  return get('/api/user');
}

export function createUser(payload) {
  return request('POST', '/api/user', payload);
}

export function deleteUser(payload) {
  return request('DELETE', `/api/user/${payload.id}`);
}

export function listFactory(payload) {
  return get('/api/factory');
}