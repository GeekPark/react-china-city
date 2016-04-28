'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var levels = ['省份', '城市', '区县'];

var ChinaCity = function (_React$Component) {
  _inherits(ChinaCity, _React$Component);

  function ChinaCity(props) {
    _classCallCheck(this, ChinaCity);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChinaCity).call(this, props));

    _this.state = {
      selected: props.selected,
      list: props.list
    };

    _this.select = function (e) {
      var dom = e.target;
      var level = +dom.dataset.level;
      if (level === levels.length - 1 || +dom.value === 0) return;

      _this.getList(dom.value, function (result) {
        var list = _this.state.list.map(function (x, i) {
          if (i > level) {
            _this.refs['select' + i].value = 0;
          }
          if (i === level + 1) return result;
          if (i > level + 1) return [];
          return x;
        });
        _this.setState({ list: list });
      });
    };
    return _this;
  }

  _createClass(ChinaCity, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var selected = this.state.selected;

      if (!selected) return;
      var result = [(selected / 1000 | 0) + '000', (selected / 100 | 0) + '00', selected];
      result.forEach(function (val, index) {
        _this2.refs['select' + index].value = val;
      });
    }
  }, {
    key: 'getList',
    value: function getList(id, cb) {
      _jquery2.default.get(this.props.route + '/' + id).done(function (d) {
        if (d.data) cb(d.data);
      }).fail(function (xhr) {
        console.error(xhr);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        levels.map(function (levelName, index) {
          return _react2.default.createElement(
            'select',
            { key: index, onChange: _this3.select, 'data-level': index,
              name: levels.length - 1 === index ? _this3.props.resultName : '',
              ref: 'select' + index
            },
            _react2.default.createElement(
              'option',
              { value: '0' },
              levelName
            ),
            _this3.state.list[index].map(function (x, i) {
              return _react2.default.createElement(
                'option',
                { key: i, value: x[1] },
                x[0]
              );
            })
          );
        })
      );
    }
  }]);

  return ChinaCity;
}(_react2.default.Component);

ChinaCity.defaultProps = {
  resultName: 'user[city]',
  route: '/china_city'
};

ChinaCity.propTypes = {
  list: _react.PropTypes.array.isRequired,
  selected: _react.PropTypes.number,
  resultName: _react.PropTypes.string,
  route: _react.PropTypes.string
};

exports.default = ChinaCity;
