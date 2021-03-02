(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.FaiDnd = {}));
}(this, function (exports) { 'use strict';

  var containerInstance = "fai-dnd-container-instance";
  var defaultGroupName = "@@fai-dnd-default-group@@";
  var wrapperClass = "fai-dnd-draggable-wrapper";
  var defaultGrabHandleClass = "fai-dnd-default-grap-handle";
  var animationClass = "animated";
  var translationValue = "__fai_dnd_draggable_translation_value";
  var visibilityValue = "__fai_dnd_draggable_visibility_value";
  var ghostClass = "fai-dnd-ghost";
  var containerClass = "fai-dnd-container";
  var extraSizeForInsertion = "fai-dnd-extra-size-for-insertion";
  var stretcherElementClass = "fai-dnd-stretcher-element";
  var stretcherElementInstance = "fai-dnd-stretcher-instance";
  var isDraggableDetached = "smoth-dnd-is-draggable-detached";
  var disbaleTouchActions = "fai-dnd-disable-touch-action";
  var noUserSelectClass = "fai-dnd-no-user-select";
  var preventAutoScrollClass = "fai-dnd-prevent-auto-scroll-class";
  var dropPlaceholderDefaultClass = "fai-dnd-drop-preview-default-class";
  var dropPlaceholderInnerClass = "fai-dnd-drop-preview-inner-class";
  var dropPlaceholderWrapperClass = "fai-dnd-drop-preview-constant-class";
  var dropPlaceholderFlexContainerClass = "fai-dnd-drop-preview-flex-container-class";
  var guidelineClass = "fai-dnd-guideline";

  var constants = /*#__PURE__*/Object.freeze({
    containerInstance: containerInstance,
    defaultGroupName: defaultGroupName,
    wrapperClass: wrapperClass,
    defaultGrabHandleClass: defaultGrabHandleClass,
    animationClass: animationClass,
    translationValue: translationValue,
    visibilityValue: visibilityValue,
    ghostClass: ghostClass,
    containerClass: containerClass,
    extraSizeForInsertion: extraSizeForInsertion,
    stretcherElementClass: stretcherElementClass,
    stretcherElementInstance: stretcherElementInstance,
    isDraggableDetached: isDraggableDetached,
    disbaleTouchActions: disbaleTouchActions,
    noUserSelectClass: noUserSelectClass,
    preventAutoScrollClass: preventAutoScrollClass,
    dropPlaceholderDefaultClass: dropPlaceholderDefaultClass,
    dropPlaceholderInnerClass: dropPlaceholderInnerClass,
    dropPlaceholderWrapperClass: dropPlaceholderWrapperClass,
    dropPlaceholderFlexContainerClass: dropPlaceholderFlexContainerClass,
    guidelineClass: guidelineClass
  });

  var defaultOptions = {
    groupName: undefined,
    behaviour: "move",
    // move | copy
    orientation: "vertical",
    // vertical | horizontal
    getChildPayload: undefined,
    animationDuration: 250,
    autoScrollEnabled: true,
    shouldAcceptDrop: undefined,
    shouldAnimateDrop: undefined,
    disabled: false,
    snappable: false,
    dragOnPoint: false
  };

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var ScrollAxis;

  (function (ScrollAxis) {
    ScrollAxis["x"] = "x";
    ScrollAxis["y"] = "y";
    ScrollAxis["xy"] = "xy";
  })(ScrollAxis || (ScrollAxis = {}));

  var getIntersection = function getIntersection(rect1, rect2) {
    return {
      left: Math.max(rect1.left, rect2.left),
      top: Math.max(rect1.top, rect2.top),
      right: Math.min(rect1.right, rect2.right),
      bottom: Math.min(rect1.bottom, rect2.bottom)
    };
  };
  var getIntersectionOnAxis = function getIntersectionOnAxis(rect1, rect2, axis) {
    if (axis === "x") {
      return {
        left: Math.max(rect1.left, rect2.left),
        top: rect1.top,
        right: Math.min(rect1.right, rect2.right),
        bottom: rect1.bottom
      };
    } else {
      return {
        left: rect1.left,
        top: Math.max(rect1.top, rect2.top),
        right: rect1.right,
        bottom: Math.min(rect1.bottom, rect2.bottom)
      };
    }
  };
  var getContainerRect = function getContainerRect(element) {
    var _rect = element.getBoundingClientRect();

    var rect = {
      left: _rect.left,
      right: _rect.right,
      top: _rect.top,
      bottom: _rect.bottom
    };

    if (hasBiggerChild(element, "x") && !isScrollingOrHidden(element, "x")) {
      var width = rect.right - rect.left;
      rect.right = rect.right + element.scrollWidth - width;
    }

    if (hasBiggerChild(element, "y") && !isScrollingOrHidden(element, "y")) {
      var height = rect.bottom - rect.top;
      rect.bottom = rect.bottom + element.scrollHeight - height;
    }

    return rect;
  };
  var getScrollingAxis = function getScrollingAxis(element) {
    var style = window.getComputedStyle(element);
    var overflow = style["overflow"];
    var general = overflow === "auto" || overflow === "scroll";
    if (general) return ScrollAxis.xy;
    var overFlowX = style["overflow-x"];
    var xScroll = overFlowX === "auto" || overFlowX === "scroll";
    var overFlowY = style["overflow-y"];
    var yScroll = overFlowY === "auto" || overFlowY === "scroll";
    if (xScroll && yScroll) return ScrollAxis.xy;
    if (xScroll) return ScrollAxis.x;
    if (yScroll) return ScrollAxis.y;
    return null;
  };
  var isScrolling = function isScrolling(element, axis) {
    var style = window.getComputedStyle(element);
    var overflow = style["overflow"];
    var overFlowAxis = style["overflow-".concat(axis)];
    var general = overflow === "auto" || overflow === "scroll";
    var dimensionScroll = overFlowAxis === "auto" || overFlowAxis === "scroll";
    return general || dimensionScroll;
  };
  var isScrollingOrHidden = function isScrollingOrHidden(element, axis) {
    var style = window.getComputedStyle(element);
    var overflow = style["overflow"];
    var overFlowAxis = style["overflow-".concat(axis)];
    var general = overflow === "auto" || overflow === "scroll" || overflow === "hidden";
    var dimensionScroll = overFlowAxis === "auto" || overFlowAxis === "scroll" || overFlowAxis === "hidden";
    return general || dimensionScroll;
  };
  var hasBiggerChild = function hasBiggerChild(element, axis) {
    if (axis === "x") {
      return element.scrollWidth > element.clientWidth;
    } else {
      return element.scrollHeight > element.clientHeight;
    }
  };
  var getVisibleRect = function getVisibleRect(element, elementRect) {
    var currentElement = element;
    var rect = elementRect || getContainerRect(element);
    currentElement = element.parentElement;

    while (currentElement) {
      if (hasBiggerChild(currentElement, "x") && isScrollingOrHidden(currentElement, "x")) {
        rect = getIntersectionOnAxis(rect, currentElement.getBoundingClientRect(), "x");
      }

      if (hasBiggerChild(currentElement, "y") && isScrollingOrHidden(currentElement, "y")) {
        rect = getIntersectionOnAxis(rect, currentElement.getBoundingClientRect(), "y");
      }

      currentElement = currentElement.parentElement;
    }

    return rect;
  };
  var getParentRelevantContainerElement = function getParentRelevantContainerElement(element, relevantContainers) {
    var current = element;

    while (current) {
      if (current[containerInstance]) {
        var _ret = function () {
          var container = current[containerInstance];

          if (relevantContainers.some(function (p) {
            return p === container;
          })) {
            return {
              v: container
            };
          }
        }();

        if (_typeof(_ret) === "object") return _ret.v;
      }

      current = current.parentElement;
    }

    return null;
  };
  var listenScrollParent = function listenScrollParent(element, clb) {
    var scrollers = [];
    setScrollers();

    function setScrollers() {
      var currentElement = element;

      while (currentElement) {
        if (isScrolling(currentElement, "x") || isScrolling(currentElement, "y")) {
          scrollers.push(currentElement);
        }

        currentElement = currentElement.parentElement;
      }
    }

    function dispose() {
      stop();
      scrollers = null;
    }

    function start() {
      if (scrollers) {
        scrollers.forEach(function (p) {
          return p.addEventListener("scroll", clb);
        });
        window.addEventListener("scroll", clb);
      }
    }

    function stop() {
      if (scrollers) {
        scrollers.forEach(function (p) {
          return p.removeEventListener("scroll", clb);
        });
        window.removeEventListener("scroll", clb);
      }
    }

    return {
      dispose: dispose,
      start: start,
      stop: stop
    };
  };

  function matches(element, s) {
    var matches = (element.document || element.ownerDocument).querySelectorAll(s),
        i = matches.length;

    while (--i >= 0 && matches.item(i) !== element) {}

    return i > -1;
  }

  var getParent = function getParent(element, selector) {
    var current = element;

    while (current) {
      if (matches(current, selector)) {
        return current;
      }

      current = current.parentElement;
    }

    return null;
  };
  var hasClass = function hasClass(element, cls) {
    return (element.className + "").split(" ").map(function (p) {
      return p;
    }).indexOf(cls) > -1;
  };
  var addClass = function addClass(element, cls) {
    if (element) {
      var classes = (element.className + "").split(" ").filter(function (p) {
        return p;
      });

      if (classes.indexOf(cls) === -1) {
        classes.unshift(cls);
        element.className = classes.join(" ");
      }
    }
  };
  var removeClass = function removeClass(element, cls) {
    if (element) {
      var classes = (element.className + "").split(" ").filter(function (p) {
        return p && p !== cls;
      });
      element.className = classes.join(" ");
    }
  };
  var debounce = function debounce(fn, delay, immediate) {
    var timer = null;
    return function () {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      if (timer) {
        clearTimeout(timer);
      }

      if (immediate && !timer) {
        fn.call.apply(fn, [null].concat(params));
      } else {
        timer = setTimeout(function () {
          timer = null;
          fn.call.apply(fn, [null].concat(params));
        }, delay);
      }
    };
  };
  var removeChildAt = function removeChildAt(parent, index) {
    return parent.removeChild(parent.children[index]);
  };
  var addChildAt = function addChildAt(parent, child, index) {
    if (index >= parent.children.length) {
      parent.appendChild(child);
    } else {
      parent.insertBefore(child, parent.children[index]);
    }
  };
  var isMobile = function isMobile() {
    if (typeof window !== "undefined") {
      if (window.navigator.userAgent.match(/Android/i) || window.navigator.userAgent.match(/webOS/i) || window.navigator.userAgent.match(/iPhone/i) || window.navigator.userAgent.match(/iPad/i) || window.navigator.userAgent.match(/iPod/i) || window.navigator.userAgent.match(/BlackBerry/i) || window.navigator.userAgent.match(/Windows Phone/i)) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  };
  var clearSelection = function clearSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (window.document.selection) {
      // IE?
      window.document.selection.empty();
    }
  };
  var getElementCursor = function getElementCursor(element) {
    if (element) {
      var style = window.getComputedStyle(element);

      if (style) {
        return style.cursor;
      }
    }

    return null;
  };
  function isVisible(rect) {
    return !(rect.bottom <= rect.top || rect.right <= rect.left);
  }
  function groupBy(arr, func) {
    var groups = [];
    var groupKeys = [];
    arr.forEach(function (el, index) {
      var groupKey = func(el, index, arr);
      var keyIndex = groupKeys.indexOf(groupKey);
      var group = groups[keyIndex] || [];

      if (keyIndex === -1) {
        groupKeys.push(groupKey);
        groups.push(group);
      }

      group.push(el);
    });
    return groups;
  }
  function findIndex(arr, callback) {
    var defaultIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
    var length = arr.length;

    for (var i = 0; i < length; ++i) {
      if (callback(arr[i], i, arr)) {
        return i;
      }
    }

    return defaultIndex;
  }
  function find(arr, callback, defalutValue) {
    var index = findIndex(arr, callback);
    return index > -1 ? arr[index] : defalutValue;
  }
  function getFirstElementChild(element) {
    var node,
        nodes = element.childNodes,
        i = 0;

    while (node = nodes[i++]) {
      if (node.nodeType === 1) {
        return node;
      }
    }

    return null;
  }

  function domDropHandler(_ref) {
    var element = _ref.element,
        draggables = _ref.draggables;
    return function (dropResult, onDrop) {
      var _ref2 = dropResult,
          removedIndex = _ref2.removedIndex,
          addedIndex = _ref2.addedIndex,
          droppedElement = _ref2.droppedElement;
      var removedWrapper = null;

      if (removedIndex !== null) {
        removedWrapper = removeChildAt(element, removedIndex);
        draggables.splice(removedIndex, 1);
      }

      if (addedIndex !== null) {
        var wrapper = window.document.createElement("div");
        wrapper.className = "".concat(wrapperClass);
        wrapper.appendChild(removedWrapper && getFirstElementChild(removedWrapper) ? getFirstElementChild(removedWrapper) : droppedElement);
        addChildAt(element, wrapper, addedIndex);

        if (addedIndex >= draggables.length) {
          draggables.push(wrapper);
        } else {
          draggables.splice(addedIndex, 0, wrapper);
        }
      }

      if (onDrop) {
        onDrop(dropResult);
      }
    };
  }
  function reactDropHandler() {
    var handler = function handler() {
      return function (dropResult, onDrop) {
        if (onDrop) {
          onDrop(dropResult);
        }
      };
    };

    return {
      handler: handler
    };
  }

  var dropHandlers = /*#__PURE__*/Object.freeze({
    domDropHandler: domDropHandler,
    reactDropHandler: reactDropHandler
  });

  var horizontalMap = {
    size: "offsetWidth",
    distanceToParent: "offsetLeft",
    translate: "transform",
    begin: "left",
    end: "right",
    dragPosition: "x",
    scrollSize: "scrollWidth",
    offsetSize: "offsetWidth",
    scrollValue: "scrollLeft",
    scale: "scaleX",
    setSize: "width",
    setters: {
      translate: function translate(val) {
        return "translate3d(".concat(val, "px, 0, 0)");
      }
    }
  };
  var verticalMap = {
    size: "offsetHeight",
    distanceToParent: "offsetTop",
    translate: "transform",
    begin: "top",
    end: "bottom",
    dragPosition: "y",
    scrollSize: "scrollHeight",
    offsetSize: "offsetHeight",
    scrollValue: "scrollTop",
    scale: "scaleY",
    setSize: "height",
    setters: {
      translate: function translate(val) {
        return "translate3d(0,".concat(val, "px, 0)");
      }
    }
  };

  function orientationDependentProps(map) {
    function get(obj, prop) {
      var mappedProp = map[prop];
      return obj[mappedProp || prop];
    }

    function set(obj, prop, value) {
      obj[map[prop]] = map.setters[prop] ? map.setters[prop](value) : value;
    }

    return {
      get: get,
      set: set
    };
  }

  function layoutManager(containerElement, orientation, _animationDuration) {
    containerElement[extraSizeForInsertion] = 0;
    var map = orientation === "horizontal" ? horizontalMap : verticalMap;
    var propMapper = orientationDependentProps(map);
    var values = {
      translation: 0
    };
    window.addEventListener("resize", function () {
      invalidateContainerRectangles(containerElement);
    });
    setTimeout(function () {
      invalidate();
    }, 10);

    function invalidate() {
      invalidateContainerRectangles(containerElement);
      invalidateContainerScale(containerElement);
    }

    function invalidateContainerRectangles(containerElement) {
      values.rect = getContainerRect(containerElement);
      var visibleRect = getVisibleRect(containerElement, values.rect);

      if (isVisible(visibleRect)) {
        values.lastVisibleRect = values.visibleRect;
      }

      values.visibleRect = visibleRect;
    }

    function invalidateContainerScale(containerElement) {
      var rect = containerElement.getBoundingClientRect();
      values.scaleX = containerElement.offsetWidth ? (rect.right - rect.left) / containerElement.offsetWidth : 1;
      values.scaleY = containerElement.offsetHeight ? (rect.bottom - rect.top) / containerElement.offsetHeight : 1;
    }

    function getContainerRectangles() {
      return {
        rect: values.rect,
        visibleRect: values.visibleRect,
        lastVisibleRect: values.lastVisibleRect
      };
    }

    function getBeginEndOfDOMRect(rect) {
      return {
        begin: propMapper.get(rect, "begin"),
        end: propMapper.get(rect, "end")
      };
    }

    function getBeginEndOfContainer() {
      var begin = propMapper.get(values.rect, "begin") + values.translation;
      var end = propMapper.get(values.rect, "end") + values.translation;
      return {
        begin: begin,
        end: end
      };
    }

    function getBeginEndOfContainerVisibleRect() {
      var begin = propMapper.get(values.visibleRect, "begin") + values.translation;
      var end = propMapper.get(values.visibleRect, "end") + values.translation;
      return {
        begin: begin,
        end: end
      };
    }

    function getSize(element) {
      var htmlElement = element;

      if (htmlElement.tagName) {
        var rect = htmlElement.getBoundingClientRect();
        return orientation === "vertical" ? rect.bottom - rect.top : rect.right - rect.left;
      }

      return propMapper.get(element, "size") * propMapper.get(values, "scale");
    }

    function getDistanceToOffsetParent(element) {
      var distance = propMapper.get(element, "distanceToParent") + (element[translationValue] || 0);
      return distance * propMapper.get(values, "scale");
    }

    function getBeginEnd(element) {
      var begin = getDistanceToOffsetParent(element) + (propMapper.get(values.rect, "begin") + values.translation) - propMapper.get(containerElement, "scrollValue");
      return {
        begin: begin,
        end: begin + getSize(element) * propMapper.get(values, "scale")
      };
    }

    function setSize(element, size) {
      propMapper.set(element, "setSize", size);
    }

    function getAxisValue(position) {
      return propMapper.get(position, "dragPosition");
    }

    function setTranslation(element, translation) {
      if (!translation) {
        element.style.removeProperty("transform");
      } else {
        propMapper.set(element.style, "translate", translation);
      }

      element[translationValue] = translation;
    }

    function getTranslation(element) {
      return element[translationValue];
    }

    function setVisibility(element, isVisible) {
      if (element[visibilityValue] === undefined || element[visibilityValue] !== isVisible) {
        if (isVisible) {
          element.style.removeProperty("visibility");
        } else {
          element.style.visibility = "hidden";
        }

        element[visibilityValue] = isVisible;
      }
    }

    function isVisible$1(element) {
      return element[visibilityValue] === undefined || element[visibilityValue];
    }

    function isInVisibleRect(x, y) {
      var _values$visibleRect = values.visibleRect,
          left = _values$visibleRect.left,
          top = _values$visibleRect.top,
          right = _values$visibleRect.right,
          bottom = _values$visibleRect.bottom; // if there is no wrapper in rect size will be 0 and wont accept any drop
      // so make sure at least there is 30px difference

      if (bottom - top < 2) {
        bottom = top + 30;
      }

      var containerRect = values.rect;

      if (orientation === "vertical") {
        return x > containerRect.left && x < containerRect.right && y > top && y < bottom;
      } else {
        return x > left && x < right && y > containerRect.top && y < containerRect.bottom;
      }
    }

    function getTopLeftOfElementBegin(begin) {
      var top = 0;
      var left = 0;

      if (orientation === "horizontal") {
        left = begin;
        top = values.rect.top;
      } else {
        left = values.rect.left;
        top = begin;
      }

      return {
        top: top,
        left: left
      };
    }

    function getScrollSize(element) {
      return propMapper.get(element, "scrollSize");
    }

    function getScrollValue(element) {
      return propMapper.get(element, "scrollValue");
    }

    function setScrollValue(element, val) {
      return propMapper.set(element, "scrollValue", val);
    }

    function getPosition(position) {
      return getAxisValue(position);
    }

    function invalidateRects() {
      invalidateContainerRectangles(containerElement);
    }

    function setBegin(style, value) {
      propMapper.set(style, "begin", value);
    }

    return {
      getSize: getSize,
      getContainerRectangles: getContainerRectangles,
      getBeginEndOfDOMRect: getBeginEndOfDOMRect,
      getBeginEndOfContainer: getBeginEndOfContainer,
      getBeginEndOfContainerVisibleRect: getBeginEndOfContainerVisibleRect,
      getBeginEnd: getBeginEnd,
      getAxisValue: getAxisValue,
      setTranslation: setTranslation,
      getTranslation: getTranslation,
      setVisibility: setVisibility,
      isVisible: isVisible$1,
      isInVisibleRect: isInVisibleRect,
      setSize: setSize,
      getTopLeftOfElementBegin: getTopLeftOfElementBegin,
      getScrollSize: getScrollSize,
      getScrollValue: getScrollValue,
      setScrollValue: setScrollValue,
      invalidate: invalidate,
      invalidateRects: invalidateRects,
      getPosition: getPosition,
      setBegin: setBegin
    };
  }

  var maxSpeed = 1500; // px/s

  function getScrollParams(position, axis, rect) {
    var left = rect.left,
        right = rect.right,
        top = rect.top,
        bottom = rect.bottom;
    var x = position.x,
        y = position.y;

    if (x < left || x > right || y < top || y > bottom) {
      return null;
    }

    var begin;
    var end;
    var pos;

    if (axis === "x") {
      begin = left;
      end = right;
      pos = x;
    } else {
      begin = top;
      end = bottom;
      pos = y;
    }

    var scrollerSize = end - begin;
    var moveDistance = scrollerSize > 400 ? 100 : scrollerSize / 4;

    if (end - pos < moveDistance) {
      return {
        direction: "end",
        speedFactor: (moveDistance - (end - pos)) / moveDistance
      };
    } else if (pos - begin < moveDistance) {
      return {
        direction: "begin",
        speedFactor: (moveDistance - (pos - begin)) / moveDistance
      };
    }

    return null;
  }

  function addScrollValue(element, axis, value) {
    if (element) {
      if (element !== window) {
        if (axis === "x") {
          element.scrollLeft += value;
        } else {
          element.scrollTop += value;
        }
      } else {
        if (axis === "x") {
          element.scrollBy(value, 0);
        } else {
          element.scrollBy(0, value);
        }
      }
    }
  }

  var createAnimator = function createAnimator(element) {
    var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "y";
    var request = null;
    var startTime = null;
    var direction = null;
    var speed = null;

    function animate(_direction, _speed) {
      direction = _direction;
      speed = _speed;
      start();
    }

    function start() {
      if (request === null) {
        request = requestAnimationFrame(function (timestamp) {
          if (startTime === null) {
            startTime = timestamp;
          }

          var timeDiff = timestamp - startTime;
          startTime = timestamp;
          var distanceDiff = timeDiff / 1000 * speed;
          distanceDiff = direction === "begin" ? 0 - distanceDiff : distanceDiff;
          addScrollValue(element, axis, distanceDiff);
          request = null;
          start();
        });
      }
    }

    function stop() {
      if (request !== null) {
        cancelAnimationFrame(request);
        request = null;
      }

      startTime = null;
    }

    return {
      animate: animate,
      stop: stop
    };
  };

  function rectangleGetter(element) {
    return function () {
      return getVisibleRect(element, element.getBoundingClientRect());
    };
  }

  function getScrollerAnimator(container) {
    var scrollerAnimators = [];
    var current = container.element;

    while (current) {
      var scrollingAxis = getScrollingAxis(current);

      if (scrollingAxis && !hasClass(current, preventAutoScrollClass)) {
        var axisAnimations = {};

        switch (scrollingAxis) {
          case ScrollAxis.xy:
            {
              axisAnimations.x = {
                animator: createAnimator(current, "x")
              };
              axisAnimations.y = {
                animator: createAnimator(current, "y")
              };
            }
            break;

          case ScrollAxis.x:
            {
              axisAnimations.x = {
                animator: createAnimator(current, "x")
              };
            }
            break;

          case ScrollAxis.y:
            {
              axisAnimations.y = {
                animator: createAnimator(current, "y")
              };
            }
            break;

          default:
        }

        scrollerAnimators.push({
          axisAnimations: axisAnimations,
          getRect: rectangleGetter(current),
          scrollerElement: current
        });
      }

      current = current.parentElement;
    }

    return scrollerAnimators;
  }

  function setScrollParams(animatorInfos, position) {
    animatorInfos.forEach(function (animator) {
      var axisAnimations = animator.axisAnimations,
          getRect = animator.getRect;
      var rect = getRect();

      if (axisAnimations.x) {
        axisAnimations.x.scrollParams = getScrollParams(position, "x", rect);
        animator.cachedRect = rect;
      }

      if (axisAnimations.y) {
        axisAnimations.y.scrollParams = getScrollParams(position, "y", rect);
        animator.cachedRect = rect;
      }
    });
  }

  function getTopmostScrollAnimator(animatorInfos, position) {
    var current = document.elementFromPoint(position.x, position.y);

    while (current) {
      var scrollAnimator = animatorInfos.find(function (p) {
        return p.scrollerElement === current;
      });

      if (scrollAnimator) {
        return scrollAnimator;
      }

      current = current.parentElement;
    }

    return null;
  }

  var dragScroller = (function (containers) {
    var maxScrollSpeed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : maxSpeed;
    var animatorInfos = containers.reduce(function (acc, container) {
      var filteredAnimators = getScrollerAnimator(container).filter(function (p) {
        return !acc.find(function (q) {
          return q.scrollerElement === p.scrollerElement;
        });
      });
      return [].concat(_toConsumableArray(acc), _toConsumableArray(filteredAnimators));
    }, []);
    return function (_ref) {
      var draggableInfo = _ref.draggableInfo,
          reset = _ref.reset;

      if (reset) {
        animatorInfos.forEach(function (p) {
          p.axisAnimations.x && p.axisAnimations.x.animator.stop();
          p.axisAnimations.y && p.axisAnimations.y.animator.stop();
        });
        return;
      }

      if (draggableInfo) {
        setScrollParams(animatorInfos, draggableInfo.mousePosition);
        animatorInfos.forEach(function (animator) {
          var _animator$axisAnimati = animator.axisAnimations,
              x = _animator$axisAnimati.x,
              y = _animator$axisAnimati.y;

          if (x) {
            if (x.scrollParams) {
              var _x$scrollParams = x.scrollParams,
                  direction = _x$scrollParams.direction,
                  speedFactor = _x$scrollParams.speedFactor;
              x.animator.animate(direction, speedFactor * maxScrollSpeed);
            } else {
              x.animator.stop();
            }
          }

          if (y) {
            if (y.scrollParams) {
              var _y$scrollParams = y.scrollParams,
                  _direction2 = _y$scrollParams.direction,
                  _speedFactor = _y$scrollParams.speedFactor;
              y.animator.animate(_direction2, _speedFactor * maxScrollSpeed);
            } else {
              y.animator.stop();
            }
          }
        });
        var overlappingAnimators = animatorInfos.filter(function (p) {
          return p.cachedRect;
        });

        if (overlappingAnimators.length && overlappingAnimators.length > 1) {
          // stop animations except topmost
          var topScrollerAnimator = getTopmostScrollAnimator(overlappingAnimators, draggableInfo.mousePosition);

          if (topScrollerAnimator) {
            overlappingAnimators.forEach(function (p) {
              if (p !== topScrollerAnimator) {
                p.axisAnimations.x && p.axisAnimations.x.animator.stop();
                p.axisAnimations.y && p.axisAnimations.y.animator.stop();
              }
            });
          }
        }
      }
    };
  });

  var _css;
  var verticalWrapperClass = {
    // 'overflow': 'hidden',
    display: "block"
  };
  var horizontalWrapperClass = {
    height: "100%",
    display: "table-cell",
    "vertical-align": "top"
  };
  var stretcherElementHorizontalClass = {
    display: "inline-block"
  };
  var css = (_css = {}, _defineProperty(_css, ".".concat(containerClass), {
    position: "relative",
    "min-height": "30px",
    "min-width": "30px"
  }), _defineProperty(_css, ".".concat(containerClass, ".horizontal"), {
    display: "table"
  }), _defineProperty(_css, ".".concat(containerClass, ".horizontal > .").concat(stretcherElementClass), stretcherElementHorizontalClass), _defineProperty(_css, ".".concat(containerClass, ".horizontal > .").concat(wrapperClass), horizontalWrapperClass), _defineProperty(_css, ".".concat(containerClass, ".vertical > .").concat(wrapperClass), verticalWrapperClass), _defineProperty(_css, ".".concat(wrapperClass), {
    "box-sizing": "border-box"
  }), _defineProperty(_css, ".".concat(wrapperClass, ".horizontal"), horizontalWrapperClass), _defineProperty(_css, ".".concat(wrapperClass, ".vertical"), verticalWrapperClass), _defineProperty(_css, ".".concat(wrapperClass, ".animated"), {
    transition: "transform ease"
  }), _defineProperty(_css, ".".concat(ghostClass), {
    "box-sizing": "border-box" // 'background-color': 'transparent',
    // '-webkit-font-smoothing': 'subpixel-antialiased'

  }), _defineProperty(_css, ".".concat(ghostClass, ".animated"), {
    transition: "all ease-in-out"
  }), _defineProperty(_css, ".".concat(ghostClass, " *"), {
    "pointer-events": "none"
  }), _defineProperty(_css, ".".concat(disbaleTouchActions, " *"), {
    "touch-action": "none",
    "-ms-touch-action": "none"
  }), _defineProperty(_css, ".".concat(noUserSelectClass), {
    "-webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none"
  }), _defineProperty(_css, ".".concat(dropPlaceholderInnerClass), {
    flex: "1"
  }), _defineProperty(_css, ".".concat(containerClass, ".horizontal > .").concat(dropPlaceholderWrapperClass), {
    height: "100%",
    // 'overflow': 'hidden',
    display: "table-cell",
    "vertical-align": "top"
  }), _defineProperty(_css, ".".concat(containerClass, ".vertical > .").concat(dropPlaceholderWrapperClass), {
    // 'overflow': 'hidden',
    display: "block",
    width: "100%"
  }), _defineProperty(_css, ".".concat(dropPlaceholderFlexContainerClass), {
    width: "100%",
    height: "100%",
    display: "flex",
    "justify-content": "stretch",
    "align-items": "stretch"
  }), _defineProperty(_css, ".".concat(dropPlaceholderDefaultClass), {
    "background-color": "rgba(150, 150, 150, 0.1)",
    border: "1px solid #ccc"
  }), _defineProperty(_css, ".".concat(guidelineClass), {
    position: "fixed",
    "border-color": "#5874d8",
    "border-width": "0",
    "z-index": "1001"
  }), _defineProperty(_css, ".".concat(guidelineClass, ".bold"), {
    "border-style": "solid"
  }), _defineProperty(_css, ".".concat(guidelineClass, ".dashed"), {
    "border-style": "dashed"
  }), _defineProperty(_css, ".".concat(guidelineClass, ".horizontal"), {
    "border-top-width": "1px"
  }), _defineProperty(_css, ".".concat(guidelineClass, ".vertical"), {
    "border-left-width": "1px"
  }), _css);

  function convertToCssString(css) {
    return Object.keys(css).reduce(function (styleString, propName) {
      var propValue = css[propName];

      if (_typeof(propValue) === "object") {
        return "".concat(styleString).concat(propName, "{").concat(convertToCssString(propValue), "}");
      }

      return "".concat(styleString).concat(propName, ":").concat(propValue, ";");
    }, "");
  }

  function addStyleToHead() {
    if (typeof window !== "undefined") {
      var head = window.document.head || window.document.getElementsByTagName("head")[0];
      var style = window.document.createElement("style");
      style.id = "fai-dnd-style-definitions";
      var cssString = convertToCssString(css);
      style.type = "text/css";

      if (style.styleSheet) {
        style.styleSheet.cssText = cssString;
      } else {
        style.appendChild(window.document.createTextNode(cssString));
      }

      head.appendChild(style);
    }
  }

  function addCursorStyleToBody(cursor) {
    if (cursor && typeof window !== "undefined") {
      var head = window.document.head || window.document.getElementsByTagName("head")[0];
      var style = window.document.createElement("style");
      var cssString = convertToCssString({
        "body *": {
          cursor: "".concat(cursor, " !important")
        }
      });
      style.type = "text/css";

      if (style.styleSheet) {
        style.styleSheet.cssText = cssString;
      } else {
        style.appendChild(window.document.createTextNode(cssString));
      }

      head.appendChild(style);
      return style;
    }

    return null;
  }

  function removeStyle(styleElement) {
    if (styleElement && typeof window !== "undefined") {
      var head = window.document.head || window.document.getElementsByTagName("head")[0];
      head.removeChild(styleElement);
    }
  }

  function getElementGuidelines(elementGuidelines) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$snapCenter = _ref.snapCenter,
        snapCenter = _ref$snapCenter === void 0 ? true : _ref$snapCenter;

    var guidelines = [];

    if (!elementGuidelines.length) {
      return guidelines;
    }

    elementGuidelines.map(function (el) {
      if ("parentElement" in el) {
        return {
          element: el
        };
      }

      return el;
    }).forEach(function (value) {
      var element = value.element,
          leftValue = value.left,
          topValue = value.top,
          rightValue = value.right,
          bottomValue = value.bottom;
      var rect = element.getBoundingClientRect();
      var elementLeft = rect.left,
          elementTop = rect.top,
          elementRight = rect.right,
          elementBottom = rect.bottom,
          width = rect.width,
          height = rect.height;
      var sizes = [width, height]; //top

      if (topValue !== false) {
        guidelines.push({
          type: "vertical",
          element: element,
          pos: [elementLeft, elementTop],
          size: height,
          sizes: sizes
        });
      } // bottom


      if (bottomValue !== false) {
        guidelines.push({
          type: "vertical",
          element: element,
          pos: [elementRight, elementTop],
          size: height,
          sizes: sizes
        });
      } // left


      if (leftValue !== false) {
        guidelines.push({
          type: "horizontal",
          element: element,
          pos: [elementLeft, elementTop],
          size: width,
          sizes: sizes
        });
      } // right


      if (rightValue !== false) {
        guidelines.push({
          type: "horizontal",
          element: element,
          pos: [elementLeft, elementBottom],
          size: width,
          sizes: sizes
        });
      }

      if (snapCenter) {
        guidelines.push({
          type: "vertical",
          element: element,
          pos: [(elementLeft + elementRight) / 2, elementTop],
          size: height,
          sizes: sizes,
          center: true
        });
        guidelines.push({
          type: "horizontal",
          element: element,
          pos: [elementLeft, (elementTop + elementBottom) / 2],
          size: width,
          sizes: sizes,
          center: true
        });
      }
    });
    return guidelines;
  }

  function checkSnaps(rect, guidelines) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var verticalNames = ["left", "right"];
    var horizontalNames = ["top", "bottom"];
    verticalNames.push("center");
    horizontalNames.push("middle");
    verticalNames = verticalNames.filter(function (name) {
      return name in rect;
    });
    horizontalNames = horizontalNames.filter(function (name) {
      return name in rect;
    });
    var posesX = verticalNames.map(function (name) {
      return rect[name];
    });
    var posesY = horizontalNames.map(function (name) {
      return rect[name];
    });
    return {
      vertical: checkSnap(guidelines, "vertical", posesX, options),
      horizontal: checkSnap(guidelines, "horizontal", posesY, options)
    };
  }

  function checkSnap(guidelines, targetType, targetPoses) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref2$snapThreshold = _ref2.snapThreshold,
        snapThreshold = _ref2$snapThreshold === void 0 ? 5 : _ref2$snapThreshold;

    if (!guidelines || !guidelines.length) {
      return {
        isSnap: false,
        index: -1,
        posInfos: []
      };
    }

    var isVertical = targetType === "vertical";
    var posType = isVertical ? 0 : 1;
    var snapPosInfos = targetPoses.map(function (targetPos, index) {
      var guidelineInfos = guidelines.map(function (guideline) {
        var pos = guideline.pos;
        var offset = targetPos - pos[posType];
        return {
          offset: offset,
          dist: Math.abs(offset),
          guideline: guideline
        };
      }).filter(function (_ref3) {
        var guideline = _ref3.guideline,
            dist = _ref3.dist;
        var type = guideline.type;

        if (type !== targetType || dist > snapThreshold) {
          return false;
        }

        return true;
      }).sort(function (a, b) {
        return a.dist - b.dist;
      });
      return {
        pos: targetPos,
        index: index,
        guidelineInfos: guidelineInfos
      };
    }).filter(function (snapPosInfo) {
      return snapPosInfo.guidelineInfos.length > 0;
    }).sort(function (a, b) {
      return a.guidelineInfos[0].dist - b.guidelineInfos[0].dist;
    });
    var isSnap = snapPosInfos.length > 0;
    return {
      isSnap: isSnap,
      index: isSnap ? snapPosInfos[0].index : -1,
      posInfos: snapPosInfos
    };
  }

  function getSnapGuidelines(posInfos) {
    var guidelines = [];
    posInfos.forEach(function (posInfo) {
      posInfo.guidelineInfos.forEach(function (_ref4) {
        var guideline = _ref4.guideline;

        if (guidelines.indexOf(guideline) > -1) {
          return;
        }

        guidelines.push(guideline);
      });
    });
    return guidelines;
  }

  function getElementGuidelineDist(elementPos, elementSize, targetPos, targetSize) {
    // relativePos < 0  => element(l)  ---  (r)target
    // relativePos > 0  => target(l)   ---  (r)element
    var relativePos = elementPos - targetPos;
    var startPos = relativePos < 0 ? relativePos + elementSize : targetSize;
    var endPos = relativePos < 0 ? 0 : relativePos;
    var size = endPos - startPos;
    return {
      size: size,
      pos: startPos
    };
  }

  function groupByElementGuidelines(guidelines, clientPos, size, index) {
    var groupInfos = [];
    var group = groupBy(guidelines, function (_ref5) {
      var element = _ref5.element,
          pos = _ref5.pos;
      var elementPos = pos[index];
      var sign = Math.min(0, elementPos - clientPos) < 0 ? -1 : 1;
      var groupKey = "".concat(sign, "_").concat(pos[index ? 0 : 1]);
      var groupInfo = find(groupInfos, function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            groupElement = _ref7[0],
            groupPos = _ref7[1];

        return element === groupElement && elementPos === groupPos;
      });

      if (groupInfo) {
        return groupInfo[2];
      }

      groupInfos.push([element, elementPos, groupKey]);
      return groupKey;
    });
    group.forEach(function (elementGuidelines) {
      elementGuidelines.sort(function (a, b) {
        var result = getElementGuidelineDist(a.pos[index], a.size, clientPos, size).size - getElementGuidelineDist(b.pos[index], a.size, clientPos, size).size;
        return result || a.pos[index ? 0 : 1] - b.pos[index ? 0 : 1];
      });
    });
    return group;
  }

  function getNearestSnapGuidelineInfo(snapInfo) {
    var isSnap = snapInfo.isSnap;

    if (!isSnap) {
      return {
        isSnap: false,
        offset: 0,
        dist: -1,
        pos: 0,
        guideline: null
      };
    }

    var posInfo = snapInfo.posInfos[0];
    var guidelineInfo = posInfo.guidelineInfos[0];
    var offset = guidelineInfo.offset;
    var dist = guidelineInfo.dist;
    var guideline = guidelineInfo.guideline;
    return {
      isSnap: isSnap,
      offset: offset,
      dist: dist,
      pos: posInfo.pos,
      guideline: guideline
    };
  }

  function getRect(ghostInfo, distX, distY) {
    var rect = ghostInfo.ghost.getBoundingClientRect();
    var left = typeof distX !== "undefined" ? distX : ghostInfo.topLeft.x;
    var top = typeof distY !== "undefined" ? distY : ghostInfo.topLeft.y;
    return {
      left: left,
      top: top,
      right: left + rect.width,
      bottom: top + rect.height,
      width: rect.width,
      height: rect.height,
      middle: top + rect.height / 2,
      center: left + rect.width / 2
    };
  }

  var HORIZONTAL_NAMES = ["horizontal", "left", "top", "width"];
  var VERTICAL_NAMES = ["vertical", "top", "left", "height"];
  function snappable(draggableInfo, elementGuidelines) {
    var controlBox = null;
    var guidelines = [];

    function dragStart() {
      controlBox = document.createElement("div");
      document.body.appendChild(controlBox);
    }

    function dragEnd() {
      if (controlBox) {
        if (controlBox.parentNode) {
          controlBox.parentNode.removeChild(controlBox);
        }

        controlBox = null;
      }

      guidelines = [];
    }

    function renderGuidelines(guidelines, _ref8, index) {
      var _ref9 = _slicedToArray(_ref8, 4),
          directionName = _ref9[0],
          posName1 = _ref9[1],
          posName2 = _ref9[2],
          sizeName = _ref9[3];

      return guidelines.map(function (guideline, i) {
        var pos = guideline.pos,
            size = guideline.size;
        var div = document.createElement("div");
        addClass(div, "".concat(guidelineClass, " guideline bold ").concat(directionName));
        div.style[posName1] = "".concat(pos[index], "px");
        div.style[posName2] = "".concat(pos[index ? 0 : 1], "px");
        div.style[sizeName] = "".concat(size, "px");

        if (controlBox) {
          controlBox.appendChild(div);
        }
      });
    }

    function renderSnapPoses(snapPoses, _ref10, targetPos, size) {
      var _ref11 = _slicedToArray(_ref10, 4),
          directionName = _ref11[0],
          posName1 = _ref11[1],
          posName2 = _ref11[2],
          sizeName = _ref11[3];

      return snapPoses.map(function (_ref12) {
        var pos = _ref12.pos;
        var div = document.createElement("div");
        addClass(div, "".concat(guidelineClass, " bold snap-pose ").concat(directionName));
        div.style[posName1] = "".concat(targetPos, "px");
        div.style[posName2] = "".concat(pos, "px");
        div.style[sizeName] = "".concat(size, "px");

        if (controlBox) {
          controlBox.appendChild(div);
        }
      });
    }

    function renderSizeValue(group, _ref13, clientPos, clientSize, index) {
      var _ref14 = _slicedToArray(_ref13, 4),
          directionName = _ref14[0],
          posName1 = _ref14[1],
          posName2 = _ref14[2],
          sizeName = _ref14[3];

      group.forEach(function (elementGuidelines, i) {
        elementGuidelines.forEach(function (_ref15) {
          var pos = _ref15.pos,
              size = _ref15.size;

          var _getElementGuidelineD = getElementGuidelineDist(pos[index], size, clientPos, clientSize),
              linePos = _getElementGuidelineD.pos,
              lineSize = _getElementGuidelineD.size;

          var div = document.createElement("div");
          addClass(div, "".concat(guidelineClass, " dashed size-value ").concat(directionName));
          div.style[posName1] = "".concat(clientPos + linePos, "px");
          div.style[posName2] = "".concat(pos[index ? 0 : 1], "px");
          div.style[sizeName] = "".concat(lineSize, "px");

          if (controlBox) {
            controlBox.appendChild(div);
          }
        });
      });
    }

    function drag(ghostInfo) {
      guidelines = getElementGuidelines(elementGuidelines);
      guidelines = guidelines.filter(function (_ref16) {
        var element = _ref16.element;
        return element !== draggableInfo.element && element !== ghostInfo.ghost;
      });

      if (!guidelines.length) {
        return;
      }

      var snapInfos = [];
      var rect = getRect(ghostInfo);
      snapInfos.push(checkSnaps(rect, guidelines, {
        snapThreshold: 0
      }));
      var verticalSnapPoses = [];
      var horizontalSnapPoses = [];
      var verticalGuidelines = [];
      var horizontalGuidelines = [];
      snapInfos.forEach(function (snapInfo) {
        var verticalPosInfos = snapInfo.vertical.posInfos,
            horizontalPosInfos = snapInfo.horizontal.posInfos;
        verticalSnapPoses.push.apply(verticalSnapPoses, _toConsumableArray(verticalPosInfos.map(function (posInfo) {
          return {
            type: "snap",
            pos: posInfo.pos
          };
        })));
        horizontalSnapPoses.push.apply(horizontalSnapPoses, _toConsumableArray(horizontalPosInfos.map(function (posInfo) {
          return {
            type: "snap",
            pos: posInfo.pos
          };
        })));
        verticalGuidelines.push.apply(verticalGuidelines, _toConsumableArray(getSnapGuidelines(verticalPosInfos)));
        horizontalGuidelines.push.apply(horizontalGuidelines, _toConsumableArray(getSnapGuidelines(horizontalPosInfos)));
      });
      var elementHorizontalGroup = groupByElementGuidelines(horizontalGuidelines, rect.left, rect.width, 0);
      var elementVerticalGroup = groupByElementGuidelines(verticalGuidelines, rect.top, rect.height, 1); // TODO: reuse elements

      if (controlBox) {
        controlBox.innerHTML = "";
      }

      renderGuidelines(horizontalGuidelines, HORIZONTAL_NAMES, 0);
      renderGuidelines(verticalGuidelines, VERTICAL_NAMES, 1);
      renderSnapPoses(horizontalSnapPoses, HORIZONTAL_NAMES, rect.left, rect.width);
      renderSnapPoses(verticalSnapPoses, VERTICAL_NAMES, rect.top, rect.height);
      renderSizeValue(elementHorizontalGroup, HORIZONTAL_NAMES, rect.left, rect.width, 0);
      renderSizeValue(elementVerticalGroup, VERTICAL_NAMES, rect.top, rect.height, 1);
    }

    function checkSnapDrag(ghostInfo, distX, distY) {
      var rect = getRect(ghostInfo, distX, distY);

      var _checkSnaps = checkSnaps(rect, guidelines),
          horizontalSnapInfo = _checkSnaps.horizontal,
          verticalSnapInfo = _checkSnaps.vertical;

      var _getNearestSnapGuidel = getNearestSnapGuidelineInfo(verticalSnapInfo),
          isVerticalSnap = _getNearestSnapGuidel.isSnap,
          offsetX = _getNearestSnapGuidel.offset;

      var _getNearestSnapGuidel2 = getNearestSnapGuidelineInfo(horizontalSnapInfo),
          isHorizontalSnap = _getNearestSnapGuidel2.isSnap,
          offsetY = _getNearestSnapGuidel2.offset;

      return [{
        isSnap: isVerticalSnap,
        offset: offsetX
      }, {
        isSnap: isHorizontalSnap,
        offset: offsetY
      }];
    }

    return {
      dragStart: dragStart,
      drag: drag,
      dragEnd: dragEnd,
      checkSnapDrag: checkSnapDrag
    };
  }

  var grabEvents = ["mousedown", "touchstart"];
  var moveEvents = ["mousemove", "touchmove"];
  var releaseEvents = ["mouseup", "touchend"];
  var alignPointMaps = {
    lt: [-1, -1],
    lc: [-1, 0],
    lb: [-1, 1],
    ct: [0, -1],
    cc: [0, 0],
    cb: [0, 1],
    rt: [1, -1],
    rc: [1, 0],
    rb: [1, 1]
  };
  var dragListeningContainers = null;
  var grabbedElement = null;
  var ghostInfo = null;
  var snappableInfo = null;
  var draggableInfo = null;
  var containers = [];
  var _isDragging = false;
  var isCanceling = false;
  var dropAnimationStarted = false;
  var missedDrag = false;
  var handleDrag = null;
  var handleScroll = null;
  var sourceContainerLockAxis = null;
  var cursorStyleElement = null;
  var containerRectableWatcher = watchRectangles();
  var isMobile$1 = isMobile();

  function listenEvents() {
    if (typeof window !== "undefined") {
      addGrabListeners();
    }
  }

  function addGrabListeners() {
    grabEvents.forEach(function (e) {
      window.document.addEventListener(e, onMouseDown, {
        passive: false
      });
    });
  }

  function addMoveListeners() {
    moveEvents.forEach(function (e) {
      window.document.addEventListener(e, onMouseMove, {
        passive: false
      });
    });
  }

  function removeMoveListeners() {
    moveEvents.forEach(function (e) {
      window.document.removeEventListener(e, onMouseMove, {
        passive: false
      });
    });
  }

  function addReleaseListeners() {
    releaseEvents.forEach(function (e) {
      window.document.addEventListener(e, onMouseUp, {
        passive: false
      });
    });
  }

  function removeReleaseListeners() {
    releaseEvents.forEach(function (e) {
      window.document.removeEventListener(e, onMouseUp, {
        passive: false
      });
    });
  }

  function getGhostParent() {
    if (draggableInfo && draggableInfo.ghostParent) {
      return draggableInfo.ghostParent;
    }

    if (grabbedElement) {
      return grabbedElement.parentElement || window.document.body;
    } else {
      return window.document.body;
    }
  }

  function getGhostElement(wrapperElement, _ref, container, cursor) {
    var x = _ref.x,
        y = _ref.y;
    var options = container.getOptions();
    var wrapperRect = wrapperElement.getBoundingClientRect(); // 拖拽对象 Rect

    var left = wrapperRect.left,
        top = wrapperRect.top,
        right = wrapperRect.right,
        bottom = wrapperRect.bottom;
    var wrapperVisibleRect = getIntersection(container.layout.getContainerRectangles().visibleRect, wrapperRect);
    var midX = wrapperVisibleRect.left + (wrapperVisibleRect.right - wrapperVisibleRect.left) / 2;
    var midY = wrapperVisibleRect.top + (wrapperVisibleRect.bottom - wrapperVisibleRect.top) / 2;
    var ghost = wrapperElement.cloneNode(true);
    ghost.style.zIndex = "1000";
    ghost.style.boxSizing = "border-box";
    ghost.style.position = "fixed";
    ghost.style.top = "0px";
    ghost.style.left = "0px";
    ghost.style.transform = null;
    ghost.style.removeProperty("transform");

    if (container.shouldUseTransformForGhost()) {
      ghost.style.transform = "translate3d(".concat(left, "px, ").concat(top, "px, 0)");
    } else {
      ghost.style.top = "".concat(top, "px");
      ghost.style.left = "".concat(left, "px");
    }

    ghost.style.width = right - left + "px";
    ghost.style.height = bottom - top + "px";
    ghost.style.overflow = "visible";
    ghost.style.transition = null;
    ghost.style.removeProperty("transition");
    ghost.style.pointerEvents = "none";
    ghost.style.userSelect = "none";

    if (container.getOptions().dragClass) {
      setTimeout(function () {
        addClass(getFirstElementChild(ghost), container.getOptions().dragClass);
        var dragCursor = window.getComputedStyle(getFirstElementChild(ghost)).cursor;
        cursorStyleElement = addCursorStyleToBody(dragCursor);
      });
    } else {
      cursorStyleElement = addCursorStyleToBody(cursor);
    }

    addClass(ghost, container.getOptions().orientation || "vertical");
    addClass(ghost, ghostClass);
    var offsetX = 0,
        offsetY = 0;
    var centerDeltaX = 0,
        centerDeltaY = 0;

    var _container$getOptions = container.getOptions(),
        dragOnPoint = _container$getOptions.dragOnPoint;

    if (dragOnPoint) {
      var alignPointGroup = dragOnPoint === true ? alignPointMaps["cc"] : alignPointMaps[dragOnPoint];

      if (alignPointGroup[0] === 0) {
        offsetX = x - left - (wrapperVisibleRect.right - wrapperVisibleRect.left) / 2;
        centerDeltaX = midX - x + offsetX;
      } else if (alignPointGroup[0] < 0) {
        offsetX = x - left;
        centerDeltaX = left - x + offsetX;
      } else if (alignPointGroup[0] > 0) {
        offsetX = x - right;
        centerDeltaX = right - x + offsetX;
      }

      if (alignPointGroup[1] === 0) {
        offsetY = y - top - (wrapperVisibleRect.bottom - wrapperVisibleRect.top) / 2;
        centerDeltaY = midY - y + offsetY;
      } else if (alignPointGroup[1] < 0) {
        offsetY = y - top;
        centerDeltaY = top - y + offsetY;
      } else if (alignPointGroup[1] > 0) {
        offsetY = y - bottom;
        centerDeltaY = bottom - y + offsetY;
      }
    }

    return {
      ghost: ghost,
      centerDelta: {
        x: centerDeltaX,
        y: centerDeltaY
      },
      positionDelta: {
        left: left - x + offsetX,
        top: top - y + offsetY
      },
      topLeft: {
        x: left + offsetX,
        y: top + offsetY
      }
    };
  }

  function getDraggableInfo(draggableElement) {
    var container = containers.filter(function (p) {
      return draggableElement.parentElement === p.element;
    })[0];
    var draggableIndex = container.draggables.indexOf(draggableElement);
    var getGhostParent = container.getOptions().getGhostParent;
    return {
      container: container,
      element: draggableElement,
      size: {
        offsetHeight: 0,
        offsetWidth: 0
      },
      elementIndex: draggableIndex,
      payload: container.getOptions().getChildPayload ? container.getOptions().getChildPayload(draggableIndex) : undefined,
      targetElement: null,
      position: {
        x: 0,
        y: 0
      },
      ghostPosition: {
        x: 0,
        y: 0
      },
      groupName: container.getOptions().groupName,
      ghostParent: getGhostParent ? getGhostParent() : null,
      invalidateShadow: null,
      mousePosition: null,
      relevantContainers: null
    };
  }

  function handleDropAnimation(callback) {
    function endDrop() {
      removeClass(ghostInfo.ghost, "animated");
      ghostInfo.ghost.style.transitionDuration = null;
      getGhostParent().removeChild(ghostInfo.ghost);
      callback();
    }

    function animateGhostToPosition(_ref2, duration, dropClass) {
      var top = _ref2.top,
          left = _ref2.left;
      addClass(ghostInfo.ghost, "animated");

      if (dropClass) {
        addClass(getFirstElementChild(ghostInfo.ghost), dropClass);
      }

      ghostInfo.topLeft.x = left;
      ghostInfo.topLeft.y = top;
      translateGhost(duration);
      setTimeout(function () {
        endDrop();
      }, duration + 20);
    }

    function shouldAnimateDrop(options) {
      return options.shouldAnimateDrop ? options.shouldAnimateDrop(draggableInfo.container.getOptions(), draggableInfo.payload) : true;
    }

    function disappearAnimation(duration, clb) {
      addClass(ghostInfo.ghost, "animated");
      translateGhost(duration, 0.9, true); // ghostInfo.ghost.style.transitionDuration = duration + 'ms';
      // ghostInfo.ghost.style.opacity = '0';
      // ghostInfo.ghost.style.transform = 'scale(0.90)';

      setTimeout(function () {
        clb();
      }, duration + 20);
    }

    if (draggableInfo.targetElement) {
      var container = containers.filter(function (p) {
        return p.element === draggableInfo.targetElement;
      })[0];

      if (shouldAnimateDrop(container.getOptions())) {
        var dragResult = container.getDragResult();
        animateGhostToPosition(dragResult.shadowBeginEnd.rect, Math.max(150, container.getOptions().animationDuration / 2), container.getOptions().dropClass);
      } else {
        endDrop();
      }
    } else {
      var _container = containers.filter(function (p) {
        return p === draggableInfo.container;
      })[0];

      if (_container) {
        var _container$getOptions2 = _container.getOptions(),
            behaviour = _container$getOptions2.behaviour,
            removeOnDropOut = _container$getOptions2.removeOnDropOut;

        if ((behaviour === "move" || behaviour === "contain") && (isCanceling || !removeOnDropOut) && _container.getDragResult()) {
          var rectangles = _container.layout.getContainerRectangles(); // container is hidden somehow
          // move ghost back to last seen position


          if (!isVisible(rectangles.visibleRect) && isVisible(rectangles.lastVisibleRect)) {
            animateGhostToPosition({
              top: rectangles.lastVisibleRect.top,
              left: rectangles.lastVisibleRect.left
            }, _container.getOptions().animationDuration, _container.getOptions().dropClass);
          } else {
            var _ref3 = _container.getDragResult(),
                removedIndex = _ref3.removedIndex,
                elementSize = _ref3.elementSize;

            var layout = _container.layout; // drag ghost to back

            _container.getTranslateCalculator({
              dragResult: {
                removedIndex: removedIndex,
                addedIndex: removedIndex,
                elementSize: elementSize,
                pos: undefined,
                shadowBeginEnd: undefined
              }
            });

            var prevDraggableEnd = removedIndex > 0 ? layout.getBeginEnd(_container.draggables[removedIndex - 1]).end : layout.getBeginEndOfContainer().begin;
            animateGhostToPosition(layout.getTopLeftOfElementBegin(prevDraggableEnd), _container.getOptions().animationDuration, _container.getOptions().dropClass);
          }
        } else {
          disappearAnimation(_container.getOptions().animationDuration, endDrop);
        }
      } else {
        // container is disposed due to removal
        disappearAnimation(defaultOptions.animationDuration, endDrop);
      }
    }
  }

  var handleDragStartConditions = function handleDragStartConditions() {
    var startEvent;
    var delay;
    var clb;
    var timer = null;
    var moveThreshold = 1;
    var maxMoveInDelay = 5;

    function onMove(event) {
      var _getPointerEvent = getPointerEvent(event),
          currentX = _getPointerEvent.clientX,
          currentY = _getPointerEvent.clientY;

      if (!delay) {
        if (Math.abs(startEvent.clientX - currentX) > moveThreshold || Math.abs(startEvent.clientY - currentY) > moveThreshold) {
          return callCallback();
        }
      } else {
        if (Math.abs(startEvent.clientX - currentX) > maxMoveInDelay || Math.abs(startEvent.clientY - currentY) > maxMoveInDelay) {
          deregisterEvent();
        }
      }
    }

    function onUp() {
      deregisterEvent();
    }

    function onHTMLDrag() {
      deregisterEvent();
    }

    function registerEvents() {
      if (delay) {
        timer = setTimeout(callCallback, delay);
      }

      moveEvents.forEach(function (e) {
        return window.document.addEventListener(e, onMove);
      }, {
        passive: false
      });
      releaseEvents.forEach(function (e) {
        return window.document.addEventListener(e, onUp);
      }, {
        passive: false
      });
      window.document.addEventListener("drag", onHTMLDrag, {
        passive: false
      });
    }

    function deregisterEvent() {
      clearTimeout(timer);
      moveEvents.forEach(function (e) {
        return window.document.removeEventListener(e, onMove);
      }, {
        passive: false
      });
      releaseEvents.forEach(function (e) {
        return window.document.removeEventListener(e, onUp);
      }, {
        passive: false
      });
      window.document.removeEventListener("drag", onHTMLDrag, {
        passive: false
      });
    }

    function callCallback() {
      clearTimeout(timer);
      deregisterEvent();
      clb();
    }

    return function (_startEvent, _delay, _clb) {
      startEvent = getPointerEvent(_startEvent);
      delay = typeof _delay === "number" ? _delay : isMobile$1 ? 200 : 0;
      clb = _clb;
      registerEvents();
    };
  }();

  function onMouseDown(event) {
    var e = getPointerEvent(event);

    if (!_isDragging && (e.button === undefined || e.button === 0)) {
      grabbedElement = getParent(e.target, "." + wrapperClass);

      if (grabbedElement) {
        var containerElement = getParent(grabbedElement, "." + containerClass);
        var container = containers.filter(function (p) {
          return p.element === containerElement;
        })[0];
        var disabled = container.getOptions().disabled;
        var dragHandleSelector = container.getOptions().dragHandleSelector;
        var nonDragAreaSelector = container.getOptions().nonDragAreaSelector;
        var startDrag = true;

        if (disabled) {
          startDrag = false;
        }

        if (dragHandleSelector && !getParent(e.target, dragHandleSelector)) {
          startDrag = false;
        }

        if (nonDragAreaSelector && getParent(e.target, nonDragAreaSelector)) {
          startDrag = false;
        }

        if (startDrag) {
          container.layout.invalidate();
          addClass(window.document.body, disbaleTouchActions);
          addClass(window.document.body, noUserSelectClass);

          var _onMouseUp = function _onMouseUp() {
            removeClass(window.document.body, disbaleTouchActions);
            removeClass(window.document.body, noUserSelectClass);
            window.document.removeEventListener("mouseup", _onMouseUp);
          };

          window.document.addEventListener("mouseup", _onMouseUp);
        }

        if (startDrag) {
          handleDragStartConditions(e, container.getOptions().dragBeginDelay, function () {
            clearSelection();
            initiateDrag(e, getElementCursor(event.target));
            addMoveListeners();
            addReleaseListeners();
          });
        }
      }
    }
  }

  function handleMouseMoveForContainer(_ref4) {
    var clientX = _ref4.clientX,
        clientY = _ref4.clientY;
    var orientation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "vertical";
    var beginEnd = draggableInfo.container.layout.getBeginEndOfContainerVisibleRect();
    var mousePos;
    var axis;
    var leftTop;
    var size;

    if (orientation === "vertical") {
      mousePos = clientY;
      axis = "y";
      leftTop = "top";
      size = draggableInfo.size.offsetHeight;
    } else {
      mousePos = clientX;
      axis = "x";
      leftTop = "left";
      size = draggableInfo.size.offsetWidth;
    }

    var beginBoundary = beginEnd.begin;
    var endBoundary = beginEnd.end - size;
    var positionInBoundary = Math.max(beginBoundary, Math.min(endBoundary, mousePos + ghostInfo.positionDelta[leftTop]));
    ghostInfo.topLeft[axis] = positionInBoundary;
    draggableInfo.position[axis] = Math.max(beginEnd.begin, Math.min(beginEnd.end, mousePos + ghostInfo.centerDelta[axis]));
    draggableInfo.mousePosition[axis] = Math.max(beginEnd.begin, Math.min(beginEnd.end, mousePos));

    if (draggableInfo.position[axis] < beginEnd.begin + size / 2) {
      draggableInfo.position[axis] = beginEnd.begin + 2;
    }

    if (draggableInfo.position[axis] > beginEnd.end - size / 2) {
      draggableInfo.position[axis] = beginEnd.end - 2;
    }
  }

  function onMouseMove(event) {
    event.preventDefault();
    var e = getPointerEvent(event);

    if (!draggableInfo) {
      initiateDrag(e, getElementCursor(event.target));
    } else if (ghostInfo) {
      var clientX = e.clientX,
          clientY = e.clientY;

      if (snappableInfo) {
        var distX = clientX + ghostInfo.positionDelta.left;
        var distY = clientY + ghostInfo.positionDelta.top;

        var _snappableInfo$checkS = snappableInfo.checkSnapDrag(ghostInfo, distX, distY),
            _snappableInfo$checkS2 = _slicedToArray(_snappableInfo$checkS, 2),
            verticalInfo = _snappableInfo$checkS2[0],
            horizontalInfo = _snappableInfo$checkS2[1];

        var verticalOffset = verticalInfo.offset;
        var horizontalOffset = horizontalInfo.offset;
        clientX = distX - verticalOffset - ghostInfo.positionDelta.left;
        clientY = distY - horizontalOffset - ghostInfo.positionDelta.top;
      }

      var containerOptions = draggableInfo.container.getOptions();
      var isContainDrag = containerOptions.behaviour === "contain";

      if (isContainDrag) {
        handleMouseMoveForContainer({
          clientX: clientX,
          clientY: clientY
        }, containerOptions.orientation);
      } else if (sourceContainerLockAxis) {
        if (sourceContainerLockAxis === "y") {
          ghostInfo.topLeft.y = clientY + ghostInfo.positionDelta.top;
          draggableInfo.position.y = clientY + ghostInfo.centerDelta.y;
          draggableInfo.mousePosition.y = clientY;
        } else if (sourceContainerLockAxis === "x") {
          ghostInfo.topLeft.x = clientX + ghostInfo.positionDelta.left;
          draggableInfo.position.x = clientX + ghostInfo.centerDelta.x;
          draggableInfo.mousePosition.x = clientX;
        }
      } else {
        ghostInfo.topLeft.x = clientX + ghostInfo.positionDelta.left;
        ghostInfo.topLeft.y = clientY + ghostInfo.positionDelta.top;
        draggableInfo.position.x = clientX + ghostInfo.centerDelta.x;
        draggableInfo.position.y = clientY + ghostInfo.centerDelta.y;
        draggableInfo.mousePosition.x = clientX;
        draggableInfo.mousePosition.y = clientY;
        draggableInfo.ghostPosition.x = clientX + ghostInfo.positionDelta.left;
        draggableInfo.ghostPosition.y = clientY + ghostInfo.positionDelta.top;
      }

      translateGhost();

      if (!handleDrag(draggableInfo)) {
        missedDrag = true;
      } else {
        missedDrag = false;
      }

      if (missedDrag) {
        debouncedHandleMissedDragFrame();
      }
    }
  }

  var debouncedHandleMissedDragFrame = debounce(handleMissedDragFrame, 20, false);

  function handleMissedDragFrame() {
    if (missedDrag) {
      missedDrag = false;
      handleDragImmediate(draggableInfo, dragListeningContainers);
    }
  }

  function onMouseUp() {
    removeMoveListeners();
    removeReleaseListeners();
    handleScroll({
      reset: true
    });

    if (cursorStyleElement) {
      removeStyle(cursorStyleElement);
      cursorStyleElement = null;
    }

    if (snappableInfo) {
      snappableInfo.dragEnd();
      snappableInfo = null;
    }

    if (draggableInfo) {
      containerRectableWatcher.stop();
      handleMissedDragFrame();
      dropAnimationStarted = true;
      handleDropAnimation(function () {
        _isDragging = false; //

        fireOnDragStartEnd(false);
        var containers = dragListeningContainers || [];
        var containerToCallDrop = containers.shift();

        while (containerToCallDrop !== undefined) {
          containerToCallDrop.handleDrop(draggableInfo);
          containerToCallDrop = containers.shift();
        }

        dragListeningContainers = null;
        grabbedElement = null;
        ghostInfo = null;
        draggableInfo = null;
        sourceContainerLockAxis = null;
        handleDrag = null;
        dropAnimationStarted = false;
      });
    }
  }

  function getPointerEvent(e) {
    return e.touches ? e.touches[0] : e;
  }

  function handleDragImmediate(draggableInfo, dragListeningContainers) {
    var containerBoxChanged = false;
    dragListeningContainers.forEach(function (p) {
      var dragResult = p.handleDrag(draggableInfo);
      containerBoxChanged = !!dragResult.containerBoxChanged || false;
      dragResult.containerBoxChanged = false;
    });

    if (containerBoxChanged) {
      containerBoxChanged = false;
      requestAnimationFrame(function () {
        containers.forEach(function (p) {
          p.layout.invalidateRects();
          p.onTranslated();
        });
      });
    }
  }

  function handleSnappable() {
    if (snappableInfo) {
      snappableInfo.drag(ghostInfo);
    }
  }

  function dragHandler(dragListeningContainers) {
    var targetContainers = dragListeningContainers;
    var animationFrame = null;
    return function (draggableInfo) {
      if (animationFrame === null && _isDragging && !dropAnimationStarted) {
        animationFrame = requestAnimationFrame(function () {
          if (_isDragging && !dropAnimationStarted) {
            handleDragImmediate(draggableInfo, targetContainers);
            handleScroll({
              draggableInfo: draggableInfo
            });
            handleSnappable();
          }

          animationFrame = null;
        });
        return true;
      }

      return false;
    };
  }

  function getScrollHandler(container, dragListeningContainers) {
    if (container.getOptions().autoScrollEnabled) {
      return dragScroller(dragListeningContainers, container.getScrollMaxSpeed());
    } else {
      return function (props) {
        return null;
      };
    }
  }

  function fireOnDragStartEnd(isStart) {
    containers.forEach(function (p) {
      var fn = isStart ? p.getOptions().onDragStart : p.getOptions().onDragEnd;

      if (fn) {
        var options = {
          isSource: p === draggableInfo.container,
          payload: draggableInfo.payload
        };

        if (p.isDragRelevant(draggableInfo.container, draggableInfo.payload)) {
          options.willAcceptDrop = true;
        } else {
          options.willAcceptDrop = false;
        }

        fn(options);
      }
    });
  }

  function getSnappableInfo(draggableInfo) {
    var _draggableInfo$contai = draggableInfo.container.getOptions(),
        _draggableInfo$contai2 = _draggableInfo$contai.elementGuidelines,
        elementGuidelines = _draggableInfo$contai2 === void 0 ? [] : _draggableInfo$contai2;

    if (!elementGuidelines.length) {
      containers.forEach(function (p) {
        var containerOptions = p.getOptions();

        if (containerOptions.snappable && containerOptions.behaviour === "drop-zone") {
          p.draggables.forEach(function (d) {
            elementGuidelines.push(d);
          });
          elementGuidelines.push(p.element);
        }
      });
    }

    return snappable(draggableInfo, elementGuidelines);
  }

  function initiateDrag(position, cursor) {
    if (grabbedElement !== null) {
      _isDragging = true;
      var container = containers.filter(function (p) {
        return grabbedElement.parentElement === p.element;
      })[0];
      container.setDraggables();
      var options = container.getOptions();
      sourceContainerLockAxis = options.lockAxis ? options.lockAxis.toLowerCase() : null;
      draggableInfo = getDraggableInfo(grabbedElement);
      fireOnDragStartEnd(true); // delay
      // remove delay, sometimes cause errors
      // setTimeout(() => {

      initiateOnDragStart(position, cursor); // }, 0);
    }
  }

  function initiateOnDragStart(position, cursor) {
    if (grabbedElement !== null) {
      var container = containers.filter(function (p) {
        return grabbedElement.parentElement === p.element;
      })[0];
      var options = container.getOptions();
      ghostInfo = getGhostElement(grabbedElement, {
        x: position.clientX,
        y: position.clientY
      }, draggableInfo.container, cursor);
      var draggableRect = grabbedElement.getBoundingClientRect();
      draggableInfo.size = {
        offsetHeight: draggableRect.bottom - draggableRect.top,
        offsetWidth: draggableRect.right - draggableRect.left
      }, draggableInfo.position = {
        x: position.clientX + ghostInfo.centerDelta.x,
        y: position.clientY + ghostInfo.centerDelta.y
      };
      draggableInfo.mousePosition = {
        x: position.clientX,
        y: position.clientY
      };
      dragListeningContainers = containers.filter(function (p) {
        return p.isDragRelevant(container, draggableInfo.payload);
      });
      draggableInfo.relevantContainers = dragListeningContainers;
      handleDrag = dragHandler(dragListeningContainers);

      if (handleScroll) {
        handleScroll({
          reset: true,
          draggableInfo: undefined
        });
      }

      handleScroll = getScrollHandler(container, dragListeningContainers);
      dragListeningContainers.forEach(function (p) {
        return p.prepareDrag(p, dragListeningContainers);
      });
      handleDrag(draggableInfo);
      getGhostParent().appendChild(ghostInfo.ghost); // only usage in drop-zone

      if (options.snappable && options.behaviour === "drop-zone") {
        snappableInfo = getSnappableInfo(draggableInfo);
        snappableInfo.dragStart();
      }

      containerRectableWatcher.start();
    }
  }

  var ghostAnimationFrame = null;

  function translateGhost() {
    var translateDuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var fadeOut = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var _ghostInfo = ghostInfo,
        ghost = _ghostInfo.ghost,
        _ghostInfo$topLeft = _ghostInfo.topLeft,
        x = _ghostInfo$topLeft.x,
        y = _ghostInfo$topLeft.y;
    var useTransform = draggableInfo.container ? draggableInfo.container.shouldUseTransformForGhost() : true;
    var transformString = useTransform ? "translate3d(".concat(x, "px,").concat(y, "px, 0)") : null;

    if (scale !== 1) {
      transformString = transformString ? "".concat(transformString, " scale(").concat(scale, ")") : "scale(".concat(scale, ")");
    }

    if (translateDuration > 0) {
      ghostInfo.ghost.style.transitionDuration = translateDuration + "ms";
      requestAnimationFrame(function () {
        transformString && (ghost.style.transform = transformString);

        if (!useTransform) {
          ghost.style.left = x + "px";
          ghost.style.top = y + "px";
        }

        ghostAnimationFrame = null;

        if (fadeOut) {
          ghost.style.opacity = "0";
        }
      });
      return;
    }

    if (ghostAnimationFrame === null) {
      ghostAnimationFrame = requestAnimationFrame(function () {
        transformString && (ghost.style.transform = transformString);

        if (!useTransform) {
          ghost.style.left = x + "px";
          ghost.style.top = y + "px";
        }

        ghostAnimationFrame = null;

        if (fadeOut) {
          ghost.style.opacity = "0";
        }
      });
    }
  }

  function registerContainer(container) {
    containers.push(container);

    if (_isDragging && draggableInfo) {
      if (container.isDragRelevant(draggableInfo.container, draggableInfo.payload)) {
        dragListeningContainers.push(container);
        container.prepareDrag(container, dragListeningContainers);

        if (handleScroll) {
          handleScroll({
            reset: true,
            draggableInfo: undefined
          });
        }

        handleScroll = getScrollHandler(container, dragListeningContainers);
        handleDrag = dragHandler(dragListeningContainers);
        container.handleDrag(draggableInfo);
      }
    }
  }

  function unregisterContainer(container) {
    containers.splice(containers.indexOf(container), 1);

    if (_isDragging && draggableInfo) {
      if (draggableInfo.container === container) {
        container.fireRemoveElement();
      }

      if (draggableInfo.targetElement === container.element) {
        draggableInfo.targetElement = null;
      }

      var indexInDragListeners = dragListeningContainers.indexOf(container);

      if (indexInDragListeners > -1) {
        dragListeningContainers.splice(indexInDragListeners, 1);

        if (handleScroll) {
          handleScroll({
            reset: true,
            draggableInfo: undefined
          });
        }

        handleScroll = getScrollHandler(container, dragListeningContainers);
        handleDrag = dragHandler(dragListeningContainers);
      }
    }
  }

  function watchRectangles() {
    var animationHandle = null;
    var isStarted = false;

    function _start() {
      animationHandle = requestAnimationFrame(function () {
        dragListeningContainers.forEach(function (p) {
          return p.layout.invalidateRects();
        });
        setTimeout(function () {
          if (animationHandle !== null) _start();
        }, 50);
      });
    }

    function stop() {
      if (animationHandle !== null) {
        cancelAnimationFrame(animationHandle);
        animationHandle = null;
      }

      isStarted = false;
    }

    return {
      start: function start() {
        if (!isStarted) {
          isStarted = true;

          _start();
        }
      },
      stop: stop
    };
  }

  function cancelDrag() {
    if (_isDragging && !isCanceling && !dropAnimationStarted) {
      isCanceling = true;
      missedDrag = false;
      var outOfBoundsDraggableInfo = Object.assign({}, draggableInfo, {
        targetElement: null,
        position: {
          x: Number.MAX_SAFE_INTEGER,
          y: Number.MAX_SAFE_INTEGER
        },
        mousePosition: {
          x: Number.MAX_SAFE_INTEGER,
          y: Number.MAX_SAFE_INTEGER
        }
      });
      dragListeningContainers.forEach(function (container) {
        container.handleDrag(outOfBoundsDraggableInfo);
      });
      draggableInfo.targetElement = null;
      draggableInfo.cancelDrop = true;
      onMouseUp();
      isCanceling = false;
    }
  }

  function Mediator() {
    listenEvents();
    return {
      register: function register(container) {
        registerContainer(container);
      },
      unregister: function unregister(container) {
        unregisterContainer(container);
      },
      isDragging: function isDragging() {
        return _isDragging;
      },
      cancelDrag: cancelDrag
    };
  }

  if (typeof window !== "undefined") {
    addStyleToHead();
  }

  var Mediator$1 = Mediator();

  function setAnimation(element, add) {
    var animationDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions.animationDuration;

    if (add) {
      addClass(element, animationClass);
      element.style.transitionDuration = animationDuration + "ms";
    } else {
      removeClass(element, animationClass);
      element.style.removeProperty("transition-duration");
    }
  }

  function isDragRelevant(_ref) {
    var element = _ref.element,
        getOptions = _ref.getOptions;
    return function (sourceContainer, payload) {
      var options = getOptions();

      if (options.shouldAcceptDrop) {
        return options.shouldAcceptDrop(sourceContainer.getOptions(), payload);
      }

      var sourceOptions = sourceContainer.getOptions();
      if (options.behaviour === "copy") return false;
      var parentWrapper = getParent(element, "." + wrapperClass);

      if (parentWrapper === sourceContainer.element) {
        return false;
      }

      if (sourceContainer.element === element) return true;
      if (sourceOptions.groupName && sourceOptions.groupName === options.groupName) return true;
      return false;
    };
  }

  function wrapChild(child) {
    if (faiDnD.wrapChild) {
      var div = window.document.createElement("div");
      div.className = "".concat(wrapperClass);
      child.parentElement.insertBefore(div, child);
      div.appendChild(child);
      return div;
    }

    return child;
  }

  function wrapChildren(element) {
    var draggables = [];
    Array.prototype.forEach.call(element.children, function (child) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        var wrapper = child;

        if (!hasClass(child, wrapperClass)) {
          wrapper = wrapChild(child);
        }

        wrapper[translationValue] = 0;
        draggables.push(wrapper);
      } else {
        element.removeChild(child);
      }
    });
    return draggables;
  }

  function unwrapChildren(element) {
    if (faiDnD.wrapChild) {
      Array.prototype.forEach.call(element.children, function (child) {
        if (child.nodeType === Node.ELEMENT_NODE) {
          if (hasClass(child, wrapperClass)) {
            element.insertBefore(getFirstElementChild(child), child);
            element.removeChild(child);
          }
        }
      });
    }
  }

  function findDraggebleAtPos(_ref2) {
    var layout = _ref2.layout;

    var find = function find(draggables, pos, startIndex, endIndex) {
      var withRespectToMiddlePoints = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (endIndex < startIndex) {
        return startIndex;
      } // binary serach draggable


      if (startIndex === endIndex) {
        var _layout$getBeginEnd = layout.getBeginEnd(draggables[startIndex]),
            begin = _layout$getBeginEnd.begin,
            end = _layout$getBeginEnd.end; // mouse pos is inside draggable
        // now decide which index to return
        // if (pos > begin && pos <= end) {


        if (withRespectToMiddlePoints) {
          return pos < (end + begin) / 2 ? startIndex : startIndex + 1;
        } else {
          return startIndex;
        } // } else {
        //   return null;
        // }

      } else {
        var middleIndex = Math.floor((endIndex + startIndex) / 2);

        var _layout$getBeginEnd2 = layout.getBeginEnd(draggables[middleIndex]),
            _begin = _layout$getBeginEnd2.begin,
            _end = _layout$getBeginEnd2.end;

        if (pos < _begin) {
          return find(draggables, pos, startIndex, middleIndex - 1, withRespectToMiddlePoints);
        } else if (pos > _end) {
          return find(draggables, pos, middleIndex + 1, endIndex, withRespectToMiddlePoints);
        } else {
          if (withRespectToMiddlePoints) {
            return pos < (_end + _begin) / 2 ? middleIndex : middleIndex + 1;
          } else {
            return middleIndex;
          }
        }
      }
    };

    return function (draggables, pos) {
      var withRespectToMiddlePoints = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return find(draggables, pos, 0, draggables.length - 1, withRespectToMiddlePoints);
    };
  }

  function resetDraggables(_ref3) {
    var element = _ref3.element,
        draggables = _ref3.draggables,
        layout = _ref3.layout;
    return function () {
      draggables.forEach(function (p) {
        setAnimation(p, false);
        layout.setTranslation(p, 0);
        layout.setVisibility(p, true);
      });

      if (element[stretcherElementInstance]) {
        element[stretcherElementInstance].parentNode.removeChild(element[stretcherElementInstance]);
        element[stretcherElementInstance] = null;
      }
    };
  }

  function setTargetContainer(draggableInfo, element) {
    var set = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (element && set) {
      draggableInfo.targetElement = element;
    } else {
      if (draggableInfo.targetElement === element) {
        draggableInfo.targetElement = null;
      }
    }
  }

  function handleDrop(_ref4) {
    var element = _ref4.element,
        draggables = _ref4.draggables,
        layout = _ref4.layout,
        getOptions = _ref4.getOptions;
    var draggablesReset = resetDraggables({
      element: element,
      draggables: draggables,
      layout: layout,
      getOptions: getOptions
    });
    var dropHandler = (faiDnD.dropHandler || domDropHandler)({
      element: element,
      draggables: draggables,
      layout: layout,
      getOptions: getOptions
    });
    return function (draggableInfo, _ref5) {
      var addedIndex = _ref5.addedIndex,
          removedIndex = _ref5.removedIndex;
      var forDispose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      draggablesReset(); // if drop zone is valid => complete drag else do nothing everything will be reverted by draggablesReset()

      if (!draggableInfo.cancelDrop) {
        if (draggableInfo.targetElement || getOptions().removeOnDropOut || forDispose) {
          var actualAddIndex = addedIndex !== null ? removedIndex !== null && removedIndex < addedIndex ? addedIndex - 1 : addedIndex : null; // position

          var rectangles = layout.getContainerRectangles();
          var position = getOptions().behaviour === "drop-zone" ? actualAddIndex !== null ? {
            x: draggableInfo.ghostPosition.x - rectangles.rect.left,
            y: draggableInfo.ghostPosition.y - rectangles.rect.top
          } : null : null;
          var dropHandlerParams = {
            removedIndex: removedIndex,
            addedIndex: actualAddIndex,
            payload: draggableInfo.payload,
            position: position
          };
          dropHandler(dropHandlerParams, getOptions().onDrop);
        }
      }
    };
  }

  function getContainerProps(element, getOptions) {
    var draggables = wrapChildren(element);
    var options = getOptions(); // set flex classes before layout is inited for scroll listener

    addClass(element, "".concat(containerClass, " ").concat(options.orientation));
    var layout = layoutManager(element, options.orientation, options.animationDuration);
    return {
      element: element,
      draggables: draggables,
      getOptions: getOptions,
      layout: layout
    };
  }

  function getRemovedItem(_ref6) {
    var element = _ref6.element,
        getOptions = _ref6.getOptions;
    var prevRemovedIndex = null;
    return function (_ref7) {
      var draggableInfo = _ref7.draggableInfo;
      var removedIndex = prevRemovedIndex;

      if (prevRemovedIndex == null && draggableInfo.container.element === element && getOptions().behaviour !== "copy") {
        removedIndex = prevRemovedIndex = draggableInfo.elementIndex;
      }

      return {
        removedIndex: removedIndex
      };
    };
  }

  function setRemovedItemVisibilty(_ref8) {
    var draggables = _ref8.draggables,
        layout = _ref8.layout;
    return function (_ref9) {
      var dragResult = _ref9.dragResult;

      if (dragResult.removedIndex !== null) {
        layout.setVisibility(draggables[dragResult.removedIndex], false);
      }
    };
  }

  function getPosition(_ref10) {
    var element = _ref10.element,
        layout = _ref10.layout;
    return function (_ref11) {
      var draggableInfo = _ref11.draggableInfo;
      var hitElement = document.elementFromPoint(draggableInfo.position.x, draggableInfo.position.y);
      var elements = [];

      while (hitElement && hasClass(hitElement, guidelineClass)) {
        elements.push({
          hitElement: hitElement,
          display: hitElement.style.display
        });
        hitElement.style.display = "none";
        hitElement = document.elementFromPoint(draggableInfo.position.x, draggableInfo.position.y);
      }

      elements.forEach(function (_ref12) {
        var hitElement = _ref12.hitElement,
            display = _ref12.display;
        hitElement.style.display = display;
      }); // TODO: if center is out of bounds use mouse position for hittest
      // if (!hitElement) {
      //   hitElement = document.elementFromPoint(draggableInfo.mousePosition.x, draggableInfo.mousePosition.y);
      // }

      if (hitElement) {
        var container = getParentRelevantContainerElement(hitElement, draggableInfo.relevantContainers);

        if (container && container.element === element) {
          return {
            pos: layout.getPosition(draggableInfo.position)
          };
        }
      }

      return {
        pos: null
      };
    };
  }

  function getElementSize(_ref13) {
    var layout = _ref13.layout;
    var elementSize = null;
    return function (_ref14) {
      var draggableInfo = _ref14.draggableInfo,
          dragResult = _ref14.dragResult;

      if (dragResult.pos === null) {
        return elementSize = null;
      } else {
        elementSize = elementSize || layout.getSize(draggableInfo.size);
      }

      return {
        elementSize: elementSize
      };
    };
  }

  function handleTargetContainer(_ref15) {
    var element = _ref15.element;
    return function (_ref16) {
      var draggableInfo = _ref16.draggableInfo,
          dragResult = _ref16.dragResult;
      setTargetContainer(draggableInfo, element, !!dragResult.pos);
    };
  }

  function getDragInsertionIndex(_ref17) {
    var draggables = _ref17.draggables,
        layout = _ref17.layout;
    var findDraggable = findDraggebleAtPos({
      layout: layout
    });
    return function (_ref18) {
      var _ref18$dragResult = _ref18.dragResult,
          shadowBeginEnd = _ref18$dragResult.shadowBeginEnd,
          pos = _ref18$dragResult.pos;

      if (!shadowBeginEnd) {
        var index = findDraggable(draggables, pos, true);
        return index !== null ? index : draggables.length;
      } else {
        if (shadowBeginEnd.begin + shadowBeginEnd.beginAdjustment <= pos && shadowBeginEnd.end >= pos) {
          // position inside ghost
          return null;
        }
      }

      if (pos < shadowBeginEnd.begin + shadowBeginEnd.beginAdjustment) {
        return findDraggable(draggables, pos);
      } else if (pos > shadowBeginEnd.end) {
        return findDraggable(draggables, pos) + 1;
      } else {
        return draggables.length;
      }
    };
  }

  function getDragInsertionIndexForDropZone() {
    return function (_ref19) {
      var pos = _ref19.dragResult.pos;
      return pos !== null ? {
        addedIndex: 0
      } : {
        addedIndex: null
      };
    };
  }

  function getShadowBeginEndForDropZone(_ref20) {
    var layout = _ref20.layout;
    var prevAddedIndex = null;
    return function (_ref21) {
      var addedIndex = _ref21.dragResult.addedIndex;

      if (addedIndex !== prevAddedIndex) {
        prevAddedIndex = addedIndex;

        var _layout$getBeginEndOf = layout.getBeginEndOfContainer(),
            begin = _layout$getBeginEndOf.begin,
            end = _layout$getBeginEndOf.end;

        return {
          shadowBeginEnd: {
            rect: layout.getTopLeftOfElementBegin(begin)
          }
        };
      }

      return null;
    };
  }

  function drawDropPlaceholder(_ref22) {
    var layout = _ref22.layout,
        element = _ref22.element,
        getOptions = _ref22.getOptions;
    var prevAddedIndex = null;
    return function (_ref23) {
      var _ref23$dragResult = _ref23.dragResult,
          elementSize = _ref23$dragResult.elementSize,
          shadowBeginEnd = _ref23$dragResult.shadowBeginEnd,
          addedIndex = _ref23$dragResult.addedIndex,
          dropPlaceholderContainer = _ref23$dragResult.dropPlaceholderContainer;
      var options = getOptions();

      if (options.dropPlaceholder) {
        var _ref24 = typeof options.dropPlaceholder === "boolean" ? {} : options.dropPlaceholder,
            animationDuration = _ref24.animationDuration,
            className = _ref24.className,
            showOnTop = _ref24.showOnTop;

        if (addedIndex !== null) {
          if (!dropPlaceholderContainer) {
            var innerElement = document.createElement("div");
            var flex = document.createElement("div");
            flex.className = dropPlaceholderFlexContainerClass;
            innerElement.className = "".concat(dropPlaceholderInnerClass, " ").concat(className || dropPlaceholderDefaultClass);
            dropPlaceholderContainer = document.createElement("div");
            dropPlaceholderContainer.className = "".concat(dropPlaceholderWrapperClass);
            dropPlaceholderContainer.style.position = "absolute";

            if (animationDuration !== undefined) {
              dropPlaceholderContainer.style.transition = "all ".concat(animationDuration, "ms ease");
            }

            dropPlaceholderContainer.appendChild(flex);
            flex.appendChild(innerElement);
            layout.setSize(dropPlaceholderContainer.style, elementSize + "px");
            dropPlaceholderContainer.style.pointerEvents = "none";

            if (showOnTop) {
              element.appendChild(dropPlaceholderContainer);
            } else {
              element.insertBefore(dropPlaceholderContainer, getFirstElementChild(element));
            }
          }

          if (prevAddedIndex !== addedIndex && shadowBeginEnd.dropArea) {
            layout.setBegin(dropPlaceholderContainer.style, shadowBeginEnd.dropArea.begin - layout.getBeginEndOfContainer().begin + "px");
          }

          prevAddedIndex = addedIndex;
          return {
            dropPlaceholderContainer: dropPlaceholderContainer
          };
        } else {
          if (dropPlaceholderContainer && prevAddedIndex !== null) {
            element.removeChild(dropPlaceholderContainer);
          }

          prevAddedIndex = null;
          return {
            dropPlaceholderContainer: undefined
          };
        }
      }

      return null;
    };
  }

  function invalidateShadowBeginEndIfNeeded(params) {
    var shadowBoundsGetter = getShadowBeginEnd(params);
    return function (_ref25) {
      var draggableInfo = _ref25.draggableInfo,
          dragResult = _ref25.dragResult;

      if (draggableInfo.invalidateShadow) {
        return shadowBoundsGetter({
          draggableInfo: draggableInfo,
          dragResult: dragResult
        });
      }

      return null;
    };
  }

  function getNextAddedIndex(params) {
    var getIndexForPos = getDragInsertionIndex(params);
    return function (_ref26) {
      var dragResult = _ref26.dragResult;
      var index = null;

      if (dragResult.pos !== null) {
        index = getIndexForPos({
          dragResult: dragResult
        });

        if (index === null) {
          index = dragResult.addedIndex;
        }
      }

      return {
        addedIndex: index
      };
    };
  }

  function resetShadowAdjustment() {
    var lastAddedIndex = null;
    return function (_ref27) {
      var _ref27$dragResult = _ref27.dragResult,
          addedIndex = _ref27$dragResult.addedIndex,
          shadowBeginEnd = _ref27$dragResult.shadowBeginEnd;

      if (addedIndex !== lastAddedIndex && lastAddedIndex !== null && shadowBeginEnd) {
        shadowBeginEnd.beginAdjustment = 0;
      }

      lastAddedIndex = addedIndex;
    };
  }

  function handleInsertionSizeChange(_ref28) {
    var element = _ref28.element,
        draggables = _ref28.draggables,
        layout = _ref28.layout,
        getOptions = _ref28.getOptions;
    var strectherElement = null;
    return function (_ref29) {
      var _ref29$dragResult = _ref29.dragResult,
          addedIndex = _ref29$dragResult.addedIndex,
          removedIndex = _ref29$dragResult.removedIndex,
          elementSize = _ref29$dragResult.elementSize;

      if (removedIndex === null) {
        if (addedIndex !== null) {
          if (!strectherElement) {
            var containerBeginEnd = layout.getBeginEndOfContainer();
            containerBeginEnd.end = containerBeginEnd.begin + layout.getSize(element);
            var hasScrollBar = layout.getScrollSize(element) > layout.getSize(element);
            var containerEnd = hasScrollBar ? containerBeginEnd.begin + layout.getScrollSize(element) - layout.getScrollValue(element) : containerBeginEnd.end;
            var lastDraggableEnd = draggables.length > 0 ? layout.getBeginEnd(draggables[draggables.length - 1]).end - draggables[draggables.length - 1][translationValue] : containerBeginEnd.begin;

            if (lastDraggableEnd + elementSize > containerEnd) {
              strectherElement = window.document.createElement("div");
              strectherElement.className = stretcherElementClass + " " + getOptions().orientation;
              var stretcherSize = draggables.length > 0 ? elementSize + lastDraggableEnd - containerEnd : elementSize;
              layout.setSize(strectherElement.style, "".concat(stretcherSize, "px"));
              element.appendChild(strectherElement);
              element[stretcherElementInstance] = strectherElement;
              return {
                containerBoxChanged: true
              };
            }
          }
        } else {
          if (strectherElement) {
            layout.setTranslation(strectherElement, 0);
            var toRemove = strectherElement;
            strectherElement = null;
            element.removeChild(toRemove);
            element[stretcherElementInstance] = null;
            return {
              containerBoxChanged: true
            };
          }
        }
      }

      return undefined;
    };
  }

  function calculateTranslations(_ref30) {
    var draggables = _ref30.draggables,
        layout = _ref30.layout;
    var prevAddedIndex = null;
    var prevRemovedIndex = null;
    return function (_ref31) {
      var _ref31$dragResult = _ref31.dragResult,
          addedIndex = _ref31$dragResult.addedIndex,
          removedIndex = _ref31$dragResult.removedIndex,
          elementSize = _ref31$dragResult.elementSize;

      if (addedIndex !== prevAddedIndex || removedIndex !== prevRemovedIndex) {
        for (var index = 0; index < draggables.length; index++) {
          if (index !== removedIndex) {
            var draggable = draggables[index];
            var translate = 0;

            if (removedIndex !== null && removedIndex < index) {
              translate -= elementSize;
            }

            if (addedIndex !== null && addedIndex <= index) {
              translate += elementSize;
            }

            layout.setTranslation(draggable, translate);
          }
        }

        prevAddedIndex = addedIndex;
        prevRemovedIndex = removedIndex;
        return {
          addedIndex: addedIndex,
          removedIndex: removedIndex
        };
      }

      return undefined;
    };
  }

  function getShadowBeginEnd(_ref32) {
    var draggables = _ref32.draggables,
        layout = _ref32.layout;
    var prevAddedIndex = null;
    return function (_ref33) {
      var draggableInfo = _ref33.draggableInfo,
          dragResult = _ref33.dragResult;
      var addedIndex = dragResult.addedIndex,
          removedIndex = dragResult.removedIndex,
          elementSize = dragResult.elementSize,
          pos = dragResult.pos,
          shadowBeginEnd = dragResult.shadowBeginEnd;

      if (pos !== null) {
        if (addedIndex !== null && (draggableInfo.invalidateShadow || addedIndex !== prevAddedIndex)) {
          // if (prevAddedIndex) prevAddedIndex = addedIndex;
          var beforeIndex = addedIndex - 1;
          var begin = Number.MIN_SAFE_INTEGER;
          var dropAreaBegin = 0;
          var dropAreaEnd = 0;
          var afterBounds = null;
          var beforeBounds = null;

          if (beforeIndex === removedIndex) {
            beforeIndex--;
          }

          if (beforeIndex > -1) {
            var beforeSize = layout.getSize(draggables[beforeIndex]);
            beforeBounds = layout.getBeginEnd(draggables[beforeIndex]);

            if (elementSize < beforeSize) {
              var threshold = (beforeSize - elementSize) / 2;
              begin = beforeBounds.end - threshold;
            } else {
              begin = beforeBounds.end;
            }

            dropAreaBegin = beforeBounds.end;
          } else {
            beforeBounds = {
              end: layout.getBeginEndOfContainer().begin
            };
            dropAreaBegin = layout.getBeginEndOfContainer().begin;
          }

          var end = Number.MAX_SAFE_INTEGER;
          var afterIndex = addedIndex;

          if (afterIndex === removedIndex) {
            afterIndex++;
          }

          if (afterIndex < draggables.length) {
            var afterSize = layout.getSize(draggables[afterIndex]);
            afterBounds = layout.getBeginEnd(draggables[afterIndex]);

            if (elementSize < afterSize) {
              var _threshold = (afterSize - elementSize) / 2;

              end = afterBounds.begin + _threshold;
            } else {
              end = afterBounds.begin;
            }

            dropAreaEnd = afterBounds.begin;
          } else {
            afterBounds = {
              begin: layout.getContainerRectangles().rect.end
            };
            dropAreaEnd = layout.getContainerRectangles().rect.end - layout.getContainerRectangles().rect.begin;
          }

          var shadowRectTopLeft = beforeBounds && afterBounds ? layout.getTopLeftOfElementBegin(beforeBounds.end) : null;
          prevAddedIndex = addedIndex;
          return {
            shadowBeginEnd: {
              dropArea: {
                begin: dropAreaBegin,
                end: dropAreaEnd
              },
              begin: begin,
              end: end,
              rect: shadowRectTopLeft,
              beginAdjustment: shadowBeginEnd ? shadowBeginEnd.beginAdjustment : 0
            }
          };
        } else {
          return null;
        }
      } else {
        prevAddedIndex = null;
        return {
          shadowBeginEnd: null
        };
      }
    };
  }

  function handleFirstInsertShadowAdjustment() {
    var lastAddedIndex = null;
    return function (_ref34) {
      var _ref34$dragResult = _ref34.dragResult,
          pos = _ref34$dragResult.pos,
          addedIndex = _ref34$dragResult.addedIndex,
          shadowBeginEnd = _ref34$dragResult.shadowBeginEnd;

      if (pos !== null) {
        if (addedIndex != null && lastAddedIndex === null) {
          if (pos < shadowBeginEnd.begin) {
            var beginAdjustment = pos - shadowBeginEnd.begin - 5;
            shadowBeginEnd.beginAdjustment = beginAdjustment;
          }

          lastAddedIndex = addedIndex;
        }
      } else {
        lastAddedIndex = null;
      }
    };
  }

  function fireDragEnterLeaveEvents(_ref35) {
    var getOptions = _ref35.getOptions;
    var wasDragIn = false;
    var options = getOptions();
    return function (_ref36) {
      var pos = _ref36.dragResult.pos;
      var isDragIn = !!pos;

      if (isDragIn !== wasDragIn) {
        wasDragIn = isDragIn;

        if (isDragIn) {
          options.onDragEnter && options.onDragEnter();
        } else {
          options.onDragLeave && options.onDragLeave();
        }
      }

      return undefined;
    };
  }

  function fireOnDropReady(_ref37) {
    var getOptions = _ref37.getOptions;
    var lastAddedIndex = null;
    var options = getOptions();
    return function (_ref38) {
      var _ref38$dragResult = _ref38.dragResult,
          addedIndex = _ref38$dragResult.addedIndex,
          removedIndex = _ref38$dragResult.removedIndex,
          _ref38$draggableInfo = _ref38.draggableInfo,
          payload = _ref38$draggableInfo.payload,
          element = _ref38$draggableInfo.element;

      if (options.onDropReady && addedIndex !== null && lastAddedIndex !== addedIndex) {
        lastAddedIndex = addedIndex;
        var adjustedAddedIndex = addedIndex;

        if (removedIndex !== null && addedIndex > removedIndex) {
          adjustedAddedIndex--;
        }

        options.onDropReady({
          addedIndex: adjustedAddedIndex,
          removedIndex: removedIndex,
          payload: payload,
          element: element ? getFirstElementChild(element) : undefined
        });
      }
    };
  }

  function getDragHandler(params) {
    if (params.getOptions().behaviour === "drop-zone") {
      // sorting is disabled in container, addedIndex will always be 0 if dropped in
      return compose(params)(getRemovedItem, setRemovedItemVisibilty, getPosition, getElementSize, handleTargetContainer, getDragInsertionIndexForDropZone, getShadowBeginEndForDropZone, fireDragEnterLeaveEvents, fireOnDropReady);
    } else {
      return compose(params)(getRemovedItem, setRemovedItemVisibilty, getPosition, getElementSize, handleTargetContainer, invalidateShadowBeginEndIfNeeded, getNextAddedIndex, resetShadowAdjustment, handleInsertionSizeChange, calculateTranslations, getShadowBeginEnd, drawDropPlaceholder, handleFirstInsertShadowAdjustment, fireDragEnterLeaveEvents, fireOnDropReady);
    }
  }

  function getDefaultDragResult() {
    return {
      addedIndex: null,
      removedIndex: null,
      elementSize: null,
      pos: null,
      shadowBeginEnd: null
    };
  }

  function compose(params) {
    return function () {
      for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
        functions[_key] = arguments[_key];
      }

      var hydratedFunctions = functions.map(function (p) {
        return p(params);
      });
      var result = null;
      return function (draggableInfo) {
        result = hydratedFunctions.reduce(function (dragResult, fn) {
          return Object.assign(dragResult, fn({
            draggableInfo: draggableInfo,
            dragResult: dragResult
          }));
        }, result || getDefaultDragResult());
        return result;
      };
    };
  } // Container definition begin


  function Container(element) {
    return function (options) {
      var containerOptions = Object.assign({}, defaultOptions, options);
      var dragResult = null;
      var lastDraggableInfo = null;
      var props = getContainerProps(element, getOptions);
      var dragHandler = getDragHandler(props);
      var dropHandler = handleDrop(props);
      var scrollListener = listenScrollParent(element, onScroll);

      function processLastDraggableInfo() {
        if (lastDraggableInfo !== null) {
          lastDraggableInfo.invalidateShadow = true;
          dragResult = dragHandler(lastDraggableInfo);
          lastDraggableInfo.invalidateShadow = false;
        }
      }

      function _setDraggables(draggables, element) {
        var newDraggables = wrapChildren(element);

        for (var i = 0; i < newDraggables.length; i++) {
          draggables[i] = newDraggables[i];
        }

        for (var _i = 0; _i < draggables.length - newDraggables.length; _i++) {
          draggables.pop();
        }
      }

      function prepareDrag(container, relevantContainers) {
        var element = container.element;
        var draggables = props.draggables;

        _setDraggables(draggables, element);

        container.layout.invalidateRects();
        draggables.forEach(function (p) {
          return setAnimation(p, true, getOptions().animationDuration);
        });
        scrollListener.start();
      }

      function onScroll() {
        props.layout.invalidateRects();
        processLastDraggableInfo();
      }

      function dispose(container) {
        scrollListener.dispose();
        unwrapChildren(container.element);
      }

      function setOptions(options) {
        var merge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (merge === false) {
          containerOptions = Object.assign({}, defaultOptions, options);
        } else {
          containerOptions = Object.assign({}, defaultOptions, containerOptions, options);
        }
      }

      function getOptions() {
        return containerOptions;
      }

      var container = {
        element: element,
        draggables: props.draggables,
        isDragRelevant: isDragRelevant(props),
        layout: props.layout,
        dispose: dispose,
        prepareDrag: prepareDrag,
        handleDrag: function handleDrag(draggableInfo) {
          lastDraggableInfo = draggableInfo;
          dragResult = dragHandler(draggableInfo);
          return dragResult;
        },
        handleDrop: function handleDrop(draggableInfo) {
          scrollListener.stop();

          if (dragResult && dragResult.dropPlaceholderContainer) {
            element.removeChild(dragResult.dropPlaceholderContainer);
          }

          lastDraggableInfo = null; // TODO: sometimes dragResult was null, but i don't know why

          if (!dragResult) {
            dragResult = dragHandler(draggableInfo);
          }

          dragHandler = getDragHandler(props);
          dropHandler(draggableInfo, dragResult);
          dragResult = null;
        },
        fireRemoveElement: function fireRemoveElement() {
          // will be called when container is disposed while dragging so ignore addedIndex
          dropHandler(lastDraggableInfo, Object.assign({}, dragResult, {
            addedIndex: null
          }), true);
          dragResult = null;
        },
        getDragResult: function getDragResult() {
          return dragResult;
        },
        getTranslateCalculator: function getTranslateCalculator(dragresult) {
          return calculateTranslations(props)(dragresult);
        },
        onTranslated: function onTranslated() {
          processLastDraggableInfo();
        },
        setDraggables: function setDraggables() {
          _setDraggables(props.draggables, element);
        },
        getScrollMaxSpeed: function getScrollMaxSpeed() {
          return faiDnD.maxScrollSpeed;
        },
        shouldUseTransformForGhost: function shouldUseTransformForGhost() {
          return faiDnD.useTransformForGhost === true;
        },
        getOptions: getOptions,
        setOptions: setOptions
      };
      return container;
    };
  } // exported part of container


  var faiDnD = function faiDnD(element, options) {
    var containerIniter = Container(element);
    var container = containerIniter(options);
    element[containerInstance] = container;
    Mediator$1.register(container);
    return {
      dispose: function dispose() {
        Mediator$1.unregister(container);
        container.dispose(container);
      },
      setOptions: function setOptions(options, merge) {
        container.setOptions(options, merge);
      }
    };
  }; // wrap all draggables by default
  // in react,vue,angular this value will be set to false


  faiDnD.wrapChild = true;

  faiDnD.cancelDrag = function () {
    Mediator$1.cancelDrag();
  };

  faiDnD.isDragging = function () {
    return Mediator$1.isDragging();
  };

  exports.faiDnD = faiDnD;
  exports.constants = constants;
  exports.dropHandlers = dropHandlers;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
