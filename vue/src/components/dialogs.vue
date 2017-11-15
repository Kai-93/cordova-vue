<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a href="javascript:;" @click="alert" class="link">Show alert</a>
    <a href="javascript:;" @click="confirm" class="link">Show confirm</a>
    <a href="javascript:;" @click="prompt" class="link">Show prompt</a>
    <a href="javascript:;" @click="beep" class="link">Show beep</a>
    <a class="link" @click="back">返回</a>
  </div>
</template>

<script>
  export default {
    name: 'dialogs',
    data () {
      return {
        msg: 'dialogs'
      }
    },
    mounted () {
      this.$store.dispatch('setTitleAndBgColor', { pageTitle: 'dialogs', bgColor: '#1aff6c' })
    },
    methods: {
      alert () {
        function alertDismissed () {
          alert('alert')
        }

        navigator.notification.alert(
          'You are the winner!',  // message
          alertDismissed,         // callback
          'Game Over',            // title
          'Done'                  // buttonName
        )
      },
      confirm () {
        function onConfirm (buttonIndex) {
          alert('You selected button ' + buttonIndex)
        }

        navigator.notification.confirm(
          'You are the winner!', // message
          onConfirm,            // callback to invoke with index of button pressed
          'Game Over',           // title
          ['Restart', 'Exit']     // buttonLabels
        )
      },
      prompt () {
        function onPrompt (results) {
          alert('You selected button number ' + results.buttonIndex + ' and entered ' + results.input1)
        }

        navigator.notification.prompt(
          'Please enter your name',  // message
          onPrompt,                  // callback to invoke
          'Registration',            // title
          ['Ok', 'Exit'],             // buttonLabels
          'Jane Doe'                 // defaultText
        )
      },
      beep () {
        navigator.notification.beep(2)
      },
      back () {
        let vm = this
        vm.$router.go(-1)
        return false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss" scoped>
  h1, h2 {
    font-weight: normal;
    font-size: .6rem;
  }

  .link {
    display: block;
    color: #42b983;
    font-size: .5rem;
  }

  .photo {
    display: block;
    width: 6rem;
    height: auto;
    margin: .2rem auto;
  }
</style>
