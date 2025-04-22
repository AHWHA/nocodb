export declare enum PlanLimitTypes {
    LIMIT_FREE_WORKSPACE = "limit_free_workspace",
    LIMIT_EDITOR = "limit_editor",
    LIMIT_COMMENTER = "limit_commenter",
    LIMIT_API_PER_SECOND = "limit_api_per_second",
    LIMIT_AI_TOKEN = "limit_ai_token",
    LIMIT_API_CALL = "limit_api_call",
    LIMIT_AUDIT_RETENTION = "limit_audit_retention",
    LIMIT_AUTOMATION_RUN = "limit_automation_run",
    LIMIT_AUTOMATION_RETENTION = "limit_automation_retention",
    LIMIT_WEBHOOK_PER_WORKSPACE = "limit_webhook",
    LIMIT_EXTENSION_PER_WORKSPACE = "limit_extension",
    LIMIT_SNAPSHOT_PER_WORKSPACE = "limit_snapshot",
    LIMIT_STORAGE_PER_WORKSPACE = "limit_storage",
    LIMIT_RECORD_PER_WORKSPACE = "limit_record",
    LIMIT_BASE_PER_WORKSPACE = "limit_base",
    LIMIT_EXTERNAL_SOURCE_PER_WORKSPACE = "limit_external_source",
    LIMIT_TABLE_PER_BASE = "limit_table_per_base",
    LIMIT_COLUMN_PER_TABLE = "limit_column_per_table",
    LIMIT_WEBHOOK_PER_TABLE = "limit_webhook_per_table",
    LIMIT_VIEW_PER_TABLE = "limit_view_per_table",
    LIMIT_FILTER_PER_VIEW = "limit_filter_per_view",
    LIMIT_SORT_PER_VIEW = "limit_sort_per_view"
}
export declare enum PlanFeatureTypes {
    FEATURE_AI = "feature_ai",
    FEATURE_AI_INTEGRATIONS = "feature_ai_integrations",
    FEATURE_AT_MENTION = "feature_at_mention",
    FEATURE_AUDIT_WORKSPACE = "feature_audit_workspace",
    FEATURE_COMMENT_RESOLVE = "feature_comment_resolve",
    FEATURE_CUSTOM_URL = "feature_custom_url",
    FEATURE_DISCUSSION_MODE = "feature_discussion_mode",
    FEATURE_EXTENSIONS = "feature_extensions",
    FEATURE_FILE_MODE = "feature_file_mode",
    FEATURE_FORM_URL_REDIRECTION = "feature_form_url_redirection",
    FEATURE_FORM_CUSTOM_LOGO = "feature_form_custom_logo",
    FEATURE_FORM_FIELD_ON_CONDITION = "feature_form_field_on_condition",
    FEATURE_FORM_FIELD_VALIDATION = "feature_form_field_validation",
    FEATURE_GROUP_BY_AGGREGATIONS = "feature_group_by_aggregations",
    FEATURE_HIDE_BRANDING = "feature_hide_branding",
    FEATURE_LTAR_LIMIT_SELECTION_BY_FILTER = "feature_ltar_limit_selection_by_filter",
    FEATURE_PERSONAL_VIEWS = "feature_personal_views",
    FEATURE_SCRIPTS = "feature_scripts",
    FEATURE_SSO = "feature_sso",
    FEATURE_WEBHOOK_CUSTOM_PAYLOAD = "feature_webhook_custom_payload"
}
export declare enum PlanTitles {
    FREE = "Free",
    TEAM = "Team",
    BUSINESS = "Business",
    ENTERPRISE = "Enterprise"
}
export declare enum PlanPriceLookupKeys {
    TEAM_MONTHLY = "team_monthly",
    TEAM_YEARLY = "team_yearly",
    BUSINESS_MONTHLY = "business_monthly",
    BUSINESS_YEARLY = "business_yearly"
}
export declare const LoyaltyPriceLookupKeyMap: {
    team_monthly: string;
    team_yearly: string;
    business_monthly: string;
    business_yearly: string;
};
export declare const PlanMeta: {
    readonly Free: {
        readonly title: PlanTitles.FREE;
        readonly color: "#F9F9FA";
        readonly accent: "#E7E7E9";
        readonly primary: "#1F293A";
        readonly bgLight: "#F9F9FA";
        readonly bgDark: "#F4F4F5";
        readonly border: "#E7E7E9";
        readonly chartFillColor: "#6A7184";
    };
    readonly Team: {
        readonly title: PlanTitles.TEAM;
        readonly color: "#EDF9FF";
        readonly accent: "#AFE5FF";
        readonly primary: "#207399";
        readonly bgLight: "#EDF9FF";
        readonly bgDark: "#D7F2FF";
        readonly border: "#AFE5FF";
        readonly chartFillColor: "#207399";
    };
    readonly Business: {
        readonly title: PlanTitles.BUSINESS;
        readonly color: "#FFF5EF";
        readonly accent: "#FDCDAD";
        readonly primary: "#C86827";
        readonly bgLight: "#FFF5EF";
        readonly bgDark: "#FEE6D6";
        readonly border: "#FDCDAD";
        readonly chartFillColor: "#C86827";
    };
    readonly Enterprise: {
        readonly title: PlanTitles.ENTERPRISE;
        readonly color: "#0D1117";
        readonly accent: "#663B1F";
        readonly primary: "#C86827";
        readonly bgLight: "#FFF5EF";
        readonly bgDark: "#FEE6D6";
        readonly border: "#FDCDAD";
        readonly chartFillColor: "#C86827";
    };
};
export declare const PlanOrder: {
    Free: number;
    Team: number;
    Business: number;
    Enterprise: number;
};
export declare const PlanOrderToPlan: Record<string, PlanTitles>;
export declare const HigherPlan: Record<string, PlanTitles>;
export declare const GRACE_PERIOD_DURATION = 14;
export declare const LOYALTY_END_DATE = "2025-04-15";
export declare const LOYALTY_GRACE_PERIOD_END_DATE = "2025-04-30";
export declare const PlanLimitUpgradeMessages: Record<PlanLimitTypes, string>;
export declare const PlanFeatureUpgradeMessages: Record<PlanFeatureTypes, string>;
export declare const getUpgradeMessage: (limitOrFeature?: PlanLimitTypes | PlanFeatureTypes | string) => any;
