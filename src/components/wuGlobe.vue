<!--Created by WuYiPing -->
<template>
  <div id="container"></div>
</template>

<script type="text/ecmascript-6">
  import THREELib from "three-js";
  import dat from "dat-gui"
  import IDR from "sta/wuGlobe/data.js"
  import $ from "jquery"
  import world from "img/world.jpg"
  import data from "sta/wuGlobe/CityData.js"
  var THREE = THREELib(); // return THREE JS
  import DAT from "sta/wuGlobe/globeWU.js"
  import Detector from "sta/wuGlobe/Detector.js"
  //  import TWEEN from "tween"
  var TWEEN = require('tween.js');


    export default{
        data(){
            return {}
        },
        components: {

        },

      methods:{


      }
    }
</script>
<style lang="scss">
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
