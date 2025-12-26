/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    keywords: ['generateblocks', 'outline', 'container', 'element', 'grid', 'toggle', 'show', 'hide', 'visual', 'debug'],
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

/***/ "./src/js/blocks/commands/components/commands/TransformHeadingToGBText.js"
/*!********************************************************************************!*\
  !*** ./src/js/blocks/commands/components/commands/TransformHeadingToGBText.js ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTransformHeadingToGBTextCommand: () => (/* binding */ useTransformHeadingToGBTextCommand)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_commands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/commands */ "@wordpress/commands");
/* harmony import */ var _wordpress_commands__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_commands__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modals_TransformHeadingModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modals/TransformHeadingModal */ "./src/js/blocks/commands/components/modals/TransformHeadingModal.js");
/* harmony import */ var _utils_headingTransforms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/headingTransforms */ "./src/js/blocks/commands/utils/headingTransforms.js");
/* harmony import */ var _icons_GBIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../icons/GBIcon */ "./src/js/blocks/commands/components/icons/GBIcon.js");
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
 * Command to transform core/heading blocks to GenerateBlocks v2 text blocks.
 */








/**
 * Hook to register the Transform Heading to GB Text command.
 *
 * @return {JSX.Element|null} The TransformHeadingToGBText component.
 */
function useTransformHeadingToGBTextCommand() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    headingTransformConfirmation = _useState2[0],
    setHeadingTransformConfirmation = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    transforming = _useState4[0],
    setTransforming = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    headingCount = _useState6[0],
    setHeadingCount = _useState6[1];

  // Update heading count when modal opens.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (headingTransformConfirmation) {
      var blocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('core/block-editor').getBlocks();
      var headings = (0,_utils_headingTransforms__WEBPACK_IMPORTED_MODULE_4__.getAllHeadingBlocks)(blocks);
      setHeadingCount(headings.length);
    }
  }, [headingTransformConfirmation]);
  (0,_wordpress_commands__WEBPACK_IMPORTED_MODULE_1__.useCommand)({
    name: 'dlx-transform-headings-to-gb-text',
    label: 'GenerateBlocks: Convert Headings to Text Blocks',
    searchLabel: 'Convert/transform all core heading blocks to GenerateBlocks v2 text blocks',
    keywords: ['generateblocks', 'transform', 'convert', 'heading', 'headline', 'text', 'block', 'core', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'bulk'],
    icon: /*#__PURE__*/React.createElement(_icons_GBIcon__WEBPACK_IMPORTED_MODULE_5__["default"], {
      width: "16",
      height: "16"
    }),
    callback: function callback() {
      setHeadingTransformConfirmation(true);
    }
  });
  var handleConfirm = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            setTransforming(true);
            _context.p = 1;
            _context.n = 2;
            return (0,_utils_headingTransforms__WEBPACK_IMPORTED_MODULE_4__.transformAllHeadingBlocks)();
          case 2:
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            // eslint-disable-next-line no-console
            console.error('Error transforming heading blocks:', _t);
          case 4:
            _context.p = 4;
            setHeadingTransformConfirmation(false);
            setTransforming(false);
            return _context.f(4);
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3, 4, 5]]);
    }));
    return function handleConfirm() {
      return _ref.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement(_modals_TransformHeadingModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isOpen: headingTransformConfirmation,
    onClose: function onClose() {
      return setHeadingTransformConfirmation(false);
    },
    onConfirm: handleConfirm,
    transforming: transforming,
    headingCount: headingCount
  });
}

/***/ },

/***/ "./src/js/blocks/commands/components/commands/TransformParagraphToGBText.js"
/*!**********************************************************************************!*\
  !*** ./src/js/blocks/commands/components/commands/TransformParagraphToGBText.js ***!
  \**********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTransformParagraphToGBTextCommand: () => (/* binding */ useTransformParagraphToGBTextCommand)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_commands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/commands */ "@wordpress/commands");
/* harmony import */ var _wordpress_commands__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_commands__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modals_TransformParagraphModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modals/TransformParagraphModal */ "./src/js/blocks/commands/components/modals/TransformParagraphModal.js");
/* harmony import */ var _utils_paragraphTransforms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/paragraphTransforms */ "./src/js/blocks/commands/utils/paragraphTransforms.js");
/* harmony import */ var _icons_GBIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../icons/GBIcon */ "./src/js/blocks/commands/components/icons/GBIcon.js");
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
 * Command to transform core/paragraph blocks to GenerateBlocks v2 text blocks.
 */








/**
 * Hook to register the Transform Paragraph to GB Text command.
 *
 * @return {JSX.Element|null} The TransformParagraphToGBText component.
 */
function useTransformParagraphToGBTextCommand() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    paragraphTransformConfirmation = _useState2[0],
    setParagraphTransformConfirmation = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    transforming = _useState4[0],
    setTransforming = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    paragraphCount = _useState6[0],
    setParagraphCount = _useState6[1];

  // Update paragraph count when modal opens.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (paragraphTransformConfirmation) {
      var blocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('core/block-editor').getBlocks();
      var paragraphs = (0,_utils_paragraphTransforms__WEBPACK_IMPORTED_MODULE_4__.getAllParagraphBlocks)(blocks);
      setParagraphCount(paragraphs.length);
    }
  }, [paragraphTransformConfirmation]);
  (0,_wordpress_commands__WEBPACK_IMPORTED_MODULE_1__.useCommand)({
    name: 'dlx-transform-paragraphs-to-gb-text',
    label: 'GenerateBlocks: Convert Paragraphs to Text Blocks',
    searchLabel: 'Convert/transform all core paragraph blocks to GenerateBlocks v2 text blocks',
    keywords: ['generateblocks', 'transform', 'convert', 'paragraph', 'text', 'block', 'core', 'p', 'bulk'],
    icon: /*#__PURE__*/React.createElement(_icons_GBIcon__WEBPACK_IMPORTED_MODULE_5__["default"], {
      width: "16",
      height: "16"
    }),
    callback: function callback() {
      setParagraphTransformConfirmation(true);
    }
  });
  var handleConfirm = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            setTransforming(true);
            _context.p = 1;
            _context.n = 2;
            return (0,_utils_paragraphTransforms__WEBPACK_IMPORTED_MODULE_4__.transformAllParagraphBlocks)();
          case 2:
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            // eslint-disable-next-line no-console
            console.error('Error transforming paragraph blocks:', _t);
          case 4:
            _context.p = 4;
            setParagraphTransformConfirmation(false);
            setTransforming(false);
            return _context.f(4);
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3, 4, 5]]);
    }));
    return function handleConfirm() {
      return _ref.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement(_modals_TransformParagraphModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isOpen: paragraphTransformConfirmation,
    onClose: function onClose() {
      return setParagraphTransformConfirmation(false);
    },
    onConfirm: handleConfirm,
    transforming: transforming,
    paragraphCount: paragraphCount
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
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modals_TransformV1ToV2Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modals/TransformV1ToV2Modal */ "./src/js/blocks/commands/components/modals/TransformV1ToV2Modal.js");
/* harmony import */ var _utils_blockNesting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/blockNesting */ "./src/js/blocks/commands/utils/blockNesting.js");
/* harmony import */ var _utils_blockTransforms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/blockTransforms */ "./src/js/blocks/commands/utils/blockTransforms.js");
/* harmony import */ var _icons_GBIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../icons/GBIcon */ "./src/js/blocks/commands/components/icons/GBIcon.js");
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
    keywords: ['generateblocks', 'transform', 'convert', 'v1', 'v2', 'version', 'migrate', 'upgrade', 'experimental'],
    icon: /*#__PURE__*/React.createElement(_icons_GBIcon__WEBPACK_IMPORTED_MODULE_6__["default"], {
      width: "16",
      height: "16"
    }),
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
            nestingLevel = (0,_utils_blockNesting__WEBPACK_IMPORTED_MODULE_4__.getBlockNestingLevel)();
            setTransforming(true);
            i = 0;
          case 1:
            if (!(i < nestingLevel)) {
              _context.n = 3;
              break;
            }
            _context.n = 2;
            return (0,_utils_blockTransforms__WEBPACK_IMPORTED_MODULE_5__.transformBlocks)((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('core/block-editor').getBlocks());
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
  return /*#__PURE__*/React.createElement(_modals_TransformV1ToV2Modal__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isOpen: blockTransformConfirmation,
    onClose: function onClose() {
      return setBlockTransformConfirmation(false);
    },
    onConfirm: handleConfirm,
    transforming: transforming
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

/***/ "./src/js/blocks/commands/components/modals/TransformHeadingModal.js"
/*!***************************************************************************!*\
  !*** ./src/js/blocks/commands/components/modals/TransformHeadingModal.js ***!
  \***************************************************************************/
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
 * Modal for confirming heading block transformation.
 */




/**
 * TransformHeadingModal component.
 *
 * @param {Object}   props              - Component props.
 * @param {boolean}  props.isOpen       - Boolean to control modal visibility.
 * @param {Function} props.onClose      - Callback when modal is closed.
 * @param {Function} props.onConfirm    - Callback when transformation is confirmed.
 * @param {boolean}  props.transforming - Boolean indicating transformation in progress.
 * @param {number}   props.headingCount - Number of heading blocks to transform.
 * @return {JSX.Element|null} The TransformHeadingModal component.
 */
var TransformHeadingModal = function TransformHeadingModal(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    onConfirm = _ref.onConfirm,
    transforming = _ref.transforming,
    _ref$headingCount = _ref.headingCount,
    headingCount = _ref$headingCount === void 0 ? 0 : _ref$headingCount;
  if (!isOpen) {
    return null;
  }
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Modal, {
    isDismissible: true,
    shouldCloseOnClickOutside: false,
    shouldCloseOnEsc: true,
    onRequestClose: onClose,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Convert Headings to GenerateBlocks Text Blocks', 'dlx-gb-extras')
  }, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This will convert all core/heading blocks to GenerateBlocks v2 text blocks.', 'dlx-gb-extras')), headingCount > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Found ', 'dlx-gb-extras'), /*#__PURE__*/React.createElement("strong", null, headingCount), headingCount === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(' heading block to convert.', 'dlx-gb-extras') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(' heading blocks to convert.', 'dlx-gb-extras')), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please back up your content before converting. There is no undo for this operation.', 'dlx-gb-extras')))), headingCount === 0 && /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No heading blocks found to convert.', 'dlx-gb-extras')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px'
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    variant: "primary",
    isDestructive: true,
    onClick: onConfirm,
    disabled: transforming || headingCount === 0,
    icon: transforming ? /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, null) : null
  }, transforming ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Converting…', 'dlx-gb-extras') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Convert Headings', 'dlx-gb-extras')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    variant: "secondary",
    onClick: onClose,
    disabled: transforming
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'dlx-gb-extras'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TransformHeadingModal);

/***/ },

/***/ "./src/js/blocks/commands/components/modals/TransformParagraphModal.js"
/*!*****************************************************************************!*\
  !*** ./src/js/blocks/commands/components/modals/TransformParagraphModal.js ***!
  \*****************************************************************************/
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
 * Modal for confirming paragraph block transformation.
 */




/**
 * TransformParagraphModal component.
 *
 * @param {Object}   props              - Component props.
 * @param {boolean}  props.isOpen       - Boolean to control modal visibility.
 * @param {Function} props.onClose      - Callback when modal is closed.
 * @param {Function} props.onConfirm    - Callback when transformation is confirmed.
 * @param {boolean}  props.transforming - Boolean indicating transformation in progress.
 * @param {number}   props.paragraphCount - Number of paragraph blocks to transform.
 * @return {JSX.Element|null} The TransformParagraphModal component.
 */
var TransformParagraphModal = function TransformParagraphModal(_ref) {
  var isOpen = _ref.isOpen,
    onClose = _ref.onClose,
    onConfirm = _ref.onConfirm,
    transforming = _ref.transforming,
    _ref$paragraphCount = _ref.paragraphCount,
    paragraphCount = _ref$paragraphCount === void 0 ? 0 : _ref$paragraphCount;
  if (!isOpen) {
    return null;
  }
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Modal, {
    isDismissible: true,
    shouldCloseOnClickOutside: false,
    shouldCloseOnEsc: true,
    onRequestClose: onClose,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Convert Paragraphs to GenerateBlocks Text Blocks', 'dlx-gb-extras')
  }, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This will convert all core/paragraph blocks to GenerateBlocks v2 text blocks with element set to paragraph.', 'dlx-gb-extras')), paragraphCount > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Found ', 'dlx-gb-extras'), /*#__PURE__*/React.createElement("strong", null, paragraphCount), paragraphCount === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(' paragraph block to convert.', 'dlx-gb-extras') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(' paragraph blocks to convert.', 'dlx-gb-extras')), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please back up your content before converting. There is no undo for this operation.', 'dlx-gb-extras')))), paragraphCount === 0 && /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No paragraph blocks found to convert.', 'dlx-gb-extras')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px'
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    variant: "primary",
    isDestructive: true,
    onClick: onConfirm,
    disabled: transforming || paragraphCount === 0,
    icon: transforming ? /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, null) : null
  }, transforming ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Converting…', 'dlx-gb-extras') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Convert Paragraphs', 'dlx-gb-extras')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    variant: "secondary",
    onClick: onClose,
    disabled: transforming
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'dlx-gb-extras'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TransformParagraphModal);

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

/***/ "./src/js/blocks/commands/utils/headingTransforms.js"
/*!***********************************************************!*\
  !*** ./src/js/blocks/commands/utils/headingTransforms.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAllHeadingBlocks: () => (/* binding */ getAllHeadingBlocks),
/* harmony export */   transformAllHeadingBlocks: () => (/* binding */ transformAllHeadingBlocks),
/* harmony export */   transformHeadingBlock: () => (/* binding */ transformHeadingBlock)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Utilities for transforming heading blocks.
 */




/**
 * Recursively find all heading blocks in the editor.
 *
 * @param {Array} blocks Array of blocks to search.
 * @return {Array} Array of heading block objects.
 */
function getAllHeadingBlocks(blocks) {
  var headingBlocks = [];
  blocks.forEach(function (block) {
    if (block.name === 'core/heading') {
      headingBlocks.push(block);
    }
    // Recursively search inner blocks.
    if (block.innerBlocks && block.innerBlocks.length > 0) {
      headingBlocks.push.apply(headingBlocks, _toConsumableArray(getAllHeadingBlocks(block.innerBlocks)));
    }
  });
  return headingBlocks;
}

/**
 * Transform a core/heading block to generateblocks/text.
 *
 * @param {Object} block The heading block to transform.
 * @return {Promise} Promise that resolves when the block is transformed.
 */
function transformHeadingBlock(_x) {
  return _transformHeadingBlock.apply(this, arguments);
}

/**
 * Transform all heading blocks in the editor.
 *
 * @return {Promise} Promise that resolves when all blocks are transformed.
 */
function _transformHeadingBlock() {
  _transformHeadingBlock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(block) {
    var _ref, _ref$level, level, _ref$content, content, align, anchor, textColor, backgroundColor, fontSize, style, tagName, newAttributes, newBlock;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          if (!(block.name !== 'core/heading')) {
            _context.n = 1;
            break;
          }
          return _context.a(2, null);
        case 1:
          // Get the heading block attributes.
          _ref = block.attributes || {}, _ref$level = _ref.level, level = _ref$level === void 0 ? 2 : _ref$level, _ref$content = _ref.content, content = _ref$content === void 0 ? '' : _ref$content, align = _ref.align, anchor = _ref.anchor, textColor = _ref.textColor, backgroundColor = _ref.backgroundColor, fontSize = _ref.fontSize, style = _ref.style; // Map level to tagName (h1-h6).
          tagName = "h".concat(level); // Create the new GenerateBlocks text block attributes.
          // Start with essential attributes: tagName and content.
          newAttributes = {
            tagName: tagName,
            content: content || ''
          }; // Preserve alignment if set.
          if (align) {
            newAttributes.align = align;
          }

          // Preserve anchor if set (for linking to specific headings).
          if (anchor) {
            newAttributes.anchor = anchor;
          }

          // Preserve style object if it exists (contains custom CSS and other style properties).
          // This preserves colors, spacing, typography, and other custom styles.
          if (style && _typeof(style) === 'object') {
            newAttributes.style = _objectSpread({}, style);
          }

          // Preserve text color slug if set (WordPress theme color support).
          if (textColor) {
            newAttributes.textColor = textColor;
          }

          // Preserve background color slug if set (WordPress theme color support).
          if (backgroundColor) {
            newAttributes.backgroundColor = backgroundColor;
          }

          // Preserve font size if set (WordPress core typography support).
          if (fontSize) {
            newAttributes.fontSize = fontSize;
          }

          // Create the new block.
          newBlock = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('generateblocks/text', newAttributes, block.innerBlocks || []); // Replace the old block with the new one.
          _context.n = 2;
          return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('core/block-editor').replaceBlocks([block.clientId], [newBlock]);
        case 2:
          return _context.a(2, newBlock);
      }
    }, _callee);
  }));
  return _transformHeadingBlock.apply(this, arguments);
}
function transformAllHeadingBlocks() {
  return _transformAllHeadingBlocks.apply(this, arguments);
}
function _transformAllHeadingBlocks() {
  _transformAllHeadingBlocks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var blocks, headingBlocks, transformPromises;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          blocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getBlocks();
          headingBlocks = getAllHeadingBlocks(blocks); // Transform all heading blocks.
          transformPromises = headingBlocks.map(function (block) {
            return transformHeadingBlock(block);
          });
          _context2.n = 1;
          return Promise.all(transformPromises);
        case 1:
          return _context2.a(2, headingBlocks.length);
      }
    }, _callee2);
  }));
  return _transformAllHeadingBlocks.apply(this, arguments);
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

/***/ "./src/js/blocks/commands/utils/paragraphTransforms.js"
/*!*************************************************************!*\
  !*** ./src/js/blocks/commands/utils/paragraphTransforms.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAllParagraphBlocks: () => (/* binding */ getAllParagraphBlocks),
/* harmony export */   transformAllParagraphBlocks: () => (/* binding */ transformAllParagraphBlocks),
/* harmony export */   transformParagraphBlock: () => (/* binding */ transformParagraphBlock)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Utilities for transforming paragraph blocks.
 */




/**
 * Recursively find all paragraph blocks in the editor.
 *
 * @param {Array} blocks Array of blocks to search.
 * @return {Array} Array of paragraph block objects.
 */
function getAllParagraphBlocks(blocks) {
  var paragraphBlocks = [];
  blocks.forEach(function (block) {
    if (block.name === 'core/paragraph') {
      paragraphBlocks.push(block);
    }
    // Recursively search inner blocks.
    if (block.innerBlocks && block.innerBlocks.length > 0) {
      paragraphBlocks.push.apply(paragraphBlocks, _toConsumableArray(getAllParagraphBlocks(block.innerBlocks)));
    }
  });
  return paragraphBlocks;
}

/**
 * Transform a core/paragraph block to generateblocks/text.
 *
 * @param {Object} block The paragraph block to transform.
 * @return {Promise} Promise that resolves when the block is transformed.
 */
function transformParagraphBlock(_x) {
  return _transformParagraphBlock.apply(this, arguments);
}

/**
 * Transform all paragraph blocks in the editor.
 *
 * @return {Promise} Promise that resolves when all blocks are transformed.
 */
function _transformParagraphBlock() {
  _transformParagraphBlock = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(block) {
    var _ref, _ref$content, content, align, anchor, textColor, backgroundColor, fontSize, style, newAttributes, newBlock;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          if (!(block.name !== 'core/paragraph')) {
            _context.n = 1;
            break;
          }
          return _context.a(2, null);
        case 1:
          // Get the paragraph block attributes.
          _ref = block.attributes || {}, _ref$content = _ref.content, content = _ref$content === void 0 ? '' : _ref$content, align = _ref.align, anchor = _ref.anchor, textColor = _ref.textColor, backgroundColor = _ref.backgroundColor, fontSize = _ref.fontSize, style = _ref.style; // Create the new GenerateBlocks text block attributes.
          // Start with essential attributes: tagName (p for paragraph) and content.
          newAttributes = {
            tagName: 'p',
            element: 'paragraph',
            content: content || ''
          }; // Preserve alignment if set.
          if (align) {
            newAttributes.align = align;
          }

          // Preserve anchor if set (for linking to specific paragraphs).
          if (anchor) {
            newAttributes.anchor = anchor;
          }

          // Preserve style object if it exists (contains custom CSS and other style properties).
          // This preserves colors, spacing, typography, and other custom styles.
          if (style && _typeof(style) === 'object') {
            newAttributes.style = _objectSpread({}, style);
          }

          // Preserve text color slug if set (WordPress theme color support).
          if (textColor) {
            newAttributes.textColor = textColor;
          }

          // Preserve background color slug if set (WordPress theme color support).
          if (backgroundColor) {
            newAttributes.backgroundColor = backgroundColor;
          }

          // Preserve font size if set (WordPress core typography support).
          if (fontSize) {
            newAttributes.fontSize = fontSize;
          }

          // Create the new block.
          newBlock = (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.createBlock)('generateblocks/text', newAttributes, block.innerBlocks || []); // Replace the old block with the new one.
          _context.n = 2;
          return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('core/block-editor').replaceBlocks([block.clientId], [newBlock]);
        case 2:
          return _context.a(2, newBlock);
      }
    }, _callee);
  }));
  return _transformParagraphBlock.apply(this, arguments);
}
function transformAllParagraphBlocks() {
  return _transformAllParagraphBlocks.apply(this, arguments);
}
function _transformAllParagraphBlocks() {
  _transformAllParagraphBlocks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var blocks, paragraphBlocks, transformPromises;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          blocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getBlocks();
          paragraphBlocks = getAllParagraphBlocks(blocks); // Transform all paragraph blocks.
          transformPromises = paragraphBlocks.map(function (block) {
            return transformParagraphBlock(block);
          });
          _context2.n = 1;
          return Promise.all(transformPromises);
        case 1:
          return _context2.a(2, paragraphBlocks.length);
      }
    }, _callee2);
  }));
  return _transformAllParagraphBlocks.apply(this, arguments);
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
/* harmony import */ var _components_commands_TransformHeadingToGBText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/commands/TransformHeadingToGBText */ "./src/js/blocks/commands/components/commands/TransformHeadingToGBText.js");
/* harmony import */ var _components_commands_TransformParagraphToGBText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/commands/TransformParagraphToGBText */ "./src/js/blocks/commands/components/commands/TransformParagraphToGBText.js");
/**
 * Block editor commands registration.
 */







/**
 * Commands block editor component.
 *
 * @return {JSX.Element} The CommandsBlockEditor component.
 */
var CommandsBlockEditor = function CommandsBlockEditor() {
  (0,_components_commands_ToggleContainerOutlines__WEBPACK_IMPORTED_MODULE_1__.useToggleContainerOutlinesCommand)();
  var transformModal = (0,_components_commands_TransformV1ToV2__WEBPACK_IMPORTED_MODULE_2__.useTransformV1ToV2Command)();
  var headingTransformModal = (0,_components_commands_TransformHeadingToGBText__WEBPACK_IMPORTED_MODULE_3__.useTransformHeadingToGBTextCommand)();
  var paragraphTransformModal = (0,_components_commands_TransformParagraphToGBText__WEBPACK_IMPORTED_MODULE_4__.useTransformParagraphToGBTextCommand)();

  // Return all modals (they handle their own visibility).
  return /*#__PURE__*/React.createElement(React.Fragment, null, transformModal, headingTransformModal, paragraphTransformModal);
};
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('dlxgb-commands-block-editor', {
  render: CommandsBlockEditor
});
})();

/******/ })()
;
//# sourceMappingURL=gb-extras-commands-block-editor.js.map