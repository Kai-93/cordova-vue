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
export const getMarketingList = (url) => instance({
  method: 'post',
  url: '/wx/mc/list'
})
