<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4 offset-lg-4">
          <h1>Starting Point</h1>
          <image-effect :values="values" ref="startingImage"></image-effect>
        </div>
        <div class="col-lg-4">
          <button v-on:click="downloadPicture">Download Picture</button>
        </div>
      </div>
    </div>

    <div v-if="imageLevel <= 2">
      <h1>Add {{levelAsWord}} Effect:</h1>
      <div class="container-fluid">
        <div class="row">
          <div v-for="compList in dynComps" class="col-lg-4">
            <h2>{{compIndex[compList[compList.length - 1][0]].title}}</h2>
            <custom-image-effect :values="compList"></custom-image-effect>
          </div>
        </div>
      </div>
    </div>
    <div v-if="imageLevel > 2">
      <h1>The End</h1>
      <p>You've already applied as many effects as possible at one time.</p>
    </div>

  </div>
</template>

<script>
  import imageEffect from './ImageEffect'
  import customImageEffect from './CustomImageEffect'
  import { allComponents, compIndex, downloadImage, urlFromValues } from './model'
  import ImageService from './ImageService'
  import BreadcrumbService from './BreadcrumbService'

  export default {
    components: {imageEffect, customImageEffect},
    data () {
      // console.log('DisplayPage.data():', this.$route.params)
      this.values = []

      // Handle optional first level.
      let str = this.$route.params.compValue
      if (str) {
        let [name, value] = str.split('=')
        value = parseFloat(value)
        this.values = this.values.concat([[name, value]])
      }

      // Handle optional second level also.
      let str2 = this.$route.params.compValue2
      if (str2) {
        let [name, value] = str2.split('=')
        value = parseFloat(value)
        this.values = this.values.concat([[name, value]])
      }

      // Handle optional third level also.
      let str3 = this.$route.params.compValue3
      if (str3) {
        let [name, value] = str3.split('=')
        value = parseFloat(value)
        this.values = this.values.concat([[name, value]])
      }

      // Handle optional fourth level also.
      let str4 = this.$route.params.compValue4
      if (str4) {
        let [name, value] = str4.split('=')
        value = parseFloat(value)
        this.values = this.values.concat([[name, value]])
      }

      // Calculate component settings here, so that they are reactive data.
      let dynComps = []
      allComponents.forEach(comp => {
        let newCompList = this.values.concat([[comp.name, comp.default]])
        dynComps.push(newCompList)
      })

      // Set breadcrumbs.
      let crumbs = [{name: 'Home', path: '/'}]
      let tempValues = []
      this.values.forEach(valueObj => {
        let name = valueObj[0]
        let path = urlFromValues(tempValues)
        tempValues.push(valueObj)  // Do this after url generation, so it's in the next one.
        crumbs.push({name: compIndex[name].title, path: path})
      })
      crumbs.push({name: 'Add an Effect', path: ''})
      BreadcrumbService.eventBus.$emit('update-breadcrumbs', crumbs)

      return {
        allComponents: allComponents,
        compIndex: compIndex,
        dynComps: dynComps
      }
    },
    computed: {
      imageLevel: function () {
        return this.values.length
      },
      levelAsWord: function () {
        if (this.values.length === 0) {
          return 'First'
        } else if (this.values.length === 1) {
          return 'Second'
        } else if (this.values.length === 2) {
          return 'Third'
        } else {
          return 'UNKNOWN'
        }
      }
    },
    methods: {
      downloadPicture (event) {
        let startingImage = this.$refs.startingImage

        // Call refreshImage() to make sure something there. Otherwise the image is just blank!
        // See: https://stackoverflow.com/questions/26783586/canvas-todataurl-returns-blank-image-only-in-firefox/26790802#26790802
        startingImage.refreshImage()
        downloadImage(startingImage.canvas.toDataURL('image/png'))
      }
    },
    created () {
      // console.log('created():', this.$route.params)
    },
    mounted () {
      // console.log('DisplayPage.mounted():', this.$route.params)
    },
    destroyed () {
      // console.log('DisplayPage.destroyed():', this.$route.params)
    },
    beforeRouteEnter (to, from, next) {
      // console.log('DisplayPage.beforeRouteEnter')
      // BreadcrumbService.eventBus.$emit('update-breadcrumbs', ['display-me'])
      if (ImageService.image) {
        next()
      } else {
        console.log('No image selected, going back home')
        next('/')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
