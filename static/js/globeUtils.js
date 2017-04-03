/**
 * Created by mac WuYiPing on 17/4/3.
 */



function addObjectAtLatLng(obj,lat,lng,height){
  if(!height){height=0;}
  var pos = latLngToVector3(lat  ,(lng) ,radius+height);
  obj.position.set(pos.x, pos.y, pos.z);
  //obj.lookAt(earth.position);
  // instead look away :)
  var v = new THREE.Vector3();
  v.subVectors(obj.position, earth.position).add(obj.position);
  obj.lookAt(v);

  earth.add(obj);
}

function latLngToVector3(lat, lon, radius) {
  var phi = (lat)*Math.PI/180;
  var theta = (lon-180)*Math.PI/180;

  var x = -(radius) * Math.cos(phi) * Math.cos(theta);
  var y = (radius) * Math.sin(phi);
  var z = (radius) * Math.cos(phi) * Math.sin(theta);

  return new THREE.Vector3(x,y,z);
}
