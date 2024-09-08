// script.js

let scene, camera, renderer, sphere;

// Initialize the scene
function init() {
    // Create a scene
    scene = new THREE.Scene();

    // Create a camera
    camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    camera.position.z = 5;

    // Create a renderer and attach it to the DOM
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Load the texture (background image for the sphere)
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('istockphoto-103975742-612x612.jpg');

    // Create a sphere geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    
    // Create a material and apply the texture to it
    const material = new THREE.MeshStandardMaterial({
        map: texture, // Apply the loaded texture as the sphere's skin
        metalness: 0,
        roughness: 0.5
    });

    // Create a mesh (geometry + material) and add it to the scene
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Add event listener for mouse movement
    document.addEventListener('mousemove', onMouseMove);

    // Render the scene
    animate();
}

// Function to handle mouse movement and rotate the sphere
function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    sphere.rotation.y = mouseX * Math.PI;
    sphere.rotation.x = mouseY * Math.PI;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Initialize the scene
init();

