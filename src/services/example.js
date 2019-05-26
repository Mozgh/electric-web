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

export function createFactory(payload) {
  return request('POST', 'api/factory', payload);
}

export function createWorkshop(payload) {
  return request('POST', `api/factory/${payload.factoryId}/workshop`, payload);
}

export function listWorkshop(payload) {
  return get(`/api/factory/${payload.id}/workshop`);
}

export function listCircuit(payload) {
  return get(`/api/workshop/${payload.id}/circuit`)
}

export function createCircuit(payload) {
  return request('POST', `api/workshop/${payload.workshopId}/circuit`, payload);
}

export function listData(payload) {
  return get(`/api/circuit/${payload.cid}/data/A`, payload);
}

export function downloadTemplate(payload) {
  return get("/api/data/template");
}