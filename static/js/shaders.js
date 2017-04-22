/**
 * Created by mac WuYiPing on 17/4/22.
 */
//网上搜集的一些着色器

var SHADER = {
  Glow:{
        uniforms:
          {
            "c":   { type: "f", value: 1.0 },
            "p":   { type: "f", value: 1.4 },
            glowColor: { type: "c", value: new THREE.Color(0xffff00) },
            viewVector: { type: "v3", value:null }
          },
        vertexShader: "uniform vec3 viewVector;"+
"uniform float c;"+
"uniform float p;"+
"varying float intensity;"+
"void main()"+
"{"+
    "vec3 vNormal = normalize( normalMatrix * normal );"+
	"vec3 vNormel = normalize( normalMatrix * viewVector );"+
	"intensity = pow( c - dot(vNormal, vNormel), p );"+
    "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );"+
"}" ,
        fragmentShader:
"uniform vec3 glowColor;"+
"varying float intensity;"+
"void main()"+
"{"+
	"vec3 glow = glowColor * intensity;"+
    "gl_FragColor = vec4( glow, 1.0 );"+
"}",
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true
  }
}
