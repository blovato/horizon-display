import { HTTP } from 'meteor/http';

function fetch(method, url, options) {
  return new Promise((resolve, reject) => {
    try {
      HTTP.call(method.toUpperCase(), url, options, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    } catch (e) {
      reject(e);
    }
  });
}

fetch.get = (...args) => fetch('GET', ...args);
fetch.post = (...args) => fetch('POST', ...args);
fetch.put = (...args) => fetch('PUT', ...args);

export default fetch;
