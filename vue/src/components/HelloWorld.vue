<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="battery" class="link">Battery Status</router-link>
    <router-link to="camera" class="link">Camera</router-link>
    <router-link to="contacts" class="link">Contacts</router-link>
    <router-link to="device" class="link">Device</router-link>
    <router-link to="motion" class="link">Device Motion</router-link>
    <router-link to="orientation" class="link">Device Orientation</router-link>
    <router-link to="dialogs" class="link">Dialogs</router-link>
    <group>
      <cell title="title" value="value"></cell>
    </group>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'index'
      }
    },
    components: {
      Group,
      Cell
    },
    mounted () {
      document.title = 'index'
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss">
  h1 {
    font-weight: normal;
    font-size: .6rem;
  }

  .link {
    display: block;
    color: #42b983;
    font-size: .5rem;
  }
</style>
