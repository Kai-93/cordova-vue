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

// 获取营销课程列表信息
export const getMarketingList = () => instance({
  method: 'post',
  url: '/wx/mc/list'
})

// 营销课程视频播放情况数据统计
export const marketingVideoStatistics = () => instance({
  method: 'post',
  url: '/wx/mc/play/video'
})

// 营销课程详细信息
export const getMarketingDetail = (courseId) => instance({
  method: 'post',
  url: `/wx/mc/detail/${courseId}`
})
