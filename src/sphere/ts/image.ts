import * as THREE from 'three'
import back from '../assets/back.png'

const image: any = {
  renderImage () {
    const loader = new THREE.TextureLoader()
    loader.load(
      back,
      (texture) => {
        const geometry = new THREE.BoxGeometry(2, 2, 0.01)
        const material = new THREE.MeshBasicMaterial({
          map: texture
        })
        // const matarial = new THREE.MeshLambertMaterial({ color: 'red' })
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(0, 8, 0)
        console.log(cube)
        cube.rotation.x = Math.PI / 2
        this.scene.add(cube)
      },
      (err) => {
        if (err) {
          alert(err)
        }
      }
    )
  }
}

export default image
