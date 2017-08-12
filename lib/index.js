'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash');

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _activeEventStack = require('active-event-stack');

var _activeEventStack2 = _interopRequireDefault(_activeEventStack);

var PopoverActionsType = _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
  title: _propTypes2['default'].string.isRequired,
  func: _propTypes2['default'].func
}));

var PopoverControl = (function (_React$Component) {
  _inherits(PopoverControl, _React$Component);

  function PopoverControl() {
    var _this = this;

    _classCallCheck(this, PopoverControl);

    _get(Object.getPrototypeOf(PopoverControl.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      isPopped: false
    };

    this.getPopoverReferenceFrame = function () {
      var node = _reactDom2['default'].findDOMNode(_this.refs.self);
      return node.getBoundingClientRect();
    };

    this.shouldHidePopover = function () {
      return _this.setState({ isPopped: false });
    };

    this.handleDocumentClick = function (event) {
      var target = event.target;

      var node = _reactDom2['default'].findDOMNode(_this);
      if (target == node || node.contains(target)) {
        return;
      } else {
        _this.shouldHidePopover();
      }
    };

    this.onClick = function () {
      _this.updateChildFrameInfo();
      _this.setState({ isPopped: !_this.state.isPopped });
    };

    this.updateChildFrameInfo = function () {
      var _ReactDOM$findDOMNode$getBoundingClientRect = _reactDom2['default'].findDOMNode(_this).getBoundingClientRect();

      var top = _ReactDOM$findDOMNode$getBoundingClientRect.top;
      var left = _ReactDOM$findDOMNode$getBoundingClientRect.left;
      var width = _ReactDOM$findDOMNode$getBoundingClientRect.width;
      var height = _ReactDOM$findDOMNode$getBoundingClientRect.height;

      _this.setState({ top: top, left: left, width: width, height: height });
    };

    this.componentDidMount = function () {
      _this._debouncedScroll = (0, _lodash.debounce)(function () {
        if (_this.state.isPopped) {
          _this.updateChildFrameInfo();
        }
      }, 100);

      document.addEventListener('scroll', _this._debouncedScroll, true);
      window.addEventListener('resize', _this._debouncedScroll);
    };

    this.componentWillUnmount = function () {
      document.removeEventListener('scroll', _this._debouncedScroll, true);
      window.removeEventListener('resize', _this._debouncedScroll);
    };

    this.render = function () {
      var _state = _this.state;
      var top = _state.top;
      var left = _state.left;
      var width = _state.width;
      var height = _state.height;

      var popoverControlStyle = {
        position: 'relative'
      };

      return _react2['default'].createElement(
        'div',
        { className: _this.props.className,
          style: popoverControlStyle },
        _react2['default'].createElement(
          'div',
          { ref: 'self',
            onClick: _this.onClick },
          _this.props.children
        ),
        _this.state.isPopped ? _react2['default'].createElement(PopoverList, {
          parentFrame: { top: top, left: left, width: width, height: height },
          actions: _this.props.actions,
          offsetY: _this.props.offsetY,
          delegate: _this }) : null
      );
    };
  }

  _createClass(PopoverControl, null, [{
    key: 'propTypes',
    value: {
      actions: PopoverActionsType.isRequired,
      className: _propTypes2['default'].string
    },
    enumerable: true
  }]);

  return PopoverControl;
})(_react2['default'].Component);

exports['default'] = PopoverControl;

var PopoverList = (function (_React$Component2) {
  _inherits(PopoverList, _React$Component2);

  function PopoverList() {
    var _this2 = this;

    _classCallCheck(this, PopoverList);

    _get(Object.getPrototypeOf(PopoverList.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      offsetX: 0,
      isFlipped: false };

    this.onKeyDown = function (event) {
      if ((0, _keycode2['default'])(event) === 'esc') {
        _this2.props.delegate.shouldHidePopover();
      }
    };

    this.onActionClick = function (action) {
      if (typeof action.func === 'function') action.func();
      _this2.props.delegate.shouldHidePopover();
    };
  }

  _createClass(PopoverList, [{
    key: 'componentDidMount',
    // usually bottom facing, but if true, then the popover should appear above
    value: function componentDidMount() {
      this.eventToken = _activeEventStack2['default'].addListenable([['click', this.props.delegate.handleDocumentClick], ['keydown', this.onKeyDown]]);

      // Once the element is in the dom, we can measure its height

      var _ReactDOM$findDOMNode$getBoundingClientRect2 = _reactDom2['default'].findDOMNode(this).getBoundingClientRect();

      var width = _ReactDOM$findDOMNode$getBoundingClientRect2.width;
      var height = _ReactDOM$findDOMNode$getBoundingClientRect2.height;

      this.setState({ width: width, height: height });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _activeEventStack2['default'].removeListenable(this.eventToken);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props;
      var windowMargin = _props.windowMargin;
      var launcherMargin = _props.launcherMargin;
      var parentFrame = _props.parentFrame;
      var actions = _props.actions;
      var _state2 = this.state;
      var width = _state2.width;
      var height = _state2.height;

      var windowFrame = {
        width: typeof document != 'undefined' ? document.documentElement.clientWidth : 0,
        height: typeof document != 'undefined' ? document.documentElement.clientHeight : 0
      };

      // State
      var offsetY = parentFrame.height + launcherMargin,
          offsetX = 0;

      // Flipping
      if (parentFrame.top + parentFrame.height + height + windowMargin + launcherMargin > windowFrame.height) {
        offsetY = 0 - height - launcherMargin;
      }

      // Offset X
      if (parentFrame.left + width + windowMargin > windowFrame.width) offsetX = windowFrame.width - width - windowMargin - parentFrame.left;

      var style = {
        position: 'absolute',
        top: 0,
        left: 0,
        transform: 'translate(' + offsetX + 'px, ' + offsetY + 'px)'
      };

      return _react2['default'].createElement(
        'div',
        { style: style, ref: 'self', className: 'ReactPopoverList' },
        (0, _lodash.map)(actions, function (action, i) {
          return _react2['default'].createElement(
            'a',
            { key: i,
              onClick: _this3.onActionClick.bind(null, action) },
            action.title
          );
        })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      actions: PopoverActionsType.isRequired,
      delegate: _propTypes2['default'].shape({
        shouldHidePopover: _propTypes2['default'].func.isRequired,
        getPopoverReferenceFrame: _propTypes2['default'].func.isRequired
      }).isRequired,
      windowMargin: _propTypes2['default'].number.isRequired,
      launcherMargin: _propTypes2['default'].number.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      windowMargin: 20,
      launcherMargin: 10
    },
    enumerable: true
  }]);

  return PopoverList;
})(_react2['default'].Component);

module.exports = exports['default'];