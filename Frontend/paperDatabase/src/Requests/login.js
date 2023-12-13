import { Buffer } from "buffer";
import { BACKEND_LOGIN } from '../Constants/endpoints.js' 

export function userLogin(username, password) {
    const headers = new Headers();
    const auth = Buffer.from(username + ':' + password).toString('base64');
    headers.set('Authorization', 'Basic ' + auth);
    return fetch(BACKEND_LOGIN, { method: 'GET', headers: headers })
      //.then(response => response.text())
      .then(res => res.json());
}