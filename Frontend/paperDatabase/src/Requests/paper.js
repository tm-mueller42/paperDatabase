import { BACKEND_DELETEPAPER, BACKEND_GETFILTEREDPAPERS, BACKEND_GETALLPAPERS } from '../Constants/endpoints.js';

export async function getAllPapers(jwt) {
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${jwt}`);
  const res = await fetch(BACKEND_GETALLPAPERS, { method: 'GET', headers: headers });
  if(!res.ok) {
    return res;
  }
  return await res.json();
};

export function getFilteredPapers(jwt, filters) {
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${jwt}`);
  headers.set('Content-Type' , 'application/json');
  return fetch(BACKEND_GETFILTEREDPAPERS, { method: 'POST', headers: headers, body: JSON.stringify(filters) });
  //.then((res) => res.json());
}

export function deletePaperById(jwt, id) {
  const BACKEND_DELETEPAPERBYID = `${BACKEND_DELETEPAPER}${id}`;
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${jwt}`);
  return fetch(BACKEND_DELETEPAPERBYID, { method: 'DELETE', headers: headers });
};