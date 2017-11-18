/*
* 接口
* */
import axios from 'axios'
/*
* 微信
*/
let baseURL = 'http://devsheji.yanzijia.cn'
if (!window.cordova) {
  baseURL = ''
}

let instance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json; charset=UTF-8' }
})

// 授权状态
export const auth = (url) => instance({
  method: 'post',
  url: '/wx/auth'
})
// 获取wjs
export const getWxJs = (url = location.href) => instance({
  method: 'post',
  url: '/wx/get/wxjs',
  params: {
    url: url
  }
})
/*
* 登入模块
*/
// 获取登入信息
export const getSimulation = (mobile) => instance({
  method: 'post',
  url: '/wx/simulation/auth',
  params: {
    wid: 100226
  }
})
