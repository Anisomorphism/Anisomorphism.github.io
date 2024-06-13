document.addEventListener("DOMContentLoaded", function(event) { 


// cube second attempt




var scene3d = document.getElementById("3dscene");
var cube = document.getElementById("cube");
var thetaRange = document.getElementById("thetaRange");
var deltatheta = 0;
var deltapsi = 0;
var psi = 0;
var theta = 0;
var phi = 0;
var label = document.getElementById("degLabel");
var isSceneClickedAndMouseOn = false;
var lastTouchX;
var lastTouchY;
var isSceneTouchedAndFingerOn = false;

thetaRange.addEventListener("input", () => rotatecube());


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
});


window.addEventListener('touchmove', function(e) {
  const touch = e.touches[0];
  if (scene3d.touched && scene3d.touchon) {
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

  psi *= (Math.PI/180);
  theta *= (Math.PI/180);
  phi *= (Math.PI/180);

  psi += deltapsi;
  if (psi > 2 * Math.PI) {
    psi -= 2 * Math.PI;
  }
  if (psi < 0) {
    psi += 2 * Math.PI;
  }
  

  var newtheta = Math.asin(Math.cos(deltatheta)*Math.sin(theta)+Math.sin(deltatheta)*Math.cos(theta)*Math.cos(psi));

  var newpsi = Math.atan2(Math.cos(theta)*Math.sin(psi),-Math.sin(deltatheta)*Math.sin(theta)+Math.cos(deltatheta)*Math.cos(theta)*Math.cos(psi));

  var newphi = Math.atan2(Math.cos(deltatheta)*Math.cos(theta)*Math.sin(phi)-Math.sin(deltatheta)*(Math.cos(psi)*Math.sin(theta)*Math.sin(phi)-Math.sin(psi)*Math.cos(phi)),Math.cos(deltatheta)*Math.cos(theta)*Math.cos(phi)-Math.sin(deltatheta)*(Math.cos(psi)*Math.sin(theta)*Math.cos(phi)+Math.sin(psi)*Math.sin(phi)));

  if (Math.sin(newtheta) == 0 && newtheta < 0) {
    newphi = Math.atan2(-(Math.sin(psi)*Math.sin(theta)*Math.cos(phi)-Math.cos(psi)*Math.sin(phi)),-(Math.sin(deltatheta)*Math.cos(theta)*Math.cos(phi)+Math.cos(deltatheta)(Math.cos(psi)*Math.sin(theta)*Math.cos(phi)+Math.sin(psi)*Math.sin(phi))));
    newpsi = 0
  } else if (Math.sin(newtheta) == 0 && newtheta > 0) {
    newphi = -Math.atan2(Math.sin(psi)*Math.sin(theta)*Math.cos(phi)-Math.cos(psi)*Math.sin(phi),Math.sin(deltatheta)*Math.cos(theta)*Math.cos(phi)+Math.cos(deltatheta)(Math.cos(psi)*Math.sin(theta)*Math.cos(phi)+Math.sin(psi)*Math.sin(phi)));
    newpsi = 0;
  }

  psi = (180/Math.PI)*newpsi;
  theta = (180/Math.PI)*newtheta;
  phi = (180/Math.PI)*newphi;
  
  if (theta >= 0) {
    thetaRange.value = theta;
  } else {
    thetaRange.value = theta + 360;
  }

  rotatecube();
}

function rotatecube() {

  theta = thetaRange.value;
  cube.style.transform = `translateZ(-100px) rotateX(${psi}deg) rotateY(${theta}deg) rotateZ(${phi}deg)`;
  label.innerText = `${thetaRange.value}deg`;

}

// backface visibility
var backfaceCheckbox = document.querySelector('.backface-checkbox');
backfaceCheckbox.onchange = function() {
  cube.classList.toggle( 'is-backface-hidden', !backfaceCheckbox.checked );
};


});