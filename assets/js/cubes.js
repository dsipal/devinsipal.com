//global variables
var cubesAmt = 4;
var cubes = [];
var changed = [];


//threejs variables
const container = '.animation-container';
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias:true, alpha: true, canvas: document.querySelector("div > canvas.animation")});
const canvas = renderer.domElement;
renderer.setSize( $(container).width()/2.4, $(container).width()/2.4, false);
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.z = 2.3;




renderer.setClearColor( 0x000000, 0 );


function onWindowResize(){
    const width = $(container).width()/2.4;
    const height = $(container).height();

    if (canvas.width !== width || canvas.height !== width) {
        camera.aspect = 1;
        renderer.setSize( width, width, false);
        camera.updateProjectionMatrix();

		console.log($(container).width());
		console.log(canvas.width);

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
        cubes.push(new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshBasicMaterial({ color: pastelColor(),
                transparent: true,
                opacity: Math.random() * (0.95 - 0.6) + 0.6 })));

        cubes[i].rotation.x = (60 * i);
        cubes[i].rotation.y = (60 * i);
        scene.add(cubes[i]);
        changed[i] = false;
    }

}

function init(){
    window.addEventListener( 'resize', onWindowResize, false );
    genCube(cubesAmt);
	console.log($(container).width());

}

//main render loop
var render = function () {
  requestAnimationFrame( render );
    for(i = 0; i < cubes.length; i++){
        if(i%2==0){
            cubes[i].rotation.y += Math.random() * (0.03 - 0.01) + 0.01;
        }else{
            cubes[i].rotation.x += Math.random() * (0.03 - 0.01) + 0.01;
        }
        cubes[i].material.opacity = 1 + Math.sin(new Date().getTime() * .0008);

        if(!changed[i] && cubes[i].material.opacity <= 0.01){
            cubes[i].material.color.set(pastelColor());
            changed[i] = true;
        }

        if(changed[i] && cubes[i].material.opacity >= 0.01){
            changed[i] = false;
        }
    }
    renderer.render(scene, camera);
};

init();
render();
