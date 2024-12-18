document.addEventListener("DOMContentLoaded", function(event) { 


var scene3d = document.getElementById("3dscene");
var cube = document.getElementById("cube");
var rotation_state = [[1, 0 ,0], [0, 1, 0], [0, 0, 1]];
var mouse_vector = [0, 0];
var isSceneClickedAndMouseOn = false;
var lastTouchX;
var lastTouchY;
var touchStarted;


//mouse dragging code
window.addEventListener('mousemove', function(event) {
  if (scene3d.clicked && scene3d.mouseon) {
    mouse_vector[0] = - 0.01 * event.movementX;
    mouse_vector[1] = - 0.01 * event.movementY;

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


// touch code
scene3d.addEventListener("touchstart", doTouchStart, false);

function doTouchStart(e) {
  if (e.touches.length != 1) {
    doTouchCancel();
    return;
 }

  e.preventDefault();
  lastTouchX = e.touches[0].pageX;
  lastTouchY = e.touches[0].pageY;
  scene3d.addEventListener("touchmove", doTouchMove, false);
  scene3d.addEventListener("touchend", doTouchEnd, false);
  scene3d.addEventListener("touchcancel", doTouchCancel, false);
  touchStarted = true;
};

function doTouchMove(e) {
  if (e.touches.length != 1 || !touchStarted) {
    doTouchCancel();
    return;
  }

  e.preventDefault();
  mouse_vector[0] = -0.01*(e.touches[0].pageX - lastTouchX);
  mouse_vector[1] = -0.01*(e.touches[0].pageY - lastTouchY);
  lastTouchX = e.touches[0].pageX;
  lastTouchY = e.touches[0].pageY;
  renderRotation();
};

function doTouchEnd(e) {
  doTouchCancel();
}

function doTouchCancel() {
  if (touchStarted) {
     touchStarted = false;
     scene3d.removeEventListener("touchmove", doTouchMove, false);
     scene3d.removeEventListener("touchend", doTouchEnd, false);
     scene3d.removeEventListener("touchcancel", doTouchCancel, false);
  }
};

window.addEventListener('touchend', function(e) {
  scene3d.touched = false;
  scene3d.touchon = false;
});


// rotation math
function rotation_delta(mousevec) {
  angle = Math.sqrt(mousevec[0]**2 + mousevec[1]**2);
  axis_x = -mousevec[1]/angle;
  axis_y = mousevec[0]/angle;

  return [[1 + (Math.cos(angle)-1)*axis_y**2, (1-Math.cos(angle))*axis_x*axis_y,  Math.sin(angle)*axis_y], 
          [(1-Math.cos(angle))*axis_x*axis_y, 1 + (Math.cos(angle)-1)*axis_x**2, -Math.sin(angle)*axis_x], 
          [-Math.sin(angle)*axis_y,           Math.sin(angle)*axis_x,             Math.cos(angle)]];
};


function matmul(A, B) {
  let C = new Array(3);
  for (let i = 0; i < 3; i++) {
    C[i] = new Array(3);
  }

  for (let i = 0; i < 3; i++) {
    for (let k = 0; k < 3; k++) {
      C[i][k] = 0;
      for (let j = 0; j < 3; j++) {
        C[i][k] += A[i][j] * B[j][k];
      }
    }
  }
  return C;
};

function norm(vec) {
  return Math.sqrt(vec[0]**2 + vec[1]**2 + vec[2]**2);
};

function normalize(vec) {
  const magnitude = norm(vec);
  return [vec[0]/magnitude, vec[1]/magnitude, vec[2]/magnitude];
};

function vec_subtract(vec1, vec2) {
  return [vec1[0]-vec2[0], vec1[1]-vec2[1], vec1[2]-vec2[2]];
};

function vec_scale(scalar, vec) {
  return [scalar * vec[0], scalar * vec[1], scalar * vec[2]];
};

function dot_prod(vec1, vec2) {
  return vec1[0]*vec2[0] + vec1[1]*vec2[1] + vec1[2]*vec2[2];
};

function gram_schmidt(A) {
  A[0] = normalize(A[0]);

  A[1] = vec_subtract(A[1], vec_scale(dot_prod(A[0], A[1]), A[0]) );
  A[1] = normalize(A[1]);

  A[2] = vec_subtract(A[2], vec_scale(dot_prod(A[0], A[2]), A[0]));
  A[2] = vec_subtract(A[2], vec_scale(dot_prod(A[1], A[2]), A[1]));
  A[2] = normalize(A[2]);

  return [A[0], A[1], A[2]];
};

function renderRotation() {
  let delta = rotation_delta(mouse_vector);
  rotation_state = matmul(rotation_state, delta);
  gram_schmidt(rotation_state);
  cube.style.transform = `translateZ(-100px) matrix3d(${rotation_state[0][0]}, ${rotation_state[0][1]}, ${rotation_state[0][2]}, 0,
                                                      ${rotation_state[1][0]}, ${rotation_state[1][1]}, ${rotation_state[1][2]}, 0,
                                                      ${rotation_state[2][0]}, ${rotation_state[2][1]}, ${rotation_state[2][2]}, 0,
                                                      0,                       0,                       0,                       1)`;
};

// backface visibility
var backfaceCheckbox = document.querySelector('.backface-checkbox');
backfaceCheckbox.onchange = function() {
  cube.classList.toggle( 'is-backface-hidden', !backfaceCheckbox.checked );
};


});