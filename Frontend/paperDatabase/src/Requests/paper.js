import { BACKEND_DELETEPAPER, BACKEND_GETALLPAPERS } from '../Constants/endpoints.js';

export function getAllPapers(jwt) {
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${jwt}`);
  return fetch(BACKEND_GETALLPAPERS, { method: 'GET', headers: headers }).then((res) => res.json());
};

export function deletePaperById(jwt, id) {
  const BACKEND_DELETEPAPERBYID = `${BACKEND_DELETEPAPER}${id}`;
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${jwt}`);
  return fetch(BACKEND_DELETEPAPERBYID, { method: 'DELETE', headers: headers });
};