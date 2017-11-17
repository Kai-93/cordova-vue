<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import { getSimulation, auth } from './api/api'

  export default {
    name: 'app',
    mounted () {
      let vm = this
      if ((location.host.indexOf('yanzijia') > -1)) {
        auth().then(response => {
          let res = response.data
          if (res.ifAuth === 1) {
            vm.$store.dispatch('getLogStatus', {
              on () {
                vm.$store.dispatch('updateUserInfo')
              },
              off () {
                console.log('user not login')
              }
            })
          } else {
            let url = location.href.replace('#', 'hash').replace('?', 'ask')
            window.location.href = `/wx/login?next=${url}`
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        getSimulation().then(response => {
          console.log(response)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style>
</style>
