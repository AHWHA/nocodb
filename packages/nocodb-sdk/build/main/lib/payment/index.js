"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpgradeMessage = exports.PlanFeatureUpgradeMessages = exports.PlanLimitUpgradeMessages = exports.LOYALTY_GRACE_PERIOD_END_DATE = exports.LOYALTY_END_DATE = exports.GRACE_PERIOD_DURATION = exports.HigherPlan = exports.PlanOrderToPlan = exports.PlanOrder = exports.PlanMeta = exports.LoyaltyPriceLookupKeyMap = exports.PlanPriceLookupKeys = exports.PlanTitles = exports.PlanFeatureTypes = exports.PlanLimitTypes = void 0;
var PlanLimitTypes;
(function (PlanLimitTypes) {
    PlanLimitTypes["LIMIT_FREE_WORKSPACE"] = "limit_free_workspace";
    PlanLimitTypes["LIMIT_EDITOR"] = "limit_editor";
    PlanLimitTypes["LIMIT_COMMENTER"] = "limit_commenter";
    PlanLimitTypes["LIMIT_API_PER_SECOND"] = "limit_api_per_second";
    PlanLimitTypes["LIMIT_AI_TOKEN"] = "limit_ai_token";
    PlanLimitTypes["LIMIT_API_CALL"] = "limit_api_call";
    PlanLimitTypes["LIMIT_AUDIT_RETENTION"] = "limit_audit_retention";
    PlanLimitTypes["LIMIT_AUTOMATION_RUN"] = "limit_automation_run";
    PlanLimitTypes["LIMIT_AUTOMATION_RETENTION"] = "limit_automation_retention";
    PlanLimitTypes["LIMIT_WEBHOOK_PER_WORKSPACE"] = "limit_webhook";
    PlanLimitTypes["LIMIT_EXTENSION_PER_WORKSPACE"] = "limit_extension";
    PlanLimitTypes["LIMIT_SNAPSHOT_PER_WORKSPACE"] = "limit_snapshot";
    PlanLimitTypes["LIMIT_STORAGE_PER_WORKSPACE"] = "limit_storage";
    PlanLimitTypes["LIMIT_RECORD_PER_WORKSPACE"] = "limit_record";
    PlanLimitTypes["LIMIT_BASE_PER_WORKSPACE"] = "limit_base";
    PlanLimitTypes["LIMIT_EXTERNAL_SOURCE_PER_WORKSPACE"] = "limit_external_source";
    PlanLimitTypes["LIMIT_TABLE_PER_BASE"] = "limit_table_per_base";
    PlanLimitTypes["LIMIT_COLUMN_PER_TABLE"] = "limit_column_per_table";
    PlanLimitTypes["LIMIT_WEBHOOK_PER_TABLE"] = "limit_webhook_per_table";
    PlanLimitTypes["LIMIT_VIEW_PER_TABLE"] = "limit_view_per_table";
    PlanLimitTypes["LIMIT_FILTER_PER_VIEW"] = "limit_filter_per_view";
    PlanLimitTypes["LIMIT_SORT_PER_VIEW"] = "limit_sort_per_view";
})(PlanLimitTypes || (exports.PlanLimitTypes = PlanLimitTypes = {}));
var PlanFeatureTypes;
(function (PlanFeatureTypes) {
    PlanFeatureTypes["FEATURE_AI"] = "feature_ai";
    PlanFeatureTypes["FEATURE_AI_INTEGRATIONS"] = "feature_ai_integrations";
    PlanFeatureTypes["FEATURE_AT_MENTION"] = "feature_at_mention";
    PlanFeatureTypes["FEATURE_AUDIT_WORKSPACE"] = "feature_audit_workspace";
    PlanFeatureTypes["FEATURE_COMMENT_RESOLVE"] = "feature_comment_resolve";
    PlanFeatureTypes["FEATURE_CUSTOM_URL"] = "feature_custom_url";
    PlanFeatureTypes["FEATURE_DISCUSSION_MODE"] = "feature_discussion_mode";
    PlanFeatureTypes["FEATURE_EXTENSIONS"] = "feature_extensions";
    PlanFeatureTypes["FEATURE_FILE_MODE"] = "feature_file_mode";
    PlanFeatureTypes["FEATURE_FORM_URL_REDIRECTION"] = "feature_form_url_redirection";
    PlanFeatureTypes["FEATURE_FORM_CUSTOM_LOGO"] = "feature_form_custom_logo";
    PlanFeatureTypes["FEATURE_FORM_FIELD_ON_CONDITION"] = "feature_form_field_on_condition";
    PlanFeatureTypes["FEATURE_FORM_FIELD_VALIDATION"] = "feature_form_field_validation";
    PlanFeatureTypes["FEATURE_GROUP_BY_AGGREGATIONS"] = "feature_group_by_aggregations";
    PlanFeatureTypes["FEATURE_HIDE_BRANDING"] = "feature_hide_branding";
    PlanFeatureTypes["FEATURE_LTAR_LIMIT_SELECTION_BY_FILTER"] = "feature_ltar_limit_selection_by_filter";
    PlanFeatureTypes["FEATURE_PERSONAL_VIEWS"] = "feature_personal_views";
    PlanFeatureTypes["FEATURE_SCRIPTS"] = "feature_scripts";
    PlanFeatureTypes["FEATURE_SSO"] = "feature_sso";
    PlanFeatureTypes["FEATURE_WEBHOOK_CUSTOM_PAYLOAD"] = "feature_webhook_custom_payload";
})(PlanFeatureTypes || (exports.PlanFeatureTypes = PlanFeatureTypes = {}));
var PlanTitles;
(function (PlanTitles) {
    PlanTitles["FREE"] = "Free";
    PlanTitles["TEAM"] = "Team";
    PlanTitles["BUSINESS"] = "Business";
    PlanTitles["ENTERPRISE"] = "Enterprise";
})(PlanTitles || (exports.PlanTitles = PlanTitles = {}));
var PlanPriceLookupKeys;
(function (PlanPriceLookupKeys) {
    PlanPriceLookupKeys["TEAM_MONTHLY"] = "team_monthly";
    PlanPriceLookupKeys["TEAM_YEARLY"] = "team_yearly";
    PlanPriceLookupKeys["BUSINESS_MONTHLY"] = "business_monthly";
    PlanPriceLookupKeys["BUSINESS_YEARLY"] = "business_yearly";
})(PlanPriceLookupKeys || (exports.PlanPriceLookupKeys = PlanPriceLookupKeys = {}));
exports.LoyaltyPriceLookupKeyMap = {
    [PlanPriceLookupKeys.TEAM_MONTHLY]: 'loyalty_team_monthly',
    [PlanPriceLookupKeys.TEAM_YEARLY]: 'loyalty_team_yearly',
    [PlanPriceLookupKeys.BUSINESS_MONTHLY]: 'loyalty_business_monthly',
    [PlanPriceLookupKeys.BUSINESS_YEARLY]: 'loyalty_business_yearly',
};
exports.PlanMeta = {
    [PlanTitles.FREE]: {
        title: PlanTitles.FREE,
        color: '#F9F9FA',
        accent: '#E7E7E9',
        primary: '#1F293A',
        bgLight: '#F9F9FA',
        bgDark: '#F4F4F5',
        border: '#E7E7E9',
        chartFillColor: '#6A7184',
    },
    [PlanTitles.TEAM]: {
        title: PlanTitles.TEAM,
        color: '#EDF9FF',
        accent: '#AFE5FF',
        primary: '#207399',
        bgLight: '#EDF9FF',
        bgDark: '#D7F2FF',
        border: '#AFE5FF',
        chartFillColor: '#207399',
    },
    [PlanTitles.BUSINESS]: {
        title: PlanTitles.BUSINESS,
        color: '#FFF5EF',
        accent: '#FDCDAD',
        primary: '#C86827',
        bgLight: '#FFF5EF',
        bgDark: '#FEE6D6',
        border: '#FDCDAD',
        chartFillColor: '#C86827',
    },
    [PlanTitles.ENTERPRISE]: {
        title: PlanTitles.ENTERPRISE,
        color: '#0D1117',
        accent: '#663B1F',
        primary: '#C86827',
        bgLight: '#FFF5EF',
        bgDark: '#FEE6D6',
        border: '#FDCDAD',
        chartFillColor: '#C86827',
    },
};
exports.PlanOrder = {
    [PlanTitles.FREE]: 0,
    [PlanTitles.TEAM]: 1,
    [PlanTitles.BUSINESS]: 2,
    [PlanTitles.ENTERPRISE]: 3,
};
exports.PlanOrderToPlan = Object.entries(exports.PlanOrder).reduce((acc, [plan, order]) => {
    acc[order] = plan;
    return acc;
}, {});
exports.HigherPlan = {
    [PlanTitles.FREE]: PlanTitles.TEAM,
    [PlanTitles.TEAM]: PlanTitles.BUSINESS,
    [PlanTitles.BUSINESS]: PlanTitles.ENTERPRISE,
};
exports.GRACE_PERIOD_DURATION = 14;
exports.LOYALTY_END_DATE = '2025-04-15';
exports.LOYALTY_GRACE_PERIOD_END_DATE = '2025-04-30';
exports.PlanLimitUpgradeMessages = {
    [PlanLimitTypes.LIMIT_FREE_WORKSPACE]: 'to add more workspaces.',
    [PlanLimitTypes.LIMIT_EDITOR]: 'to add more editors.',
    [PlanLimitTypes.LIMIT_COMMENTER]: 'to add more commenters.',
    [PlanLimitTypes.LIMIT_API_PER_SECOND]: 'due to reaching the API per second limit.',
    [PlanLimitTypes.LIMIT_AI_TOKEN]: 'due to reaching the AI token usage limit.',
    [PlanLimitTypes.LIMIT_API_CALL]: 'due to reaching the API call limit.',
    [PlanLimitTypes.LIMIT_AUDIT_RETENTION]: 'to increase audit retention.',
    [PlanLimitTypes.LIMIT_AUTOMATION_RUN]: 'to run more automations.',
    [PlanLimitTypes.LIMIT_AUTOMATION_RETENTION]: 'to increase automation retention.',
    [PlanLimitTypes.LIMIT_WEBHOOK_PER_WORKSPACE]: 'to add more webhooks.',
    [PlanLimitTypes.LIMIT_EXTENSION_PER_WORKSPACE]: 'to add more extensions.',
    [PlanLimitTypes.LIMIT_SNAPSHOT_PER_WORKSPACE]: 'due to reaching the snapshot limit.',
    [PlanLimitTypes.LIMIT_STORAGE_PER_WORKSPACE]: 'due to reaching the storage limit.',
    [PlanLimitTypes.LIMIT_RECORD_PER_WORKSPACE]: 'as the record limit has been reached.',
    [PlanLimitTypes.LIMIT_BASE_PER_WORKSPACE]: 'to add more bases.',
    [PlanLimitTypes.LIMIT_EXTERNAL_SOURCE_PER_WORKSPACE]: 'to connect more external sources.',
    [PlanLimitTypes.LIMIT_TABLE_PER_BASE]: 'to add more tables in a base.',
    [PlanLimitTypes.LIMIT_COLUMN_PER_TABLE]: 'to add more columns in a table.',
    [PlanLimitTypes.LIMIT_WEBHOOK_PER_TABLE]: 'to add more table-level webhooks.',
    [PlanLimitTypes.LIMIT_VIEW_PER_TABLE]: 'to add more views in a table.',
    [PlanLimitTypes.LIMIT_FILTER_PER_VIEW]: 'to add more filters in a view.',
    [PlanLimitTypes.LIMIT_SORT_PER_VIEW]: 'to add more sort rules in a view.',
};
exports.PlanFeatureUpgradeMessages = {
    [PlanFeatureTypes.FEATURE_AI]: 'to enable AI features.',
    [PlanFeatureTypes.FEATURE_AI_INTEGRATIONS]: 'to use AI integrations.',
    [PlanFeatureTypes.FEATURE_AT_MENTION]: 'to use @mention in comments.',
    [PlanFeatureTypes.FEATURE_AUDIT_WORKSPACE]: 'to access workspace audit logs.',
    [PlanFeatureTypes.FEATURE_COMMENT_RESOLVE]: 'to enable comment resolution.',
    [PlanFeatureTypes.FEATURE_CUSTOM_URL]: 'to use a custom URL.',
    [PlanFeatureTypes.FEATURE_DISCUSSION_MODE]: 'to use discussion mode.',
    [PlanFeatureTypes.FEATURE_EXTENSIONS]: 'to enable extensions.',
    [PlanFeatureTypes.FEATURE_FILE_MODE]: 'to enable file mode.',
    [PlanFeatureTypes.FEATURE_FORM_URL_REDIRECTION]: 'to access redirect after form submission feature',
    [PlanFeatureTypes.FEATURE_FORM_CUSTOM_LOGO]: 'to add a custom logo to forms.',
    [PlanFeatureTypes.FEATURE_FORM_FIELD_ON_CONDITION]: 'to access conditional form fields feature',
    [PlanFeatureTypes.FEATURE_FORM_FIELD_VALIDATION]: 'to access form field validation feature',
    [PlanFeatureTypes.FEATURE_GROUP_BY_AGGREGATIONS]: 'to use group-by aggregations.',
    [PlanFeatureTypes.FEATURE_HIDE_BRANDING]: 'to remove branding.',
    [PlanFeatureTypes.FEATURE_LTAR_LIMIT_SELECTION_BY_FILTER]: 'to limit row selection by filters.',
    [PlanFeatureTypes.FEATURE_PERSONAL_VIEWS]: 'to use personal views.',
    [PlanFeatureTypes.FEATURE_SCRIPTS]: 'to enable scripts.',
    [PlanFeatureTypes.FEATURE_SSO]: 'to enable SSO (Single Sign-On).',
    [PlanFeatureTypes.FEATURE_WEBHOOK_CUSTOM_PAYLOAD]: 'to send custom webhook payloads.',
};
const getUpgradeMessage = (limitOrFeature) => {
    if (!limitOrFeature)
        return '';
    if (exports.PlanLimitUpgradeMessages[limitOrFeature]) {
        return exports.PlanLimitUpgradeMessages[limitOrFeature];
    }
    if (exports.PlanFeatureUpgradeMessages[limitOrFeature]) {
        return exports.PlanFeatureUpgradeMessages[limitOrFeature];
    }
    return limitOrFeature;
};
exports.getUpgradeMessage = getUpgradeMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3BheW1lbnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBWSxjQXlCWDtBQXpCRCxXQUFZLGNBQWM7SUFDeEIsK0RBQTZDLENBQUE7SUFDN0MsK0NBQTZCLENBQUE7SUFDN0IscURBQW1DLENBQUE7SUFFbkMsK0RBQTZDLENBQUE7SUFDN0MsbURBQWlDLENBQUE7SUFDakMsbURBQWlDLENBQUE7SUFDakMsaUVBQStDLENBQUE7SUFDL0MsK0RBQTZDLENBQUE7SUFDN0MsMkVBQXlELENBQUE7SUFFekQsK0RBQTZDLENBQUE7SUFDN0MsbUVBQWlELENBQUE7SUFDakQsaUVBQStDLENBQUE7SUFDL0MsK0RBQTZDLENBQUE7SUFDN0MsNkRBQTJDLENBQUE7SUFDM0MseURBQXVDLENBQUE7SUFDdkMsK0VBQTZELENBQUE7SUFDN0QsK0RBQTZDLENBQUE7SUFDN0MsbUVBQWlELENBQUE7SUFDakQscUVBQW1ELENBQUE7SUFDbkQsK0RBQTZDLENBQUE7SUFDN0MsaUVBQStDLENBQUE7SUFDL0MsNkRBQTJDLENBQUE7QUFDN0MsQ0FBQyxFQXpCVyxjQUFjLDhCQUFkLGNBQWMsUUF5QnpCO0FBRUQsSUFBWSxnQkFxQlg7QUFyQkQsV0FBWSxnQkFBZ0I7SUFDMUIsNkNBQXlCLENBQUE7SUFDekIsdUVBQW1ELENBQUE7SUFDbkQsNkRBQXlDLENBQUE7SUFDekMsdUVBQW1ELENBQUE7SUFDbkQsdUVBQW1ELENBQUE7SUFDbkQsNkRBQXlDLENBQUE7SUFDekMsdUVBQW1ELENBQUE7SUFDbkQsNkRBQXlDLENBQUE7SUFDekMsMkRBQXVDLENBQUE7SUFDdkMsaUZBQTZELENBQUE7SUFDN0QseUVBQXFELENBQUE7SUFDckQsdUZBQW1FLENBQUE7SUFDbkUsbUZBQStELENBQUE7SUFDL0QsbUZBQStELENBQUE7SUFDL0QsbUVBQStDLENBQUE7SUFD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