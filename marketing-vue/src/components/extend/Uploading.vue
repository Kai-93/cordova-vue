<template>
  <div id="popout">
    <div class="loading-wrapper">
      <div class="loading-content">
        <img class="loading" src="../../static/img/loading.png" alt="">
        <p>{{msg}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'test_alert',
    data () {
      return {
        msg: '上传中...'
      }
    },
    methods: {
      close: function (event) {
        console.log('close')
        $(event.currentTarget).html('')
      }
    }
  }
</script>
