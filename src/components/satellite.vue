<!--Created by WuYiPing -->
<template>
  <div id="container"></div>
</template>

<script type="text/ecmascript-6">
  import Shaders from "sta/satellite/shader.js"
//  import obj from "../../static/model/satellite2.obj"

  import world from "img/world.jpg";

    export default{

        data(){
            return {
                //todo 这里是data区域
              container:null,
              camera:null,
              scene:null,
              renderer:null,
              satellite:null,
              earth:null,
              laser:null,
              //激光
              controls:null
            }
        },
        components: {
            //TODO 添加子组件
        },
        computed: {
            //TODO 计算区
        },
        methods: {
            //TODO 方法区
        },
        mounted: function () {
            var _self = this;


          //TODO 函数执行区域

          // 创建scene
          _self.container = document.getElementById("container");
          //相机
          _self.camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,2000);
          _self.camera.position.x = 500;
          _self.camera.position.y = 500;
          _self.camera.position.z = 500;

          //scene
          _self.scene = new THREE.Scene();


          // 添加 控件调节
          _self.controls = new THREE.TrackballControls(_self.camera);
          _self.controls.rotateSpeed = 1.0;
          _self.controls.zoomSpeed = 1.0;
          _self.controls.panSpeed = 1.0;
          var Clock = new  THREE.Clock();

          var axis = new THREE.AxisHelper(1000);

          _self.scene.add(axis);


          // 创建环境光
          var surLight = new THREE.AmbientLight(0xffffff);
          _self.scene.add(surLight);

          // 创建renderer
          _self.renderer=new THREE.WebGLRenderer();
          _self.renderer.setPixelRatio(window.devicePixelRatio);
          console.log(_self.renderer);

          _self.renderer.setSize(window.innerWidth,window.innerHeight);
          _self.container.appendChild(_self.renderer.domElement);


          window.addEventListener("resize",resizeWindow);






          // 创建卫星
//          var loader = new THREE.OBJLoader();
//          loader.load('../../static/model/satellite.obj',function (geometry) {
//            var material = new THREE.MeshLambertMaterial({
//              color:0xffffff
//            })
//
////            geometry.forEach(function (child) {
////              if(child.children.length===1){
////                  if(child.children[0] instanceof THREE.Mesh){
////                    child.children[0].material = material;
////                  }
////              }
////            });
//
//            geometry.scale.set(0.01,0.01,0.01);
//
//            geometry.rotation.x =0.3;
//
//            geometry.position.set(300,0,0);
//            _self.scene.add(geometry);
//
//          });


          //loder2

          var mesh;

          var loder2 = new THREE.ColladaLoader();
          loder2.load("../../static/model/satellite.dae",function (result) {
            _self.satellite= result.scene.children[0].children[0].clone();
            _self.satellite.scale.set(0.01,0.01,0.01);

            _self.satellite.position.set(300,300,300);
            _self.satellite.rotation.set(100,100,100)

            _self.scene.add(_self.satellite);
          });




          // 创建地球

          var geometry = new THREE.SphereGeometry(1000,100,100);

          var shader = Shaders['earth'];
          var uniforms = THREE.UniformsUtils.clone(shader.uniforms);

          uniforms['texture'].value = THREE.ImageUtils.loadTexture(world);


          var EarthMaterial = new THREE.ShaderMaterial({

            uniforms: uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader

          });


          _self.earth = new THREE.Mesh(geometry, EarthMaterial);
          _self.earth.rotation.y = Math.PI;
          _self.earth.position.set(0,-1500,0);
          _self.scene.add( _self.earth);















          animate();

          // 动画区



          function animate() {
//            var delta = Clock.getDelta();
//            _self.controls.update(delta);



              requestAnimationFrame(animate);
              render();
          }


          //主要动画区域
          function render(){


              if(_self.satellite){
//                _self.satellite.rotation.x +=0.01;
//                _self.satellite.rotation.y +=0.01;
                _self.satellite.rotation.z +=0.01;
              }
               _self.camera.lookAt(_self.scene.position);
            _self.renderer.render(_self.scene,_self.camera);
          }












          // 事件  resize

           function resizeWindow() {
             _self.camera.aspect = window.innerWidth/window.innerHeight;
             _self.camera.updateProjectionMatrix();

             _self.renderer.setSize(window.innerWidth,window.innerHeight);

           }












        }
    }
</script>
<style lang="scss">
  body {
    font-family: Monospace;
    /*background-color: #000;*/
    color: #fff;
    margin: 0px;
    overflow: hidden;
  }

  html {
    height: 100%;
    width: 100%;
  }

  #container {
    width: 100vh;
    height:100vw;
  }

</style>
