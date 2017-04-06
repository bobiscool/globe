
import THREELib from "three-js";
var THREE = THREELib();
var TWEEN = require('tween.js');
import world from "img/world.jpg"
var DAT = DAT || {};
import dat from "dat-gui"
var once = false;
var carmZ=0;

DAT.Globe = function(container, opts) {
  opts = opts || {};
  var controls = new function () {
    this.cameraZ = 0.02;
    this.zoom = 350;
  };
  var gui = new dat.GUI();
  gui.add(controls, 'cameraZ', 0, 100);
  gui.add(controls, 'zoom', 350, 1000);

  var colorFn = opts.colorFn || function(x) {
    var c = new THREE.Color();
    c.setHSL( ( 0.6 - ( x * 0.5 ) ), 1.0, 0.5 );
    return c;
  };
  var imgDir = opts.imgDir || '/globe/';

  //着色器
  var Shaders = {
    'earth' : {
      uniforms: {
        'texture': { type: 't', value: null }
      },
      vertexShader: [
        'varying vec3 vNormal;',
        'varying vec2 vUv;',
        'void main() {',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
          'vNormal = normalize( normalMatrix * normal );',
          'vUv = uv;',
        '}'
      ].join('\n'),
      fragmentShader: [
        'uniform sampler2D texture;',
        'varying vec3 vNormal;',
        'varying vec2 vUv;',
        'void main() {',
          'vec3 diffuse = texture2D( texture, vUv ).xyz;',
          'float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );',
          'vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );',
          'gl_FragColor = vec4( diffuse + atmosphere, 1.0 );',
        '}'
      ].join('\n')
    },
    'atmosphere' : {
      uniforms: {},
      vertexShader: [
        'varying vec3 vNormal;',
        'void main() {',
          'vNormal = normalize( normalMatrix * normal );',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}'
      ].join('\n'),
      fragmentShader: [
        'varying vec3 vNormal;',
        'void main() {',
          'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );',
          'gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;',
        '}'
      ].join('\n')
    }
  };

  var camera, scene, renderer, w, h;
  var mesh, atmosphere, point,globe,flag,plane;
// TODO var区域
  var overRenderer;

  var curZoomSpeed = 0;
  var zoomSpeed = 50;

  var mouse = { x: 0, y: 0 }, mouseOnDown = { x: 0, y: 0 };
  var rotation = { x: 0, y: 0 },
      target = { x: Math.PI*3/2, y: Math.PI / 6.0 },
      targetOnDown = { x: 0, y: 0 };

  var distance = 100000, distanceTarget = 100000;
  var padding = 40;
  var PI_HALF = Math.PI / 2;

  function init() {




    container.style.color = '#fff';
    container.style.font = '13px/20px Arial, sans-serif';

    var shader, uniforms, material;
    w = container.offsetWidth || window.innerWidth;
    h = container.offsetHeight || window.innerHeight;

    camera = new THREE.PerspectiveCamera(30, w / h, 1, 10000);
    camera.position.z = distance;

    scene = new THREE.Scene();

    var axisHelper = new THREE.AxisHelper( 1000 );
    scene.add( axisHelper );


//TODO  创建地球

    var geometry = new THREE.SphereGeometry(200, 40, 30);

    shader = Shaders['earth'];
    uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    uniforms['texture'].value = THREE.ImageUtils.loadTexture(world);

// 贴皮肤

    material = new THREE.ShaderMaterial({

          uniforms: uniforms,
          vertexShader: shader.vertexShader,
          fragmentShader: shader.fragmentShader

        });


    globe = new THREE.Mesh(geometry, material);
    // globe.rotation.y = Math.PI;
    // scene.add(globe);


   // TODO 添加大气层
    shader = Shaders['atmosphere'];
    uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    material = new THREE.ShaderMaterial({

          uniforms: uniforms,
          vertexShader: shader.vertexShader,
          fragmentShader: shader.fragmentShader,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true

        });



    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set( 1.1, 1.1, 1.1 );
    var group = new THREE.Group();
    group.add(globe);
    group.add(mesh);
    // group.position.x = 500;

    scene.add(group);




    geometry = new THREE.BoxGeometry(0.5,0.5, 1);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,-0.5));// 做了一些metrix变换

    point = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({
      color: 0xfdcfdc
    }));


    var planeGeo = new THREE.PlaneGeometry(5,10,3,3);
    var planeMat = new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide});
    plane = new THREE.Mesh(planeGeo,planeMat);





   flag = new THREE.Vector3(0,0,0);

    //TODO  创建点


    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(w, h);

    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.left = '0';


    // TODO 事件添加区域
    container.appendChild(renderer.domElement);

    container.addEventListener('mousedown', onMouseDown, false);

    container.addEventListener('mousewheel', onMouseWheel, false);

    document.addEventListener('keydown', onDocumentKeyDown, false);

    window.addEventListener('resize', onWindowResize, false);

    container.addEventListener('mouseover', function() {
      overRenderer = true;
    }, false);

    container.addEventListener('mouseout', function() {
      overRenderer = false;
    }, false);
  }

  function addData(data, opts) {
    var lat, lng, size, color, i, step, colorFnWrapper;


      lat = data.lat;
      lng = data.lng;
      color =  0xfdcfdc;
      size = 50;
      addPoint(lat, lng, size, color);

  };



  function addPoint(lat, lng, size, color) {
    console.log("lat",lat);

    var phi = (90 - lat) * Math.PI / 180;
    var theta = (180 - lng) * Math.PI / 180;

    point.position.x = 200 * Math.sin(phi) * Math.cos(theta);
    point.position.y = 200 * Math.cos(phi);
    point.position.z = 200 * Math.sin(phi) * Math.sin(theta);
    point.scale.z = Math.max( size, 0.1 );

    var point2 = point.clone();
    point2.lookAt(flag);
    console.log(point2);
   //TODO 添加点位
    scene.add(point2);



    plane.position.x = 300 * Math.sin(phi) * Math.cos(theta);
    plane.position.y = 300 * Math.cos(phi);
    plane.position.z = 300 * Math.sin(phi) * Math.sin(theta);
    var plane2 = plane.clone();
    plane2.lookAt(flag);
    scene.add(plane2);

    // todo 添加平面


    // // 朝向   调节 rotation用的
    // point.lookAt(mesh.position);
    //
    // point.scale.z = Math.max( size, 0.1 ); // avoid non-invertible matrix 这是干嘛
    // point.updateMatrix();
    //
    // for (var i = 0; i < point.geometry.faces.length; i++) {
    //
    //   point.geometry.faces[i].color = color;
    //
    // }
    // if(point.matrixAutoUpdate){
    //   point.updateMatrix();
    // }
    // subgeo.merge(point.geometry, point.matrix);

  }


  function createPoints() {
    console.log("------------------");
    // console.log(this._baseGeometry);
    if (this._baseGeometry !== undefined) {
      // if (this.is_animated === false) {
      //   this.points = new THREE.Mesh(this._baseGeometry, new THREE.MeshBasicMaterial({
      //     color: 0xffffff,
      //     vertexColors: THREE.FaceColors,
      //     morphTargets: false
      //   }));
      // } else {
      //   if (this._baseGeometry.morphTargets.length < 8) {
      //     // console.log('t l',this._baseGeometry.morphTargets.length);
      //     // console.log('t l',this._baseGeometry.morphTargets);
      //
      //     var padding = 8-this._baseGeometry.morphTargets.length;
      //     console.log('padding', padding);
      //     for(var i=0; i<=padding; i++) {
      //       console.log('padding',i);
      //       this._baseGeometry.morphTargets.push({'name': 'morphPadding'+i, vertices: this._baseGeometry.vertices});
      //     }
      //   }


        // 显示 addData 然后才是 addPonits  然后才是 createPoints
        console.log(this._baseGeometry);
        this.points = new THREE.Mesh(this._baseGeometry, new THREE.MeshBasicMaterial({
          color: 0xffffff,
          vertexColors: THREE.FaceColors,
          morphTargets: true
        }));


      scene.add(this.points);

      console.log(this.points);
    }
  }



















  function onMouseDown(event) {
    event.preventDefault();

    container.addEventListener('mousemove', onMouseMove, false);
    container.addEventListener('mouseup', onMouseUp, false);
    container.addEventListener('mouseout', onMouseOut, false);

    mouseOnDown.x = - event.clientX;
    mouseOnDown.y = event.clientY;

    targetOnDown.x = target.x;
    targetOnDown.y = target.y;

    container.style.cursor = 'move';
  }

  function onMouseMove(event) {
    mouse.x = - event.clientX;
    mouse.y = event.clientY;

    var zoomDamp = distance/1000;

    target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
    target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

    target.y = target.y > PI_HALF ? PI_HALF : target.y;
    target.y = target.y < - PI_HALF ? - PI_HALF : target.y;
  }

  function onMouseUp(event) {
    container.removeEventListener('mousemove', onMouseMove, false);
    container.removeEventListener('mouseup', onMouseUp, false);
    container.removeEventListener('mouseout', onMouseOut, false);
    container.style.cursor = 'auto';
  }

  function onMouseOut(event) {
    container.removeEventListener('mousemove', onMouseMove, false);
    container.removeEventListener('mouseup', onMouseUp, false);
    container.removeEventListener('mouseout', onMouseOut, false);
  }

  function onMouseWheel(event) {
    event.preventDefault();
    if (overRenderer) {
      zoom(event.wheelDeltaY * 0.3);
    }
    return false;
  }

  function onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 38:
        zoom(100);
        event.preventDefault();
        break;
      case 40:
        zoom(-100);
        event.preventDefault();
        break;
    }
  }

  function onWindowResize( event ) {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( container.offsetWidth, container.offsetHeight );
  }

  function zoom(delta) {
    distanceTarget -= delta;
    distanceTarget = distanceTarget > 2000 ? 2000 : distanceTarget;
    distanceTarget = distanceTarget < 350 ? 350 : distanceTarget;
  }

  function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    render();
  }


  distanceTarget=400;
  function render() {
    zoom(curZoomSpeed);

    // distanceTarget=controls.zoom;


    rotation.x += (target.x - rotation.x) * 0.1;
    rotation.y += (target.y - rotation.y) * 0.1;
    distance += (distanceTarget - distance) * 0.3;

    // rotation.x +=0.01;
    // rotation.y +=0.1;

    // distance += (distanceTarget - distance) * 0.01;


    camera.position.x = distance * Math.sin(rotation.x) * Math.cos(rotation.y);
    camera.position.y = distance * Math.sin(rotation.y);
    // camera.position.z = distance * Math.cos(rotation.x) * Math.cos(rotation.y);
    camera.position.z = distance * Math.cos(rotation.x) * Math.cos(rotation.y)*0.9+100;

    // camera.position.z = 1;
    camera.lookAt(mesh.position);

    renderer.render(scene, camera);
  }

  init();
  this.animate = animate;


  this.__defineGetter__('time', function() {
    console.log("Getter");
    return this._time || 0;
  });

  this.__defineSetter__('time', function(t) {
    // console.log("Setter");
    var validMorphs = [];
    var morphDict = this.points.morphTargetDictionary;
    // console.log("morphTargetDictionary");
    // console.log(this.points.morphTargetDictionary);
    for(var k in morphDict) {
      if(k.indexOf('morphPadding') < 0) {
        validMorphs.push(morphDict[k]);
      }
    }
    validMorphs.sort();
    var l = validMorphs.length-1;
    var scaledt = t*l+1;
    var index = Math.floor(scaledt);
    for (var i=0;i<validMorphs.length;i++) {
      this.points.morphTargetInfluences[validMorphs[i]] = 0;
    }
    var lastIndex = index - 1;
    var leftover = scaledt - index;
    if (lastIndex >= 0) {
      this.points.morphTargetInfluences[lastIndex] = 1 - leftover;
    }
    this.points.morphTargetInfluences[index] = leftover;
    this._time = t;
  });



  function stars() {
    var starsGeometry = new THREE.Geometry();
    for (var i = 0; i < 2000; i ++) {
      var starVector = new THREE.Vector3(
        THREE.Math.randFloatSpread(2000),
        THREE.Math.randFloatSpread(2000),
        THREE.Math.randFloatSpread(2000)
      );
      starsGeometry.vertices.push(starVector);
    }
    var starsMaterial = new THREE.PointsMaterial({color: 0x888888})
    var starsPoint = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsPoint);
  }



  this.addData = addData;
  this.createPoints = createPoints;
  this.renderer = renderer;
  this.scene = scene;

  return this;

};





export default DAT;
