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

thetaRange.addEventListener("input", () => rotatecube());


scene3d.addEventListener('mousemove', function(event) {
  if(scene3d.clicked && scene3d.mouseon){
    deltatheta = 0.01 * event.movementX;
    deltapsi = -0.01 * event.movementY;
    dragRotate(scene3d);
  }
});

scene3d.addEventListener('mousedown', function(e) {
  scene3d.clicked = true;
});

scene3d.addEventListener('mouseup', function(e) {
  scene3d.clicked = false;
});

scene3d.addEventListener('mouseover', function(e) {
  scene3d.mouseon = true;
});

scene3d.addEventListener('mouseleave', function(e) {
  scene3d.mouseon = false;
});



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

  var newphi = 0;

  if (Math.sin(newtheta) == 0 && newtheta < 0) {
    newphi = Math.atan2(-(Math.sin(psi)*Math.sin(theta)*Math.cos(phi)-Math.cos(psi)*Math.sin(phi)),-(Math.sin(deltatheta)*Math.cos(theta)*Math.cos(phi)+Math.cos(deltatheta)(Math.cos(psi)*Math.sin(theta)*Math.cos(phi)+Math.sin(psi)*Math.sin(phi)))) - psi;
  } else if (Math.sin(newtheta) == 0 && newtheta > 0) {
    newphi = psi - Math.atan2(Math.sin(psi)*Math.sin(theta)*Math.cos(phi)-Math.cos(psi)*Math.sin(phi),Math.sin(deltatheta)*Math.cos(theta)*Math.cos(phi)+Math.cos(deltatheta)(Math.cos(psi)*Math.sin(theta)*Math.cos(phi)+Math.sin(psi)*Math.sin(phi)));
  } else {
    newphi = Math.atan2(Math.cos(deltatheta)*Math.cos(theta)*Math.sin(phi)-Math.sin(deltatheta)*(Math.cos(psi)*Math.sin(theta)*Math.sin(phi)-Math.sin(psi)*Math.cos(phi)),Math.cos(deltatheta)*Math.cos(theta)*Math.cos(phi)-Math.sin(deltatheta)*(Math.cos(psi)*Math.sin(theta)*Math.cos(phi)+Math.sin(psi)*Math.sin(phi)));
  }

  psi *= (180/Math.PI);
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

  cube.style.transform = `translateZ(-100px) rotateX(${psi}deg) rotateY(${theta}deg) rotateZ(${phi}deg)`;
  label.innerText = `${thetaRange.value}deg`

}

// backface visibility
var backfaceCheckbox = document.querySelector('.backface-checkbox');
backfaceCheckbox.onchange = function() {
  cube.classList.toggle( 'is-backface-hidden', !backfaceCheckbox.checked );
};


});