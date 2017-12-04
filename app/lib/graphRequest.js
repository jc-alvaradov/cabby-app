import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.useXDomain = true;

export function graphRequest(data) {
  return axios
    .post("http://127.0.0.1:3000/graphql", data)
    .then(res => {
      //console.log("LA RESPUESTA A MI PETICION FUE: " + JSON.stringify(res));
      return res;
    })
    .catch(err => {
      //console.log(`Hubo un error en la peticion al dominio graphql: ${err}`);
    });
}
