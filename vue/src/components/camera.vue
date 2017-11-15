<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a class="link" @click="upload(0)">上传-照片库(0)</a>
    <a class="link" @click="upload(1)">上传-相机(1)</a>
    <a class="link" @click="upload(2)">上传-Camera Roll album(2)</a>
    <a class="link" @click="upload(3)">上传-测试(3)</a>
    <input type="file" id="upload" accept=".gif,.jpg,.jpeg,.png" hidden>
    <a class="link" @click="back">返回</a>
    <img class="photo" :src="src" alt="">
  </div>
</template>

<script>
  export default {
    name: 'camera',
    data () {
      return {
        msg: 'camera',
        camera: 'camera',
        src: ''
      }
    },
    mounted () {
      let vm = this
      document.title = 'camera'
      document.querySelector('#upload').addEventListener('change', (event) => {
        let file = event.target.files[0]
        if (!/image\/\w+/.test(file.type)) {
          alert('请确保文件为图像类型')
          return false
        }
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          vm.src = this.result
        }
      }, false)
    },
    methods: {
      upload (source) {
        let vm = this
        let cameraOptions = {
          sourceType: source
        }

        if (window.navigator.camera) {
          window.navigator.camera.getPicture(vm.getPhotoSuccess, vm.getPhotoFail, cameraOptions)
          return false
        }
        if (typeof FileReader === 'undefined') {
          alert('抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！')
          return false
        }
        document.querySelector('#upload').click()
      },
      getPhotoSuccess () {
        this.src = arguments[0]
      },
      getPhotoFail () {
        alert(JSON.stringify(arguments))
      },
      back () {
        let vm = this
        let temp = require('../util/test')['default']
        temp['fun']()
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
