import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.useXDomain = true;

export function graphRequest(data, method) {
  return axios
    .post("http://127.0.0.1:3000/graphql", data)
    .then(res => {
      if(res.data != null && res.data.data.hasOwnProperty(method)){
        return res.data.data[method];
      }else{
        return null;
      }
    })
    .catch(err => {
      //console.log(`Hubo un error en la peticion al dominio graphql: ${err}`);
    });
}
