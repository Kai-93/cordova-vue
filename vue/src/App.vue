<template>
  <div id="app">
    <v-navigation></v-navigation>
    <router-view class="routerView"/>
  </div>
</template>

<script>
  import navigation from './components/common/navigation.vue'

  export default {
    name: 'app',
    data () {
      return {
        title: '页面标题',
        bgColor: '#fff'
      }
    },
    components: {
      'v-navigation': navigation
    },
    methods: {}
  }
</script>

<style type="text/scss" lang="scss">
  * {
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .routerView {
    margin-top: 1.12rem;
  }
</style>
