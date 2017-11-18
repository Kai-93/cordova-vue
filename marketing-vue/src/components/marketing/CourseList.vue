<template>
  <div id="container" class="mcContainer">
    <div class="course-video-container">
      <video id="list_video"
             src="http://of9vt0139.bkt.clouddn.com/%E7%BD%91%E7%BB%9C%E8%90%A5%E9%94%8052%E6%8B%9B%20%E4%BB%8B%E7%BB%8D%E8%A7%86%E9%A2%91.mp4"
             class="video-js" webkit-playsinline playsinline controls preload="auto" width="100%"
             poster="../../../static/img/marketing-course-preview.jpg" data-setup="{}">
        <source
          src="http://of9vt0139.bkt.clouddn.com/%E7%BD%91%E7%BB%9C%E8%90%A5%E9%94%8052%E6%8B%9B%20%E4%BB%8B%E7%BB%8D%E8%A7%86%E9%A2%91.mp4"
          type="video/mp4">
        <p class="vjs-no-js">暂不支持您的手机型号!</p>
      </video>
      <!--播放按钮-->
      <div class="play-btn-container" v-show="list_video_btn">
        <a href="javascript:;" class="video-play-btn" @click.stop="play"></a>
      </div>
      <!--海报封面-->
      <div class="video-poster" v-show="list_video_btn">
        <img src="../../../static/img/marketing-course-preview.jpg" alt="海报封面">
      </div>
    </div>

    <!--推荐课程-->
    <div class="marketing-course-container" style="margin-top: 0">
      <header class="marketing-course-head">
        <p class="title-students">已有 <span>{{learn_count}}</span> 位发型师加入学习</p>
      </header>
      <section class="marketing-course-content">
        <div class="course-introduce-wrapper">
          <div class="word-content">
            <p class="course-title">可永久观看全年52节课程，树⽴专业发型设计师形象，成为最会营销的发型师。</p>
            <span class="label margin-left">最全面</span>
            <span class="label">最实用</span>
            <span class="label no-after">最良心</span>
          </div>
          <div class="price-box" :class="has_buy_course==0 ? '': 'off'" @click="buy_course">
            <p class="price-content" :style="origin === '0'?'':'font-size:.45rem'">
              {{ origin === 0 ? '￥47' : '47美币'}}</p>
            <a class="price-btn" href="javascript:;">{{ has_buy_course === 0 ? '购买学习' : '已购买'}}</a>
          </div>
        </div>
      </section>
    </div>

    <!--课程列表-->
    <div class="marketing-course-container">
      <header class="marketing-course-head">
        <p class="title-live">共52个课程，已播出 <span>{{course_count}}</span> 个</p>
      </header>
      <template v-for="course in course_list">
        <section class="marketing-course-content course-video-off" v-if="course.status === 1">
          <div class="course-rows">
            <div class="image-show">
              <img :src="course.cover | imgFile" alt="课程封面">
            </div>
            <div class="course-details">
              <p class="course-title">{{course.title}}</p>
              <p class="course-teacher">讲师：{{course.lecturer_name}}</p>
              <span v-for="tag in course.tags">{{tag | textInterception('5')}}</span>
            </div>
          </div>
          <a class="open-btn-off" href="javascript:;">即将播出</a>
          <p class="open-time">{{course.preview_time}}</p>
        </section>
        <section class="marketing-course-content" v-if="course.status === 2" @click="toOther($event,course.course_id)">
          <div class="course-rows">
            <div class="image-show">
              <img :src="course.cover | imgFile" alt="课程封面">
            </div>
            <div class="course-details">
              <p class="course-title">{{course.title}}</p>
              <p class="course-teacher">讲师：{{course.lecturer_name}}</p>
              <span v-for="tag in course.tags">{{tag | textInterception('5')}}</span>
            </div>
          </div>
          <a v-if="course.study==0" class="listen-course-btn">听课</a>
          <a v-else class="learned">已学习</a>
          <div class="play-details">
            <p>发布：{{course.release_time | time_format}}</p>
            <p>时长：{{course.course_time}}分</p>
            <p>播放：{{1800 + 3 * course.play_times}}次</p>
          </div>
        </section>
      </template>
    </div>
    <footer class="marketing-footer">
      <p>－更多课程敬请期待－</p>
    </footer>
  </div>
</template>

<script>
  import Vue from 'vue'
  import mobileBinding from '../extend/mobileBinding.vue'
  import MyAlert from '../extend/MyAlert.vue'
  import $ from 'jquery'

  export default {
    data () {
      return {
        learn_count: 0, // 学习人数
        course_count: 0, // 播放数量
        course_list: [], // 课程列表
        has_buy_course: 0, // 是否购买课程
        uid: 0,  // 是否绑定
        has_subscribe: 0,
        origin: 0,
        has_user: 'create',
        resData: {},
        scrolltopValue: 0,
        list_video_btn: true
      }
    },
    mounted: function () {
      let vm = this
      document.title = '营销课程'
      let timer = setTimeout(function () {
        clearTimeout(timer)
        if (sessionStorage.getItem('top') === null) {
          window.scrollTo(0, 0)
        } else {
          window.scrollTo(0, Number(sessionStorage.getItem('top')))
        }
        window.funPlay = function () {
          document.querySelector('#list_video').play()
          vm.list_video_btn = false
        }
        window.funPaused = function () {
          document.querySelector('#list_video').pause()
          vm.list_video_btn = true
        }
      }, 500)
      /* 获取用户网络状态，视频自动播放 */
      let timer2 = setTimeout(function () {
        clearTimeout(timer2)
        window.wx.getNetworkType({
          success: function (res) {
            let networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
            if (networkType === 'wifi') {
              vm.play()
            }
          }
        })
      }, 2000)
    },
    updated: function () {
      let timer = setTimeout(function () {
        clearTimeout(timer)
        // 分享给朋友
        window.wx.onMenuShareAppMessage({
          title: '美业设计助手·一键生成美图', // 分享标题
          desc: '让美业人的每一条朋友圈，都在这里找到模板', // 分享描述
          link: 'http:// mp.weixin.qq.com/s/MVZBauxQxdSieGdrRLowZA', // 分享链接
          imgUrl: document.getElementById('app').dataset.domain + '../../static/img/share.jpg', // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
            // $.diyAlert("分享成功！");
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            // alert("用户取消分享！");
          }
        })
        // 分享到朋友圈
        window.wx.onMenuShareTimeline({
          title: '美业设计助手·一键生成美图', // 分享标题
          desc: '让美业人的每一条朋友圈，都在这里找到模板', // 分享描述
          link: 'http:// mp.weixin.qq.com/s/MVZBauxQxdSieGdrRLowZA', // 分享链接
          imgUrl: document.getElementById('app').dataset.domain + '../../static/img/share.jpg', // 分享图标

          success: function () {
            // 用户确认分享后执行的回调函数
            // $.diyAlert("分享到朋友圈成功！");
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })
      }, 1000)
    },
    methods: {
      play () {
        document.querySelector('#list_video').play()
        this.list_video_btn = false
      },
      /*
       * 业务逻辑更改
       * 更改者:Kaiser
       * */
      buy_course: function () {
        /* 未购买的点击才有效 */
        window.vue = this
        if (parseInt(this.has_buy_course) === 0) {
          /*
           * origin: 0为web,ios为苹果,android为安卓
           * */
          if (parseInt(this.origin) === 0) {
            if (parseInt(this.has_subscribe) === 0) {
              /* has_subscribe:0为未关注的用户 */
              // 弹出关注二维码
              let gdata = {
                alert_name: 'kf-alert',
                popover_name: 'alert-qrCode-bg',
                has_title: true,
                title: '请先关注我们再加入会员哦',
                title_p_class: 'kf-alert-title',
                mode: 'html',
                msg: '<div class="qrCoder-container"><img src="../../static/img/weiguanzhu.jpg" alt="未关注二维码"></div><p class="qrCode-prompt">长按识别二维码加入</p>',
                sure_btn: false,
                cancel_btn: false,
                right_top_close_btn: true
              }
              let Alert = Vue.extend(MyAlert).extend({
                data: function () {
                  return gdata
                }
              })
              new Alert().$mount('#popout')
            } else if (parseInt(this.uid) === 0) {
              /* uid:0为未绑定手机号码的用户 */
              // 弹出绑定手机弹窗
              let mdata = {
                alert_name: 'kf-alert',
                sure_btn_class: 'kf-alert-btn',
                has_user: this.has_user
              }
              let Alert = Vue.extend(mobileBinding).extend({
                data: function () {
                  return mdata
                }
              })
              new Alert().$mount('#popout')
            } else {
              /* 去购买 */
              let nowTime = new Date().getTime()
              let clickTime = $(this).attr('ctime')
              if (clickTime !== 'undefined' && (nowTime - clickTime < 3000)) {
                return false
              } else {
                $(this).attr('ctime', nowTime)
              }
              $.post('/wx/order/create', {
                'order_type': 'mc'
              }, function (res) {
                if (res.status === 1) {
                  window.location.href = '/wx/pay/order/index/' + res.order_id
                } else {
                  alert('创建订单失败')
                }
              }, 'json')
            }
          } else {
            if (this.app_version < '2.2.0') {
              $.post('/wx/order/create', {
                'order_type': 'mc'
              }, function (res) {
                if (res.status === 1) {
                  window.location.href = '/app/pay/index/' + res.order_id
                } else {
                  alert('创建订单失败')
                }
              }, 'json')
            } else {
              if (this.origin === 'ios') {
                window.webkit.messageHandlers.funAppPay.postMessage('mc')
              } else if (this.origin === 'android') {
                window.android.funAppPay('mc')
              }
            }
          }
        }
        /* 购买视频暂停 */
        document.querySelector('#list_video').pause()
        this.list_video_btn = true
      },
      close_alert: function () {
        this.bind_mobile = false
      },
      toOther: function (event, courseId) {
        this.$router.push('/course/details/' + courseId)
      },
      funIsOwnEmpty (obj) {
        for (let name in obj) {
          if (obj.hasOwnProperty(name)) {
            return false
          }
        }
        return true
      }
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        vm.app_version = $('#app_version').val()
        vm.isWatch = true
        let str = JSON.parse(sessionStorage.getItem('obj'))
        if (!vm.funIsOwnEmpty(str)) {
          vm.resData = str
          vm.learn_count = str.learn_count
          vm.course_count = str.course_count
          vm.course_list = str.course_list
          vm.mc_carousel = str.mc_carousel
          vm.has_buy_course = str.has_buy_course
          vm.uid = str.uid
          vm.has_subscribe = str.has_subscribe
          if (str.ak === 'wx') {
            vm.origin = 0
          } else {
            vm.origin = str.ak
          }
          vm.has_user = str.has_user
        } else {
          $.post('/wx/mc/list', function (res) {
            if (res.error_code === 20018) {
              window.location.href = '/wx/login'
              return false
            }
            let timer1 = setTimeout(function () {
              clearTimeout(timer1)
              window.MtaH5 && window.MtaH5.clickStat('MarketingCourse')
            }, 2000)
            vm.learn_count = res.learn_count
            vm.course_count = res.course_count
            vm.course_list = res.course_list
            vm.mc_carousel = res.mc_carousel
            vm.has_buy_course = res.has_buy_course
            vm.uid = res.uid
            vm.has_subscribe = res.has_subscribe
            if (res.ak === 'wx') {
              vm.origin = 0
            } else {
              vm.origin = res.ak
            }
            vm.has_user = res.has_user
            vm.resData = res
          })
          return
        }
        $.post('/wx/mc/list', function (res) {
          if (res.error_code === 20018) {
            window.location.href = '/wx/login'
            return false
          }
          let timer = setTimeout(function () {
            clearTimeout(timer)
            window.MtaH5 && window.MtaH5.clickStat('MarketingCourse')
          }, 2000)
          /* 关注状态改变 */
          if (vm.has_subscribe !== res.has_subscribe) {
            vm.has_subscribe = res.has_subscribe
          }
          /* 绑定手机状态改变 */
          if (vm.uid !== res.uid) {
            vm.uid = res.uid
          }
          /* 购买状态的改变 */
          if (vm.has_buy_course !== res.has_buy_course) {
            vm.has_buy_course = res.has_buy_course
          }
        })
      })
    },
    beforeRouteLeave (to, from, next) {
      let vm = this
      let str = JSON.stringify(vm.resData)
      sessionStorage.obj = str
      vm.scrolltopValue = parseInt(document.documentElement.scrollTop || document.body.scrollTop)
      sessionStorage.setItem('top', vm.scrolltopValue)
      next(true)
    }
  }
</script>
