"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Token = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

_dotenv["default"].config();

var Token = /*#__PURE__*/function () {
  function Token() {
    (0, _classCallCheck2["default"])(this, Token);
  }

  (0, _createClass2["default"])(Token, null, [{
    key: "createToken",
    value: function createToken(payload) {
      var token = _jsonwebtoken["default"].sign(payload, process.env.secretkey);

      return token;
    }
  }, {
    key: "verifyToken",
    value: function verifyToken(token) {
      var payload = _jsonwebtoken["default"].verify(token, process.env.secretkey);

      return payload;
    }
  }]);
  return Token;
}();

exports.Token = Token;