<template>
  <!--<div id="WebGL-output">-->
    <!--&lt;!&ndash;<section id="webgl-content"></section>&ndash;&gt;-->
  <!--</div>-->

  <div id="container"></div>

</template>

<script>
  import THREELib from "three-js";
  import dat from "dat-gui"
  import IDR from "sta/js2/data.js"
  import $ from "jquery"
  import world from "img/world.jpg"
  import data from "sta/js2/CityData.js"
  var THREE = THREELib(); // return THREE JS
  import DAT from "sta/js2/globeWU.js"
  import Detector from "sta/js2/Detector.js"
//  import TWEEN from "tween"
  var TWEEN = require('tween.js');
  console.log(data);
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted:function () {
   var n =0;

    console.log(TWEEN);

    if(!Detector.webgl){
      Detector.addGetWebGLMessage();
    } else {
      var option = {
          imgDir:world
      }
      var container = document.getElementById('container');
      var globe = new DAT.Globe(container,option);

      var i, tweens = [];





//            var data = JSON.parse(data);
            window.data = data;
            for (i=0;i<data["phase1"].length;i++) {
              globe.addData(data["phase1"][i], {format: 'magnitude', name: "hehe", animated: false});
            }
            globe.createPoints();
//            console.log("settime",setTime(globe,0));





            globe.animate();
            document.body.style.backgroundImage = 'none'; // remove loading
    }







  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    /* set margin to 0 and overflow to hidden, to
     use the complete page */
    /*margin: 0;*/
    /*overflow: hidden;*/
    width: 100%;
    height: 100%;

  }

  html {
    height: 100%;
    width: 100%;
  }

  #app {
    width: 1000px;
    height: 600px;
    position: absolute;
  }
  canvas {
    position: absolute!important;
    left: 0!important;
    top:0;
  }

  #container {
    width: 1000px;
    height: 600px;
  }


</style>
