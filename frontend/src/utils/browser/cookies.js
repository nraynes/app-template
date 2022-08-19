/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import { toJson, parseJson } from '@/utils/core/jsonUtils';

export function setCookie(cname, cvalue, exdays) {
  cvalue = toJson(cvalue);
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  let cooVal = null;
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      cooVal = c.substring(name.length, c.length);
    }
  }
  if (cooVal) {
    return parseJson(cooVal);
  }
  return '';
}

export function clearCookie(cname) {
  document.cookie = `${cname}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}
