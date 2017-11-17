/*
* 接口
* */
import axios from 'axios'
/*
* 微信
*/
// 授权状态
export const auth = (url) => axios({
  method: 'post',
  url: '/wx/auth'
})
// 获取wjs
export const getWxJs = (url = location.href) => axios({
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
export const getSimulation = (mobile) => axios({
  method: 'post',
  url: '/wx/simulation/auth',
  params: {
    wid: 100226
  }
})
