/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/replace.js"
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/replace.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const replace = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M16 10h4c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1zm-8 4H4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1zm10-2.6L14.5 15l1.1 1.1 1.7-1.7c-.1 1.1-.3 2.3-.9 2.9-.3.3-.7.5-1.3.5h-4.5v1.5H15c.9 0 1.7-.3 2.3-.9 1-1 1.3-2.7 1.4-4l1.8 1.8 1.1-1.1-3.6-3.7zM6.8 9.7c.1-1.1.3-2.3.9-2.9.4-.4.8-.6 1.3-.6h4.5V4.8H9c-.9 0-1.7.3-2.3.9-1 1-1.3 2.7-1.4 4L3.5 8l-1 1L6 12.6 9.5 9l-1-1-1.7 1.7z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (replace);
//# sourceMappingURL=replace.js.map

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
/* harmony import */ var _icons_OutlineIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons/OutlineIcon */ "./src/js/blocks/commands/components/icons/OutlineIcon.js");
/* harmony import */ var _utils_outlineClasses__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/outlineClasses */ "./src/js/blocks/commands/utils/outlineClasses.js");
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
 * Recursively get all block client IDs from blocks.
 *
 * @param {Array} blocks - Array of blocks.
 * @return {Array} Array of client IDs.
 */
function getAllBlockClientIds(blocks) {
  var clientIds = [];
  blocks.forEach(function (block) {
    clientIds.push(block.clientId);
    if (block.innerBlocks && block.innerBlocks.length > 0) {
      clientIds = clientIds.concat(getAllBlockClientIds(block.innerBlocks));
    }
  });
  return clientIds;
}

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

  // Update global state when local state changes.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_utils_outlineClasses__WEBPACK_IMPORTED_MODULE_4__.setGlobalShowContainerOutlines)(showContainerOutlines);
  }, [showContainerOutlines]);
  (0,_wordpress_commands__WEBPACK_IMPORTED_MODULE_1__.useCommand)({
    name: 'dlx-gb-extras-toggle-container-outlines',
    label: 'Toggle GenerateBlocks Container/Element Outlines',
    icon: /*#__PURE__*/React.createElement(_icons_OutlineIcon__WEBPACK_IMPORTED_MODULE_3__["default"], {
      width: "16",
      height: "16"
    }),
    callback: function callback(_ref) {
      var close = _ref.close;
      var editorDoc = (0,_utils_outlineClasses__WEBPACK_IMPORTED_MODULE_4__.getEditorDocument)();
      var blocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('core/block-editor').getBlocks();
      var allClientIds = getAllBlockClientIds(blocks);
      var newState = !showContainerOutlines;

      // Loop through all block client IDs and find their DOM elements.
      allClientIds.forEach(function (clientId) {
        var blockElement = editorDoc.querySelector("[data-block=\"".concat(clientId, "\"]"));
        if (!blockElement) {
          return;
        }

        // Check if this is a container or element block.
        var isContainer = blockElement.querySelector('[data-type="generateblocks/container"]');
        var isElement = blockElement.querySelector('[data-type="generateblocks/element"]');
        var isGrid = blockElement.querySelector('[data-title="Grid"]');

        // Find the actual container/element wrapper.
        var targetElement = null;
        if (isContainer || isElement || isGrid) {
          targetElement = blockElement;
        }
        if (!targetElement) {
          return;
        }
        if (newState) {
          // Add outline classes.
          targetElement.classList.add('dlx-gb-outline');
          if (isContainer) {
            targetElement.classList.add('dlx-gb-outline-container');
          }
          if (isElement) {
            targetElement.classList.add('dlx-gb-outline-element');
          }
          if (isGrid) {
            targetElement.classList.add('dlx-gb-outline-grid');
          }

          // Check for grid display.
        } else {
          // Remove outline classes.
          targetElement.classList.remove('dlx-gb-outline');
          targetElement.classList.remove('dlx-gb-outline-container');
          targetElement.classList.remove('dlx-gb-outline-element');
          targetElement.classList.remove('dlx-gb-outline-grid');
        }
      });
      setShowContainerOutlines(newState);
      close();
    },
    context: 'block-editor'
  });
}

/***/ },

/***/ "./src/js/blocks/commands/components/commands/TransformV1ToV2.js"
/*!***********************************************************************!*\
  !*** ./src/js/blocks/commands/components/commands/TransformV1ToV2.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTransformV1ToV2Command: () => (/* binding */ useTransformV1ToV2Command)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_commands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/commands */ "@wordpress/commands");
/* harmony import */ var _wordpress_commands__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_commands__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/replace.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modals_TransformV1ToV2Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modals/TransformV1ToV2Modal */ "./src/js/blocks/commands/components/modals/TransformV1ToV2Modal.js");
/* harmony import */ var _utils_blockNesting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/blockNesting */ "./src/js/blocks/commands/utils/blockNesting.js");
/* harmony import */ var _utils_blockTransforms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/blockTransforms */ "./src/js/blocks/commands/utils/blockTransforms.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Command to transform v1 blocks to v2.
 */









/**
 * Hook to register the Transform V1 to V2 command.
 *
 * @return {JSX.Element|null} The TransformV1ToV2 component.
 */
function useTransformV1ToV2Command() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    blockTransformConfirmation = _useState2[0],
    setBlockTransformConfirmation = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    transforming = _useState4[0],
    setTransforming = _useState4[1];
  (0,_wordpress_commands__WEBPACK_IMPORTED_MODULE_1__.useCommand)({
    name: 'dlx-transform-v1-blocks-to-v2',
    label: 'GenerateBlocks: Convert v1 Blocks to v2 (Experimental)',
    searchLabel: 'Transform/convert all GB GenerateBlocks V1 Blocks to V2 (Experimental)',
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"],
    callback: function callback() {
      setBlockTransformConfirmation(true);
    },
    disabled: typeof gbExtrasPatternInserter !== 'undefined' && 'false' === (gbExtrasPatternInserter.enableV1Transformations || 'false')
  });
  var handleConfirm = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var nestingLevel, i;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            nestingLevel = (0,_utils_blockNesting__WEBPACK_IMPORTED_MODULE_5__.getBlockNestingLevel)();
            setTransforming(true);
            i = 0;
          case 1:
            if (!(i < nestingLevel)) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return (0,_utils_blockTransforms__WEBPACK_IMPORTED_MODULE_6__.transformBlocks)((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.select)('core/block-editor').getBlocks());
          case 2:
            i++;
            _context.n = 1;
            break;
          case 3:
            setBlockTransformConfirmation(false);
            setTransforming(false);
          case 4:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function handleConfirm() {
      return _ref.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement(_modals_TransformV1ToV2Modal__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isOpen: blockTransformConfirmation,
    onClose: function onClose() {
      return setBlockTransformConfirmation(false);
    },
    onConfirm: handleConfirm,
    transforming: transforming
  });
}

/***/ },

/***/ "./src/js/blocks/commands/components/icons/OutlineIcon.js"
/*!****************************************************************!*\
  !*** ./src/js/blocks/commands/components/icons/OutlineIcon.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Outline icon component for outline toggle command.
 *
 * @param {Object} props - Component props.
 * @return {JSX.Element} The OutlineIcon component.
 */
var OutlineIcon = function OutlineIcon(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 14 14",
    xmlns: "http://www.w3.org/2000/svg",
    width: 14,
    height: 14,
    fill: "none"
  }, props), /*#__PURE__*/React.createElement("clipPath", {
    id: "a"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0h14v14H0z",
    fill: "currentColor"
  })), /*#__PURE__*/React.createElement("g", {
    fill: "currentColor",
    fillRule: "evenodd",
    clipPath: "url(#a)",
    clipRule: "evenodd"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 7 5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 7a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 5 7zM11 7a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 11 7zM0 7a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 7z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1.5 1a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5zM0 1.5A1.5 1.5 0 0 1 1.5 0h11A1.5 1.5 0 0 1 14 1.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 12.5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 7 0zM7 11a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 7 11z"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OutlineIcon);

/***/ },

/***/ "./src/js/blocks/commands/components/modals/TransformV1ToV2Modal.js"
/*!**************************************************************************!*\
  !*** ./src/js/blocks/commands/components/modals/TransformV1ToV2Modal.js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Modal for confirming v1 to v2 block transformation.
 */




/**
 * TransformV1ToV2Modal component.
 *
 * @param {Object}   props              - Component props.
 * @param {boolean}  props.isOpen       - Boolean to control modal visibility.
 * @param {Function} props.onClose      - Callback when modal is closed.
 * @param {Function} props.onConfirm    - Callback when transformation is confirmed.
 * @param {boolean}  props.transforming - Boolean indicating transformation in progress.
 * @return {JSX.Element|null} The TransformV1ToV2Modal component.
 */
var TransformV1ToV2Modal = function TransformV1ToV2Modal(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    onConfirm = _ref.onConfirm,
    transforming = _ref.transforming;
  if (!isOpen) {
    return null;
  }
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Modal, {
    isDismissible: true,
    shouldCloseOnClickOutside: false,
    shouldCloseOnEsc: true,
    onRequestClose: onClose,
    title: "Transform v1 Blocks to v2"
  }, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please back up your blocks before transforming. There is no undo for this operation.', 'dlx-gb-extras')), /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This will convert all v1 blocks to v2 blocks.', 'dlx-gb-extras')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    variant: "primary",
    isDestructive: true,
    onClick: onConfirm,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please back up your blocks before transforming. There is no undo for this operation.', 'dlx-gb-extras'),
    disabled: transforming,
    icon: transforming ? /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, null) : null
  }, transforming ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Transforming…', 'dlx-gb-extras') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Transform', 'dlx-gb-extras')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    variant: "secondary",
    onClick: onClose
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'dlx-gb-extras'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TransformV1ToV2Modal);

/***/ },

/***/ "./src/js/blocks/commands/utils/blockNesting.js"
/*!******************************************************!*\
  !*** ./src/js/blocks/commands/utils/blockNesting.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBlockNestingLevel: () => (/* binding */ getBlockNestingLevel)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Utilities for calculating block nesting.
 */



/**
 * Get block nesting level.
 *
 * @param {Array} blocks Array of blocks to check.
 * @return {number} Maximum nesting level.
 */
function getBlockNestingLevel() {
  var blocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var blocksToCheck = blocks || (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/block-editor').getBlocks();
  var maxLevel = 0;
  blocksToCheck.forEach(function (block) {
    if (block.innerBlocks.length > 0) {
      var innerLevel = 1 + getBlockNestingLevel(block.innerBlocks);
      maxLevel = Math.max(maxLevel, innerLevel);
    }
  });
  return maxLevel;
}

/***/ },

/***/ "./src/js/blocks/commands/utils/blockTransforms.js"
/*!*********************************************************!*\
  !*** ./src/js/blocks/commands/utils/blockTransforms.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transformBlock: () => (/* binding */ transformBlock),
/* harmony export */   transformBlocks: () => (/* binding */ transformBlocks)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_BlockTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/BlockTypes */ "./src/js/blocks/utils/BlockTypes.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Utilities for block transformation.
 */





/**
 * Transform a block.
 *
 * @param {Object} block Block to transform.
 * @return {Promise} Promise that resolves when the block is transformed.
 */
function transformBlock(_x) {
  return _transformBlock.apply(this, arguments);
}

/**
 * Recursively get all blocks.
 *
 * @param {Array} blocks Array of blocks to transform.
 * @return {Promise} Promise that resolves when all blocks are transformed.
 */
function _transformBlock() {
  _transformBlock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(block) {
    var transformOptions, _iterator, _step, transform, _iterator2, _step2, transformBlockName, result, _t, _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          if (!(_utils_BlockTypes__WEBPACK_IMPORTED_MODULE_2__.v1Blocks.includes(block.name) || _utils_BlockTypes__WEBPACK_IMPORTED_MODULE_2__.v1VariationNames.includes(block.name))) {
            _context.n = 15;
            break;
          }
          // Get transform options for the block.
          transformOptions = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.getBlockTransforms)('to', block.name);
          if (!transformOptions) {
            _context.n = 15;
            break;
          }
          _iterator = _createForOfIteratorHelper(transformOptions);
          _context.p = 1;
          _iterator.s();
        case 2:
          if ((_step = _iterator.n()).done) {
            _context.n = 12;
            break;
          }
          transform = _step.value;
          if (!transform.blocks) {
            _context.n = 11;
            break;
          }
          _iterator2 = _createForOfIteratorHelper(transform.blocks);
          _context.p = 3;
          _iterator2.s();
        case 4:
          if ((_step2 = _iterator2.n()).done) {
            _context.n = 8;
            break;
          }
          transformBlockName = _step2.value;
          if (!_utils_BlockTypes__WEBPACK_IMPORTED_MODULE_2__.v2Blocks.includes(transformBlockName)) {
            _context.n = 7;
            break;
          }
          // Now do the transform.
          result = transform.transform(block.attributes, block.innerBlocks);
          if (!result) {
            _context.n = 6;
            break;
          }
          _context.n = 5;
          return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('core/block-editor').replaceBlocks([block.clientId], result);
        case 5:
          return _context.a(2, result);
        case 6:
          // eslint-disable-next-line no-console
          console.error('Failed to transform', block.name, 'to', transformBlockName);
        case 7:
          _context.n = 4;
          break;
        case 8:
          _context.n = 10;
          break;
        case 9:
          _context.p = 9;
          _t = _context.v;
          _iterator2.e(_t);
        case 10:
          _context.p = 10;
          _iterator2.f();
          return _context.f(10);
        case 11:
          _context.n = 2;
          break;
        case 12:
          _context.n = 14;
          break;
        case 13:
          _context.p = 13;
          _t2 = _context.v;
          _iterator.e(_t2);
        case 14:
          _context.p = 14;
          _iterator.f();
          return _context.f(14);
        case 15:
          return _context.a(2, null);
      }
    }, _callee, null, [[3, 9, 10, 11], [1, 13, 14, 15]]);
  }));
  return _transformBlock.apply(this, arguments);
}
function transformBlocks(_x2) {
  return _transformBlocks.apply(this, arguments);
}
function _transformBlocks() {
  _transformBlocks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(blocks) {
    var transformPromises;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          transformPromises = blocks.map(/*#__PURE__*/function () {
            var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(block) {
              return _regenerator().w(function (_context2) {
                while (1) switch (_context2.n) {
                  case 0:
                    if (!(block.innerBlocks.length > 0)) {
                      _context2.n = 3;
                      break;
                    }
                    _context2.n = 1;
                    return transformBlock(block);
                  case 1:
                    _context2.n = 2;
                    return transformBlocks(block.innerBlocks);
                  case 2:
                    _context2.n = 4;
                    break;
                  case 3:
                    _context2.n = 4;
                    return transformBlock(block);
                  case 4:
                    return _context2.a(2);
                }
              }, _callee2);
            }));
            return function (_x3) {
              return _ref.apply(this, arguments);
            };
          }());
          _context3.n = 1;
          return Promise.all(transformPromises);
        case 1:
          return _context3.a(2, blocks);
      }
    }, _callee3);
  }));
  return _transformBlocks.apply(this, arguments);
}

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

/***/ "./src/js/blocks/utils/BlockTypes.js"
/*!*******************************************!*\
  !*** ./src/js/blocks/utils/BlockTypes.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v1Blocks: () => (/* binding */ v1Blocks),
/* harmony export */   v1VariationNames: () => (/* binding */ v1VariationNames),
/* harmony export */   v2Blocks: () => (/* binding */ v2Blocks),
/* harmony export */   vdVariationNames: () => (/* binding */ vdVariationNames)
/* harmony export */ });
/**
 * Begin v1 legacy block modifications.
 */
var v1Blocks = ['generateblocks/button-container', 'generateblocks/buttons', 'generateblocks/button', 'generateblocks/headline', 'generateblocks/container', 'generateblocks/grid', 'generateblocks/image', 'generateblocks/query-loop'];
var v1VariationNames = ['tabs', 'accordion'];

/**
 * V2 blocks that need to be labeled.
 */
var v2Blocks = ['generateblocks/text', 'generateblocks/element', 'generateblocks/media', 'generateblocks/shape', 'generateblocks/query', 'generateblocks/looper', 'generateblocks/query-no-results', 'generateblocks/query-page-numbers', 'generateblocks/loop-item', 'generateblocks-pro/accordion', 'generateblocks-pro/accordion-item', 'generateblocks-pro/accordion-toggle', 'generateblocks-pro/accordion-toggle-icon', 'generateblocks-pro/accordion-content', 'generateblocks-pro/tabs', 'generateblocks-pro/tabs-menu', 'generateblocks-pro/tab-menu-item', 'generateblocks-pro/tab-items', 'generateblocks-pro/tab-item', 'generateblocks/button-container', 'generateblocks-pro/navigation', 'generateblocks-pro/menu-container', 'generateblocks-pro/menu-toggle', 'generateblocks-pro/classic-menu', 'generateblocks-pro/classic-menu-item', 'generateblocks-pro/classic-sub-menu', 'generateblocks-pro/site-header'];
var vdVariationNames = [];


/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/commands"
/*!**********************************!*\
  !*** external ["wp","commands"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["commands"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "@wordpress/plugins"
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["plugins"];

/***/ },

/***/ "@wordpress/primitives"
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["primitives"];

/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

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
/*!*********************************************************!*\
  !*** ./src/js/blocks/commands/commands-block-editor.js ***!
  \*********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_commands_ToggleContainerOutlines__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/commands/ToggleContainerOutlines */ "./src/js/blocks/commands/components/commands/ToggleContainerOutlines.js");
/* harmony import */ var _components_commands_TransformV1ToV2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/commands/TransformV1ToV2 */ "./src/js/blocks/commands/components/commands/TransformV1ToV2.js");
/**
 * Block editor commands registration.
 */





/**
 * Commands block editor component.
 *
 * @return {JSX.Element|null} The CommandsBlockEditor component.
 */
var CommandsBlockEditor = function CommandsBlockEditor() {
  (0,_components_commands_ToggleContainerOutlines__WEBPACK_IMPORTED_MODULE_1__.useToggleContainerOutlinesCommand)();
  var transformModal = (0,_components_commands_TransformV1ToV2__WEBPACK_IMPORTED_MODULE_2__.useTransformV1ToV2Command)();
  return transformModal; // Return the modal if it's open, otherwise null.
};
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('dlxgb-commands-block-editor', {
  render: CommandsBlockEditor
});
})();

/******/ })()
;
//# sourceMappingURL=gb-extras-commands-block-editor.js.map