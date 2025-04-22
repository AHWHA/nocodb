export var OrgUserRoles;
(function (OrgUserRoles) {
    OrgUserRoles["SUPER_ADMIN"] = "super";
    OrgUserRoles["CREATOR"] = "org-level-creator";
    OrgUserRoles["VIEWER"] = "org-level-viewer";
})(OrgUserRoles || (OrgUserRoles = {}));
export var CloudOrgUserRoles;
(function (CloudOrgUserRoles) {
    CloudOrgUserRoles["CREATOR"] = "cloud-org-level-creator";
    CloudOrgUserRoles["VIEWER"] = "cloud-org-level-viewer";
    CloudOrgUserRoles["OWNER"] = "cloud-org-level-owner";
})(CloudOrgUserRoles || (CloudOrgUserRoles = {}));
export var ProjectRoles;
(function (ProjectRoles) {
    ProjectRoles["OWNER"] = "owner";
    ProjectRoles["CREATOR"] = "creator";
    ProjectRoles["EDITOR"] = "editor";
    ProjectRoles["COMMENTER"] = "commenter";
    ProjectRoles["VIEWER"] = "viewer";
    ProjectRoles["NO_ACCESS"] = "no-access";
})(ProjectRoles || (ProjectRoles = {}));
export var WorkspaceUserRoles;
(function (WorkspaceUserRoles) {
    WorkspaceUserRoles["OWNER"] = "workspace-level-owner";
    WorkspaceUserRoles["CREATOR"] = "workspace-level-creator";
    WorkspaceUserRoles["EDITOR"] = "workspace-level-editor";
    WorkspaceUserRoles["COMMENTER"] = "workspace-level-commenter";
    WorkspaceUserRoles["VIEWER"] = "workspace-level-viewer";
    WorkspaceUserRoles["NO_ACCESS"] = "workspace-level-no-access";
})(WorkspaceUserRoles || (WorkspaceUserRoles = {}));
export var AppEvents;
(function (AppEvents) {
    AppEvents["PROJECT_CREATE"] = "base.create";
    AppEvents["PROJECT_INVITE"] = "base.invite";
    AppEvents["PROJECT_USER_UPDATE"] = "base.user.update";
    AppEvents["PROJECT_USER_RESEND_INVITE"] = "base.user.resend.invite";
    AppEvents["PROJECT_DELETE"] = "base.delete";
    AppEvents["PROJECT_UPDATE"] = "base.update";
    AppEvents["PROJECT_CLONE"] = "base.clone";
    AppEvents["WELCOME"] = "app.welcome";
    AppEvents["WORKSPACE_USER_INVITE"] = "workspace.invite";
    AppEvents["WORKSPACE_USER_UPDATE"] = "workspace.user.update";
    AppEvents["WORKSPACE_USER_DELETE"] = "workspace.user.delete";
    AppEvents["WORKSPACE_CREATE"] = "workspace.create";
    AppEvents["WORKSPACE_DELETE"] = "workspace.delete";
    AppEvents["WORKSPACE_UPDATE"] = "workspace.update";
    AppEvents["WORKSPACE_UPGRADE_REQUEST"] = "workspace.upgrade.request";
    AppEvents["USER_SIGNUP"] = "user.signup";
    AppEvents["USER_SIGNIN"] = "user.signin";
    AppEvents["USER_INVITE"] = "user.invite";
    AppEvents["USER_UPDATE"] = "user.update";
    AppEvents["USER_PASSWORD_RESET"] = "user.password.reset";
    AppEvents["USER_PASSWORD_CHANGE"] = "user.password.change";
    AppEvents["USER_PASSWORD_FORGOT"] = "user.password.forgot";
    AppEvents["USER_DELETE"] = "user.delete";
    AppEvents["USER_EMAIL_VERIFICATION"] = "user.email.verification";
    AppEvents["TABLE_CREATE"] = "table.create";
    AppEvents["TABLE_DELETE"] = "table.delete";
    AppEvents["TABLE_UPDATE"] = "table.update";
    AppEvents["VIEW_CREATE"] = "view.create";
    AppEvents["VIEW_DELETE"] = "view.delete";
    AppEvents["VIEW_UPDATE"] = "view.update";
    AppEvents["SHARED_VIEW_CREATE"] = "shared.view.create";
    AppEvents["SHARED_VIEW_DELETE"] = "shared.view.delete";
    AppEvents["SHARED_VIEW_UPDATE"] = "shared.view.update";
    AppEvents["FILTER_CREATE"] = "filter.create";
    AppEvents["FILTER_DELETE"] = "filter.delete";
    AppEvents["FILTER_UPDATE"] = "filter.update";
    AppEvents["SORT_CREATE"] = "sort.create";
    AppEvents["SORT_DELETE"] = "sort.delete";
    AppEvents["SORT_UPDATE"] = "sort.update";
    AppEvents["COLUMN_CREATE"] = "column.create";
    AppEvents["COLUMN_DELETE"] = "column.delete";
    AppEvents["COLUMN_UPDATE"] = "column.update";
    AppEvents["DATA_CREATE"] = "data.create";
    AppEvents["DATA_DELETE"] = "data.delete";
    AppEvents["DATA_UPDATE"] = "data.update";
    AppEvents["ORG_USER_INVITE"] = "org.user.invite";
    AppEvents["ORG_USER_RESEND_INVITE"] = "org.user.resend.invite";
    AppEvents["VIEW_COLUMN_CREATE"] = "view.column.create";
    AppEvents["VIEW_COLUMN_UPDATE"] = "view.column.update";
    AppEvents["API_TOKEN_CREATE"] = "api.token.create";
    AppEvents["API_TOKEN_DELETE"] = "api.token.delete";
    AppEvents["API_TOKEN_UPDATE"] = "api.token.update";
    AppEvents["IMAGE_UPLOAD"] = "image.upload";
    AppEvents["FORM_COLUMN_UPDATE"] = "form.column.update";
    AppEvents["FORM_CREATE"] = "form.create";
    AppEvents["FORM_UPDATE"] = "form.update";
    AppEvents["GALLERY_CREATE"] = "gallery.create";
    AppEvents["GALLERY_UPDATE"] = "gallery.update";
    AppEvents["MAP_CREATE"] = "map.create";
    AppEvents["MAP_UPDATE"] = "map.update";
    AppEvents["MAP_DELETE"] = "map.delete";
    AppEvents["KANBAN_CREATE"] = "kanban.create";
    AppEvents["KANBAN_UPDATE"] = "kanban.update";
    AppEvents["META_DIFF_SYNC"] = "meta.diff.sync";
    AppEvents["GRID_CREATE"] = "grid.create";
    AppEvents["GRID_UPDATE"] = "grid.update";
    AppEvents["GRID_COLUMN_UPDATE"] = "grid.column.update";
    AppEvents["WEBHOOK_CREATE"] = "webhook.create";
    AppEvents["WEBHOOK_UPDATE"] = "webhook.update";
    AppEvents["WEBHOOK_DELETE"] = "webhook.delete";
    AppEvents["WEBHOOK_TEST"] = "webhook.test";
    AppEvents["WEBHOOK_TRIGGER"] = "webhook.trigger";
    AppEvents["UI_ACL_UPDATE"] = "ui.acl.update";
    AppEvents["ORG_API_TOKEN_CREATE"] = "org.api.token.create";
    AppEvents["ORG_API_TOKEN_DELETE"] = "org.api.token.delete";
    AppEvents["ORG_API_TOKEN_UPDATE"] = "org.api.token.update";
    AppEvents["PLUGIN_TEST"] = "plugin.test";
    AppEvents["PLUGIN_INSTALL"] = "plugin.install";
    AppEvents["PLUGIN_UNINSTALL"] = "plugin.uninstall";
    AppEvents["SYNC_SOURCE_CREATE"] = "sync.source.create";
    AppEvents["SYNC_SOURCE_UPDATE"] = "sync.source.update";
    AppEvents["SYNC_SOURCE_DELETE"] = "sync.source.delete";
    AppEvents["RELATION_DELETE"] = "relation.delete";
    AppEvents["RELATION_CREATE"] = "relation.create";
    AppEvents["SHARED_BASE_GENERATE_LINK"] = "shared.base.generate.link";
    AppEvents["SHARED_BASE_DELETE_LINK"] = "shared.base.delete.link";
    AppEvents["ATTACHMENT_UPLOAD"] = "attachment.upload";
    AppEvents["APIS_CREATED"] = "apis.created";
    AppEvents["EXTENSION_CREATE"] = "extension.create";
    AppEvents["EXTENSION_UPDATE"] = "extension.update";
    AppEvents["EXTENSION_DELETE"] = "extension.delete";
    AppEvents["COMMENT_CREATE"] = "comment.create";
    AppEvents["COMMENT_DELETE"] = "comment.delete";
    AppEvents["COMMENT_UPDATE"] = "comment.update";
    AppEvents["INTEGRATION_DELETE"] = "integration.delete";
    AppEvents["INTEGRATION_CREATE"] = "integration.create";
    AppEvents["INTEGRATION_UPDATE"] = "integration.update";
    AppEvents["ROW_USER_MENTION"] = "row.user.mention";
    AppEvents["CALENDAR_CREATE"] = "calendar.create";
    AppEvents["FORM_DUPLICATE"] = "form.duplicate";
    AppEvents["CALENDAR_UPDATE"] = "calendar.update";
    AppEvents["CALENDAR_DELETE"] = "calendar.delete";
    AppEvents["FORM_DELETE"] = "form.delete";
    AppEvents["SOURCE_CREATE"] = "source.create";
    AppEvents["SOURCE_UPDATE"] = "source.update";
    AppEvents["SOURCE_DELETE"] = "source.delete";
    AppEvents["SHARED_BASE_REVOKE_LINK"] = "shared.base.revoke.link";
    AppEvents["GRID_DELETE"] = "grid.delete";
    AppEvents["GRID_DUPLICATE"] = "grid.duplicate";
    AppEvents["KANBAN_DELETE"] = "kanban.delete";
    AppEvents["KANBAN_DUPLICATE"] = "kanban.duplicate";
    AppEvents["GALLERY_DELETE"] = "gallery.delete";
    AppEvents["GALLERY_DUPLICATE"] = "gallery.duplicate";
    AppEvents["BASE_DUPLICATE_START"] = "base.duplicate.start";
    AppEvents["BASE_DUPLICATE_COMPLETE"] = "base.duplicate.complete";
    AppEvents["BASE_DUPLICATE_FAIL"] = "base.duplicate.fail";
    AppEvents["TABLE_DUPLICATE_START"] = "table.duplicate.start";
    AppEvents["TABLE_DUPLICATE_COMPLETE"] = "table.duplicate.complete";
    AppEvents["TABLE_DUPLICATE_FAIL"] = "table.duplicate.fail";
    AppEvents["COLUMN_DUPLICATE_START"] = "column.duplicate.start";
    AppEvents["COLUMN_DUPLICATE_COMPLETE"] = "column.duplicate.complete";
    AppEvents["COLUMN_DUPLICATE_FAIL"] = "column.duplicate.fail";
    AppEvents["VIEW_DUPLICATE_START"] = "view.duplicate.start";
    AppEvents["VIEW_DUPLICATE_COMPLETE"] = "view.duplicate.complete";
    AppEvents["VIEW_DUPLICATE_FAIL"] = "view.duplicate.fail";
    AppEvents["USER_SIGNOUT"] = "user.signout";
    AppEvents["PROJECT_USER_DELETE"] = "base.user.delete";
    AppEvents["UI_ACL"] = "model.role.ui.acl";
    AppEvents["SNAPSHOT_CREATE"] = "snapshot.create";
    AppEvents["SNAPSHOT_DELETE"] = "snapshot.delete";
    AppEvents["SNAPSHOT_RESTORE"] = "snapshot.restore";
    AppEvents["DATA_EXPORT"] = "data.export";
    AppEvents["DATA_IMPORT"] = "data.import";
    AppEvents["USER_PROFILE_UPDATE"] = "user.profile.update";
})(AppEvents || (AppEvents = {}));
export var ClickhouseTables;
(function (ClickhouseTables) {
    ClickhouseTables["API_CALLS"] = "usage_api_calls";
    ClickhouseTables["API_COUNT"] = "usage_api_count";
    ClickhouseTables["NOTIFICATION"] = "nc_notification";
    ClickhouseTables["PAGE_SNAPSHOT"] = "docs_page_snapshot";
    ClickhouseTables["TELEMETRY"] = "usage_telemetry";
    ClickhouseTables["AUDIT"] = "nc_audit";
})(ClickhouseTables || (ClickhouseTables = {}));
export var WorkspaceStatus;
(function (WorkspaceStatus) {
    WorkspaceStatus[WorkspaceStatus["CREATING"] = 0] = "CREATING";
    WorkspaceStatus[WorkspaceStatus["CREATED"] = 1] = "CREATED";
    WorkspaceStatus[WorkspaceStatus["DELETING"] = 2] = "DELETING";
    WorkspaceStatus[WorkspaceStatus["DELETED"] = 3] = "DELETED";
    WorkspaceStatus[WorkspaceStatus["FAILED"] = 4] = "FAILED";
})(WorkspaceStatus || (WorkspaceStatus = {}));
export var WorkspacePlan;
(function (WorkspacePlan) {
    WorkspacePlan["FREE"] = "free";
    WorkspacePlan["TEAM"] = "team";
    WorkspacePlan["BUSINESS"] = "business";
})(WorkspacePlan || (WorkspacePlan = {}));
export const RoleLabels = {
    [WorkspaceUserRoles.OWNER]: 'owner',
    [WorkspaceUserRoles.CREATOR]: 'creator',
    [WorkspaceUserRoles.EDITOR]: 'editor',
    [WorkspaceUserRoles.COMMENTER]: 'commenter',
    [WorkspaceUserRoles.VIEWER]: 'viewer',
    [WorkspaceUserRoles.NO_ACCESS]: 'noaccess',
    [ProjectRoles.OWNER]: 'owner',
    [ProjectRoles.CREATOR]: 'creator',
    [ProjectRoles.EDITOR]: 'editor',
    [ProjectRoles.COMMENTER]: 'commenter',
    [ProjectRoles.VIEWER]: 'viewer',
    [ProjectRoles.NO_ACCESS]: 'noaccess',
    [OrgUserRoles.SUPER_ADMIN]: 'superAdmin',
    [OrgUserRoles.CREATOR]: 'creator',
    [OrgUserRoles.VIEWER]: 'viewer',
    [CloudOrgUserRoles.OWNER]: 'owner',
    [CloudOrgUserRoles.CREATOR]: 'creator',
    [CloudOrgUserRoles.VIEWER]: 'viewer',
};
export const RoleColors = {
    [WorkspaceUserRoles.OWNER]: 'purple',
    [WorkspaceUserRoles.CREATOR]: 'blue',
    [WorkspaceUserRoles.EDITOR]: 'green',
    [WorkspaceUserRoles.COMMENTER]: 'orange',
    [WorkspaceUserRoles.VIEWER]: 'yellow',
    [WorkspaceUserRoles.NO_ACCESS]: 'red',
    [ProjectRoles.OWNER]: 'purple',
    [ProjectRoles.CREATOR]: 'blue',
    [ProjectRoles.EDITOR]: 'green',
    [ProjectRoles.COMMENTER]: 'orange',
    [ProjectRoles.VIEWER]: 'yellow',
    [OrgUserRoles.SUPER_ADMIN]: 'maroon',
    [ProjectRoles.NO_ACCESS]: 'red',
    [OrgUserRoles.CREATOR]: 'blue',
    [OrgUserRoles.VIEWER]: 'yellow',
    [CloudOrgUserRoles.OWNER]: 'purple',
    [CloudOrgUserRoles.CREATOR]: 'blue',
    [CloudOrgUserRoles.VIEWER]: 'yellow',
};
export const RoleDescriptions = {
    [WorkspaceUserRoles.OWNER]: 'Full access to workspace',
    [WorkspaceUserRoles.CREATOR]: 'Can create bases, sync tables, views, setup web-hooks and more',
    [WorkspaceUserRoles.EDITOR]: 'Can edit data in workspace bases',
    [WorkspaceUserRoles.COMMENTER]: 'Can view and comment data in workspace bases',
    [WorkspaceUserRoles.VIEWER]: 'Can view data in workspace bases',
    [WorkspaceUserRoles.NO_ACCESS]: 'Cannot access this workspace',
    [ProjectRoles.OWNER]: 'Full access to base',
    [ProjectRoles.CREATOR]: 'Can create tables, views, setup webhook, invite collaborators and more',
    [ProjectRoles.EDITOR]: 'Can view, add & modify records, add comments on them',
    [ProjectRoles.COMMENTER]: 'Can view records and add comment on them',
    [ProjectRoles.VIEWER]: 'Can only view records',
    [ProjectRoles.NO_ACCESS]: 'Cannot access this base',
    [OrgUserRoles.SUPER_ADMIN]: 'Full access to all',
    [OrgUserRoles.CREATOR]: 'Can create bases, sync tables, views, setup web-hooks and more',
    [OrgUserRoles.VIEWER]: 'Can only view bases',
};
export const RoleIcons = {
    [WorkspaceUserRoles.OWNER]: 'role_owner',
    [WorkspaceUserRoles.CREATOR]: 'role_creator',
    [WorkspaceUserRoles.EDITOR]: 'role_editor',
    [WorkspaceUserRoles.COMMENTER]: 'role_commenter',
    [WorkspaceUserRoles.VIEWER]: 'role_viewer',
    [WorkspaceUserRoles.NO_ACCESS]: 'role_no_access',
    [ProjectRoles.OWNER]: 'role_owner',
    [ProjectRoles.CREATOR]: 'role_creator',
    [ProjectRoles.EDITOR]: 'role_editor',
    [ProjectRoles.COMMENTER]: 'role_commenter',
    [ProjectRoles.VIEWER]: 'role_viewer',
    [ProjectRoles.NO_ACCESS]: 'role_no_access',
    [OrgUserRoles.SUPER_ADMIN]: 'role_super',
    [OrgUserRoles.CREATOR]: 'role_creator',
    [OrgUserRoles.VIEWER]: 'role_viewer',
    [CloudOrgUserRoles.OWNER]: 'role_owner',
    [CloudOrgUserRoles.CREATOR]: 'role_creator',
    [CloudOrgUserRoles.VIEWER]: 'role_viewer',
};
export const WorkspaceRolesToProjectRoles = {
    [WorkspaceUserRoles.OWNER]: ProjectRoles.OWNER,
    [WorkspaceUserRoles.CREATOR]: ProjectRoles.CREATOR,
    [WorkspaceUserRoles.EDITOR]: ProjectRoles.EDITOR,
    [WorkspaceUserRoles.COMMENTER]: ProjectRoles.COMMENTER,
    [WorkspaceUserRoles.VIEWER]: ProjectRoles.VIEWER,
    [WorkspaceUserRoles.NO_ACCESS]: ProjectRoles.NO_ACCESS,
};
export const OrderedWorkspaceRoles = [
    WorkspaceUserRoles.OWNER,
    WorkspaceUserRoles.CREATOR,
    WorkspaceUserRoles.EDITOR,
    WorkspaceUserRoles.COMMENTER,
    WorkspaceUserRoles.VIEWER,
    WorkspaceUserRoles.NO_ACCESS,
];
export const OrderedOrgRoles = [
    OrgUserRoles.SUPER_ADMIN,
    OrgUserRoles.CREATOR,
    OrgUserRoles.VIEWER,
];
export const OrderedProjectRoles = [
    ProjectRoles.OWNER,
    ProjectRoles.CREATOR,
    ProjectRoles.EDITOR,
    ProjectRoles.COMMENTER,
    ProjectRoles.VIEWER,
    ProjectRoles.NO_ACCESS,
];
export var APIContext;
(function (APIContext) {
    APIContext["VIEW_COLUMNS"] = "fields";
    APIContext["FILTERS"] = "filters";
    APIContext["SORTS"] = "sorts";
})(APIContext || (APIContext = {}));
export var SourceRestriction;
(function (SourceRestriction) {
    SourceRestriction["SCHEMA_READONLY"] = "is_schema_readonly";
    SourceRestriction["DATA_READONLY"] = "is_data_readonly";
})(SourceRestriction || (SourceRestriction = {}));
export var ClientType;
(function (ClientType) {
    ClientType["MYSQL"] = "mysql2";
    ClientType["MSSQL"] = "mssql";
    ClientType["PG"] = "pg";
    ClientType["SQLITE"] = "sqlite3";
    ClientType["VITESS"] = "vitess";
    ClientType["SNOWFLAKE"] = "snowflake";
    ClientType["DATABRICKS"] = "databricks";
})(ClientType || (ClientType = {}));
export var SSLUsage;
(function (SSLUsage) {
    SSLUsage["No"] = "No";
    SSLUsage["Allowed"] = "Allowed";
    SSLUsage["Preferred"] = "Preferred";
    SSLUsage["Required"] = "Required";
    SSLUsage["RequiredWithCa"] = "Required-CA";
    SSLUsage["RequiredWithIdentity"] = "Required-Identity";
})(SSLUsage || (SSLUsage = {}));
export var SyncDataType;
(function (SyncDataType) {
    // Database
    SyncDataType["NOCODB"] = "nocodb";
    SyncDataType["MICROSOFT_ACCESS"] = "microsoft-access";
    SyncDataType["TABLEAU"] = "tableau";
    SyncDataType["ORACLE"] = "oracle";
    // AI
    SyncDataType["OPENAI"] = "openai";
    SyncDataType["CLAUDE"] = "claude";
    SyncDataType["OLLAMA"] = "ollama";
    SyncDataType["GROQ"] = "groq";
    // Communication
    SyncDataType["SLACK"] = "slack";
    SyncDataType["DISCORD"] = "discord";
    SyncDataType["TWILLO"] = "twillo";
    SyncDataType["MICROSOFT_OUTLOOK"] = "microsoft-outlook";
    SyncDataType["MICROSOFT_TEAMS"] = "microsoft-teams";
    SyncDataType["TELEGRAM"] = "telegram";
    SyncDataType["GMAIL"] = "gmail";
    SyncDataType["WHATSAPP"] = "whatsapp";
    // Project Management
    SyncDataType["ASANA"] = "asana";
    SyncDataType["JIRA"] = "jira";
    SyncDataType["MIRO"] = "miro";
    SyncDataType["TRELLO"] = "trello";
    // CRM
    SyncDataType["SALESFORCE"] = "salesforce";
    SyncDataType["PIPEDRIVE"] = "pipedrive";
    SyncDataType["MICROSOFT_DYNAMICS_365"] = "microsoft-dynamics-365";
    SyncDataType["ZOHO_CRM"] = "zoho-crm";
    // Marketing
    SyncDataType["HUBSPOT"] = "hubspot";
    SyncDataType["MAILCHIMP"] = "mailchimp";
    SyncDataType["SURVEYMONKEY"] = "surveymonkey";
    SyncDataType["TYPEFORM"] = "typeform";
    // ATS
    SyncDataType["WORKDAY"] = "workday";
    SyncDataType["GREENHOUSE"] = "greenhouse";
    SyncDataType["LEVER"] = "lever";
    // Development
    SyncDataType["GITHUB"] = "github";
    SyncDataType["GITLAB"] = "gitlab";
    SyncDataType["BITBUCKET"] = "bitbucket";
    // Finance
    SyncDataType["STRIPE"] = "stripe";
    SyncDataType["QUICKBOOKS"] = "quickbooks";
    // Ticketing
    SyncDataType["FRESHDESK"] = "freshdesk";
    SyncDataType["INTERCOM"] = "intercom";
    SyncDataType["ZENDESK"] = "zendesk";
    SyncDataType["HUBSPOT_SERVICE_HUB"] = "hubspot-service-hub";
    SyncDataType["SALESFORCE_SERVICE_CLOUD"] = "salesforce-service-cloud";
    // Storage
    SyncDataType["BOX"] = "box";
    SyncDataType["GOOGLE_DRIVE"] = "google-drive";
    SyncDataType["DROPBOX"] = "dropbox";
    // Others
    SyncDataType["APPLE_NUMBERS"] = "apple-numbers";
    SyncDataType["GOOGLE_CALENDAR"] = "google-calendar";
    SyncDataType["MICROSOFT_EXCEL"] = "microsoft-excel";
    SyncDataType["GOOGLE_SHEETS"] = "google-sheets";
})(SyncDataType || (SyncDataType = {}));
export var IntegrationCategoryType;
(function (IntegrationCategoryType) {
    IntegrationCategoryType["DATABASE"] = "database";
    IntegrationCategoryType["AI"] = "ai";
    IntegrationCategoryType["COMMUNICATION"] = "communication";
    IntegrationCategoryType["SPREAD_SHEET"] = "spread-sheet";
    IntegrationCategoryType["PROJECT_MANAGEMENT"] = "project-management";
    IntegrationCategoryType["CRM"] = "crm";
    IntegrationCategoryType["MARKETING"] = "marketing";
    IntegrationCategoryType["ATS"] = "ats";
    IntegrationCategoryType["DEVELOPMENT"] = "development";
    IntegrationCategoryType["FINANCE"] = "finance";
    IntegrationCategoryType["TICKETING"] = "ticketing";
    IntegrationCategoryType["STORAGE"] = "storage";
    IntegrationCategoryType["OTHERS"] = "others";
    IntegrationCategoryType["SYNC"] = "sync";
    IntegrationCategoryType["AUTH"] = "auth";
})(IntegrationCategoryType || (IntegrationCategoryType = {}));
export var ViewLockType;
(function (ViewLockType) {
    ViewLockType["Personal"] = "personal";
    ViewLockType["Locked"] = "locked";
    ViewLockType["Collaborative"] = "collaborative";
})(ViewLockType || (ViewLockType = {}));
export var PublicAttachmentScope;
(function (PublicAttachmentScope) {
    PublicAttachmentScope["WORKSPACEPICS"] = "workspacePics";
    PublicAttachmentScope["PROFILEPICS"] = "profilePics";
    PublicAttachmentScope["ORGANIZATIONPICS"] = "organizationPics";
})(PublicAttachmentScope || (PublicAttachmentScope = {}));
export var IconType;
(function (IconType) {
    IconType["IMAGE"] = "IMAGE";
    IconType["EMOJI"] = "EMOJI";
    IconType["ICON"] = "ICON";
})(IconType || (IconType = {}));
export var NcApiVersion;
(function (NcApiVersion) {
    NcApiVersion[NcApiVersion["V1"] = 0] = "V1";
    NcApiVersion[NcApiVersion["V2"] = 1] = "V2";
    NcApiVersion[NcApiVersion["V3"] = 2] = "V3";
})(NcApiVersion || (NcApiVersion = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2VudW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBTixJQUFZLFlBSVg7QUFKRCxXQUFZLFlBQVk7SUFDdEIscUNBQXFCLENBQUE7SUFDckIsNkNBQTZCLENBQUE7SUFDN0IsMkNBQTJCLENBQUE7QUFDN0IsQ0FBQyxFQUpXLFlBQVksS0FBWixZQUFZLFFBSXZCO0FBRUQsTUFBTSxDQUFOLElBQVksaUJBSVg7QUFKRCxXQUFZLGlCQUFpQjtJQUMzQix3REFBbUMsQ0FBQTtJQUNuQyxzREFBaUMsQ0FBQTtJQUNqQyxvREFBK0IsQ0FBQTtBQUNqQyxDQUFDLEVBSlcsaUJBQWlCLEtBQWpCLGlCQUFpQixRQUk1QjtBQUVELE1BQU0sQ0FBTixJQUFZLFlBT1g7QUFQRCxXQUFZLFlBQVk7SUFDdEIsK0JBQWUsQ0FBQTtJQUNmLG1DQUFtQixDQUFBO0lBQ25CLGlDQUFpQixDQUFBO0lBQ2pCLHVDQUF1QixDQUFBO0lBQ3ZCLGlDQUFpQixDQUFBO0lBQ2pCLHVDQUF1QixDQUFBO0FBQ3pCLENBQUMsRUFQVyxZQUFZLEtBQVosWUFBWSxRQU92QjtBQUVELE1BQU0sQ0FBTixJQUFZLGtCQU9YO0FBUEQsV0FBWSxrQkFBa0I7SUFDNUIscURBQStCLENBQUE7SUFDL0IseURBQW1DLENBQUE7SUFDbkMsdURBQWlDLENBQUE7SUFDakMsNkRBQXVDLENBQUE7SUFDdkMsdURBQWlDLENBQUE7SUFDakMsNkRBQXVDLENBQUE7QUFDekMsQ0FBQyxFQVBXLGtCQUFrQixLQUFsQixrQkFBa0IsUUFPN0I7QUFFRCxNQUFNLENBQU4sSUFBWSxTQStLWDtBQS9LRCxXQUFZLFNBQVM7SUFDbkIsMkNBQThCLENBQUE7SUFDOUIsMkNBQThCLENBQUE7SUFDOUIscURBQXdDLENBQUE7SUFDeEMsbUVBQXNELENBQUE7SUFDdEQsMkNBQThCLENBQUE7SUFDOUIsMkNBQThCLENBQUE7SUFDOUIseUNBQTRCLENBQUE7SUFFNUIsb0NBQXVCLENBQUE7SUFFdkIsdURBQTBDLENBQUE7SUFDMUMsNERBQStDLENBQUE7SUFDL0MsNERBQStDLENBQUE7SUFDL0Msa0RBQXFDLENBQUE7SUFDckMsa0RBQXFDLENBQUE7SUFDckMsa0RBQXFDLENBQUE7SUFDckMsb0VBQXVELENBQUE7SUFFdkQsd0NBQTJCLENBQUE7SUFDM0Isd0NBQTJCLENBQUE7SUFDM0Isd0NBQTJCLENBQUE7SUFDM0Isd0NBQTJCLENBQUE7SUFDM0Isd0RBQTJDLENBQUE7SUFDM0MsMERBQTZDLENBQUE7SUFDN0MsMERBQTZDLENBQUE7SUFDN0Msd0NBQTJCLENBQUE7SUFDM0IsZ0VBQW1ELENBQUE7SUFFbkQsMENBQTZCLENBQUE7SUFDN0IsMENBQTZCLENBQUE7SUFDN0IsMENBQTZCLENBQUE7SUFFN0Isd0NBQTJCLENBQUE7SUFDM0Isd0NBQTJCLENBQUE7SUFDM0Isd0NBQTJCLENBQUE7SUFFM0Isc0RBQXlDLENBQUE7SUFDekMsc0RBQXlDLENBQUE7SUFDekMsc0RBQXlDLENBQUE7SUFFekMsNENBQStCLENBQUE7SUFDL0IsNENBQStCLENBQUE7SUFDL0IsNENBQStCLENBQUE7SUFFL0Isd0NBQTJCLENBQUE7SUFDM0Isd0NBQTJCLENBQUE7SUFDM0Isd0NBQTJCLENBQUE7SUFFM0IsNENBQStCLENBQUE7SUFDL0IsNENBQStCLENBQUE7SUFDL0IsNENBQStCLENBQUE7SUFFL0Isd0NBQTJCLENBQUE7SUFDM0Isd0NBQTJCLENBQUE7SUFDM0Isd0NBQTJCLENBQUE7SUFFM0IsZ0RBQW1DLENBQUE7SUFDbkMsOERBQWlELENBQUE7SUFFakQsc0RBQXlDLENBQUE7SUFDekMsc0RBQXlDLENBQUE7SUFFekMsa0RBQXFDLENBQUE7SUFDckMsa0RBQXFDLENBQUE7SUFDckMsa0RBQXFDLENBQUE7SUFDckMsMENBQTZCLENBQUE7SUFFN0Isc0RBQXlDLENBQUE7SUFFekMsd0NBQTJCLENBQUE7SUFDM0Isd0NBQTJCLENBQUE7SUFFM0IsOENBQWlDLENBQUE7SUFDakMsOENBQWlDLENBQUE7SUFFakMsc0NBQXlCLENBQUE7SUFDekIsc0NBQXlCLENBQUE7SUFDekIsc0NBQXlCLENBQUE7SUFFekIsNENBQStCLENBQUE7SUFDL0IsNENBQStCLENBQUE7SUFFL0IsOENBQWlDLENBQUE7SUFFakMsd0NBQTJCLENBQUE7SUFDM0Isd0NBQTJCLENBQUE7SUFFM0Isc0RBQXlDLENBQUE7SUFFekMsOENBQWlDLENBQUE7SUFDakMsOENBQWlDLENBQUE7SUFDakMsOENBQWlDLENBQUE7SUFDakMsMENBQTZCLENBQUE7SUFDN0IsZ0RBQW1DLENBQUE7SUFFbkMsNENBQStCLENBQUE7SUFFL0IsMERBQTZDLENBQUE7SUFDN0MsMERBQTZDLENBQUE7SUFDN0MsMERBQTZDLENBQUE7SUFFN0Msd0NBQTJCLENBQUE7SUFDM0IsOENBQWlDLENBQUE7SUFDakMsa0RBQXFDLENBQUE7SUFFckMsc0RBQXlDLENBQUE7SUFDekMsc0RBQXlDLENBQUE7SUFDekMsc0RBQXlDLENBQUE7SUFFekMsZ0RBQW1DLENBQUE7SUFDbkMsZ0RBQW1DLENBQUE7SUFFbkMsb0VBQXVELENBQUE7SUFDdkQsZ0VBQW1ELENBQUE7SUFFbkQsb0RBQXVDLENBQUE7SUFFdkMsMENBQTZCLENBQUE7SUFFN0Isa0RBQXFDLENBQUE7SUFDckMsa0RBQXFDLENBQUE7SUFDckMsa0RBQXFDLENBQUE7SUFFckMsOENBQWlDLENBQUE7SUFDakMsOENBQWlDLENBQUE7SUFDakMsOENBQWlDLENBQUE7SUFDakMsc0RBQXlDLENBQUE7SUFDekMsc0RBQXlDLENBQUE7SUFDekMsc0RBQXlDLENBQUE7SUFFekMsa0RBQXFDLENBQUE7SUFDckMsZ0RBQW1DLENBQUE7SUFDbkMsOENBQWlDLENBQUE7SUFDakMsZ0RBQW1DLENBQUE7SUFDbkMsZ0RBQW1DLENBQUE7SUFDbkMsd0NBQTJCLENBQUE7SUFFM0IsNENBQStCLENBQUE7SUFDL0IsNENBQStCLENBQUE7SUFDL0IsNENBQStC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