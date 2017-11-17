<template>
  <div id="container" class="mcContainer">
    <!--视频播放模块-->
    <div class="marketing-course-container">
      <div class="course-video-container">
        <video id="really-cool-video" class="video-js" webkit-playsinline playsinline controls preload="auto"
               width="100%"
               :poster="course.video_cover | imgFile" data-setup="{}">
          <source :src="course.course_video | videoFile" type="video/mp4">
          <p class="vjs-no-js">暂不支持您的手机型号!</p>
        </video>
        <!--播放按钮-->
        <div class="play-btn-container" v-show="video_btn">
          <a href="javascript:;" class="video-play-btn" @click.stop="play"></a>
        </div>
        <!--海报封面-->
        <div class="video-poster" v-show="video_btn">
          <img :src="course.video_cover | imgFile" alt="海报封面">
        </div>
      </div>
      <header class="marketing-course-head">
        <h1 class="head-title">{{course.title}}</h1>
      </header>
      <section class="marketing-course-content">
        <div class="course-rows">
          <div class="play-details">
            <p>发布：{{course.release_time | time_format}}</p>
            <p class="video-time">{{course.course_time}}分</p>
            <p class="play-times">{{1800 + 3 * course.play_times}}次</p>
          </div>
          <div class="course-details">
            <span v-for="tag in tags">{{tag}}</span>
          </div>
        </div>
      </section>
    </div>

    <!--讲师简介模块-->
    <div class="marketing-course-container">
      <section class="marketing-course-content">
        <div class="course-rows">
          <div class="teacher-image">
            <img :src="lecturer.avatar | imgFile('!sq300')" alt="">
          </div>
          <div class="course-details">
            <p class="teacher-name">讲师：{{lecturer.name}}</p>
            <p class="teacher-jop">{{lecturer.title}}</p>
            <p class="teacher-introduce">
              {{lecturer.brief}}
            </p>
          </div>
        </div>
      </section>
    </div>

    <!--推荐话语-->
    <div class="marketing-course-container" v-show="words_show">
      <header class="marketing-course-head">
        <h1>推荐话术</h1>
        <a class="change-btn" @click="change_word">换一换</a>
      </header>
      <section class="marketing-course-content mc-padding-bottom">
        <div class="word-change-content">
          <p id="word_text">{{show_words}}</p>
          <button style="background-color: transparent" @click="copy_text" class="copy-btn" href="javascript:;">
            复制
          </button>
        </div>
      </section>
    </div>

    <!--推荐海报模块-->
    <div class="marketing-course-container" v-show="poster_show">
      <header class="marketing-course-head">
        <h1>推荐海报</h1>
        <a class="change-btn" @click="poster_change">换一换</a>
      </header>
      <section class="marketing-course-content">
        <div class="poster-change-content">
          <div v-for="poster in show_posters">
            <a class="poster-wrap" :href="poster.href">
              <img :src="poster.cover | imgFile" alt="">
            </a>
            <a class="poster-use-btn" :href="poster.href">使用</a>
          </div>
        </div>
      </section>
    </div>

    <!--课程详情模块-->
    <div class="marketing-course-container" v-show="course.course_detail.length">
      <header class="marketing-course-head">
        <h1>课程详情</h1>
      </header>
      <section class="marketing-course-content">
        <img class="course-details-image" v-for="course_detail in course.course_detail" :src="course_detail | imgFile"
             alt="">
      </section>
    </div>

    <!--讲师推荐课程模块-->
    <div class="marketing-course-container" v-show="related_courses.length">
      <header class="marketing-course-head">
        <h1>讲师推荐课程</h1>
      </header>
      <section class="marketing-course-content" v-for="course in related_courses"
               @click="toOther($event,course.course_id)">
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
        <a class="listen-course-btn">听课</a>
        <div class="play-details">
          <p>发布：{{course.release_time | time_format}}</p>
          <p>时长：{{course.course_time}}分</p>
          <p>播放次数：{{1800 + 3 * course.play_times}}次</p>
        </div>
      </section>
    </div>

    <!--空白-->
    <div style="width: 100%;height: 1.5rem;"></div>

    <!--底部按钮-->
    <div class="mc-btn-container">
      <a href="javascript:;" @click.stop="back" v-if="origin === 0" class="back-btn">营销课程</a>
      <a class="buy-btn" href="javascript:;" @click="pay" v-if="user_msg.has_buy_course === 1">永久学习（已购买）</a>
      <a class="buy-btn no" href="javascript:;" @click="pay"
         v-else-if="user_msg.left_days >= 1">限时听课（剩余{{user_msg.left_days}}天）</a>
      <a class="buy-btn no" href="javascript:;" @click="pay" v-else>购买学习（{{origin === 0 ? '￥47' : '47美币'}}）</a>
    </div>

    <!--未购买弹窗-->
    <div class="alert mc-prompt-alert" v-show="alert_pay">
      <div class="cover"></div>
      <div class="popover all-center">
        <header>
          <p class="mc-title">提示</p>
        </header>
        <section class="alert-content-1 ">
          <p>您还未购买营销课程，不能听课！购买可永久听课哦！</p>
        </section>
        <footer>
          <a class="mc-btn" @click="alert_pay=false">再看看</a>
          <a class="mc-btn" @click="pay">购买学习({{origin === 0 ? '￥47' : '47美币'}})</a>
        </footer>
      </div>
    </div>

    <!--文本复制成功弹窗-->
    <div class="alert mc-alert" v-show="isAlertText">
      <div class="cover"></div>
      <div class="popover all-center">
        <header>
          <p class="mc-title">提示</p>
        </header>
        <section class="alert-content">
          <p>{{alert_word_text}}</p>
        </section>
        <footer>
          <a @click="alert_text_close" class="mc-know-btn" href="javascript:;">我知道了</a>
        </footer>
      </div>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  import MyAlert from '../extend/MyAlert.vue'
  import mobileBinding from '../extend/mobileBinding.vue'
  import $ from 'jquery'

  export default {
    data () {
      return {
        course: { 'release_time': 0, 'course_detail': [] },
        lecturer: {},
        posters: [],
        all_info_complete: true,
        preview_temp: '',
        alert_word_text: '',
        show_posters: [],
        tags: [],
        recommend_word: [],
        show_words: [],
        poster_pos: 0,
        word_pos: 0,
        words_show: 0,
        poster_show: 0,
        uid: 0,  // 是否绑定
        has_subscribe: 0,
        origin: 0,
        has_user: 'create',
        has_buy_course: 0,
        user_msg: {},
        video_btn: true,
        pay_state: true,
        back_state: true,
        bind_mobile: false,
        alert_pay: false,
        isAlertText: false,
        isPageShow: false,
        related_courses: [],
        record_id: 0,
        popData: {
          isShow: '1',
          origin: ''
        }
      }
    },
    computed: {},
    mounted () {
      let vm = this
      document.title = '课程详情'
      /* 主页的返回 */
      window.addEventListener('popstate', function () {
        if (vm.isPageShow === true) {
          vm.preview_temp = ''
        }
      }, false)
    },
    methods: {
      pushHistory () {
        let vm = this
        let state = {
          title: 'title',
          url: '#'
        }
        window.history.pushState(state, 'title', '#1')
        vm.isPageShow = true
      },
      poster_change: function () {
        let vm = this
        let i = vm.poster_pos
        if (vm.posters.length > i * 3) {
          vm.poster_pos = i + 1
        } else {
          vm.poster_pos = 1
        }
        vm.show_posters = vm.posters.slice((vm.poster_pos - 1) * 3, vm.poster_pos * 3)
      },
      change_word: function () {
        let vm = this
        let j = vm.word_pos
        if (j < vm.recommend_word.length) {
          vm.word_pos = j + 1
        } else {
          vm.word_pos = 1
        }
        vm.show_words = vm.recommend_word[vm.word_pos - 1]
      },
      copy_text: function () {
        let vm = this
        if (window.Clipboard.isSupported() === false) {
          vm.isAlertText = true
          vm.alert_word_text = '请手动复制文本'
        } else {
          let clipBordText = $('#word_text').text()
          /* eslint-disable no-new */
          new window.Clipboard('.copy-btn', {
            text: function () {
              return clipBordText
            }
          })
          let timer = setTimeout(function () {
            clearTimeout(timer)
            vm.isAlertText = true
            vm.alert_word_text = '文本复制成功'
          }, 500)
        }
      },
      alert_text_close: function () {
        let vm = this
        vm.isAlertText = false
      },
      pay: function () {
        if (this.has_buy_course === 0) {
          /* 未购买 */
          /*
           * origin: 0为web,ios为苹果,android为安卓
           * */
          if (this.origin === 0) {
            if (this.has_subscribe === 0) {
              /* has_subscribe:0为未关注的用户 */
              // 弹出关注二维码
              let vm = this
              vm.alert_pay = false
              let gdata = {
                alert_name: 'kf-alert',
                popover_name: 'alert-qrCode-bg',
                has_title: true,
                title: '请先关注我们再加入会员哦',
                title_p_class: 'kf-alert-title',
                mode: 'html',
                msg: '<div class="qrCoder-container"><img src="/static/img/weiguanzhu.jpg" alt="未关注二维码"></div><p class="qrCode-prompt">长按识别二维码加入</p>',
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
              let vm = this
              vm.alert_pay = false
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
              /* 未购买 */
              let orderType = 'mc'
              let vm = this

              if (vm.pay_state) {
                vm.pay_state = false
                $.post('/wx/order/create', {
                  'order_type': orderType
                }, function (res) {
                  if (res.status === 1) {
                    if (!vm.video_btn) {
                      vm.countVideo(vm.$route.params.courseId, document.querySelector('video').currentTime, function () {
                        window.location.href = '/wx/pay/order/index/' + res.order_id
                      })
                    } else {
                      window.location.href = '/wx/pay/order/index/' + res.order_id
                    }
                  } else {
                    alert('创建订单失败')
                  }
                }, 'json')
                let timer = setTimeout(function () {
                  clearTimeout(timer)
                  vm.pay_state = true
                }, 3000)
              }
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
        } else {
          /* 已购买 */
          let cdata = {
            msg: '<p>您已购买！</p>',
            close_btn: '知道了',
            close_path: '',
            sure_btn: false,
            alert_name: 'mc-alert',
            has_title: true,
            title: '提示',
            mc_know_btn: true,
            mode: 'html'
          }

          let Alert = Vue.extend(MyAlert).extend({
            data: function () {
              return cdata
            }
          })

          new Alert().$mount('#popout')
        }
      },
      close_alert: function () {
        this.bind_mobile = false
      },
      play: function () {
        let vm = this
        if (parseInt(this.uid) !== 0) {
          /* 手机绑定 */
          /*
           * origin: 0为web,ios为苹果,android为安卓
           * */
          if (this.origin === 0) {
            if (vm.user_msg.left_days < 1 && vm.user_msg.has_buy_course !== 1) {
              /* 不是vip会员和未购买过营销课程 */
              // 弹出购买提示弹窗
              vm.alert_pay = true
            } else {
              /* 是会员或者不是会员已经购买 */
              vm.video_btn = false
              let timer = setTimeout(function () {
                clearTimeout(timer)
                document.querySelector('video').play()
              }, 500)
              vm.countVideo(vm.$route.params.courseId, '', function (res) {
                vm.record_id = res.record_id
              })
            }
          } else {
            if (vm.user_msg.left_days < 1 && vm.user_msg.has_buy_course !== 1) {
              /* 不是vip会员和未购买过营销课程 */
              // 弹出购买提示弹窗
              vm.alert_pay = true
            } else {
              /* 是会员或者不是会员已经购买 */
              vm.video_btn = false
              let timer = setTimeout(function () {
                clearTimeout(timer)
                document.querySelector('video').play()
              }, 500)
              vm.countVideo(vm.$route.params.courseId, '', function (res) {
                vm.record_id = res.record_id
              })
            }
          }
        } else {
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
        }
      },
      countVideo: function (courseId, playTime, callback) {
        let vm = this
        let data = {
          course_id: courseId,
          record_id: vm.record_id
        }
        if (playTime || playTime === 0) {
          data['playTime'] = parseInt(playTime)
        }
        $.post('/wx/mc/play/video', data, function (res) {
          if (res.status === 1) {
            if (callback) {
              callback(res)
            }
          }
        }, 'json')
      },
      back: function () {
        let vm = this

        if (vm.back_state) {
          vm.back_state = false
          vm.$router.push('/')
          let timer = setTimeout(function () {
            clearTimeout(timer)
            vm.back_state = true
          }, 3000)
        }
      },
      toOther: function (event, courseId) {
        this.$router.push('/course/details/' + courseId)
      },
      postData: function (vm) {
        $.post('/wx/mc/detail/' + vm.$route.params.courseId, function (res) {
          if (res.error_code === 20018) {
            window.location.href = '/wx/login'
            return
          }
          vm.course = res.course
          vm.lecturer = res.lecturer
          vm.posters = res.course.posters
          vm.show_posters = res.course.posters.slice(0, 3)
          vm.poster_pos = 1
          vm.recommend_word = res.course.recommend_word
          vm.show_words = res.course.recommend_word[0]
          vm.word_pos = 1
          vm.tags = res.course.tags
          vm.uid = res.user_msg.uid
          vm.has_buy_course = res.user_msg.has_buy_course
          vm.has_subscribe = res.user_msg.has_subscribe
          // ak值强制转化为0
          if (res.user_msg.ak === 'wx') {
            vm.origin = 0
          } else {
            vm.origin = res.user_msg.ak
          }
          vm.has_user = res.user_msg.has_user
          vm.user_msg = res.user_msg
          vm.words_show = res.course.words_show
          vm.poster_show = res.course.poster_show
          if (vm.recommend_word.length === 0) {
            vm.words_show = 0
          }
          if (vm.posters.length === 0) {
            vm.poster_show = 0
          }
          vm.related_courses = res.course.related_courses
          vm.record_id = 0
          vm.video_btn = true
        })
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        let vm = this
        if (to.path.match('/course/details/') && from.path.match('/course/details/')) {
          if (!vm.video_btn) {
            vm.countVideo(vm.$route.params.courseId, document.querySelector('video').currentTime, function () {
              vm.postData(vm)
              window.scrollTo(0, 0)
            })
          } else {
            vm.postData(vm)
            window.scrollTo(0, 0)
          }
        }
      }
    },
    updated: function () {
      let vm = this
      /* 分享事件 */
      let timer = setTimeout(function () {
        clearTimeout(timer)
        // 分享给朋友
        window.wx.onMenuShareAppMessage({
          title: vm.course.title, // 分享标题
          desc: vm.course.share_friend, // 分享描述
          link: window.location.href, // 分享链接
          imgUrl: document.getElementById('app').dataset.img_domain + vm.course.cover, // 分享图标
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
          title: vm.course.share_circle, // 分享标题
          desc: '让美业人的每一条朋友圈，都在这里找到模板', // 分享描述
          link: window.location.href, // 分享链接
          imgUrl: document.getElementById('app').dataset.img_domain + vm.course.cover, // 分享图标

          success: function () {
            // 用户确认分享后执行的回调函数
            // $.diyAlert("分享到朋友圈成功！");
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })
      }, 1000);

      /* 视频src */
      (function () {
        if (document.getElementById('app').dataset.origin === 0 || document.getElementById('app').dataset.origin === '0') {
          document.querySelector('video').src = document.getElementById('app').dataset.video_domain + vm.course.course_video
        } else {
          document.querySelector('video').src = document.getElementById('app').dataset.video_no_referer + vm.course.course_video
        }
      })()
    },
    beforeRouteEnter (to, from, next) {
      next(function (vm) {
        vm.app_version = $('#app_version').val()
        vm.popData.origin = $('#app').data('origin')
        vm.postData(vm)
        let timer1 = setTimeout(function () {
          clearTimeout(timer1)
          window.MtaH5.clickStat('MC' + vm.$route.params.courseId)
        }, 2000)

        let timer = setTimeout(() => {
          clearTimeout(timer)
          document.querySelector('video').addEventListener('ended', () => {
            /* 视频播放结束后,发送播放记录,清空已有记录:显示播放按钮,播放记录ID清空 */
            vm.countVideo(vm.$route.params.courseId, document.querySelector('video').currentTime, () => {
              vm.video_btn = true
              vm.record_id = 0
            })
          }, false)
        }, 1000)
      })
    },
    beforeRouteLeave: function (to, from, next) {
      let vm = this
      to.meta.keepAlive = true
      if (!vm.video_btn) {
        vm.countVideo(vm.$route.params.courseId, document.querySelector('video').currentTime, function () {
          next(true)
        })
      } else {
        next(true)
      }
    }
  }
</script>
