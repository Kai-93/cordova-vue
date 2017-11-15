<template>
  <div id="app">
    <router-view/>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted () {
    },
    methods: {}
  }
</script>

<style>

</style>
