document.addEventListener("DOMContentLoaded", function(event) { 


// cube second attempt




var scene3d = document.getElementById("3dscene");
var cube = document.getElementById("cube");
var thetaRange = document.getElementById("thetaRange");
var phiRange = document.getElementById("phiRange");
var psiRange = document.getElementById("psiRange");
var deltatheta = 0;
var deltapsi = 0;
var qw = 1;
var qx = 0;
var qy = 0;
var qz = 0;
var psi = 0;
var theta = 0;
var phi = 0;
var thetalabel = document.getElementById("thetadegLabel");
var psilabel = document.getElementById("psidegLabel");
var philabel = document.getElementById("phidegLabel");
var isSceneClickedAndMouseOn = false;
var lastTouchX;
var lastTouchY;
var isSceneTouchedAndFingerOn = false;

thetaRange.addEventListener("input", () => rotatecube());
phiRange.addEventListener("input", () => rotatecube());
psiRange.addEventListener("input", () => rotatecube());


window.addEventListener('mousemove', function(event) {
  if (scene3d.clicked && scene3d.mouseon) {
    deltatheta = 0.01 * event.movementX;
    deltapsi = -0.01 * event.movementY;
    isSceneClickedAndMouseOn = true;
  }
});

setInterval(function() {
  if (isSceneClickedAndMouseOn) {
    renderRotation();
    isSceneClickedAndMouseOn = false;
  }
}, 10);

scene3d.addEventListener('mousedown', function(e) {
  scene3d.clicked = true;
  scene3d.mouseon = true;
});

window.addEventListener('mouseup', function(e) {
  scene3d.clicked = false;
  scene3d.mouseon = false;
  // deltatheta = 0;
  // deltapsi = 0;
});


window.addEventListener('touchmove', function(e) {

  const touch = e.touches[0];
  if (scene3d.touched && scene3d.touchon) {

    var numtouches = e.touches.length;
    var sumX;
    var sumY;
    for (let i = 0; i < numtouches; i++) {
      sumX = e.touches[i].pageX;
      sumY = e.touches[i].pageY;
    }
    touch.pageX = sumX/numtouches;
    touch.pageY = sumY/numtouches;

    deltatheta = 0.01 * (touch.pageX - lastTouchX);
    deltapsi = -0.01 * (touch.pageY - lastTouchY);
    lastTouchX = touch.pageX;
    lastTouchY = touch.pageY;
    isSceneTouchedAndFingerOn = true;
  }
  console.log(scene3d.touched);
});

setInterval(function() {
  if (scene3d.touched) {
    renderRotation();
    isSceneTouchedAndFingerOn = false;
  }
}, 10);

scene3d.addEventListener('touchstart', function(e) {
  scene3d.touched = true;
  scene3d.touchon = true;
  lastTouchX = e.touches[0].pageX;
  lastTouchY = e.touches[0].pageY;
});

window.addEventListener('touchend', function(e) {
  scene3d.touched = false;
  scene3d.touchon = false;
});





function renderRotation() {
  dragRotate(scene3d);
}



function dragRotate(el) {

  // var pw = Math.cos(deltapsi/2);
  // var px = Math.sin(deltapsi/2);

  // var rw = Math.cos(-deltatheta/2);
  // var ry = Math.sin(-deltatheta/2);

  // var newqw = pw*qw-px*qx;
  // var newqx = pw*qx-px*qw;
  // var newqy = pw*qy-px*qz;
  // var newqz = pw*qz-px*qy;
  // qw = newqw;
  // qx = newqx;
  // qy = newqy;
  // qz = newqz;

  // newqw = rw*qw-ry*qy;
  // newqx = rw*qx+ry*qz;
  // newqy = rw*qy+ry*qw;
  // newqz = rw*qz-ry*qx;
  // qw = newqw;
  // qx = newqx;
  // qy = newqy;
  // qz = newqz;
  // var norm = Math.sqrt(qw*qw+qx*qx+qy*qy+qz*qz);
  // qw /= norm;
  // qx /= norm;
  // qy /= norm;
  // qz /= norm;

  // psi = (180/Math.PI) * Math.atan2( 2*(qy*qz-qw*qx), 1-2*(qx*qx+qy*qy) );
  // theta = -(180/Math.PI) * Math.asin(2*(qw*qy+qx*qz));
  // phi = (180/Math.PI) * Math.atan2( 2*(qx*qy-qw*qz), 1-2*(qy*qy-qz*qz) );

  // var a = Math.acos((3*qw*qw-qx*qx-qy*qy-qz*qz-1)/2);
  // if (Math.abs(a) > 0.95){
  //   a = - Math.acos((3*qw*qw-qx*qx-qy*qy-qz*qz-1)/2);
  // }
 
  // var x = (-2*qw*qx)/Math.sin(a);
  // var y = (-2*qw*qy)/Math.sin(a);
  // var z = (-2*qw*qz)/Math.sin(a);
  // console.log(`x = ${x}, y = ${y}, z = ${z}, sin(a) = ${Math.sin(a)}`)
  // a *= (180/Math.PI);
  
  // cube.style.transform = `translateZ(-100px) rotateX(${psi}deg) rotateY(${theta}deg) rotateZ(${phi}deg)`;

  // cube.style.transform = `translateZ(-100px) rotate3d(${x},${y},${z},${a}deg)`;



  psi *= (Math.PI/180);
  theta *= (Math.PI/180);
  phi *= (Math.PI/180);

  if ((psi+deltapsi <= Math.PI/4) || psi+deltapsi >= 7*Math.PI/4) {

    psi += deltapsi;
    if (psi > 2 * Math.PI) {
      psi -= 2 * Math.PI;
    }
    if (psi < 0) {
      psi += 2 * Math.PI;
    }
  }

  // psi += deltapsi;
  // if (psi > 2 * Math.PI) {
  //   psi -= 2 * Math.PI;
  // }
  // if (psi < 0) {
  //   psi += 2 * Math.PI;
  // }


  var newtheta = Math.asin(Math.cos(deltatheta)*Math.sin(theta)+Math.sin(deltatheta)*Math.cos(theta)*Math.cos(psi));

  var newpsi = Math.atan2(Math.cos(theta)*Math.sin(psi),-Math.sin(deltatheta)*Math.sin(theta)+Math.cos(deltatheta)*Math.cos(theta)*Math.cos(psi));

  // if (theta >= Math.PI) {
  //   theta = theta - 2 * Math.PI;
  // } else if (theta <= -180) {
  //   theta = theta + 2 * Math.PI;
  // } else {
  //   theta = theta;
  // }

  // if (psi >= Math.PI) {
  //   psi = psi - 2 * Math.PI;
  // } else if (psi <= -180) {
  //   psi = psi + 2 * Math.PI;
  // } else {
  //   psi = psi;
  // }

  // if (phi >= 2*Math.PI) {
  //   phi = phi - 2 * Math.PI;
  // } else if (phi <= -180) {
  //   phi = phi + 2 * Math.PI;
  // } else {
  //   phi = phi;
  // }
  

  var newphi = Math.atan2(Math.cos(deltatheta)*Math.cos(theta)*Math.sin(phi)-Math.sin(deltatheta)*(Math.cos(psi)*Math.sin(theta)*Math.sin(phi)-Math.sin(psi)*Math.cos(phi)),Math.cos(deltatheta)*Math.cos(theta)*Math.cos(phi)-Math.sin(deltatheta)*(Math.cos(psi)*Math.sin(theta)*Math.cos(phi)+Math.sin(psi)*Math.sin(phi)));

  if (Math.sin(newtheta) == 0 && newtheta < 0) {
    newphi = Math.atan2(-(Math.sin(psi)*Math.sin(theta)*Math.cos(phi)-Math.cos(psi)*Math.sin(phi)),-(Math.sin(deltatheta)*Math.cos(theta)*Math.cos(phi)+Math.cos(deltatheta)(Math.cos(psi)*Math.sin(theta)*Math.cos(phi)+Math.sin(psi)*Math.sin(phi))));
    newpsi = 0
  } else if (Math.sin(newtheta) == 0 && newtheta > 0) {
    newphi = -Math.atan2(Math.sin(psi)*Math.sin(theta)*Math.cos(phi)-Math.cos(psi)*Math.sin(phi),Math.sin(deltatheta)*Math.cos(theta)*Math.cos(phi)+Math.cos(deltatheta)(Math.cos(psi)*Math.sin(theta)*Math.cos(phi)+Math.sin(psi)*Math.sin(phi)));
    newpsi = 0;
  }

  // if (Math.max(Math.abs(newphi), Math.abs(newtheta), Math.abs(newpsi)) <= Math.pi/2) {

  //   psi = (180/Math.PI) * newpsi;
  //   theta = (180/Math.PI) * newtheta;
  //   phi = (180/Math.PI) * newphi;
  // }

  // if (newpsi <= Math.pi/4 || newpsi >= 7*Math.pi/4) {
  //   psi = (180/Math.PI) * newpsi;
  // }

  if (newpsi < 0) {
    newpsi += 2*Math.PI;
  }
  
  if (newtheta < 0) {
    newtheta += 2*Math.PI;
  }

  if (newphi < 0) {
    newphi += 2*Math.PI;
  }

  if ( (newpsi <= Math.PI/4 && newtheta <= Math.PI/4) || (newpsi >= 7*Math.PI/4 && newtheta >= 7*Math.PI/4) || (newpsi <= Math.PI/4 && newtheta >= 7*Math.PI/4) || (newpsi >= 7*Math.PI/4 && newtheta <= Math.PI/4) ) {
    psi = (180/Math.PI) * newpsi;
    theta = (180/Math.PI) * newtheta;
    phi = (180/Math.PI) * newphi;
  } else {
    psi *= (180/Math.PI);
    theta *= (180/Math.PI);
    phi *= (180/Math.PI);
  }

  

  if (theta >= 0) {
    thetaRange.value = theta;
  } else {
    thetaRange.value = theta + 360;
  }

  if (psi >= 0) {
    psiRange.value = psi;
  } else {
    psiRange.value = psi + 360;
  }

  if (phi >= 0) {
    phiRange.value = phi;
  } else {
    phiRange.value = phi + 360;
  }

  thetalabel.innerText = `${thetaRange.value}deg`;
  psilabel.innerText = `${psiRange.value}deg`;
  philabel.innerText = `${phiRange.value}deg`;

  // theta = thetaRange.value;
  // psi = psiRange.value;
  // phi = phiRange.value;

  // thetalabel.innerText = `${thetaRange.value}deg`;
  // psilabel.innerText = `${psiRange.value}deg`;
  // philabel.innerText = `${phiRange.value}deg`;

  rotatecube();
}

function rotatecube() {

  theta = thetaRange.value;
  psi = psiRange.value;
  phi = phiRange.value;
  cube.style.transform = `translateZ(-100px) rotateX(${psi}deg) rotateY(${theta}deg) rotateZ(${phi}deg)`;
  // cube.style.transform = `rotate3d(0,1,0,${10*deltatheta}deg) rotate3d(1,0,0,${10*deltapsi}deg)`;
  thetalabel.innerText = `${thetaRange.value}deg`;
  psilabel.innerText = `${psiRange.value}deg`;
  philabel.innerText = `${phiRange.value}deg`;

}

// backface visibility
var backfaceCheckbox = document.querySelector('.backface-checkbox');
backfaceCheckbox.onchange = function() {
  cube.classList.toggle( 'is-backface-hidden', !backfaceCheckbox.checked );
};


});