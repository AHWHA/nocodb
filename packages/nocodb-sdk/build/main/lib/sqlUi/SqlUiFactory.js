"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlUiFactory = void 0;
const MssqlUi_1 = require("./MssqlUi");
const MysqlUi_1 = require("./MysqlUi");
const OracleUi_1 = require("./OracleUi");
const PgUi_1 = require("./PgUi");
const SqliteUi_1 = require("./SqliteUi");
const SnowflakeUi_1 = require("./SnowflakeUi");
const DatabricksUi_1 = require("./DatabricksUi");
// import {YugabyteUi} from "./YugabyteUi";
// import {TidbUi} from "./TidbUi";
// import {VitessUi} from "./VitessUi";
class SqlUiFactory {
    static create(connectionConfig) {
        // connectionConfig.meta = connectionConfig.meta || {};
        // connectionConfig.meta.dbtype = connectionConfig.meta.dbtype || "";
        if (connectionConfig.client === 'mysql' ||
            connectionConfig.client === 'mysql2') {
            // if (connectionConfig.meta.dbtype === "tidb")
            //   return Tidb;
            // if (connectionConfig.meta.dbtype === "vitess")
            //   return Vitess;
            return new MysqlUi_1.MysqlUi();
        }
        if (connectionConfig.client === 'sqlite3') {
            return new SqliteUi_1.SqliteUi();
        }
        if (connectionConfig.client === 'mssql') {
            return new MssqlUi_1.MssqlUi();
        }
        if (connectionConfig.client === 'oracledb') {
            return new OracleUi_1.OracleUi();
        }
        if (connectionConfig.client === 'pg') {
            // if (connectionConfig.meta.dbtype === "yugabyte")
            //   return Yugabyte;
            return new PgUi_1.PgUi();
        }
        if (connectionConfig.client === 'snowflake') {
            return new SnowflakeUi_1.SnowflakeUi();
        }
        if (connectionConfig.client === 'databricks') {
            return new DatabricksUi_1.DatabricksUi();
        }
        throw new Error('Database not supported');
    }
}
exports.SqlUiFactory = SqlUiFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3FsVWlGYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9zcWxVaS9TcWxVaUZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsdUNBQW9DO0FBQ3BDLHVDQUFvQztBQUNwQyx5Q0FBc0M7QUFDdEMsaUNBQThCO0FBQzlCLHlDQUFzQztBQUN0QywrQ0FBNEM7QUFDNUMsaURBQThDO0FBRzlDLDJDQUEyQztBQUMzQyxtQ0FBbUM7QUFDbkMsdUNBQXVDO0FBRXZDLE1BQWEsWUFBWTtJQUN2QixNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQjtRQUM1Qix1REFBdUQ7UUFDdkQscUVBQXFFO1FBQ3JFLElBQ0UsZ0JBQWdCLENBQUMsTUFBTSxLQUFLLE9BQU87WUFDbkMsZ0JBQWdCLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFDcEMsQ0FBQztZQUNELCtDQUErQztZQUMvQyxpQkFBaUI7WUFDakIsaURBQWlEO1lBQ2pELG1CQUFtQjtZQUVuQixPQUFPLElBQUksaUJBQU8sRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxJQUFJLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMxQyxPQUFPLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUN4QyxPQUFPLElBQUksaUJBQU8sRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxJQUFJLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUUsQ0FBQztZQUMzQyxPQUFPLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFFRCxJQUFJLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNyQyxtREFBbUQ7WUFDbkQscUJBQXFCO1lBQ3JCLE9BQU8sSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDNUMsT0FBTyxJQUFJLHlCQUFXLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBRUQsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssWUFBWSxFQUFFLENBQUM7WUFDN0MsT0FBTyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDRjtBQTFDRCxvQ0EwQ0MifQ==