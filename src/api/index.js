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