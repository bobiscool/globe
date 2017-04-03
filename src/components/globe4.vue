<template>
  <div id="WebGL-output">
    <!--<section id="webgl-content"></section>-->
  </div>
</template>

<script>
  import THREELib from "three-js";
  import dat from "dat-gui"
  import IDR from "js/data.js"
  import $ from "jquery"
  console.log(IDR)
  var THREE = THREELib(); // return THREE JS
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted:function () {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var step =0;
    var scene = new THREE.Scene();


    // 添加控制按键
    var controls = new function () {
      this.rotationSpeed=0.02;
      this.numberOfObjects = scene.children.length;

      this.removeCube=function () {
        var allChildren = scene.children;
        var lastObject = allChildren[allChildren.length-1];
        scene.remove(lastObject);

        if(lastObject instanceof THREE.Mesh){
            scene.remove(lastObject);
            console.log(lastObject);
            this.numberOfObjects= scene.children.length;
        }
      }
      this.addCube=function (){
        var cubesize = Math.ceil(Math.random()*3);
        var cubeGeometry = new THREE.CubeGeometry(cubesize,cubesize,cubesize);
        var cubeMetiral = new THREE.MeshLambertMaterial({color:Math.random()*0xffffff});

        var cube = new THREE.Mesh(cubeGeometry,cubeMetiral);
        cube.castShadow =true;
        cube.name="-cube-"+scene.children.length;


        cube.position.x = -30+Math.round((Math.random()*planeGeometry.width));
        cube.position.y = Math.round(Math.random()*5);
        cube.position.z = -20+Math.round((Math.random()*planeGeometry.height));

        console.log(cube);
        scene.add(cube);

        this.numberOfObjects = scene.children.length;

      };

      this.outputObjects = function () {
        console.log(scene.children);
      }
    };


    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'addCube');
    gui.add(controls, 'removeCube');
    gui.add(controls, 'outputObjects');
    gui.add(controls, 'numberOfObjects').listen();
    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // show axes in the screen
    var axes = new THREE.AxisHelper(100);
    scene.add(axes);

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshPhongMaterial({color: 0xcccccc});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    // add the plane to the scene
    scene.add(plane);

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    // position the cube
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    // add the cube to the scene
    scene.add(cube);

    // create a sphere
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshPhongMaterial({color: 0x7777ff});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;

    // add the sphere to the scene
    scene.add(sphere);






    // 灯光


    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);


    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add the output of the renderer to the html element
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    // 添加 Ascii效果


    // render the scene
//    renderer.render(scene, camera);

    renderScene();







    function renderScene() {

        scene.traverse(function (e) {
          if(e instanceof THREE.Mesh && e !=plane){
              e.rotation.x +=controls.rotationSpeed;
              e.rotation.y +=controls.rotationSpeed;
              e.rotation.z +=controls.rotationSpeed;
          }
        })


      requestAnimationFrame(renderScene);

      renderer.render(scene,camera);
    }








  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    /* set margin to 0 and overflow to hidden, to
     use the complete page */
    margin: 0;
    overflow: hidden;
  }
</style>
