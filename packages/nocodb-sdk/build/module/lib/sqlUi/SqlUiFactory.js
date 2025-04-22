import { MssqlUi } from './MssqlUi';
import { MysqlUi } from './MysqlUi';
import { OracleUi } from './OracleUi';
import { PgUi } from './PgUi';
import { SqliteUi } from './SqliteUi';
import { SnowflakeUi } from './SnowflakeUi';
import { DatabricksUi } from './DatabricksUi';
// import {YugabyteUi} from "./YugabyteUi";
// import {TidbUi} from "./TidbUi";
// import {VitessUi} from "./VitessUi";
export class SqlUiFactory {
    static create(connectionConfig) {
        // connectionConfig.meta = connectionConfig.meta || {};
        // connectionConfig.meta.dbtype = connectionConfig.meta.dbtype || "";
        if (connectionConfig.client === 'mysql' ||
            connectionConfig.client === 'mysql2') {
            // if (connectionConfig.meta.dbtype === "tidb")
            //   return Tidb;
            // if (connectionConfig.meta.dbtype === "vitess")
            //   return Vitess;
            return new MysqlUi();
        }
        if (connectionConfig.client === 'sqlite3') {
            return new SqliteUi();
        }
        if (connectionConfig.client === 'mssql') {
            return new MssqlUi();
        }
        if (connectionConfig.client === 'oracledb') {
            return new OracleUi();
        }
        if (connectionConfig.client === 'pg') {
            // if (connectionConfig.meta.dbtype === "yugabyte")
            //   return Yugabyte;
            return new PgUi();
        }
        if (connectionConfig.client === 'snowflake') {
            return new SnowflakeUi();
        }
        if (connectionConfig.client === 'databricks') {
            return new DatabricksUi();
        }
        throw new Error('Database not supported');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3FsVWlGYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9zcWxVaS9TcWxVaUZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLDJDQUEyQztBQUMzQyxtQ0FBbUM7QUFDbkMsdUNBQXVDO0FBRXZDLE1BQU0sT0FBTyxZQUFZO0lBQ3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCO1FBQzVCLHVEQUF1RDtRQUN2RCxxRUFBcUU7UUFDckUsSUFDRSxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssT0FBTztZQUNuQyxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUNwQyxDQUFDO1lBQ0QsK0NBQStDO1lBQy9DLGlCQUFpQjtZQUNqQixpREFBaUQ7WUFDakQsbUJBQW1CO1lBRW5CLE9BQU8sSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBRUQsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDMUMsT0FBTyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUN4QyxPQUFPLElBQUksT0FBTyxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUNELElBQUksZ0JBQWdCLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQzNDLE9BQU8sSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBRUQsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDckMsbURBQW1EO1lBQ25ELHFCQUFxQjtZQUNyQixPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVELElBQUksZ0JBQWdCLENBQUMsTUFBTSxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQzVDLE9BQU8sSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBRUQsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssWUFBWSxFQUFFLENBQUM7WUFDN0MsT0FBTyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNGIn0=