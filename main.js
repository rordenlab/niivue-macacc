import { Niivue } from '@niivue/niivue'

async function main() {
  aboutBtn.onclick = function () {
    const { hostname, pathname } = window.location
    const username = hostname.split('.')[0] // "niivue"
    const repoName = pathname.split('/')[1] // "niivue-tinygrad"
    const url = `https://github.com/${username}/${repoName}`
    window.open(url, "_blank")
  }
  function doThreshChange() {
    let mn = threshSlider.value * 0.1
    let mx = mn + rangeSlider.value * 0.1
    nv1.setMeshLayerProperty(nv1.meshes[0].id, 1, "cal_min", mn)
    nv1.setMeshLayerProperty(nv1.meshes[0].id, 1, "cal_max", mx)
  }
  threshSlider.onchange = function () {
    doThreshChange()
  }
  rangeSlider.onchange = function () {
    doThreshChange()
  }
  alphaSlider.onchange = function () {
    nv1.setMeshLayerProperty(nv1.meshes[0].id, 0, "opacity", this.value * 0.01)
  }
  modelSelect.onchange = async function () {
    var meshLHLayersList1 = [
      
      {
        url: "./aal_atlas.mz3",
        opacity: 0.1,
      },
      {
        url: "./areaT_26163.mz3",
        cal_min: 1.5,
        cal_max: 5,
        colormap: "warm",
        opacity: 0.7,
        colormapNegative: "",
        useNegativeCmap: false,
      },
    ]
    let mesh = './surf_reg_model_both_' + this.value + '.mz3'
      const volumeObj = { url: mesh, layers: meshLHLayersList1 }
      await nv1.loadMeshes([ volumeObj ])
      nv1.meshes[0].layers[0].colorbarVisible = false
      doThreshChange()
  }
  colorSelect.onchange = function () {
    let hex = this.value.slice(2)
    let rgba = [0,0,0, 1]
    rgba[0] = parseInt(hex.slice(0, 2), 16) / 255
    rgba[1] = parseInt(hex.slice(2, 4), 16) / 255
    rgba[2] = parseInt(hex.slice(4, 6), 16) / 255
    nv1.opts.backColor = rgba
    nv1.drawScene()
  }
  viewSelect.onchange = function () {
    switch (this.selectedIndex) {
      case 0:
        nv1.setRenderAzimuthElevation(0, 0)
        break
      case 1:
        nv1.setRenderAzimuthElevation(90, 0)
        break
      case 2:
        nv1.setRenderAzimuthElevation(180, 0)
        break
      case 3:
        nv1.setRenderAzimuthElevation(270, 0)
        break
      case 4:
        nv1.setRenderAzimuthElevation(180, -90)
        break
      default:
        nv1.setRenderAzimuthElevation(0, 90)
    }
  }
  function handleLocationChange(data) {
    document.getElementById("intensity").innerHTML = data.string
  }
  const defaults = {
    onLocationChange: handleLocationChange,
  }
  const nv1 = new Niivue(defaults)
  nv1.attachToCanvas(gl1)
  nv1.opts.isColorbar = true
  viewSelect.onchange()
  let shaders = nv1.meshShaderNames()
  for (let i = 0; i < shaders.length; i++) {
    let btn = document.createElement("button")
    btn.innerHTML = shaders[i]
    btn.onclick = function () {
      nv1.setMeshShader(nv1.meshes[0].id, shaders[i])
    }
    shaderBtns.appendChild(btn)
  }
  modelSelect.onchange()
}

main()
