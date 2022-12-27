import axios from "axios";
import { Cookies } from "quasar";

var server_address =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:3567/";
axios.defaults.baseURL =
  window.pettycash && window.pettycash.serverAddress
    ? window.pettycash.serverAddress
    : server_address;
axios.defaults.withCredentials = false;
// axios.defaults.httpsAgent = new https.Agent({
//     rejectUnauthorized: false
// })

axios.interceptors.request.use(function (config) {
  //update timeout cookie
  if (config.url !== "user/auth")
    Cookies.set("_t", "a", {
      expires:
        window.pettycash.to !== undefined && window.pettycash.to !== null
          ? window.pettycash.to
          : "5m",
    });

  // var x = window.localStorage.getItem("finx_locale");
  // if (x && config.data !== undefined){
  //     try{
  //         if (config.data.locale === undefined){
  //             config.data.locale = x;
  //         }
  //     }catch(e){
  //         console.error("INTERCEPTOR", e)
  //      }
  // }

  //console.log('axios inerceptor', config, window.location.hash)
  // Get the token from session storage
  //var token = SessionStorage.getItem('token');

  // Check valid token
  // if (token === null) {
  //     let publicPath = ['#/login', '#/forget-password'];

  //     // Redirect to Login if login required
  //     if (publicPath.indexOf(window.location.hash) === -1) {
  //         window.location.href = '/#/login'
  //     }

  //  } else {
  //     // Set token
  //     token = JSON.parse(token)
  //     if (token) {
  //         config.headers.Authorization = 'Bearer ' + token
  //     }
  //  }

  return config;
});

export default axios;
