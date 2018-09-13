import * as THREE from 'three'

const sphere: any = {
  renderSphere () {
    const sphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(4, 32, 32),
      new THREE.MeshLambertMaterial({ color: '#ccc' })
    )
    sphereMesh.position.set(0, 0, 0)
    // sphereMesh.castShadow = sphereMesh.receiveShadow = true
    this.scene.add(sphereMesh)
  }
}

export default sphere
