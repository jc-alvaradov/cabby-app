import Polyline from "@mapbox/polyline";

export async function getDirections(startLoc, destinationLoc) {
  try {
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyAJTjCs9OddMqnuyL6qXowI8SYQTwU5vjQ`
    ).catch(error => {
      console.log(error);
    });
    if (resp != undefined) {
      let respJson = await resp.json();
      // cuando reciba el resultado revisar si es el de cuota superada de google
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      return coords;
    }
  } catch (error) {
    console.log(error);
  }
}
