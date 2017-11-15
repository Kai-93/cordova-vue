<template>
  <header class="navigation" :style="style">
    <a class="back" @click="back">返回</a>
    <p class="title">{{pageTitle}}</p>
  </header>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {}
    },
    computed: {
      pageTitle () {
        return this.$store.state.pageTitleInfo.pageTitle
      },
      style () {
        return {
          'background': this.$store.state.pageTitleInfo.bgColor
        }
      }
    },
    methods: {
      back () {
        let vm = this
        vm.$router.go(-1)
        return false
      }
    }
  }
</script>

<style type="text/scss" lang="scss">
  .navigation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.12rem;
    box-shadow: 0 .04rem .04rem #E9EEF7;
  }

  .back {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 1.12rem;
    height: 1.12rem;
    font-size: 0;
    background: url("../../../static/img/go_back_normal@2x.png") center center /.48rem .48rem no-repeat;
  }

  .title {
    width: 12em;
    margin: 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #39364D;
    font-size: .36rem;
    text-align: center;
    line-height: 1.12rem;
  }
</style>
