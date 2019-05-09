import { get } from '../utils/request';

export function query() {
  
}

export function listUsers(payload) {
  console.log(payload);
  return get('/api/user');
}