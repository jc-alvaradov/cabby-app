export async function calqDistance(start, destination) {
  if (start != null && destination != null) {
    const query = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${start.latitude},${start.longitude}&destinations=${destination.latitude},${destination.longitude}&key=AIzaSyAJTjCs9OddMqnuyL6qXowI8SYQTwU5vjQ`;
    let resp = await fetch(query).catch(error => {
      //console.log(error);
    });
    if (resp != undefined) {
      let respJson = await resp.json();

      // cuando reciba el resultado revisar si es el de cuota superada de google
      if (!respJson.hasOwnProperty("error_message")) {
        /**
         * la respuesta tiene varias propiedades como tiempo, distancia, etc
         * https://developers.google.com/maps/documentation/distance-matrix/start
         */
        return respJson.rows[0].elements[0];
      } else {
        console.log(
          "Hubo un error en la peticion a la api de google: " +
            respJson.error_message
        );
      }
    }
  }
}
