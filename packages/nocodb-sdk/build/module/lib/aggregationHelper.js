import UITypes from './UITypes';
import { FormulaDataTypes } from '../lib/formulaHelpers';
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
})(NumericalAggregations || (NumericalAggregations = {}));
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
})(CommonAggregations || (CommonAggregations = {}));
var AttachmentAggregations;
(function (AttachmentAggregations) {
    AttachmentAggregations["AttachmentSize"] = "attachment_size";
})(AttachmentAggregations || (AttachmentAggregations = {}));
var BooleanAggregations;
(function (BooleanAggregations) {
    BooleanAggregations["Checked"] = "checked";
    BooleanAggregations["Unchecked"] = "unchecked";
    BooleanAggregations["PercentChecked"] = "percent_checked";
    BooleanAggregations["PercentUnchecked"] = "percent_unchecked";
})(BooleanAggregations || (BooleanAggregations = {}));
var DateAggregations;
(function (DateAggregations) {
    DateAggregations["EarliestDate"] = "earliest_date";
    DateAggregations["LatestDate"] = "latest_date";
    DateAggregations["DateRange"] = "date_range";
    DateAggregations["MonthRange"] = "month_range";
})(DateAggregations || (DateAggregations = {}));
const AllAggregations = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, CommonAggregations), NumericalAggregations), AttachmentAggregations), BooleanAggregations), DateAggregations);
const getAvailableAggregations = (type, parsed_tree) => {
    let returnAggregations = [];
    if (type === UITypes.Formula && (parsed_tree === null || parsed_tree === void 0 ? void 0 : parsed_tree.dataType)) {
        switch (parsed_tree.dataType) {
            case FormulaDataTypes.BOOLEAN:
                returnAggregations = [
                    ...Object.values(BooleanAggregations),
                    CommonAggregations.None,
                ];
                break;
            case FormulaDataTypes.DATE:
                returnAggregations = [
                    ...Object.values(DateAggregations),
                    ...Object.values(CommonAggregations),
                ];
                break;
            case FormulaDataTypes.NUMERIC:
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
        case UITypes.Number:
        case UITypes.Decimal:
        case UITypes.Currency:
        case UITypes.Percent:
        case UITypes.Duration:
        case UITypes.Rating:
        case UITypes.Rollup:
        case UITypes.Links:
            returnAggregations = [
                ...Object.values(NumericalAggregations),
                ...Object.values(CommonAggregations),
            ];
            break;
        case UITypes.Checkbox:
            returnAggregations = [
                ...Object.values(BooleanAggregations),
                CommonAggregations.None,
            ];
            break;
        case UITypes.Date:
        case UITypes.DateTime:
        case UITypes.LastModifiedTime:
        case UITypes.CreatedTime:
            returnAggregations = [
                ...Object.values(DateAggregations),
                ...Object.values(CommonAggregations),
            ];
            break;
        case UITypes.SpecificDBType:
        case UITypes.ForeignKey:
            returnAggregations = [CommonAggregations.None];
            break;
        case UITypes.Button:
        case UITypes.Attachment:
            return [CommonAggregations.None];
    }
    if (!returnAggregations.length) {
        returnAggregations = [...Object.values(CommonAggregations)];
    }
    return returnAggregations.filter((item) => item !== CommonAggregations.Count);
};
export { getAvailableAggregations, NumericalAggregations, CommonAggregations, BooleanAggregations, DateAggregations, AttachmentAggregations, AllAggregations, };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRpb25IZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2FnZ3JlZ2F0aW9uSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQztBQUNoQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RCxJQUFLLHFCQVNKO0FBVEQsV0FBSyxxQkFBcUI7SUFDeEIsb0NBQVcsQ0FBQTtJQUNYLG9DQUFXLENBQUE7SUFDWCxvQ0FBVyxDQUFBO0lBQ1gsb0NBQVcsQ0FBQTtJQUNYLDBDQUFpQixDQUFBO0lBQ2pCLHNEQUE2QixDQUFBO0lBQzdCLDZCQUE2QjtJQUM3Qix3Q0FBZSxDQUFBO0FBQ2pCLENBQUMsRUFUSSxxQkFBcUIsS0FBckIscUJBQXFCLFFBU3pCO0FBRUQsSUFBSyxrQkFTSjtBQVRELFdBQUssa0JBQWtCO0lBQ3JCLHFDQUFlLENBQUE7SUFDZixnREFBMEIsQ0FBQTtJQUMxQixrREFBNEIsQ0FBQTtJQUM1QixrREFBNEIsQ0FBQTtJQUM1QixvREFBOEIsQ0FBQTtJQUM5QixzREFBZ0MsQ0FBQTtJQUNoQyxzREFBZ0MsQ0FBQTtJQUNoQyxtQ0FBYSxDQUFBO0FBQ2YsQ0FBQyxFQVRJLGtCQUFrQixLQUFsQixrQkFBa0IsUUFTdEI7QUFFRCxJQUFLLHNCQUVKO0FBRkQsV0FBSyxzQkFBc0I7SUFDekIsNERBQWtDLENBQUE7QUFDcEMsQ0FBQyxFQUZJLHNCQUFzQixLQUF0QixzQkFBc0IsUUFFMUI7QUFFRCxJQUFLLG1CQUtKO0FBTEQsV0FBSyxtQkFBbUI7SUFDdEIsMENBQW1CLENBQUE7SUFDbkIsOENBQXVCLENBQUE7SUFDdkIseURBQWtDLENBQUE7SUFDbEMsNkRBQXNDLENBQUE7QUFDeEMsQ0FBQyxFQUxJLG1CQUFtQixLQUFuQixtQkFBbUIsUUFLdkI7QUFFRCxJQUFLLGdCQUtKO0FBTEQsV0FBSyxnQkFB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