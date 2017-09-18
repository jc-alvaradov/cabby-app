let carPos = {
  latitude: -33.119836,
  longitude: -71.573660,
};

setInterval(moveCar, 1000);

function moveCar(){
  console.log("Posicion actual: " + pos.latitude + ", " + pos.longitude);

}

function moverIzquierda(pos){
  return pos.latitude + (pos.latitude * -0.0001);
}

function moverDerecha(pos){
  return pos.latitude + (pos.latitude * 0.0001);
}

function moveUp(pos){
  return pos.longitude + (pos.longitude * -0.0001);
}

function moverDown(pos){
  return pos.longitude + (pos.longitude * 0.0001);
}