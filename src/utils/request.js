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
  for (let key in payload) {
    url = url + key + "=" + payload[key] + "&";
  }
  console.log(url);
  const options = {
    method : "GET",
    headers : {
      "Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8"
    }
  }
  return request(url, options);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
