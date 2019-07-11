/* eslint-disable no-console */
/* eslint-disable no-undef */
//const axios = require('axios');
//const https = require('https')
import jwtDecode from "jwt-decode";

const API_HOST='https://www.myfirstfeatherjsapp.tk:30000'
/*
const agent = new https.Agent({  
  rejectUnauthorized: false
});
*/


//  Testing request https to server with fetch method
/*
export const loginSrvByGoogle = (data)  => {
  console.log(data)
  return fetch('https://www.myfirstfeatherjsapp.tk:30000/authentication', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(checkStatus)
    .then(parseJSON);
}
*/


/*
// Testing request https to server for authentication
export const reqloginGoogle = (data) => {

  return axios({
    method: 'post',
    url: 'https://www.myfirstfeatherjsapp.tk:30000/authentication',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data),
  }).then(parseJSON)
}
*/

export const signUpAndReadUserIdFacebook = async () => {
  let res = await fetch(`${API_HOST}/authentication/`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json",
      Authorization: `Bearer ${access_token}`
    }
  });
  res = await res.json();
  const { userId } = jwtDecode(res.accessToken);
  return userId;
}

export const SignUpAndReadUserIdGoogle = async (data) => {
  let res = await fetch(`${API_HOST}/authentication`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json",
      Authorization: `${data.access_token}`,
    },
    data: JSON.stringify(data)
  });
  res = await res.json();
  if (res.code >= 400 || res.code <= 550) {
    return res.name
  } else {
    const { userId } = jwtDecode(res._id);
    return userId;
  }
}

export const getQueryVariable = (variable) => {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query variable %s not found', variable);
}


export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

export const parseJSON = (response) => {
  return response.json();
}



  