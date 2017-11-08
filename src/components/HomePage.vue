<template>
  <div>

    <div v-if="! ImageService.image">
      <h1>Pick an image to play with.</h1>

      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6">
            <h3>Upload Your Own</h3>
            Upload: <input type="file" name="pic" accept="image/*" @change="processFile($event)">
          </div>
          <div class="col-lg-6">
            <h3>Use One of These</h3>
            <div class="container-fluid">
              <div class="row">
                <div v-for="pic in staticPics" class="col-lg-3 img-container">
                  <a v-on:click.stop="selectStaticImage(pic)">
                    <img :src="pic"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Below only displays if they come back here. -->
    <div v-if="ImageService.image">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-4 offset-lg-4">
            <h1>Your Image</h1>
            <image-effect></image-effect>

            <p>
              <br/>
              <button v-on:click="addEffectsToExistingImage">Add Some Effects</button>
            </p>
            <p>
              <button v-on:click="pickDifferentImage">Pick a Different Image</button>
            </p>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import imageEffect from './ImageEffect'
  import customImageEffect from './CustomImageEffect'
  import { allComponents, compIndex } from './model'
  import ImageService from './ImageService'
  import BreadcrumbService from './BreadcrumbService'

  export default {
    components: {imageEffect, customImageEffect},
    data () {
      // Calculate component settings here, so that they are reactive data.
      let dynComps = []
      allComponents.forEach(comp => {
        dynComps.push([comp.name, comp.default])
      })
      return {
        allComponents,
        compIndex,
        dynComps,
        ImageService,
        staticPics: ['mountains.jpg', 'sydney.jpg', 'terraces.jpg'].map(name => '/static/' + name)
      }
    },
    methods: {
      processFile (event) {
        let file = event.target.files[0]
        ImageService.loadImageFromFormFileInput(file)
      },
      selectStaticImage (pic) {
        ImageService.loadResizeImage(pic)
      },
      addEffectsToExistingImage () {
        this.$router.push('/display')
      },
      pickDifferentImage () {
        ImageService.clearImage()
      }
    },
    mounted () {
      ImageService.eventBus.$once('image-loaded', image => {
        // Image is loaded, now redirect them.
        this.$router.push('/display')
      })
    },
    beforeRouteEnter (to, from, next) {
      // console.log('HomePage.beforeRouteEnter', this)
      // this.$root.breadcrumbs = ['abc']
      next(component => {
        // console.log('HomePage.beforeRouteEnter2', component.$root)
        // console.log('HomePage.beforeRouteEnter2', component.$root.children)
        BreadcrumbService.eventBus.$emit('update-breadcrumbs', [{name: 'Home', path: ''}])
        // component.$root.breadcrumbs = ['abc']
        // component.$root.breadcrumbs.push('abc')
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    /*max-width: 200px;*/
    /*max-height: 200px;*/
    /*width: auto;*/
    /*height: auto;*/
    width: 120px;
    height: 80px;
  }

  .img-container {
    margin: 10px;
  }
</style>
