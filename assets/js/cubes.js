//global variables
var container = [];
var changed = [];
var cubes = 6;

//threejs variables
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias:true, canvas: document.querySelector("div > canvas.animation")});
const canvas = renderer.domElement;
renderer.setSize( canvas.clientWidth , canvas.clientHeight, false);
const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1,1000);
camera.position.z = 2;




renderer.setClearColor("#fff");


function onWindowResize(){
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width ||canvas.height !== height) {
        camera.aspect = width / height;
        renderer.setSize( width, height, false);
        camera.updateProjectionMatrix();

    }
}

function pastelColor(){
    var r = (Math.round(Math.random()* 127) + 127).toString(16);
    var g = (Math.round(Math.random()* 127) + 127).toString(16);
    var b = (Math.round(Math.random()* 127) + 127).toString(16);
    return '#' + r + g + b;
}


function genCube(amount){
    for(i = 0; i < amount; i++){
        container.push(new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshBasicMaterial({ color: pastelColor(),
                transparent: true,
                opacity: Math.random() * (0.95 - 0.6) + 0.6 })));

        container[i].rotation.x = (60 * i);
        container[i].rotation.y = (60 * i);
        scene.add(container[i]);
        changed[i] = false;
    }

}

function init(){
    window.addEventListener( 'resize', onWindowResize, false );
    genCube(cubes);

}

//main render loop
var render = function () {
  requestAnimationFrame( render );
    for(i = 0; i < container.length; i++){
        if(i%2==0){
            container[i].rotation.y += Math.random() * (0.03 - 0.01) + 0.01;
        }else{
            container[i].rotation.x += Math.random() * (0.03 - 0.01) + 0.01;
        }
        container[i].material.opacity = 1 + Math.sin(new Date().getTime() * .0008);

        if(!changed[i] && container[i].material.opacity <= 0.01){
            container[i].material.color.set(pastelColor());
            changed[i] = true;
        }

        if(changed[i] && container[i].material.opacity >= 0.01){
            changed[i] = false;
        }
    }
    renderer.render(scene, camera);
};

init();
render();
