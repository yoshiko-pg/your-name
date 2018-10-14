const rp = require('request-promise');
const includePatterns = [
  /^https:\/\/(.+?\.)?connpass\.com\/event\/\d{1,9}\/participation\/?$/,
  /^https:\/\/(.+?\.)?meetup\.com\/.*\/events\/\d+\/?$/,
];

function validateUrl(url) {
  if (!url) return false;

  return includePatterns.some(includePattern => includePattern.test(url));
}

function fetcher(uri) {
  if (!validateUrl(uri)) {
    return Promise.reject({
      message: `"${uri}" is not allowed to fetch.`,
    });
  }

  return rp({ uri }).then(html => html).catch(reason => Promise.reject(reason));
}

module.exports = fetcher;
