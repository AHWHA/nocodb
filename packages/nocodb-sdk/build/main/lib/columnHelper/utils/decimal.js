"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeNewDecimalValue = exports.extractDecimalFromString = exports.allowedDecimalRegex = void 0;
exports.allowedDecimalRegex = /[-0123456789.]/g;
const extractDecimalFromString = (value) => {
    const extractedArrFromRegex = value.match(exports.allowedDecimalRegex);
    if (!extractedArrFromRegex || extractedArrFromRegex.length === 0)
        return '';
    let dotExists = false;
    const isMinus = extractedArrFromRegex[0] === '-';
    const extractedValueFromRegex = extractedArrFromRegex
        .filter((k) => {
        if (k === '.' && dotExists) {
            return false;
        }
        else if (k === '.') {
            dotExists = true;
        }
        else if (k === '-') {
            return false;
        }
        return true;
    })
        .join('');
    return (isMinus ? '-' : '') + extractedValueFromRegex;
};
exports.extractDecimalFromString = extractDecimalFromString;
const composeNewDecimalValue = (props) => {
    var _a, _b, _c;
    return (0, exports.extractDecimalFromString)([
        props.lastValue.substring(0, (_a = props.selectionStart) !== null && _a !== void 0 ? _a : 0),
        props.newValue,
        props.lastValue.substring((_c = (_b = props.selectionEnd) !== null && _b !== void 0 ? _b : props.selectionStart) !== null && _c !== void 0 ? _c : 0),
    ].join(''));
};
exports.composeNewDecimalValue = composeNewDecimalValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjaW1hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9saWIvY29sdW1uSGVscGVyL3V0aWxzL2RlY2ltYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQztBQUM5QyxNQUFNLHdCQUF3QixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7SUFDeEQsTUFBTSxxQkFBcUIsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLDJCQUFtQixDQUFDLENBQUM7SUFDL0QsSUFBSSxDQUFDLHFCQUFxQixJQUFJLHFCQUFxQixDQUFDLE1BQU0sS0FBSyxDQUFDO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFDNUUsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLE1BQU0sT0FBTyxHQUFHLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQztJQUNqRCxNQUFNLHVCQUF1QixHQUFHLHFCQUFxQjtTQUNsRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUMzQixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7YUFBTSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNyQixTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ25CLENBQUM7YUFBTSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNyQixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNaLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsdUJBQXVCLENBQUM7QUFDeEQsQ0FBQyxDQUFDO0FBbEJXLFFBQUEsd0JBQXdCLDRCQWtCbkM7QUFFSyxNQUFNLHNCQUFzQixHQUFHLENBQUMsS0FLdEMsRUFBRSxFQUFFOztJQUNILE9BQU8sSUFBQSxnQ0FBd0IsRUFDN0I7UUFDRSxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBQSxLQUFLLENBQUMsY0FBYyxtQ0FBSSxDQUFDLENBQUM7UUFDdkQsS0FBSyxDQUFDLFFBQVE7UUFDZCxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FDdkIsTUFBQSxNQUFBLEtBQUssQ0FBQyxZQUFZLG1DQUFJLEtBQUssQ0FBQyxjQUFjLG1DQUFJLENBQUMsQ0FDaEQ7S0FDRixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDWCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBZlcsUUFBQSxzQkFBc0IsMEJBZWpDIn0=