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
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45,700/1200,0.1,1000);


    // 创建 render

    var renderer = new THREE.WebGLRenderer();
//    console.log(renderer.setClearColorHex);
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(1200,700);

    var axes = new THREE.AxisHelper(20);
    scene.add(axes);


    var planeGeometry = new THREE.PlaneGeometry(60,20);
    var planeMaterial = new THREE.MeshLambertMaterial({color:0xacbcbc});

    var plane = new THREE.Mesh(planeGeometry,planeMaterial);

    plane.rotation.x = -0.5*Math.PI;

    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);

    var cubeGeometry = new THREE.CubeGeometry(60,20,1,1);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000,wireframe:true});

    var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

    cube.rotation.x = -0.5*Math.PI;

    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    scene.add(cube);


    var sphereGeometry = new THREE.SphereGeometry(4,20,20);
    var sphereMaterial = new THREE.MeshLambertMaterial({color:0xff0000,wireframe:true});

    var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);


    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;

    scene.add(sphere);


    camera.position.x=-30;
    camera.position.y=30;
    camera.position.z=30;

    camera.lookAt(scene.position);


    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40,60,10);
    scene.add(spotLight);


























    $("#WebGL-output").append(renderer.domElement);
    renderer.render(scene,camera);


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    /* set margin to 0 and overflow to hidden, to
     use the complete page */
    #WebGL-output {
      width: 1000px;
      height: 800px;
    }
    margin: 0;
    overflow: hidden;
  }
</style>
