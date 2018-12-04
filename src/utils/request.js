// import fetch from 'dva/fetch';
import fetch from 'axios';
function parseJSON(response) {
  // return response.json();
  return response;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {

  let fetchUrl = url.startsWith('http://') ? url : `http://172.17.32.202:7001${url}`;

  const defaultOptions = {
    // credentials: 'include' // 这样子会发送cookies
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  if (newOptions.method.toUpperCase() === 'GET' && Object.keys(newOptions.body).length > 0) {
    const params = newOptions.body || {};
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
    if (fetchUrl.search(/\?/) === -1) {
      fetchUrl += '?' + paramsArray.join('&')
    } else {
      fetchUrl += '&' + paramsArray.join('&')
    }
  }

  return fetch(fetchUrl, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    //.then(data => ({ data }))
    .catch(err => ({ err }));
}
