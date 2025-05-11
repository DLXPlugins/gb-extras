/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************************************!*\
  !*** ./src/js/blocks/components/GBBlockLabels/index.js ***!
  \*********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }






/**
 * Begin v1 legacy block modifications.
 */
var v1Blocks = ['generateblocks/button', 'generateblocks/headline', 'generateblocks/container', 'generateblocks/grid', 'generateblocks/image', 'generateblocks/query-loop'];

// Add custom category
function addGenerateBlocksV1Category(categories) {
  return [].concat(_toConsumableArray(categories), [{
    slug: 'generateblocks-v1',
    title: 'GenerateBlocks V1',
    icon: null
  }]);
}

// Modify block registration for v1 and v2 blocks.
function modifyBlockRegistration(settings, name) {
  if (v1Blocks.includes(name)) {
    settings.title = settings.title + ' (v1 Legacy)';
    return _objectSpread(_objectSpread({}, settings), {}, {
      category: 'generateblocks-v1'
    });
  }
  return settings;
}

// Register filters
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('blocks.registerBlockType', 'gbcm/modify-block-category', modifyBlockRegistration, 1000);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('blocks.getCategories', 'gbcm/add-v1-category', addGenerateBlocksV1Category);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.removeFilter)('blocks.registerBlockType', 'generateblocks/disableBlocks');
wp.domReady(function () {
  // Get GB 1.0 variations of the container block.
  var blockName = 'generateblocks/container';
  var variationNames = ['tabs', 'accordion'];

  // Get all variations of the block
  var variations = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.getBlockVariations)(blockName);
  if (typeof variations !== 'undefined') {
    variationNames.forEach(function (variationName) {
      // Find the specific variation
      var variation = variations.find(function (v) {
        return v.name === variationName;
      });
      if (typeof variation !== 'undefined') {
        (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.unregisterBlockVariation)(blockName, variationName);

        // Change title of variation.
        variation.title = variation.title + ' (v1 Legacy)';
        (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.registerBlockVariation)(blockName, variation);
      }
    });
  }
});

// Register a plugin to get all blocks.
wp.plugins.registerPlugin('generateblocks-custom', {
  render: function render() {
    var hasModifiedBlocks = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    var allBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(function (select) {
      return select('core/blocks').getBlockTypes();
    }, []);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
      if (allBlocks.length === 0 || hasModifiedBlocks.current) {
        return;
      }
      allBlocks.forEach(function (block) {
        if (block.name.includes('generateblocks') && !v1Blocks.includes(block.name)) {
          /**
           * Re-Register Blocks with updated v2 Title.
           */
          (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.unregisterBlockType)(block.name);
          // Re-register with updated title
          (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.registerBlockType)(block.name, _objectSpread(_objectSpread({}, block), {}, {
            title: block.title + ' (v2 Pro)'
          }));

          // Get all variations of the v2 Blocks and upadate the title.
          var variations = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.getBlockVariations)(block.name);
          variations.forEach(function (variation) {
            // Find the specific variation
            (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.unregisterBlockVariation)(block.name, variation.name);

            // Change title of variation.
            variation.title = variation.title + ' (v2 Pro)';
            (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.registerBlockVariation)(block.name, variation);
          });
        }
      });

      // Mark as modified to prevent re-triggering
      hasModifiedBlocks.current = true;
    }, [allBlocks]);
    return null;
  }
});
})();

/******/ })()
;
//# sourceMappingURL=gb-extras-block-labels.js.map