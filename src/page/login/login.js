import request from '../../util/request'

export function getCode() {
  return request({
    url: '/sys/getCheckCode',
    method: 'get',
  })
}
export function getInfo() {
  return request({
    url: '/ntocc/tmsInformationPlatform/Information',
    method: 'get',
  })
}
// 手机号验证码
export function getCodes(data) {
  return request({
    url: '/sms/send/verifyCode',
    method: 'post',
    data: data
  })
}
// 登录
export function getLogin(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: data
  })
}
export function getPhoneLogin(data) {
  return request({
    url: '/sys/phoneLoginPC',
    method: 'post',
    data: data
  })
}
// 弹窗信息
export function getAgreement(params) {
  return request({
    url: '/ntocc/tmsInformationPlatform/agreement',
    method: 'get',
    params
  })
}