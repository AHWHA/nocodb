"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReadonly = exports.isReadOnlyVirtualCell = exports.isLink = exports.isCount = exports.isBarcode = exports.isQrCode = exports.isFormula = exports.isRollup = exports.isLookup = exports.isOo = exports.isBt = exports.isMm = exports.isHm = exports.isLTAR = void 0;
const globals_1 = require("../../../lib/globals");
const helperFunctions_1 = require("../../../lib/helperFunctions");
const UITypes_1 = __importStar(require("../../../lib/UITypes"));
const cell_1 = require("./cell");
const isLTAR = (uidt, _colOptions) => {
    if (!uidt)
        return false;
    return (0, UITypes_1.isLinksOrLTAR)(uidt);
};
exports.isLTAR = isLTAR;
const isHm = (column) => {
    var _a;
    return (0, exports.isLTAR)(column.uidt, column.colOptions) &&
        ((_a = column.colOptions) === null || _a === void 0 ? void 0 : _a.type) === globals_1.RelationTypes.HAS_MANY;
};
exports.isHm = isHm;
const isMm = (column) => {
    var _a;
    return (0, exports.isLTAR)(column.uidt, column.colOptions) &&
        ((_a = column.colOptions) === null || _a === void 0 ? void 0 : _a.type) === globals_1.RelationTypes.MANY_TO_MANY;
};
exports.isMm = isMm;
const isBt = (column) => {
    var _a;
    return (0, exports.isLTAR)(column.uidt, column.colOptions) &&
        ((_a = column.colOptions) === null || _a === void 0 ? void 0 : _a.type) === globals_1.RelationTypes.BELONGS_TO;
};
exports.isBt = isBt;
const isOo = (column) => {
    var _a;
    return (0, exports.isLTAR)(column.uidt, column.colOptions) &&
        ((_a = column.colOptions) === null || _a === void 0 ? void 0 : _a.type) === globals_1.RelationTypes.ONE_TO_ONE;
};
exports.isOo = isOo;
const isLookup = (column) => column.uidt === UITypes_1.default.Lookup;
exports.isLookup = isLookup;
const isRollup = (column) => column.uidt === UITypes_1.default.Rollup;
exports.isRollup = isRollup;
const isFormula = (column) => column.uidt === UITypes_1.default.Formula;
exports.isFormula = isFormula;
const isQrCode = (column) => column.uidt === UITypes_1.default.QrCode;
exports.isQrCode = isQrCode;
const isBarcode = (column) => column.uidt === UITypes_1.default.Barcode;
exports.isBarcode = isBarcode;
const isCount = (column) => column.uidt === UITypes_1.default.Count;
exports.isCount = isCount;
const isLink = (column) => column.uidt === UITypes_1.default.Links;
exports.isLink = isLink;
function isReadOnlyVirtualCell(col) {
    return ((0, exports.isRollup)(col) ||
        (0, exports.isFormula)(col) ||
        (0, exports.isBarcode)(col) ||
        (0, exports.isLookup)(col) ||
        (0, exports.isQrCode)(col) ||
        (0, helperFunctions_1.isSystemColumn)(col) ||
        (0, UITypes_1.isCreatedOrLastModifiedTimeCol)(col) ||
        (0, UITypes_1.isCreatedOrLastModifiedByCol)(col));
}
exports.isReadOnlyVirtualCell = isReadOnlyVirtualCell;
const isReadonly = (col) => {
    return ((0, helperFunctions_1.isSystemColumn)(col) ||
        (0, exports.isLookup)(col) ||
        (0, exports.isRollup)(col) ||
        (0, exports.isFormula)(col) ||
        (0, cell_1.isButton)(col) ||
        (0, UITypes_1.isVirtualCol)(col) ||
        (0, UITypes_1.isCreatedOrLastModifiedTimeCol)(col) ||
        (0, UITypes_1.isCreatedOrLastModifiedByCol)(col));
};
exports.isReadonly = isReadonly;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbENlbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL2NvbHVtbkhlbHBlci91dGlscy92aXJ0dWFsQ2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDJDQUE4QztBQUM5QywyREFBdUQ7QUFDdkQseURBS3VCO0FBQ3ZCLGlDQUFrQztBQUUzQixNQUFNLE1BQU0sR0FBRyxDQUNwQixJQUF3QixFQUN4QixXQUFvQixFQUNvQixFQUFFO0lBQzFDLElBQUksQ0FBQyxJQUFJO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDeEIsT0FBTyxJQUFBLHVCQUFhLEVBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDO0FBTlcsUUFBQSxNQUFNLFVBTWpCO0FBRUssTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFrQixFQUFFLEVBQUU7O0lBQ3pDLE9BQUEsSUFBQSxjQUFNLEVBQUMsTUFBTSxDQUFDLElBQUssRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLENBQUEsTUFBQSxNQUFNLENBQUMsVUFBVSwwQ0FBRSxJQUFJLE1BQUssdUJBQWEsQ0FBQyxRQUFRLENBQUE7Q0FBQSxDQUFDO0FBRnhDLFFBQUEsSUFBSSxRQUVvQztBQUU5QyxNQUFNLElBQUksR0FBRyxDQUFDLE1BQWtCLEVBQUUsRUFBRTs7SUFDekMsT0FBQSxJQUFBLGNBQU0sRUFBQyxNQUFNLENBQUMsSUFBSyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdkMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxVQUFVLDBDQUFFLElBQUksTUFBSyx1QkFBYSxDQUFDLFlBQVksQ0FBQTtDQUFBLENBQUM7QUFGNUMsUUFBQSxJQUFJLFFBRXdDO0FBRWxELE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBa0IsRUFBRSxFQUFFOztJQUN6QyxPQUFBLElBQUEsY0FBTSxFQUFDLE1BQU0sQ0FBQyxJQUFL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