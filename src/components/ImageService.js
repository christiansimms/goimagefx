import Vue from 'vue'

/**
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth Source area width
 * @param {Number} srcHeight Source area height
 * @param {Number} maxWidth Fittable area maximum available width
 * @param {Number} maxHeight Fittable area maximum available height
 * @return {Object} { width, height }
 *
 */
function calculateAspectRatioFit (srcWidth, srcHeight, maxWidth, maxHeight) {
  let ratio = [maxWidth / srcWidth, maxHeight / srcHeight]
  ratio = Math.min(ratio[0], ratio[1])

  return {width: srcWidth * ratio, height: srcHeight * ratio}
}

let MAX_WIDTH = 300
let MAX_HEIGHT = 300

class ImageServiceCls {
  constructor () {
    this.image = null

    // Use a separate Vue instance as an event bus.
    this.eventBus = new Vue()
  }

  clearImage () {
    this.image = null
  }

  loadImage (filename) {
    let image = new Image()
    let that = this
    image.onload = function () {
      // Now that image is loaded, install it and tell all subscribers about it.
      that.image = image
      that.eventBus.$emit('image-loaded')
    }
    image.src = filename
  }

  loadResizeImage (dataUrl) {
    let image = new Image()
    let that = this
    image.onload = function () {
      // Now that image is loaded, resize it.
      let canvas = document.createElement('canvas')
      let newSize = calculateAspectRatioFit(image.width, image.height, MAX_WIDTH, MAX_HEIGHT)
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      canvas.width = newSize.width
      canvas.height = newSize.height
      ctx.drawImage(image, 0, 0, newSize.width, newSize.height)

      // Load smaller image.
      that.loadImage(canvas.toDataURL())
    }
    image.src = dataUrl
  }

  loadImageFromFormFileInput (file) {
    let reader = new FileReader()
    let that = this
    reader.onload = function () {
      // Now that image is loaded, install it and tell all subscribers about it.
      let dataUrl = this.result
      that.loadResizeImage(dataUrl)
    }
    reader.readAsDataURL(file)
  }
}

export default new ImageServiceCls()
