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
})({"src/javascript/swiper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
let Swiper = (function() {
  let root = document;
  let eventHub = { swipLeft: [], swipRight: [] };
  function bind(node) {
    root = node;
  }
  function on(type, fn) {
    if (eventHub[type]) {
      eventHub[type].push(fn);
    }
  }
  var initX;
  var newX;
  var clock;
  root.ontouchstart = function(e) {
    initX = e.changedTouches[0].pageX;
  };
  root.ontouchmove = function(e) {
    if (clock) clearTimeout(clock);
    clock = setTimeout(() => {
      newX = e.changedTouches[0].pageX;
      if (newX - initx > 0) {
        eventHub["swipRight"].forEach(fn => fn());
      } else {
        eventHub["swipLeft"].forEach(fn => fn());
      }
    }, 100);
  };
  return {
    bind: bind,
    on: on
  };
})();

Swiper.bind(document.querySelector("#box"));

Swiper.on("swipLeft", function() {
  console.log("swipLeft");
});

Swiper.on("swipLeft", function() {
  console.log("swipLeft 111");
});

Swiper.on("swipRight", function() {
  console.log("swipRight 111");
});

Swiper.on("swipRight", function() {
  console.log("swipRight 222");
});
*/
var Swiper = function Swiper(node) {
  _classCallCheck(this, Swiper);

  if (!node) throw new Error("需要传递需要绑定的DOM元素");
  var root = typeof node === "string" ? document.querySelector(node) : node;
  var eventHub = {
    swipLeft: [],
    swipRight: []
  };
  var initX;
  var newX;
  var clock;

  root.ontouchstart = function (e) {
    initX = e.changedTouches[0].pageX;
  };

  root.ontouchmove = function (e) {
    if (clock) clearTimeout(clock);
    clock = setTimeout(function () {
      newX = e.changedTouches[0].pageX;

      if (newX - initX > 10) {
        eventHub["swipRight"].forEach(function (fn) {
          return fn.bind(root)();
        });
      } else if (newX - initX < 10) {
        eventHub["swipLeft"].forEach(function (fn) {
          return fn.bind(root)();
        });
      }
    }, 100);
  };

  this.on = function (type, fn) {
    if (eventHub[type]) {
      eventHub[type].push(fn);
    }
  };

  this.off = function (type, fn) {
    var index = eventHub[type].indexOf(fn);

    if (index !== -1) {
      eventHub[type].splice(index, 1);
    }
  };
};

var _default = Swiper;
exports.default = _default;
},{}],"src/javascript/index.js":[function(require,module,exports) {
"use strict";

var _swiper = _interopRequireDefault(require("./swiper.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player =
/*#__PURE__*/
function () {
  function Player(node) {
    var _this = this;

    _classCallCheck(this, Player);

    this.root = typeof node === "string" ? document.querySelector(node) : node;

    this.$ = function (selector) {
      return _this.root.querySelector(selector);
    };

    this.$$ = function (selector) {
      return _this.root.querySelectorAll(selector);
    };

    this.songList = [];
    this.currentIndex = 0;
    this.audio = new Audio();
    this.start();
    this.bind();
    this.lyricsArr = [];
    this.lyricIndex = -1;
  }

  _createClass(Player, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      fetch("https://wwfstrong.github.io/wwf-data/huawei/music-list.json").then(function (res) {
        return res.json();
      }).then(function (data) {
        _this2.songList = data;

        _this2.renderSong();
      });
    }
  }, {
    key: "bind",
    value: function bind() {
      var self = this;

      this.$(".btn-play-pause").onclick = function () {
        if (this.classList.contains("playing")) {
          self.audio.pause();
          this.classList.remove("playing");
          this.classList.add("pause");
        } else if (this.classList.contains("pause")) {
          self.audio.play();
          this.classList.remove("pause");
          this.classList.add("playing");
        }
      };

      this.$(".btn-loop").onclick = function () {
        self.audio.currentTime = 0;
      };

      this.$(".btn-prev").onclick = function () {
        self.currentIndex = (self.songList.length + self.currentIndex - 1) % self.songList.length;
        self.renderSong();
        self.playSong();
      };

      this.$(".btn-next").onclick = function () {
        self.currentIndex = (self.currentIndex + 1) % self.songList.length;
        self.renderSong();
        self.playSong();
      };

      this.audio.ontimeupdate = function () {
        self.locateLyric();
        self.setProgerssBar();
      };

      var swiper = new _swiper.default(this.$(".panels"));
      swiper.on("swipLeft", function () {
        this.classList.remove("panel1");
        this.classList.add("panel2");
        self.$(".balls .sp-1").classList.remove("current");
        self.$(".balls .sp-2").classList.add("current");
      });
      swiper.on("swipRight", function () {
        this.classList.remove("panel2");
        this.classList.add("panel1");
        self.$(".balls .sp-1").classList.add("current");
        self.$(".balls .sp-2").classList.remove("current");
      });
    }
  }, {
    key: "renderSong",
    value: function renderSong() {
      var _this3 = this;

      var songObj = this.songList[this.currentIndex];
      this.$(".header h1").innerText = songObj.title;
      this.$(".header p").innerText = songObj.author + " - " + songObj.albumn;
      this.audio.src = songObj.url;

      this.audio.onloadedmetadata = function () {
        return _this3.$(".time-end").innerText = _this3.formateTime(_this3.audio.duration);
      };

      this.loadLyric();
    }
  }, {
    key: "playSong",
    value: function playSong() {
      var _this4 = this;

      this.$(".btn-play-pause").classList.remove("pause");
      this.$(".btn-play-pause").classList.add("playing");

      this.audio.oncanplaythrough = function () {
        return _this4.audio.play();
      };
    }
  }, {
    key: "loadLyric",
    value: function loadLyric() {
      var _this5 = this;

      fetch(this.songList[this.currentIndex].lyric).then(function (res) {
        return res.json();
      }).then(function (data) {
        console.log(data.lyric);

        _this5.setLyrics(data.lyric);

        window.lyrics = data.lyric;
      });
    }
  }, {
    key: "locateLyric",
    value: function locateLyric() {
      var currentTime = this.audio.currentTime * 1000;
      var nextLineTime = this.lyricsArr[this.lyricIndex + 1][0];

      if (currentTime > nextLineTime && this.lyricIndex < this.lyricsArr.length - 1) {
        this.lyricIndex++;
        var node = this.$('[data-time="' + this.lyricsArr[this.lyricIndex][0] + '"]');
        if (node) this.setLyricToCenter(node);
        this.$$(".panel-effect .lyric p")[0].innerText = this.lyricsArr[this.lyricIndex][1];
        this.$$(".panel-effect .lyric p")[1].innerText = this.lyricsArr[this.lyricIndex + 1] ? this.lyricsArr[this.lyricIndex + 1][1] : "";
      }
    }
  }, {
    key: "setLyrics",
    value: function setLyrics(lyrics) {
      this.lyricIndex = 0;
      var fragment = document.createDocumentFragment();
      var lyricsArr = [];
      this.lyricsArr = lyricsArr;
      lyrics.split(/\n/).filter(function (str) {
        return str.match(/\[.+?\]/);
      }).forEach(function (line) {
        var str = line.replace(/\[.+?\]/g, "");
        line.match(/\[.+?\]/g).forEach(function (t) {
          t = t.replace(/[\[\]]/g, "");
          var milliseconds = parseInt(t.slice(0, 2)) * 60 * 1000 + parseInt(t.slice(3, 5)) * 1000 + parseInt(t.slice(6));
          lyricsArr.push([milliseconds, str]);
        });
      });
      lyricsArr.filter(function (line) {
        return line[1].trim() !== "";
      }).sort(function (v1, v2) {
        if (v1[0] > v2[0]) {
          return 1;
        } else {
          return -1;
        }
      }).forEach(function (line) {
        var node = document.createElement("p");
        node.setAttribute("data-time", line[0]);
        node.innerText = line[1];
        fragment.appendChild(node);
      });
      this.$(".panel-lyrics .container").innerHTML = "";
      this.$(".panel-lyrics .container").appendChild(fragment);
    }
  }, {
    key: "setLyricToCenter",
    value: function setLyricToCenter(node) {
      var offset = node.offsetTop;
      this.$(".panels .container").style.transform = "translateY(-".concat(offset, "px)");
      this.$$(".panels .container p").forEach(function (node) {
        return node.classList.remove("current");
      });
      node.classList.add("current");
    }
  }, {
    key: "setProgerssBar",
    value: function setProgerssBar() {
      var percent = this.audio.currentTime * 100 / this.audio.duration + "%";
      this.$(".bar .progress").style.width = percent;
      this.$(".time-start").innerText = this.formateTime(this.audio.currentTime);
    }
  }, {
    key: "formateTime",
    value: function formateTime(secondsTotal) {
      var minutes = parseInt(secondsTotal / 60);
      minutes = minutes >= 10 ? "" + minutes : "0" + minutes;
      var seconds = parseInt(secondsTotal % 60);
      seconds = seconds >= 10 ? "" + seconds : "0" + seconds;
      return minutes + ":" + seconds;
    }
  }]);

  return Player;
}();

window.p = new Player("#player");
},{"./swiper.js":"src/javascript/swiper.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55814" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/javascript/index.js"], null)
//# sourceMappingURL=/javascript.19a21263.js.map