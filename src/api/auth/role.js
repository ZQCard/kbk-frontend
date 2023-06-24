import request from '@/utils/request'

export function listRoleAll(params) {
  return request({
    url: '/admin/v1/authorization/roleAll',
    method: 'get',
    params
  })
}

export function listRole(params) {
  return request({
    url: '/admin/v1/authorization/roles',
    method: 'get',
    params
  })
}

export function createRole(data) {
  return request({
    url: '/admin/v1/authorization/role',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/admin/v1/authorization/role',
    method: 'put',
    data
  })
}

export function deleteRole(params) {
  return request({
    url: '/admin/v1/authorization/role',
    method: 'delete',
    params
  })
}

export function saveRoleMenu(data) {
  return request({
    url: '/admin/v1/authorization/roleMenu',
    method: 'post',
    data
  })
}

export function getRolePolicies(params) {
  return request({
    url: '/admin/v1/authorization/getPolicies',
    method: 'get',
    params
  })
}

export function saveRolePolicies(data) {
  return request({
    url: '/admin/v1/authorization/updatePolicies',
    method: 'post',
    data
  })
}

export function getRoleMenuBtn(params) {
  return request({
    url: '/admin/v1/authorization/roleMenuBtn',
    method: 'get',
    params
  })
}

export function setRoleMenuBtn(data) {
  return request({
    url: '/admin/v1/authorization/roleMenuBtn',
    method: 'post',
    data
  })
}

export function saveAdministratorRole(data) {
  return request({
    url: '/admin/v1/authorization/setRolesForUser',
    method: 'post',
    data
  })
}

export function getAdministratorRole(params) {
  return request({
    url: '/admin/v1/authorization/getRolesForUser',
    method: 'get',
    params
  })
}

export function getRoleAdministrator(params) {
  return request({
    url: '/admin/v1/authorization/getUsersForRole',
    method: 'get',
    params
  })
}

export function deleteRoleAdministrator(params) {
  return request({
    url: '/admin/v1/authorization/deleteRoleForUser',
    method: 'delete',
    params
  })
}



