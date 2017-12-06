<template>
  <div id="app">
    <router-view />
    <div id="popout"></div>
  </div>
</template>

<script>
  import { getSimulation } from './api/wechat'

  export default {
    name: 'app',
    mounted () {
      /* web */
      if (!window.cordova) {
        /* 本地开发环境 */
        if (location.host.indexOf('devsheji') === -1) {
          getSimulation().then(response => {
            console.log(response)
          }).catch(err => {
            console.log(err)
          })
        }
      }
    }
  }
</script>

<style>
</style>
