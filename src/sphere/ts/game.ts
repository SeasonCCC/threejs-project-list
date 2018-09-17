import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts'
import * as THREE from 'three'
import sphere from './sphere'

interface IOptions {
  cameraData: any
  camera: any
  size: any
  scene: any
  renderer: any
  controls: any
  light: any
}

export default class Game implements IOptions {
  public cameraData: any
  public camera: any
  public size: any
  public scene: any
  public renderer: any
  public controls: any
  public light: any
  constructor () {
    this.size = {
      height: window.innerHeight,
      width: window.innerWidth
    }

    this.cameraData = {
      adjustData: 0,
      adjustPer: 0.1,
      cameraLookAt: new THREE.Vector3(0, -4, 0),
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
    this.addControls()
    this.animate()
    // sphere.renderSphere.call(this)

    this.renderer.render(this.scene, this.camera)
  }

  private animate () {
    this.controls.update()
    this.light.position.set(
      this.controls.updateLastPosition.x,
      this.controls.updateLastPosition.y,
      this.controls.updateLastPosition.z
    )
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => {
      this.animate()
    })
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
    this.light = new THREE.HemisphereLight(0x3b59d5, 0x080820, 1)
    this.light.position.set(10, 10, 10)
    this.scene.add(this.light)
  }

  private addAxes () {
    const axes = new THREE.AxesHelper(150)
    this.scene.add(axes)
  }

  private addControls () {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target = new THREE.Vector3(0, -4, 0)
    this.controls.minAzimuthAngle = 0
    this.controls.maxAzimuthAngle = 0
  }
}
