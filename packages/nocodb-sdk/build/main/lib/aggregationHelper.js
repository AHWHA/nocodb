"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllAggregations = exports.AttachmentAggregations = exports.DateAggregations = exports.BooleanAggregations = exports.CommonAggregations = exports.NumericalAggregations = exports.getAvailableAggregations = void 0;
const UITypes_1 = __importDefault(require("./UITypes"));
const formulaHelpers_1 = require("../lib/formulaHelpers");
var NumericalAggregations;
(function (NumericalAggregations) {
    NumericalAggregations["Sum"] = "sum";
    NumericalAggregations["Min"] = "min";
    NumericalAggregations["Max"] = "max";
    NumericalAggregations["Avg"] = "avg";
    NumericalAggregations["Median"] = "median";
    NumericalAggregations["StandardDeviation"] = "std_dev";
    //   Histogram = 'histogram',
    NumericalAggregations["Range"] = "range";
})(NumericalAggregations || (exports.NumericalAggregations = NumericalAggregations = {}));
var CommonAggregations;
(function (CommonAggregations) {
    CommonAggregations["Count"] = "count";
    CommonAggregations["CountEmpty"] = "count_empty";
    CommonAggregations["CountFilled"] = "count_filled";
    CommonAggregations["CountUnique"] = "count_unique";
    CommonAggregations["PercentEmpty"] = "percent_empty";
    CommonAggregations["PercentFilled"] = "percent_filled";
    CommonAggregations["PercentUnique"] = "percent_unique";
    CommonAggregations["None"] = "none";
})(CommonAggregations || (exports.CommonAggregations = CommonAggregations = {}));
var AttachmentAggregations;
(function (AttachmentAggregations) {
    AttachmentAggregations["AttachmentSize"] = "attachment_size";
})(AttachmentAggregations || (exports.AttachmentAggregations = AttachmentAggregations = {}));
var BooleanAggregations;
(function (BooleanAggregations) {
    BooleanAggregations["Checked"] = "checked";
    BooleanAggregations["Unchecked"] = "unchecked";
    BooleanAggregations["PercentChecked"] = "percent_checked";
    BooleanAggregations["PercentUnchecked"] = "percent_unchecked";
})(BooleanAggregations || (exports.BooleanAggregations = BooleanAggregations = {}));
var DateAggregations;
(function (DateAggregations) {
    DateAggregations["EarliestDate"] = "earliest_date";
    DateAggregations["LatestDate"] = "latest_date";
    DateAggregations["DateRange"] = "date_range";
    DateAggregations["MonthRange"] = "month_range";
})(DateAggregations || (exports.DateAggregations = DateAggregations = {}));
const AllAggregations = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, CommonAggregations), NumericalAggregations), AttachmentAggregations), BooleanAggregations), DateAggregations);
exports.AllAggregations = AllAggregations;
const getAvailableAggregations = (type, parsed_tree) => {
    let returnAggregations = [];
    if (type === UITypes_1.default.Formula && (parsed_tree === null || parsed_tree === void 0 ? void 0 : parsed_tree.dataType)) {
        switch (parsed_tree.dataType) {
            case formulaHelpers_1.FormulaDataTypes.BOOLEAN:
                returnAggregations = [
                    ...Object.values(BooleanAggregations),
                    CommonAggregations.None,
                ];
                break;
            case formulaHelpers_1.FormulaDataTypes.DATE:
                returnAggregations = [
                    ...Object.values(DateAggregations),
                    ...Object.values(CommonAggregations),
                ];
                break;
            case formulaHelpers_1.FormulaDataTypes.NUMERIC:
                returnAggregations = [
                    ...Object.values(NumericalAggregations),
                    ...Object.values(CommonAggregations),
                ];
                break;
            default:
                returnAggregations = [...Object.values(CommonAggregations)];
                break;
        }
    }
    switch (type) {
        case UITypes_1.default.Number:
        case UITypes_1.default.Decimal:
        case UITypes_1.default.Currency:
        case UITypes_1.default.Percent:
        case UITypes_1.default.Duration:
        case UITypes_1.default.Rating:
        case UITypes_1.default.Rollup:
        case UITypes_1.default.Links:
            returnAggregations = [
                ...Object.values(NumericalAggregations),
                ...Object.values(CommonAggregations),
            ];
            break;
        case UITypes_1.default.Checkbox:
            returnAggregations = [
                ...Object.values(BooleanAggregations),
                CommonAggregations.None,
            ];
            break;
        case UITypes_1.default.Date:
        case UITypes_1.default.DateTime:
        case UITypes_1.default.LastModifiedTime:
        case UITypes_1.default.CreatedTime:
            returnAggregations = [
                ...Object.values(DateAggregations),
                ...Object.values(CommonAggregations),
            ];
            break;
        case UITypes_1.default.SpecificDBType:
        case UITypes_1.default.ForeignKey:
            returnAggregations = [CommonAggregations.None];
            break;
        case UITypes_1.default.Button:
        case UITypes_1.default.Attachment:
            return [CommonAggregations.None];
    }
    if (!returnAggregations.length) {
        returnAggregations = [...Object.values(CommonAggregations)];
    }
    return returnAggregations.filter((item) => item !== CommonAggregations.Count);
};
exports.getAvailableAggregations = getAvailableAggregations;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRpb25IZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2FnZ3JlZ2F0aW9uSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUFnQztBQUNoQyx5REFBd0Q7QUFFeEQsSUFBSyxxQkFTSjtBQVRELFdBQUsscUJBQXFCO0lBQ3hCLG9DQUFXLENBQUE7SUFDWCxvQ0FBVyxDQUFBO0lBQ1gsb0NBQVcsQ0FBQTtJQUNYLG9DQUFXLENBQUE7SUFDWCwwQ0FBaUIsQ0FBQTtJQUNqQixzREFBNkIsQ0FBQTtJQUM3Qiw2QkFBNkI7SUFDN0Isd0NBQWUsQ0FBQTtBQUNqQixDQUFDLEVBVEkscUJBQXFCLHFDQUFyQixxQkFBcUIsUUFTekI7QUFFRCxJQUFLLGtCQVNKO0FBVEQsV0FBSyxrQkFBa0I7SUFDckIscUNBQWUsQ0FBQTtJQUNmLGdEQUEwQixDQUFBO0lBQzFCLGtEQUE0QixDQUFBO0lBQzVCLGtEQUE0QixDQUFBO0lBQzVCLG9EQUE4QixDQUFBO0lBQzlCLHNEQUFnQyxDQUFBO0lBQ2hDLHNEQUFnQyxDQUFBO0lBQ2hDLG1DQUFhLENBQUE7QUFDZixDQUFDLEVBVEksa0JBQWtCLGtDQUFsQixrQkFBa0IsUUFTdEI7QUFFRCxJQUFLLHNCQUVKO0FBRkQsV0FBSyxzQkFBc0I7SUFDekIsNERBQWtDLENBQUE7QUFDcEMsQ0FBQyxFQUZJLHNCQUFzQixzQ0FBdEIsc0JBQXNCLFFBRTFCO0FBRUQsSUFBSyxtQkFLSjtBQUxELFdBQUssbUJBQW1CO0lBQ3RCLDBDQUFtQixDQUFBO0lBQ25CLDhDQUF1QixDQUFBO0lBQ3ZCLHlEQUFrQyxDQUFBO0lBQ2xDLDZEQUFzQyxDQUFBO0FBQ3hDLENBQUMsRUFMSSxtQkFBbUIsbUNBQW5CLG1CQUFtQixRQUt2QjtBQUVELElBQUssZ0JBS0o7QUFMRCxXQUFLLGdCQUFnQjtJQUNuQixrREFBOEIsQ0FBQTtJQUM5Qiw4Q0FBMEIsQ0FBQTtJQUMxQiw0Q0FBd0IsQ0FBQTtJQUN4Qiw4Q0FBMEIsQ0FBQTtBQUM1QixDQUFDLEVBTEksZ0JBQWdCLGdDQUFoQixnQkFBZ0IsUUFLcEI7QUFFRCxNQUFNLGVBQWUsNkVBQ2hCLGtCQUFrQixHQUNsQixxQkFBcUIsR0FDckIsc0JBQXNCLEdBQ3RCLG1CQUFtQixHQUNuQixnQkFBZ0IsQ0FDcEIsQ0FBQztBQW1GQSwwQ0FBZTtBQWpGakIsTUFBTSx3QkFBd0IsR0FBRyxDQUFDLElBQVksRUFBRSxXQUFZLEVBQVksRUFBRTtJQUN4RSxJQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztJQUM1QixJQUFJLElBQUksS0FBSyxpQkFBTyxDQUFDLE9BQU8sS0FBSSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsUUFBUSxDQUFBLEVBQUUsQ0FBQztRQUN0RCxRQUFRLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM3QixLQUFLLGlDQUFnQixDQUFDLE9BQU87Z0JBQzNCLGtCQUFrQixHQUFHO29CQUNuQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUM7b0JBQ3JDLGtCQUFrQixDQUFDLElBQUk7aUJBQ3hCLENBQUM7Z0JBQ0YsTUFBTTtZQUNSLEtBQUssaUNBQWdCLENBQUMsSUFBSTtnQkFDeEIsa0JBQWtCLEdBQUc7b0JBQ25CLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDbEMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDO2lCQUNyQyxDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLGlDQUFnQixDQUFDLE9BQU87Z0JBQzNCLGtCQUFrQixHQUFHO29CQUNuQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7b0JBQ3ZDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztpQkFDckMsQ0FBQztnQkFFRixNQUFNO1lBQ1I7Z0JBQ0Usa0JBQWtCLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxNQUFNO1FBQ1YsQ0FBQztJQUNILENBQUM7SUFFRCxRQUFRLElBQUksRUFBRSxDQUFDO1FBQ2IsS0FBSyxpQkFBTyxDQUFDLE1BQU0sQ0FBQztRQUNwQixLQUFLLGlCQUFPLENBQUMsT0FBTyxDQUFDO1FBQ3JCLEtBQUssaUJBQU8sQ0FBQyxRQUFRLENBQUM7UUFDdEIsS0FBSyxpQkFBTyxDQUFDLE9BQU8sQ0FBQztRQUNyQixLQUFLLGlCQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3RCLEtBQUssaUJBQU8sQ0FBQyxNQUFNLENBQUM7UUFDcEIsS0FBSyxpQkFBTyxDQUFDLE1BQU0sQ0FBQztRQUNwQixLQUFLLGlCQUFPLENBQUMsS0FBSztZQUNoQixrQkFBa0IsR0FBRztnQkFDbkIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDO2dCQUN2QyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7YUFDckMsQ0FBQztZQUNGLE1BQU07UUFDUixLQUFLLGlCQUFPLENBQUMsUUFBUTtZQUNuQixrQkFBa0IsR0FBRztnQkFDbkIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDO2dCQUNyQyxrQkFBa0IsQ0FBQyxJQUFJO2FBQ3hCLENBQUM7WUFDRixNQUFNO1FBQ1IsS0FBSyxpQkFBTyxDQUFDLElBQUksQ0FBQztRQUNsQixLQUFLLGlCQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3RCLEtBQUssaUJBQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5QixLQUFLLGlCQUFPLENBQUMsV0FBVztZQUN0QixrQkFBa0IsR0FBRztnQkFDbkIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDO2dCQUNsQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7YUFDckMsQ0FBQztZQUNGLE1BQU07UUFDUixLQUFLLGlCQUFPLENBQUMsY0FBYyxDQUFDO1FBQzVCLEtBQUssaUJBQU8sQ0FBQyxVQUFVO1lBQ3JCLGtCQUFrQixHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsTUFBTTtRQUNSLEtBQUssaUJBQU8sQ0FBQyxNQUFNLENBQUM7UUFDcEIsS0FBSyxpQkFBTyxDQUFDLFVBQVU7WUFDckIsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0Isa0JBQWtCLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxPQUFPLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hGLENBQUMsQ0FBQztBQUdBLDREQUF3QiJ9