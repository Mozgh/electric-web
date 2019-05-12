import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function get(url, payload) {
  const urlparams = new URLSearchParams();
  for (const key in payload) {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      if (payload[key] !== null) {
        urlparams.append(key, payload[key]);
      }
    }
  }
  let urlparamsstr = urlparams.toString();
  if (urlparamsstr != null && urlparamsstr!== '') {
    url = url + `?${urlparamsstr}`
  }

  const options = {
    method : "GET",
    headers : {
      "Content-Type" : "application/json"
    }
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

export function request(method, url, payload) {
  const options = {
    method : method,
    headers : {
      "Content-Type" : "application/json"
    }
  };
  if (payload) {
    options.body = JSON.stringify(payload);
  }
  return fetch(url, options)
  .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
// export default function request(url, options) {
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(data => ({ data }))
//     .catch(err => ({ err }));
// }
