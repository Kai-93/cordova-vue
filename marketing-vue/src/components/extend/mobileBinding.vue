<template>
  <div id="popout">
    <div class="alert" :class="alert_name">
      <div class="cover" @click="close"></div>
      <div class="popover all-center">
        <header v-if="title">
          <p class="mc-title">{{title}}</p>
        </header>
        <section class="alert-content">
          <span class="phone-bind-bg"></span>
          <p class="prompt">为了确保您的帐户安全请先进行手机验证！</p>
          <div class="phone-certification-content">
            <span class="phone-bind-icon"></span>
            <input v-model="mobile" type="number" maxlength="11" placeholder="输入手机号" @click="emptyTip">
          </div>
          <div class="phone-certification-content">
            <span class="certification-icon"></span>
            <input v-model="code" type="text" maxlength="4" placeholder="输入验证码" @click="emptyTip">
            <a class="phone-certification-btn" href="javascript:;" @click="getCode">{{getCodeBtnState === 'unclick' ?
              '获取验证码' : getCodeBtnText}}</a>
          </div>
          <a @click="close" class="alert-close-btn" href="javascript:;"></a>
          <span v-show="tip" class="phone-bind-prompt">{{tip}}</span>
        </section>
        <footer>
          <a v-if="sure_btn" :href="sure_path" :class="sure_btn_class" @click="mobileBinding">{{sure_btn}}</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    data () {
      return {
        title: '',
        sure_btn: '确认',
        sure_btn_class: '',
        close_path: '',
        mobile: '',
        code: '',
        postCode: '',
        tip: '',
        send_code: 0,
        getCodeBtnState: 'unclick',
        getCodeBtnText: '',
        sure_path: 'javascript:;'
      }
    },
    methods: {
      emptyTip: function () {
        this.tip = ''
      },
      isMobileNumber: function (mobile) {
        return /^1[2|3|4|5|7|8]\d{9}$/.test(mobile)
      },
      countDown: function () {
        let vm = this
        vm.send_code = 60

        function time () {
          if (vm.send_code === 0) {
            vm.getCodeBtnText = '重新发送'
          } else {
            vm.getCodeBtnText = vm.send_code + '秒后重发'
            vm.send_code--
            let timer = setTimeout(function () {
              clearTimeout(timer)
              time()
            }, 1000)
          }
        }

        time()
      },
      getCode: function () {
        let vm = this
        if (!vm.isMobileNumber(vm.mobile)) {
          vm.tip = '请输入正确的手机号'
        } else {
          if (vm.send_code === 0) {
            vm.getCodeBtnState = 'clicked'
            $.post('/auth/sendcode', {
              'phone': vm.mobile
            }, function (res) {
              if (res.status === 1) {
                vm.countDown()
              } else {
                vm.tip = '发送失败'
              }
            }, 'json')
          }
        }
      },
      mobileBinding: function () {
        let vm = this
        if (vm.isMobileNumber(vm.mobile)) {
          $.post('/user/mobile/' + vm.has_user, {
            'mobile': vm.mobile,
            'code': vm.code
          }, function (res) {
            console.log(res)
            if (res.status === 1) {
              vm.close()
              confirm('手机验证成功!')
              window.location.reload()
            } else {
              if (res.error_code === 20005) {
                vm.tip = '验证码错误'
              } else if (res.error_code === 20014) {
                vm.tip = '手机已绑定'
              } else if (res.error_code === 20015) {
                vm.tip = '手机已注册'
              }
            }
          }, 'json')
        }
      },
      close: function () {
        $('#popout').html('')
        if (this.close_path) {
          window.location.href = this.close_path
        }
      }
    }
  }
</script>
