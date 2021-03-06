import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts'
import * as THREE from 'three'
import image from './image'
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
  public group: any
  public prevRotateDelta: number
  constructor () {
    this.size = {
      height: window.innerHeight,
      width: window.innerWidth
    }

    this.cameraData = {
      cameraLookAt: new THREE.Vector3(0, 0, 0),
      cameraPos: [0, 10, 16]
    }

    this.prevRotateDelta = 0
    this.init()
  }

  public init () {
    this.scene = new THREE.Scene()
    this.setCamera()
    this.setRender()
    this.addLight()
    this.addAxes()
    this.addControls()

    this.group = new THREE.Group()
    sphere.renderSphere.call(this)
    image.renderImage.call(this)
    this.scene.add(this.group)

    this.animate()
    this.renderer.render(this.scene, this.camera)
  }

  private animate () {
    this.controls.update()
    // this.a = this.a + this.controls.rotateDelta.y / 100
    // console.log(this.a, this.controls.rotateDelta.y)
    if (this.controls.rotateDelta.y !== this.prevRotateDelta) {
      this.group.rotation.x +=
        this.controls.rotateDelta.y / 100
      this.prevRotateDelta = this.controls.rotateDelta.y
    }
    // console.log(this.controls.rotateDelta)
    // console.log(this.camera.position, this.controls.target)
    // this.light.position.set(
    //   this.controls.updateLastPosition.x,
    //   this.controls.updateLastPosition.y,
    //   this.controls.updateLastPosition.z
    // )
    // this.camera.position.set(...this.cameraData.cameraPos)
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
    // this.camera.lookAt(this.cameraData.cameraLookAt)
    // console.log(this.camera)
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
    const axes = new THREE.AxesHelper(300)
    this.scene.add(axes)
  }

  private addControls () {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target = new THREE.Vector3(0, 8, 0)

    this.controls.minAzimuthAngle = 0
    this.controls.maxAzimuthAngle = 0
    this.controls.minPolarAngle = Math.PI / 2
    this.controls.maxPolarAngle = Math.PI / 2
  }
}
