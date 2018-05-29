"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.push = push;
exports.getQuery = getQuery;
exports.getParam = getParam;
exports.eachParam = eachParam;
exports.mapParam = mapParam;
exports.cleanParam = cleanParam;
exports.pushParam = pushParam;
exports.default = void 0;

var _underscore = _interopRequireDefault(require("underscore"));

var _pathToRegexp = _interopRequireDefault(require("path-to-regexp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getParam(history, paramName) {
  var reg = new RegExp('[?&](' + paramName + ')(\[])?=([^?\/\s\\=]*)(?=&([\w]+)(\[])?=([^?\/\s\\=]*)|$)');
  var result = reg.exec(history.location.search);

  if (result && result[1]) {
    var value = result[2] ? result[3].split('&') : result[3].replace('&', '');
    return value;
  } else {
    return null;
  }
}

function eachParam(history, callback) {
  var reg = /[?&]([\w]+)(\[])?=([^?\/\s\\=]*)(?=&([\w]+)(\[])?=([^?\/\s\\=]*)|$)/g;
  var result;

  while (result = reg.exec(history.location.search)) {
    var value = result[2] ? result[3].split('&') : result[3].replace('&', '');
    callback(value, result[1]);
  }
}

function mapParam(history, callback) {
  var reg = /[?&]([\w]+)(\[])?=([^?\/\s\\=]*)(?=&([\w]+)(\[])?=([^?\/\s\\=]*)|$)/g;
  var ret = [];
  var result;

  while (result = reg.exec(history.location.search)) {
    var value = result[2] ? result[3].split('&') : result[3].replace('&', '');
    ret.push(callback(value, result[1]));
  }

  return ret;
}

function getQuery(pathReg, path, name) {
  var paramNamePat = /:(\w+)/g;
  var paramNameResult;
  var paramnames = [];

  while (paramNameResult = paramNamePat.exec(pathReg)) {
    paramnames.push(paramNameResult[1]);
  }

  var pat = (0, _pathToRegexp.default)(pathReg);
  var result = pat.exec(path);

  if (result) {
    var target;
    paramnames.forEach(function (paramname, index) {
      if (paramname == name) {
        target = result[index + 1];
      }
    });
    return target;
  } else {
    return null;
  }
}

function push(history, pathname, params) {
  var nSearch = figureSearch(history, params);
  history.push({
    pathname: pathname,
    search: nSearch
  });
}

function rawSearch(params) {
  var resultSearch = '',
      count = 0;

  _underscore.default.each(params, function (param, index) {
    if (param instanceof Array) {
      var array = '';

      _underscore.default.each(param, function (el, aindex) {
        array += el + (aindex === param.length - 1 ? '' : '&');
      });

      resultSearch += (count === 0 ? '?' : '&') + index + '[]=' + array;
    } else {
      resultSearch += (count === 0 ? '?' : '&') + index + '=' + param;
    }

    count++;
  });

  return resultSearch;
}

function figureSearch(history, params) {
  var location = history.location;
  var search = history.location.search;
  var nSearch = '';

  if (params && _typeof(params) === 'object') {
    if (search === null || search === '') {
      nSearch = nSearch + '?';
    }

    var nparams = {};
    eachParam(history, function (value, index) {
      if (value !== null && params[index] !== null) {
        nparams[index] = value;
      }
    });

    _underscore.default.each(params, function (param, index) {
      if (param !== null) {
        nparams[index] = param;
      }
    });

    nSearch = rawSearch(nparams);
  } else {
    nSearch = search;
  }

  return nSearch;
}

function pushParam(history, params) {
  var pathname = history.location.pathname;
  var nSearch = figureSearch(history, params);
  history.push({
    pathname: pathname,
    search: nSearch
  });
}

function cleanParam(history, paramnames) {
  var location = history.location;
  var search = history.location.search;
  var nparams = {};
  eachParam(history, function (value, index) {
    if (!_underscore.default.contains(paramnames, index)) {
      nparams[index] = value;
    }
  });
  var nSearch = rawSearch(nparams);
  history.push({
    pathname: location.pathname,
    search: nSearch
  });
}

var _default = {
  push: push,
  getQuery: getQuery,
  getParam: getParam,
  eachParam: eachParam,
  mapParam: mapParam,
  cleanParam: cleanParam,
  pushParam: pushParam
};
exports.default = _default;