import * as THREE from 'three'

const sphere: any = {
  renderSphere () {
    const sphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(8, 32, 32),
      new THREE.MeshLambertMaterial({ color: '#3B59D5' })
    )
    sphereMesh.position.set(0, -4, 0)
    // sphereMesh.castShadow = sphereMesh.receiveShadow = true
    this.scene.add(sphereMesh)
  }
}

export default sphere
