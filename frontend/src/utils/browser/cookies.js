/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import { toJson, parseJson } from '@/utils/core/jsonUtils';

/**
 * Sets a cookie in the browser with a specifed expiration date.
 * This will stringify the value to json before being set.
 * @param {String} cname
 * @param {Any} cvalue
 * @param {Number} exdays
 * @returns {Object}
 */
export function setCookie(cname, cvalue, exdays) {
  cvalue = toJson(cvalue);
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

/**
 * This will get a cookie value from the browser and parse the value back into its original form.
 * @param {String} cname
 * @returns {Any}
 */
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

/**
 * Deletes a cookie with the specified name.
 * @param {String} cname
 * @returns {Object}
 */
export function clearCookie(cname) {
  document.cookie = `${cname}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}
