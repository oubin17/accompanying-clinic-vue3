import request from '../utils/request'

//发送验证码
export const getCode = (params) => {
  return request.get('/sms/code', {
    params
  })
}

//用户注册
export const userRegister = (data) => {
  return request.post('/user/register', data)
}

//登录
export const userLogin = (data) => {
  return request.post('/user/login', data)
}

//当前用户角色
export const userPermission = (params) => {
  return request.get('/permission/list/userId', { params })
}

//系统所有角色
export const allRole = (params) => {
  return request.get('/permission/list', { params })
}

//菜单权限数据
export const permissionList = () => {
  return request.get('/permission/all')
}

//菜单权限数据
export const addRole = (data) => {
  return request.post('/permission/role/add', data)
}


