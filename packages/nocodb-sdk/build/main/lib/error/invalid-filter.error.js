"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidFilterError = void 0;
const errorUtils_1 = require("../errorUtils");
;
class InvalidFilterError extends errorUtils_1.NcSDKError {
    constructor(info) {
        var _a;
        let message = (_a = info.message) !== null && _a !== void 0 ? _a : 'INVALID_FILTER';
        if (info.lexingError) {
            const lexingErrorMessage = info.lexingError.map(k => k.message).join(', ');
            message = `${message} lexing_error: ${lexingErrorMessage}`;
        }
        else if (info.parsingError) {
            const parsingErrorMessage = info.parsingError.map(k => k.message);
            message = `${message} parsing_error: ${parsingErrorMessage}`;
        }
        super(message);
        this.info = info;
    }
}
exports.InvalidFilterError = InvalidFilterError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YWxpZC1maWx0ZXIuZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2Vycm9yL2ludmFsaWQtZmlsdGVyLmVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDhDQUEyQztBQUsxQyxDQUFDO0FBQ0YsTUFBYSxrQkFBbUIsU0FBUSx1QkFBVTtJQUNoRCxZQUE0QixJQUE0Qjs7UUFDdEQsSUFBSSxPQUFPLEdBQUcsTUFBQSxJQUFJLENBQUMsT0FBTyxtQ0FBSSxnQkFBZ0IsQ0FBQztRQUMvQyxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNwQixNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzRSxPQUFPLEdBQUcsR0FBRyxPQUFPLGtCQUFrQixrQkFBa0IsRUFBRSxDQUFDO1FBQzdELENBQUM7YUFBTSxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUM1QixNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xFLE9BQU8sR0FBRyxHQUFHLE9BQU8sbUJBQW1CLG1CQUFtQixFQUFFLENBQUM7UUFDL0QsQ0FBQztRQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQVRZLFNBQUksR0FBSixJQUFJLENBQXdCO0lBVXhELENBQUM7Q0FDRjtBQVpELGdEQVlDIn0=