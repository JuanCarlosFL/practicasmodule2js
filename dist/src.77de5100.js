// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.ts":[function(require,module,exports) {
"use strict";

require("./style.scss");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// //-- Ejercicios entregables ****************************************
// // 1. Array operations
// // 1.1.- Función Head. Implementa una función head (inmutable), tal que, dado un array como entrada extraiga y devuelva su primer elemento. Utiliza destructuring.
var family = ["Juan Carlos", "Laura", "Chloe"];

var head = function head(arr) {
  var _arr2 = _slicedToArray(arr, 1),
      first = _arr2[0];

  return first;
};

console.log("1.1.- Con la funci\xF3n head extraemos el primer elemento del array:");
console.log(head(family)); //  // 1.2.- Función Tail. Implementa una función tail (inmutable), tal que, dado un array como entrada devuelta todos menos el primer elemento. Utiliza rest operator.

var tail = function tail(_ref) {
  var _ref2 = _toArray(_ref),
      arr = _ref2.slice(1);

  return arr;
};

console.log("+--------------------------------------------------------+");
console.log("1.2.- Con la funci\xF3n tail extraemos todos los elementos del array menos el primero:");
console.log(tail(family)); // // 1.3.- Función Init. Implementa una función init(inmutable), tal que, dado un array como entrada devuelva todos los elementos menos el último. Utiliza los métodos que ofrece Array.prototype

var init = function init(arr) {
  var _arr3 = _toArray(arr),
      newArray = _arr3.slice(0);

  newArray.pop();
  return newArray;
};

console.log("+--------------------------------------------------------+");
console.log("1.3.- Con la funci\xF3n init extraemos todos los elementos del array menos el \xFAltimo:");
console.log(init(family)); // // 1.4.- Función Last. Implementa una función last (inmutable), tal que, dado un array como entrada devuelva el último elemento.

var last = function last(arr) {
  var _arr4 = _toArray(arr),
      newArray = _arr4.slice(0);

  return newArray.pop();
};

console.log("+--------------------------------------------------------+");
console.log("1.4.- Con la funci\xF3n last extraemos el \xFAltimo elemento del array:");
console.log(last(family)); // //EJERCICIO 2 -- CONCAT
// // 2.- Implementa una función concat (inmutable) tal que, dados 2 arrays como entrada, devuelva la concatenación de ambos. Utiliza rest / spread operators.

var family2 = ["Juan", "Teresa", "Mari Carmen"];

var concat = function concat(a, b) {
  return [].concat(_toConsumableArray(a), _toConsumableArray(b));
};

console.log("+--------------------------------------------------------+");
console.log("2.- Con la funci\xF3n concat concatenamos dos arrays en uno:");
console.log(concat(family, family2));
console.log("Comprobamos que el array original sigue inmutable:");
console.log(family); // //EJERCICIO 3 -- CLONE MERGE
// // 3.1.- Clone.- mplementa una función clone que, a partir de un objeto de entrada source devuelva un nuevo objeto con las propiedades de source.

var person = {
  name: "Juan Carlos",
  surname: "Fuentes",
  age: "49"
};

function clone(source) {
  return Object.assign({}, source);
}

;
var newPerson = clone(person);
console.log("+--------------------------------------------------------+");
console.log("3.1.- Vemos que hemos clonado el objeto:");
console.log(newPerson);
console.log("Y comprobamos que cada uno apunta a una referencia distinta, por eso no son iguales:");
console.log(newPerson === person); // // 3.2.- Merge.- Implementa una función merge que, dados dos objetos de entrada source y target, devuelva un nuevo objeto con todas las propiedades de target y de source, y en caso de propiedades con el mismo nombre, source sobreescribe a target

var a = {
  name: "Maria",
  surname: "Ibañez",
  country: "SPA"
};
var b = {
  name: "Luisa",
  age: 31,
  married: true
};

function merge(source, target) {
  return Object.assign(Object.assign({}, target), source);
}

;
console.log("+--------------------------------------------------------+");
console.log("3.2.- Vemos un solo objeto en el que el source sobreescribe los elementos repetidos sobre el target:");
console.log(merge(a, b)); // //EJERCICIO 4 -- READ BOOKS
// // 4.- Crea una función isBookRead que reciba una lista de libros y un título y devuelva si se ha leído o no dicho libro. Un libro es un objeto con title como string y isRead como booleano. En caso de no existir el libro devolver false TIP: Existe un método de Array.prototype que te ayudará a buscar según un patrón.

var Book = function Book(title, isRead) {
  _classCallCheck(this, Book);

  this.title = title;
  this.isRead = isRead;
}; // Esta sería la clase en vanilla JS
// class Book {
//     constructor(title, isRead){
//       this.title = title,
//       this.isRead = isRead
//     }
// }


var books = [new Book('Harry Potter y la piedra filosofal', true), new Book('Canción de hielo y fuego', false), new Book('Devastación', true)];

function isBookRead(books, titleToTest) {
  var bookReaded = books.filter(function (b) {
    return b.title === titleToTest;
  });
  if (bookReaded.length == 0) return false;else return bookReaded[0].isRead ? "El libro ".concat(bookReaded[0].title, " ha sido le\xEDdo") : "El libro ".concat(bookReaded[0].title, " no se ha le\xEDdo");
} // Esta sería la función en vanilla JS
// function isBookRead(books, titleToSearch) {
//     let bookReaded = books.filter(b => b.title === titleToSearch);
//     if (bookReaded.length == 0)
//       return false;
//     else
//       return bookReaded[0].isRead ? `El libro ${bookReaded[0].title} ha sido leído` : `El libro ${bookReaded[0].title} no se ha leído`
// }


console.log("+--------------------------------------------------------+");
console.log("4.- Comprobaciones de la funci\xF3n isBookRead");
console.log(isBookRead(books, 'Harry Potter y la piedra filosofal'));
console.log(isBookRead(books, 'Canción de hielo y fuego'));
console.log(isBookRead(books, 'Devastación'));
console.log(isBookRead(books, "Los Pilares de la Tierra")); // //EJERCICIO 5 -- SLOT MACHINE
// // 5.- El objetivo de este ejercicio es crear una máquina tragaperras utilizando clases donde cada vez que juguemos insertemos una moneda. Cada máquina tragaperras (instancia) tendrá un contador de monedas que automáticamente se irá incrementando conforme vayamos jugando. Cuando se llame al método play el número de monedas se debe incrementar de forma automática y debe generar tres booleanos aleatorios que representarán el estado de las 3 ruletas. El usuario habrá ganado en caso de que los tres booleanos sean true, y por tanto deberá mostrarse por consola el mensaje: "Congratulations!!!. You won <número de monedas> coins!!"; y reiniciar las monedas almacenadas, ya que las hemos conseguido y han salido de la máquina. En caso contrario deberá mostrar otro mensaje: "Good luck next time!!".

var SlotMachine = /*#__PURE__*/function () {
  function SlotMachine() {
    _classCallCheck(this, SlotMachine);

    this._coins = 0;
    this.items = [];
  }

  _createClass(SlotMachine, [{
    key: "play",
    value: function play() {
      this._coins += 1;
      this.items[0] = this.randomBool();
      this.items[1] = this.randomBool();
      this.items[2] = this.randomBool();
    }
  }, {
    key: "randomBool",
    value: function randomBool() {
      return Boolean(Math.round(Math.random()));
    }
  }, {
    key: "balance",
    get: function get() {
      return this._coins;
    }
  }, {
    key: "resetCoins",
    set: function set(value) {
      this._coins = value;
    }
  }]);

  return SlotMachine;
}();

;
var machine = new SlotMachine();
var $div1 = document.getElementById('item1');
var $div2 = document.getElementById('item2');
var $div3 = document.getElementById('item3');
var $message = document.getElementById('message');
var $coins = document.getElementById('coins');
$coins.innerText = "".concat(machine.balance.toString(), " Coins");
$message.innerText = "Waiting for players";

var showResult = function showResult(machine) {
  $div1.innerHTML = machine.items[0] ? '🍏' : '🍌';
  $div2.innerHTML = machine.items[1] ? '🍏' : '🍌';
  $div3.innerHTML = machine.items[2] ? '🍏' : '🍌';

  if (machine.items[0] === machine.items[1] && machine.items[0] === machine.items[2]) {
    $message.innerText = "Congratulations!!!. You won ".concat(machine.balance, " coins!!");
    machine.resetCoins = 0;
  } else {
    $message.innerText = "Good luck next time!";
  }

  ;
  $coins.innerText = "".concat(machine.balance.toString(), " Coins");
};

document.getElementById('throw').addEventListener('click', function () {
  machine.play();
  showResult(machine);
});
},{"./style.scss":"style.scss"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "15522" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map