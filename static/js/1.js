/**
 * Created by mac WuYiPing on 17/4/12.
 */
function init() {
  var stats = initStats();
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.iinnerHeight,0.1,200);
  camera.position.x = 20;
  camera.position.y = 40;
  camera.position.z = 110;
  camera.lookAt(new THREE.Vector3(20,30,0));
  var webGLRenderer = new THREE.WebGLRenderer();
  webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
  webGLRenderer.setSize(window.innerWidth, window.innerHeight);

  document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

  var system1;
  var cloud;


  var controls = new function(){
    this.size = 3;
    this.transparent = true;
    this.opacity = 0.6;
    this.color = 0xffffff;
    this.sizeAttenuation = true;

    this.redraw = function(){
      scene.remove(scene.getObjectByName("particles1"));
      scene.remove(scene.getObjectByName("particles2"));

      createPointCloud(controls.size,controls.transparent,controls.opacity,controls.sizeAttenuation,controls.color);
    }
  }

  var gui= new dat.GUI();
  gui.add(controls,"size",0,20).onChange(controls.redraw);
  gui.add(controls, 'transparent').onChange(controls.redraw);
  gui.add(controls,"opacity",0,1).onChange(controls.redraw);
  gui.add(controls,"sizeAttenuation").onChange(controls.redraw);
  gui.addColor(controls,"color").onChange(controls.redraw);


  controls.redraw();
  render();


  function createPointCloud(size,transparent,opacity,sizeAttenuation,color){
    var texture = THREE.ImageUtils.loadTexture("../assets/textures/particles/raindrop-3.png");

    var geom = new THREE.Geometry();
    var material = new THREE.ParticleBasicMaterial({
      size:size,
      transparent:transparent,
      opacity:opacity,
      map:texture,
      blending:THREE.AdditiveBlending,
      sizeAttenuation:sizeAttenuation,
      color:color
    })



    var range = 40 ;
    for(var i=0;i<1500;i++){
      var particle = new THREE.Vector3(
        Math.random()*range-range/2,
        Math.random()*range*1.5,
        Math.random()*range-range/2
      );

      particle.velocityY = 0.1+Math.random()/5;
      particle.velocityX = (Math.random()-0.5)/3;

      geom.vertices.push(particle);

    }


    cloud = new THREE.ParticleSystem(geom,material);
    cloud.sortParticles=true;
    scene.add(cloud);
  }

  function render(){

    stats.update();
    console.log(cloud);
    var vertices = cloud.geometry.vertices;

    vertices.forEach(function(v){
      v.y = v.y - (v.velocityY);
      v.x = v.x - (v.velocityX);

      if (v.y <= 0) v.y = 60;
      if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;


    });

    requestAnimationFrame(render);
    webGLRenderer.render(scene,camera);

  }


  function initStats() {

    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.getElementById("Stats-output").appendChild(stats.domElement);

    return stats;
  }
}


window.onload = init;
