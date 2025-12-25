/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/react-dom/client.js"
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {



var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) // removed by dead control flow
{} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ },

/***/ "./src/js/blocks/commands/components/commands/ToggleContainerOutlines.js"
/*!*******************************************************************************!*\
  !*** ./src/js/blocks/commands/components/commands/ToggleContainerOutlines.js ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useToggleContainerOutlinesCommand: () => (/* binding */ useToggleContainerOutlinesCommand)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_commands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/commands */ "@wordpress/commands");
/* harmony import */ var _wordpress_commands__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_commands__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_outlineClasses__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/outlineClasses */ "./src/js/blocks/commands/utils/outlineClasses.js");
/* harmony import */ var _icons_GBIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../icons/GBIcon */ "./src/js/blocks/commands/components/icons/GBIcon.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Command to toggle container/element outlines.
 */







/**
 * Hook to register the Toggle Container Outlines command.
 *
 * @return {void}
 */
function useToggleContainerOutlinesCommand() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showContainerOutlines = _useState2[0],
    setShowContainerOutlines = _useState2[1];
  var observerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Update global state when local state changes.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_utils_outlineClasses__WEBPACK_IMPORTED_MODULE_3__.setGlobalShowContainerOutlines)(showContainerOutlines);
  }, [showContainerOutlines]);

  // Set up MutationObserver to maintain outline classes.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var editorDoc = (0,_utils_outlineClasses__WEBPACK_IMPORTED_MODULE_3__.getEditorDocument)();

    // Function to remove outline data attributes from all blocks.
    var removeOutlineAttributes = function removeOutlineAttributes() {
      var blocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('core/block-editor').getBlocks();
      var _processBlock = function processBlock(block) {
        var blockElement = editorDoc.querySelector("[data-block=\"".concat(block.clientId, "\"]"));
        if (!blockElement) {
          return;
        }

        // Remove outline data attribute.
        blockElement.removeAttribute('data-container-type');

        // Process inner blocks.
        if (block.innerBlocks) {
          block.innerBlocks.forEach(_processBlock);
        }
      };
      blocks.forEach(_processBlock);
    };
    if (!showContainerOutlines) {
      // Remove all outline data attributes when disabled.
      removeOutlineAttributes();

      // Clean up observer when outlines are disabled.
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    // Function to add outline data attributes to blocks.
    var addOutlineAttributes = function addOutlineAttributes() {
      var blocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('core/block-editor').getBlocks();
      var _processBlock2 = function processBlock(block) {
        var blockElement = editorDoc.querySelector("[data-block=\"".concat(block.clientId, "\"]"));
        if (!blockElement) {
          return;
        }
        var isContainer = blockElement.getAttribute('data-type') === 'generateblocks/container';
        var isElement = blockElement.getAttribute('data-type') === 'generateblocks/element';
        var isGrid = blockElement.getAttribute('data-title') === 'Grid';
        if (isGrid) {
          blockElement.setAttribute('data-container-type', 'grid');
        } else if (isContainer) {
          blockElement.setAttribute('data-container-type', 'container');
        } else if (isElement) {
          blockElement.setAttribute('data-container-type', 'element');
        }

        // Process inner blocks.
        if (block.innerBlocks) {
          block.innerBlocks.forEach(_processBlock2);
        }
      };
      blocks.forEach(_processBlock2);
    };

    // Initial add.
    addOutlineAttributes();

    // Set up MutationObserver to re-add data attributes when blocks are added/changed.
    var observer = new MutationObserver(function () {
      // Reapply attributes when DOM changes (debounced).
      setTimeout(addOutlineAttributes, 10);
    });

    // Observe the editor container for DOM changes.
    var editorContainer = editorDoc.querySelector('.block-editor-writing-flow') || editorDoc.body;
    if (editorContainer) {
      observer.observe(editorContainer, {
        childList: true,
        subtree: true
      });
      observerRef.current = observer;
    }

    // Cleanup.
    return function () {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [showContainerOutlines]);
  (0,_wordpress_commands__WEBPACK_IMPORTED_MODULE_1__.useCommand)({
    name: 'dlx-gb-extras-toggle-container-outlines',
    label: 'GenerateBlocks: Toggle Container/Element Outlines',
    icon: /*#__PURE__*/React.createElement(_icons_GBIcon__WEBPACK_IMPORTED_MODULE_4__["default"], {
      width: "16",
      height: "16"
    }),
    callback: function callback(_ref) {
      var close = _ref.close;
      setShowContainerOutlines(function (prev) {
        return !prev;
      });
      close();
    },
    context: 'block-editor'
  });
}

/***/ },

/***/ "./src/js/blocks/commands/components/icons/GBIcon.js"
/*!***********************************************************!*\
  !*** ./src/js/blocks/commands/components/icons/GBIcon.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * GenerateBlocks icon component for GB-related commands.
 *
 * @param {Object} props - Component props.
 * @return {JSX.Element} The GBIcon component.
 */
var GBIcon = function GBIcon(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 50 60.12",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M6.686 31.622V18.918a.077.077 0 0 1 .05-.072l6.5-2.313 6.5-2.313 9.682-3.445L39.1 7.33a.067.067 0 0 0 .036-.028.074.074 0 0 0 .014-.044V.076a.077.077 0 0 0-.032-.062.076.076 0 0 0-.069-.009l-13 4.625-13 4.625-6.5 2.313-6.5 2.313a.067.067 0 0 0-.036.028.097.097 0 0 0-.013.046V52.067c0 .026.013.048.032.062s.044.018.069.009l3.267-1.163 3.267-1.163c.015-.005.028-.015.036-.028s.014-.028.014-.044V37.999l.001-6.377c-.001 0 0 0 0 0z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m23.949 29.976 13-4.625 13-4.625c.015-.005.028-.015.036-.028s.015-.028.015-.044V8.056a.077.077 0 0 0-.032-.062.076.076 0 0 0-.069-.009l-13 4.625-13 4.625-6.5 2.313-6.5 2.313a.067.067 0 0 0-.036.028.074.074 0 0 0-.014.044V60.045c0 .026.013.048.032.062a.076.076 0 0 0 .069.009l6.475-2.304 6.475-2.304 6.525-2.322 6.525-2.322 6.5-2.313 6.5-2.313c.015-.005.028-.015.036-.028s.014-.025.014-.041V27.193a.077.077 0 0 0-.032-.062.076.076 0 0 0-.069-.009l-6.45 2.295L37 31.711a.067.067 0 0 0-.036.028.074.074 0 0 0-.014.044v6.272a.077.077 0 0 1-.05.072l-6.45 2.295L24 42.715a.075.075 0 0 1-.101-.071V30.046c0-.016.005-.031.014-.044a.08.08 0 0 1 .036-.026z"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GBIcon);

/***/ },

/***/ "./src/js/blocks/commands/utils/outlineClasses.js"
/*!********************************************************!*\
  !*** ./src/js/blocks/commands/utils/outlineClasses.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEditorDocument: () => (/* binding */ getEditorDocument),
/* harmony export */   getGlobalShowContainerOutlines: () => (/* binding */ getGlobalShowContainerOutlines),
/* harmony export */   setGlobalShowContainerOutlines: () => (/* binding */ setGlobalShowContainerOutlines)
/* harmony export */ });
/**
 * Utilities for managing outline classes.
 */

// Create a global state for outline visibility (for reference).
var globalShowContainerOutlines = false;

/**
 * Set the global outline visibility state.
 *
 * @param {boolean} value - The value to set.
 */
function setGlobalShowContainerOutlines(value) {
  globalShowContainerOutlines = value;
}

/**
 * Get the global outline visibility state.
 *
 * @return {boolean} The current state.
 */
function getGlobalShowContainerOutlines() {
  return globalShowContainerOutlines;
}

/**
 * Get the iframe document if it exists, otherwise return main document.
 *
 * @return {Document} The document to use.
 */
function getEditorDocument() {
  var _iframe$contentWindow;
  var iframe = document.querySelector('.editor-canvas__iframe') || document.querySelector('iframe[name="editor-canvas"]');
  return (iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) || (iframe === null || iframe === void 0 || (_iframe$contentWindow = iframe.contentWindow) === null || _iframe$contentWindow === void 0 ? void 0 : _iframe$contentWindow.document) || document;
}

/***/ },

/***/ "@wordpress/commands"
/*!**********************************!*\
  !*** external ["wp","commands"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["commands"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/plugins"
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["plugins"];

/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

/***/ "react-dom"
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
(module) {

module.exports = window["ReactDOM"];

/***/ }

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
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
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
/*!*****************************************************!*\
  !*** ./src/js/blocks/commands/commands-frontend.js ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_commands_ToggleContainerOutlines__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/commands/ToggleContainerOutlines */ "./src/js/blocks/commands/components/commands/ToggleContainerOutlines.js");
/**
 * Frontend commands registration.
 */



/**
 * Commands frontend component.
 *
 * @return {null} The CommandsFrontend component.
 */
var CommandsFrontend = function CommandsFrontend() {
  // Frontend-specific commands will go here.
  // Currently placeholder for future use.
  (0,_components_commands_ToggleContainerOutlines__WEBPACK_IMPORTED_MODULE_2__.useToggleContainerOutlinesCommand)();
  return null;
};
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__.registerPlugin)('dlxgb-commands-frontend', {
  render: CommandsFrontend
});
var rootElement = document.getElementById('gb-extras-commands-frontend');
if (rootElement) {
  var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot)(rootElement);
  root.render(/*#__PURE__*/React.createElement(CommandsFrontend, null));
}
})();

/******/ })()
;
//# sourceMappingURL=gb-extras-commands-frontend.js.map