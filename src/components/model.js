// Define all components.
export const allComponents = [
  {name: 'hexPixelate', title: 'Hex Pixelate', min: 0, max: 30, interval: 0.1, default: 10},
  {name: 'ink', title: 'Ink', min: 0, max: 1, interval: 0.01, default: 0.25},
  {name: 'edgeWork', title: 'Edges', min: 0, max: 200, interval: 1, default: 10},
  {name: 'dotScreen', title: 'Dot Screen', min: 1, max: 20, interval: 0.01, default: 3},
  {name: 'denoise', title: 'Smooth', min: 0, max: 50, interval: 1, default: 20},
  {name: 'brightness', title: 'Brightness', min: -1, max: 1, interval: 0.01, default: 0.1},
  {name: 'contrast', title: 'Contrast', min: -1, max: 1, interval: 0.01, default: 0.3}
]

export let compIndex = {}
allComponents.forEach(comp => {
  compIndex[comp.name] = comp
})

export function downloadImage (base64Image) {
  if (('download' in document.createElement('a'))) {
    let a = window.document.createElement('a')
    a.href = base64Image
    let date = new Date()
    let stringDate = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + '-' + date.getHours() + ':' + date.getMinutes()
    a.setAttribute('download', 'screenshot-' + stringDate + '.png')
    window.document.body.appendChild(a)
    a.addEventListener('click', function () {
      a.parentElement.removeChild(a)
    })
    a.click()
  } else {
    let newWindow = window.open('')
    let img = newWindow.document.createElement('img')
    img.src = base64Image
    newWindow.document.body.appendChild(img)
  }
}

export function urlFromValues (values) {
  if (!values) return ''
  let out = ['display']
  values.forEach(value => {
    out.push(value[0] + '=' + value[1])
  })
  return '/' + out.join('/')
}
