<template>
  <div>
    <router-link :to="values | urlFromValues">
      <image-effect :values="values" ref="childImage"></image-effect>
    </router-link>
    <vue-slider ref="slider" v-model="values[values.length-1][1]" @callback="cb"
                :min="compIndex[values[values.length-1][0]].min"
                :max="compIndex[values[values.length-1][0]].max"
                :interval="compIndex[values[values.length-1][0]].interval"></vue-slider>
  </div>
</template>

<script>
  import vueSlider from 'vue-slider-component'
  import imageEffect from './ImageEffect'
  import { compIndex, urlFromValues } from './model'

  // noinspection ReservedWordAsName
  export default {
    components: {imageEffect, vueSlider},
    data () {
      return {
        compIndex: compIndex
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
      cb () {
        let childImage = this.$refs.childImage
        // If user clicked (as opposed to move slide), values array is not yet updated. So we must wait until $nextTick.
        // console.log('running cb', this.values[this.values.length - 1][1], childImage)
        this.$nextTick(function () {
          // console.log('running cb2', this.values[this.values.length - 1][1], childImage)
          childImage.refreshImage()
        })
      }
    },
    mounted: function () {
    },
    filters: {
      urlFromValues: function (values) {
        return urlFromValues(values)
      }
    }
  }
</script>

<style scoped>
</style>
