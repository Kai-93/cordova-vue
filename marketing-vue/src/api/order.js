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
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
  }
})

// 授权状态
export const createOrder = (type = 'mc') => instance({
  method: 'post',
  url: '/wx/order/create',
  params: {
    'order_type': type
  }
})
