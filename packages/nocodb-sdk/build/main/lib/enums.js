"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NcApiVersion = exports.IconType = exports.PublicAttachmentScope = exports.ViewLockType = exports.IntegrationCategoryType = exports.SyncDataType = exports.SSLUsage = exports.ClientType = exports.SourceRestriction = exports.APIContext = exports.OrderedProjectRoles = exports.OrderedOrgRoles = exports.OrderedWorkspaceRoles = exports.WorkspaceRolesToProjectRoles = exports.RoleIcons = exports.RoleDescriptions = exports.RoleColors = exports.RoleLabels = exports.WorkspacePlan = exports.WorkspaceStatus = exports.ClickhouseTables = exports.AppEvents = exports.WorkspaceUserRoles = exports.ProjectRoles = exports.CloudOrgUserRoles = exports.OrgUserRoles = void 0;
var OrgUserRoles;
(function (OrgUserRoles) {
    OrgUserRoles["SUPER_ADMIN"] = "super";
    OrgUserRoles["CREATOR"] = "org-level-creator";
    OrgUserRoles["VIEWER"] = "org-level-viewer";
})(OrgUserRoles || (exports.OrgUserRoles = OrgUserRoles = {}));
var CloudOrgUserRoles;
(function (CloudOrgUserRoles) {
    CloudOrgUserRoles["CREATOR"] = "cloud-org-level-creator";
    CloudOrgUserRoles["VIEWER"] = "cloud-org-level-viewer";
    CloudOrgUserRoles["OWNER"] = "cloud-org-level-owner";
})(CloudOrgUserRoles || (exports.CloudOrgUserRoles = CloudOrgUserRoles = {}));
var ProjectRoles;
(function (ProjectRoles) {
    ProjectRoles["OWNER"] = "owner";
    ProjectRoles["CREATOR"] = "creator";
    ProjectRoles["EDITOR"] = "editor";
    ProjectRoles["COMMENTER"] = "commenter";
    ProjectRoles["VIEWER"] = "viewer";
    ProjectRoles["NO_ACCESS"] = "no-access";
})(ProjectRoles || (exports.ProjectRoles = ProjectRoles = {}));
var WorkspaceUserRoles;
(function (WorkspaceUserRoles) {
    WorkspaceUserRoles["OWNER"] = "workspace-level-owner";
    WorkspaceUserRoles["CREATOR"] = "workspace-level-creator";
    WorkspaceUserRoles["EDITOR"] = "workspace-level-editor";
    WorkspaceUserRoles["COMMENTER"] = "workspace-level-commenter";
    WorkspaceUserRoles["VIEWER"] = "workspace-level-viewer";
    WorkspaceUserRoles["NO_ACCESS"] = "workspace-level-no-access";
})(WorkspaceUserRoles || (exports.WorkspaceUserRoles = WorkspaceUserRoles = {}));
var AppEvents;
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
})(AppEvents || (exports.AppEvents = AppEvents = {}));
var ClickhouseTables;
(function (ClickhouseTables) {
    ClickhouseTables["API_CALLS"] = "usage_api_calls";
    ClickhouseTables["API_COUNT"] = "usage_api_count";
    ClickhouseTables["NOTIFICATION"] = "nc_notification";
    ClickhouseTables["PAGE_SNAPSHOT"] = "docs_page_snapshot";
    ClickhouseTables["TELEMETRY"] = "usage_telemetry";
    ClickhouseTables["AUDIT"] = "nc_audit";
})(ClickhouseTables || (exports.ClickhouseTables = ClickhouseTables = {}));
var WorkspaceStatus;
(function (WorkspaceStatus) {
    WorkspaceStatus[WorkspaceStatus["CREATING"] = 0] = "CREATING";
    WorkspaceStatus[WorkspaceStatus["CREATED"] = 1] = "CREATED";
    WorkspaceStatus[WorkspaceStatus["DELETING"] = 2] = "DELETING";
    WorkspaceStatus[WorkspaceStatus["DELETED"] = 3] = "DELETED";
    WorkspaceStatus[WorkspaceStatus["FAILED"] = 4] = "FAILED";
})(WorkspaceStatus || (exports.WorkspaceStatus = WorkspaceStatus = {}));
var WorkspacePlan;
(function (WorkspacePlan) {
    WorkspacePlan["FREE"] = "free";
    WorkspacePlan["TEAM"] = "team";
    WorkspacePlan["BUSINESS"] = "business";
})(WorkspacePlan || (exports.WorkspacePlan = WorkspacePlan = {}));
exports.RoleLabels = {
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
exports.RoleColors = {
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
exports.RoleDescriptions = {
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
exports.RoleIcons = {
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
exports.WorkspaceRolesToProjectRoles = {
    [WorkspaceUserRoles.OWNER]: ProjectRoles.OWNER,
    [WorkspaceUserRoles.CREATOR]: ProjectRoles.CREATOR,
    [WorkspaceUserRoles.EDITOR]: ProjectRoles.EDITOR,
    [WorkspaceUserRoles.COMMENTER]: ProjectRoles.COMMENTER,
    [WorkspaceUserRoles.VIEWER]: ProjectRoles.VIEWER,
    [WorkspaceUserRoles.NO_ACCESS]: ProjectRoles.NO_ACCESS,
};
exports.OrderedWorkspaceRoles = [
    WorkspaceUserRoles.OWNER,
    WorkspaceUserRoles.CREATOR,
    WorkspaceUserRoles.EDITOR,
    WorkspaceUserRoles.COMMENTER,
    WorkspaceUserRoles.VIEWER,
    WorkspaceUserRoles.NO_ACCESS,
];
exports.OrderedOrgRoles = [
    OrgUserRoles.SUPER_ADMIN,
    OrgUserRoles.CREATOR,
    OrgUserRoles.VIEWER,
];
exports.OrderedProjectRoles = [
    ProjectRoles.OWNER,
    ProjectRoles.CREATOR,
    ProjectRoles.EDITOR,
    ProjectRoles.COMMENTER,
    ProjectRoles.VIEWER,
    ProjectRoles.NO_ACCESS,
];
var APIContext;
(function (APIContext) {
    APIContext["VIEW_COLUMNS"] = "fields";
    APIContext["FILTERS"] = "filters";
    APIContext["SORTS"] = "sorts";
})(APIContext || (exports.APIContext = APIContext = {}));
var SourceRestriction;
(function (SourceRestriction) {
    SourceRestriction["SCHEMA_READONLY"] = "is_schema_readonly";
    SourceRestriction["DATA_READONLY"] = "is_data_readonly";
})(SourceRestriction || (exports.SourceRestriction = SourceRestriction = {}));
var ClientType;
(function (ClientType) {
    ClientType["MYSQL"] = "mysql2";
    ClientType["MSSQL"] = "mssql";
    ClientType["PG"] = "pg";
    ClientType["SQLITE"] = "sqlite3";
    ClientType["VITESS"] = "vitess";
    ClientType["SNOWFLAKE"] = "snowflake";
    ClientType["DATABRICKS"] = "databricks";
})(ClientType || (exports.ClientType = ClientType = {}));
var SSLUsage;
(function (SSLUsage) {
    SSLUsage["No"] = "No";
    SSLUsage["Allowed"] = "Allowed";
    SSLUsage["Preferred"] = "Preferred";
    SSLUsage["Required"] = "Required";
    SSLUsage["RequiredWithCa"] = "Required-CA";
    SSLUsage["RequiredWithIdentity"] = "Required-Identity";
})(SSLUsage || (exports.SSLUsage = SSLUsage = {}));
var SyncDataType;
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
})(SyncDataType || (exports.SyncDataType = SyncDataType = {}));
var IntegrationCategoryType;
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
})(IntegrationCategoryType || (exports.IntegrationCategoryType = IntegrationCategoryType = {}));
var ViewLockType;
(function (ViewLockType) {
    ViewLockType["Personal"] = "personal";
    ViewLockType["Locked"] = "locked";
    ViewLockType["Collaborative"] = "collaborative";
})(ViewLockType || (exports.ViewLockType = ViewLockType = {}));
var PublicAttachmentScope;
(function (PublicAttachmentScope) {
    PublicAttachmentScope["WORKSPACEPICS"] = "workspacePics";
    PublicAttachmentScope["PROFILEPICS"] = "profilePics";
    PublicAttachmentScope["ORGANIZATIONPICS"] = "organizationPics";
})(PublicAttachmentScope || (exports.PublicAttachmentScope = PublicAttachmentScope = {}));
var IconType;
(function (IconType) {
    IconType["IMAGE"] = "IMAGE";
    IconType["EMOJI"] = "EMOJI";
    IconType["ICON"] = "ICON";
})(IconType || (exports.IconType = IconType = {}));
var NcApiVersion;
(function (NcApiVersion) {
    NcApiVersion[NcApiVersion["V1"] = 0] = "V1";
    NcApiVersion[NcApiVersion["V2"] = 1] = "V2";
    NcApiVersion[NcApiVersion["V3"] = 2] = "V3";
})(NcApiVersion || (exports.NcApiVersion = NcApiVersion = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2VudW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQVksWUFJWDtBQUpELFdBQVksWUFBWTtJQUN0QixxQ0FBcUIsQ0FBQTtJQUNyQiw2Q0FBNkIsQ0FBQTtJQUM3QiwyQ0FBMkIsQ0FBQTtBQUM3QixDQUFDLEVBSlcsWUFBWSw0QkFBWixZQUFZLFFBSXZCO0FBRUQsSUFBWSxpQkFJWDtBQUpELFdBQVksaUJBQWlCO0lBQzNCLHdEQUFtQyxDQUFBO0lBQ25DLHNEQUFpQyxDQUFBO0lBQ2pDLG9EQUErQixDQUFBO0FBQ2pDLENBQUMsRUFKVyxpQkFBaUIsaUNBQWpCLGlCQUFpQixRQUk1QjtBQUVELElBQVksWUFPWDtBQVBELFdBQVksWUFBWTtJQUN0QiwrQkFBZSxDQUFBO0lBQ2YsbUNBQW1CLENBQUE7SUFDbkIsaUNBQWlCLENBQUE7SUFDakIsdUNBQXVCLENBQUE7SUFDdkIsaUNBQWlCLENBQUE7SUFDakIsdUNBQXVCLENBQUE7QUFDekIsQ0FBQyxFQVBXLFlBQVksNEJBQVosWUFBWSxRQU92QjtBQUVELElBQVksa0JBT1g7QUFQRCxXQUFZLGtCQUFrQjtJQUM1QixxREFBK0IsQ0FBQTtJQUMvQix5REFBbUMsQ0FBQTtJQUNuQyx1REFBaUMsQ0FBQTtJQUNqQyw2REFBdUMsQ0FBQTtJQUN2Qyx1REFBaUMsQ0FBQTtJQUNqQyw2REFBdUMsQ0FBQTtBQUN6QyxDQUFDLEVBUFcsa0JBQWtCLGtDQUFsQixrQkFBa0IsUUFPN0I7QUFFRCxJQUFZLFNBK0tYO0FBL0tELFdBQVksU0FBUztJQUNuQiwyQ0FBOEIsQ0FBQTtJQUM5QiwyQ0FBOEIsQ0FBQTtJQUM5QixxREFBd0MsQ0FBQTtJQUN4QyxtRUFBc0QsQ0FBQTtJQUN0RCwyQ0FBOEIsQ0FBQTtJQUM5QiwyQ0FBOEIsQ0FBQTtJQUM5Qix5Q0FBNEIsQ0FBQTtJQUU1QixvQ0FBdUIsQ0FBQTtJQUV2Qix1REFBMEMsQ0FBQTtJQUMxQyw0REFBK0MsQ0FBQTtJQUMvQyw0REFBK0MsQ0FBQTtJQUMvQyxrREFBcUMsQ0FBQTtJQUNyQyxrREFBcUMsQ0FBQTtJQUNyQyxrREFBcUMsQ0FBQTtJQUNyQyxvRUFBdUQsQ0FBQTtJQUV2RCx3Q0FBMkIsQ0FBQTtJQUMzQix3Q0FBMkIsQ0FBQTtJQUMzQix3Q0FBMkIsQ0FBQTtJQUMzQix3Q0FBMkIsQ0FBQTtJQUMzQix3REFBMkMsQ0FBQTtJQUMzQywwREFBNkMsQ0FBQTtJQUM3QywwREFBNkMsQ0FBQTtJQUM3Qyx3Q0FBMkIsQ0FBQTtJQUMzQixnRUFBbUQsQ0FBQTtJQUVuRCwwQ0FBNkIsQ0FBQTtJQUM3QiwwQ0FBNkIsQ0FBQTtJQUM3QiwwQ0FBNkIsQ0FBQTtJQUU3Qix3Q0FBMkIsQ0FBQTtJQUMzQix3Q0FBMkIsQ0FBQTtJQUMzQix3Q0FBMkIsQ0FBQTtJQUUzQixzREFBeUMsQ0FBQTtJQUN6QyxzREFBeUMsQ0FBQTtJQUN6QyxzREFBeUMsQ0FBQTtJQUV6Qyw0Q0FBK0IsQ0FBQTtJQUMvQiw0Q0FBK0IsQ0FBQTtJQUMvQiw0Q0FBK0IsQ0FBQTtJQUUvQix3Q0FBMkIsQ0FBQTtJQUMzQix3Q0FBMkIsQ0FBQTtJQUMzQix3Q0FBMkIsQ0FBQTtJQUUzQiw0Q0FBK0IsQ0FBQTtJQUMvQiw0Q0FBK0IsQ0FBQTtJQUMvQiw0Q0FBK0IsQ0FBQTtJQUUvQix3Q0FBMkIsQ0FBQTtJQUMzQix3Q0FBMkIsQ0FBQTtJQUMzQix3Q0FBMkIsQ0FBQTtJQUUzQixnREFBbUMsQ0FBQTtJQUNuQyw4REFBaUQsQ0FBQTtJQUVqRCxzREFBeUMsQ0FBQTtJQUN6QyxzREFBeUMsQ0FBQTtJQUV6QyxrREFBcUMsQ0FBQTtJQUNyQyxrREFBcUMsQ0FBQTtJQUNyQyxrREFBcUMsQ0FBQTtJQUNyQywwQ0FBNkIsQ0FBQTtJQUU3QixzREFBeUMsQ0FBQTtJQUV6Qyx3Q0FBMkIsQ0FBQTtJQUMzQix3Q0FBMkIsQ0FBQTtJQUUzQiw4Q0FBaUMsQ0FBQTtJQUNqQyw4Q0FBaUMsQ0FBQTtJQUVqQyxzQ0FBeUIsQ0FBQTtJQUN6QixzQ0FBeUIsQ0FBQTtJQUN6QixzQ0FBeUIsQ0FBQTtJQUV6Qiw0Q0FBK0IsQ0FBQTtJQUMvQiw0Q0FBK0IsQ0FBQTtJQUUvQiw4Q0FBaUMsQ0FBQTtJQUVqQyx3Q0FBMkIsQ0FBQTtJQUMzQix3Q0FBMkIsQ0FBQTtJQUUzQixzREFBeUMsQ0FBQTtJQUV6Qyw4Q0FBaUMsQ0FBQTtJQUNqQyw4Q0FBaUMsQ0FBQTtJQUNqQyw4Q0FBaUMsQ0FBQTtJQUNqQywwQ0FBNkIsQ0FBQTtJQUM3QixnREFBbUMsQ0FBQTtJQUVuQyw0Q0FBK0IsQ0FBQTtJQUUvQiwwREFBNkMsQ0FBQTtJQUM3QywwREFBNkMsQ0FBQTtJQUM3QywwREFBNkMsQ0FBQTtJQUU3Qyx3Q0FBMkIsQ0FBQTtJQUMzQiw4Q0FBaUMsQ0FBQTtJQUNqQyxrREFBcUMsQ0FBQTtJQUVyQyxzREFBeUMsQ0FBQTtJQUN6QyxzREFBeUMsQ0FBQTtJQUN6QyxzREFBeUMsQ0FBQTtJQUV6QyxnREFBbUMsQ0FBQTtJQUNuQyxnREFBbUMsQ0FBQTtJQUVuQyxvRUFBdUQsQ0FBQTtJQUN2RCxnRUFBbUQsQ0FBQTtJQUVuRCxvREFBdUMsQ0FBQTtJQUV2QywwQ0FBNkIsQ0FBQTtJQUU3QixrREFBcUMsQ0FBQTtJQUNyQyxrREFBcUMsQ0FBQTtJQUNyQyxrREFBcUMsQ0FBQTtJQUVyQyw4Q0FBaUMsQ0FBQTtJQUNqQyw4Q0FBaUMsQ0FBQTtJQUNqQyw4Q0FBaUMsQ0FBQTtJQUNqQyxzREFBeUMsQ0FBQTtJQUN6QyxzREFBeUMsQ0FBQTtJQUN6QyxzREFBeUMsQ0FBQTtJQUV6QyxrREFBcUMsQ0FBQTtJQUNyQyxnREFBbUMsQ0FBQTtJQUNuQyw4Q0FBaUMsQ0FBQTtJQUNqQyxnREFBbUMsQ0FBQTtJQUNuQyxnREFBbUMsQ0FBQTtJQUNuQyx3Q0FBMkIsQ0FBQTtJQUUzQiw0Q0FBK0IsQ0FBQTtJQUMvQiw0Q0FBK0IsQ0FBQTtJQUMvQiw0Q0FBK0IsQ0FBQTtJQUMvQixnRUFBbUQsQ0FBQTtJQUNuRCx3Q0FBMkIsQ0FBQTtJ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