<template>
  <div id="popout">
    <div class="alert" :class="alert_name">
      <div class="cover" @click="close"></div>
      <div class="popover all-center" :class="popover_name">
        <header v-if="has_title">
          <p :class="title_p_class">{{title}}</p>
        </header>
        <section :class="mode=='html'?'alert-content':'alert-content-1'" v-html="msg">
        </section>
        <a v-if="right_top_close_btn" @click="close" class="alert-close-btn" href="javascript:;"></a>
        <footer>
          <a v-if="cancel_btn" class="btn" :class="{'btn-cancel':sure_btn,'mc-know-btn':mc_know_btn,'mc-btn':mc-btn}"
             @click="close">{{close_btn}}</a>
          <a v-if="sure_btn" :href="sure_path" class="btn" :class="sure_btn_class">{{sure_btn}}</a>
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
        popover_name: '',
        title_p_class: 'mc-title',
        mode: 'text',
        msg: '',
        close_btn: '取消',
        close_path: '',
        cancel_btn: true,
        sure_btn: false,
        sure_path: '',
        sure_btn_class: '',
        right_top_close_btn: false
      }
    },
    methods: {
      close: function () {
        $('#popout').html('')
        if (this.close_path) {
          window.location.href = this.close_path
        }
      }
    }
  }
</script>
