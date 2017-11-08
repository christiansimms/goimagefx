<template>
  <div>
  </div>
</template>

<script>
  import fx from 'glfx'
  import ImageService from './ImageService'

  // noinspection ReservedWordAsName
  export default {
    data () {
      return {
      }
    },
    props: {
      values: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      refreshImage () {
        let texture = this.canvas.texture(ImageService.image)
        let c = this.canvas.draw(texture)

        // Draw all effects.
        let centerX = this.canvas.width / 2
        let centerY = this.canvas.height / 2
        for (let index = 0; index < this.values.length; index++) {
          let [comp, value] = this.values[index]
          if (comp === 'hexPixelate') {
            c = c.hexagonalPixelate(centerX, centerY, value)
          } else if (comp === 'ink') {
            c = c.ink(value)
          } else if (comp === 'edgeWork') {
            c = c.edgeWork(value)
          } else if (comp === 'dotScreen') {
            let angle = 1.1
            c = c.dotScreen(centerX, centerY, angle, value)
          } else if (comp === 'denoise') {
            c = c.denoise(value)
          } else if (comp === 'brightness') {
            c = c.brightnessContrast(value, 0)
          } else if (comp === 'contrast') {
            c = c.brightnessContrast(0, value)
          } else {
            throw new Error('Bad component: ' + comp)
          }
        }

        // Finish.
        c.update()
      }
    },
    mounted: function () {
      // console.log('ImageEffect.mounted', this.values, ImageService.eventBus)
      let placeholder = this.$el
      try {
        this.canvas = fx.canvas()
      } catch (e) {
        placeholder.innerHTML = e
        return
      }
      this.canvas.replace(placeholder)

      // EXP: Well, the lost events happen, but not restore.
//      function onContextLost (event) {
//        console.log('IN MY onContextLost')
//        event.preventDefault()  // Tell browser we will handle it.
//      }
//
//      function onContextRestore () {
//        console.log('IN MY onContextRestore')
//      }
//
//      this.canvas.addEventListener('webglcontextlost', onContextLost, false)
//      this.canvas.addEventListener('webglcontextrestored', onContextRestore, false)

      // Display when image is loaded. Below, use $once instead of $on, to remove us as a listener.
      // let that = this
      // console.log('DEBUG', ImageService.image)
      // ImageService.eventBus.$once('image-loaded', image => {
      //  that.refreshImage()
      // })

      // Try to display immediately.
      if (ImageService.image) {
        this.refreshImage()
      }
    },
    destroyed () {
      // I wrote this, not sure if it's helping.
      // console.log('ImageEffect.destroyed():', this.values, this.canvas)
      delete this.canvas
      this.canvas = null
      // ImageService.eventBus.$off('image-loaded', image => {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
