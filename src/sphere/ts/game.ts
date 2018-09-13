import * as THREE from 'three'
import sphere from './sphere'

interface IOptions {
  cameraData: any
  camera: any
  size: any
  scene: any
  renderer: any
}

export default class Game implements IOptions {
  public cameraData: any
  public camera: any
  public size: any
  public scene: any
  public renderer: any
  constructor () {
    this.size = {
      height: window.innerHeight,
      width: window.innerWidth
    }

    this.cameraData = {
      adjustData: 0,
      adjustPer: 0.1,
      cameraLookAt: new THREE.Vector3(0, 0, 0),
      cameraPos: [10, 10, 10]
    }

    this.init()
  }

  public init () {
    this.scene = new THREE.Scene()
    this.setCamera()
    this.setRender()
    this.addLight()
    this.addAxes()

    sphere.renderSphere.call(this)

    this.renderer.render(this.scene, this.camera)
  }

  private setCamera () {
    this.camera = new THREE.OrthographicCamera(
      this.size.width / -80,
      this.size.width / 80,
      this.size.height / 80,
      this.size.height / -80,
      0,
      100
    )
    this.camera.position.set(...this.cameraData.cameraPos)
    this.camera.lookAt(this.cameraData.cameraLookAt)
    this.scene.add(this.camera)
  }

  private setRender () {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.size.width, this.size.height)
    this.renderer.setClearColor(new THREE.Color(0xffffff))
  }

  private addLight () {
    const light: any = new THREE.SpotLight(0xffffff)
    light.position.set(20, 20, 20)
    this.scene.add(light)
  }

  private addAxes () {
    const axes = new THREE.AxesHelper(150)
    this.scene.add(axes)
  }
}
