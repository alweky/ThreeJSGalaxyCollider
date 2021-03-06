﻿/// <reference path="libs/dat.gui.min.js" />
/// <reference path="libs/stats.min.js" />
/// <reference path="libs/three.min.js" />

//author: Narendra Pershad feb 14, 2014 (borrowed heavily from Learning ThreeJS text)
//filename: 06-rainy-scene.js

//declare global variables
var scene, camera, renderer;
var stats, controls;

var step = 0;
var system1, system2;
function init() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();

    // create a render and set the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);
}

function createParticles(size, transparent, opacity, sizeAttenuation, color) {


    var texture1 = THREE.ImageUtils.loadTexture("assets/textures/particles/raindrop-1.png");

    var geom1 = new THREE.Geometry();

    var material1 = new THREE.ParticleBasicMaterial({
        size: size,
        transparent: transparent,
        opacity: opacity,
        map: texture1,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: sizeAttenuation,
        color: color
    });

    for (var i = 0; i < 3000; i++) {
        var particle = new THREE.Vector3(40*(Math.random() - .5),40*Math.random(),0);
        particle.velocityY = 1*(Math.random() - .5);
        particle.velocityX = 1*(Math.random() - .5);
        geom1.vertices.push(particle);
    }
	
    system1 = new THREE.ParticleSystem(geom1, material1);
    system1.sortParticles = true;
    system1.name = "particles2";
    scene.add(system1);
}

function setupCameraAndLight() {
    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // position and point the camera to the center of the scene
    camera.position.x = 20;
    camera.position.y = 40;
    camera.position.z = 110;

    camera.lookAt(new THREE.Vector3(20, 30, 0));
}

function animate() {
    stats.update();

    var vertices = system1.geometry.vertices;
	step++;
	vertices.forEach(function (v) {
		/* if(step % 3 == 0)
		{
			v.y = v.y + (v.velocityY);
			v.x = v.x - (v.velocityX);
					
			v.velocityY--;
			
			if (v.y <= 0 || v.y >= 70) {
				v.y = 0;
				v.x = 0;
				v.velocityY = Math.random()*30;
			}
		} */
	});

    
    // render using requestAnimationFrame
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

var getTexture = function () {
    var canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    var ctx = canvas.getContext('2d');
    // the body
    ctx.translate(-81, -84);

    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    // the eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    // the pupils
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();


    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}



var draw = function (ctx) {

    // the body
    ctx.translate(-81, -84);

    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    // the eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    // the pupils
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();

}


function gravity(m1, m2, dis){
	var grav = (6.67 * Math.POW(10,-11) * m1) / (Math.POW(dis,2));
}

function initGui() {
    controls = new function () {
        this.size = 3;
        this.transparent = true;
        this.opacity = 0.6;
        this.color = 0xffffff;

        this.sizeAttenuation = true;

        this.redraw = function () {
            scene.remove(scene.getObjectByName("particles1"));
            createParticles(controls.size, controls.transparent, controls.opacity, controls.sizeAttenuation, controls.color);
        };
    }

    var gui = new dat.GUI();
    gui.add(controls, 'size', 0, 20).onChange(controls.redraw);
    gui.add(controls, 'transparent').onChange(controls.redraw);
    gui.add(controls, 'opacity', 0, 1).onChange(controls.redraw);
    gui.addColor(controls, 'color').onChange(controls.redraw);
    gui.add(controls, 'sizeAttenuation').onChange(controls.redraw);

    controls.redraw();
}

function initStats() {
    stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

window.onload = function () {
    init();
    createParticles();
    setupCameraAndLight();
    initStats();
    initGui();
    animate();
};