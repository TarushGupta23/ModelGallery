import * as THREE from 'three'
import { OrbitControls, GLTFLoader, RGBELoader } from 'three/examples/jsm/Addons.js'

// ---------------- SETUP ----------------
const sizes = { width: window.innerWidth, height: window.innerHeight }
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
const canvas = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
camera.position.z = -10

// ---------------- LOADERS ----------------
const rgbeLoader = new RGBELoader();
const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader()

// ---------------  CONTROLS -----------------
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// ---------------- BACKGROUND ----------------
rgbeLoader.load('./static/photobgrd.hdr', (envMap) => {
    envMap.mapping = THREE.EquirectangularReflectionMapping
    // scene.background = envMap
    scene.environment = envMap
})

// --------------- OBJECTS -----------------
// const colorfulDount = new THREE.Mesh(
//     new THREE.TorusGeometry( 2, .9, 16, 50 ),
//     new THREE.MeshNormalMaterial({wireframe: true})
// )
// scene.add(colorfulDount)


// const texture = textureLoader.load('./static/rayquaza.png')
// texture.colorSpace = THREE.SRGBColorSpace
// let rayquaza;
// loader.load(
//     './static/rayquaza.glb',
//     (gltf) => {
//         rayquaza = gltf.scene;
//         const s = 0.025
//         rayquaza.scale.set(s, s, s);
//         rayquaza.position.set(1, -1, 0)
//         rayquaza.rotation.y = Math.PI
//         scene.add(rayquaza);
//         rayquaza.children[0].material = new THREE.MeshMatcapMaterial({
//             matcap: texture
//         })
//     },
//     undefined,
//     (error) => {
//         console.error(error);
//     }
// );

// --------------- LOOP -----------------
function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}
animate()