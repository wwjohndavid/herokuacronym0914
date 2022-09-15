"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAcronym = exports.updateAcronym = exports.createAcronym = exports.acronyms = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _acronymUtils = _interopRequireDefault(require("./acronymUtils"));

var _acronyms = require("../core/acronyms.model");

/* eslint-disable consistent-return */
var acronyms = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var rows, resource, offset, limit, mSet, paginatedmSet;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _acronyms.getItems)();

          case 3:
            rows = _context.sent;
            console.log(rows.length);
            resource = req.path.split('/')[1];
            offset = parseInt(req.query.from, 10) || 1;
            limit = parseInt(req.query.limit, 10) || 10;

            if (!(limit > 100 || limit < 1)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              status: 400,
              message: 'Requested limit not allowed'
            }));

          case 10:
            mSet = rows.slice(offset - 1);
            paginatedmSet = mSet.slice(0, limit);
            if (req.query.search) paginatedmSet = (0, _acronymUtils["default"])(req.query.search, mSet).slice(0, limit);
            return _context.abrupt("return", res.header('Access-Control-Expose-Headers', 'Content-Range').header('Access-Control-Expose-Headers', 'Accept-Range').header('Content-Range', "".concat(offset - 1, "-").concat(offset - 1 + limit - 1, "/").concat(rows.length)).header('Accept-Range', "".concat(resource, " 100")).status(206).json(paginatedmSet));

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));

  return function acronyms(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.acronyms = acronyms;

var createAcronym = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, acronym, definition, rows;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, acronym = _req$body.acronym, definition = _req$body.definition;
            _context2.next = 4;
            return (0, _acronyms.createItem)([acronym.trim(), definition.trim()], res);

          case 4:
            rows = _context2.sent;

            if (!rows) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(201).json(rows));

          case 7:
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function createAcronym(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createAcronym = createAcronym;

var updateAcronym = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body2, acronym, definition, rows;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body2 = req.body, acronym = _req$body2.acronym, definition = _req$body2.definition;
            _context3.next = 4;
            return (0, _acronyms.updateItem)([acronym && acronym.trim() || req.acronym.acronym, definition && definition.trim() || req.acronym.definition, req.params.acronym], res);

          case 4:
            rows = _context3.sent;

            if (!rows) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.json(rows));

          case 7:
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500));

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));

  return function updateAcronym(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateAcronym = updateAcronym;

var deleteAcronym = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _acronyms.deleteItem)([req.params.acronym], res);

          case 3:
            return _context4.abrupt("return", res.status(200).json("The acronym, ".concat(req.acronym.acronym, ", has been deleted")));

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(500));

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));

  return function deleteAcronym(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteAcronym = deleteAcronym;