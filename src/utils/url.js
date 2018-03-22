import _ from 'lodash';

import { VERSIONS } from '../constants';

function getParameterByName(nameToSearchFor, urlToParse) {
  const url = urlToParse ? urlToParse : window.location.href;
  const name = nameToSearchFor.replace(/[[\]]/g, '\\$&');

  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);

  if (!results) {
    return null;
  } else if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function getSharingSeedFromURL() {
  const sharedShapeString = getParameterByName('shared');

  if (sharedShapeString && isNumeric(sharedShapeString)) {
    return Number(sharedShapeString);
  }

  return false;
}

export function getSharingVersionFromURL() {
  const urlVersion = getParameterByName('v');

  if (!urlVersion) {
    return false;
  }

  let versionIndex = '';
  const versionExists = _.some(VERSIONS, version => {
    if (urlVersion === version) {
      versionIndex = version;
      return true;
    }
  });

  if (versionExists) {
    return versionIndex;
  }
}
