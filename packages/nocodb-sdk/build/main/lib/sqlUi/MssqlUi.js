"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MssqlUi = void 0;
const UITypes_1 = __importDefault(require("../UITypes"));
const numberUtils_1 = require("../numberUtils");
const dbTypes = [
    'bigint',
    'binary',
    'bit',
    'char',
    'date',
    'datetime',
    'datetime2',
    'datetimeoffset',
    'decimal',
    'float',
    'geography',
    'geometry',
    'heirarchyid',
    'image',
    'int',
    'money',
    'nchar',
    'ntext',
    'numeric',
    'nvarchar',
    'real',
    'json',
    'smalldatetime',
    'smallint',
    'smallmoney',
    'sql_variant',
    'sysname',
    'text',
    'time',
    'timestamp',
    'tinyint',
    'uniqueidentifier',
    'varbinary',
    'xml',
    'varchar',
];
class MssqlUi {
    //#region statics
    static getNewTableColumns() {
        return [
            {
                column_name: 'id',
                title: 'Id',
                dt: 'int',
                dtx: 'integer',
                ct: 'int(11)',
                nrqd: false,
                rqd: true,
                ck: false,
                pk: true,
                un: false,
                ai: true,
                cdf: null,
                clen: null,
                np: null,
                ns: 0,
                dtxp: '',
                dtxs: '',
                altered: 1,
                uidt: 'ID',
                uip: '',
                uicn: '',
            },
            {
                column_name: 'title',
                title: 'Title',
                dt: 'TEXT',
                dtx: 'specificType',
                ct: null,
                nrqd: true,
                rqd: false,
                ck: false,
                pk: false,
                un: false,
                ai: false,
                cdf: null,
                clen: null,
                np: null,
                ns: null,
                dtxp: '',
                dtxs: '',
                altered: 1,
                uidt: 'SingleLineText',
                uip: '',
                uicn: '',
            },
            {
                column_name: 'created_at',
                title: 'CreatedAt',
                dt: 'datetime',
                dtx: 'specificType',
                ct: 'datetime',
                nrqd: true,
                rqd: false,
                ck: false,
                pk: false,
                un: false,
                ai: false,
                clen: 45,
                np: null,
                ns: null,
                dtxp: '',
                dtxs: '',
                altered: 1,
                uidt: UITypes_1.default.CreatedTime,
                uip: '',
                uicn: '',
                system: true,
            },
            {
                column_name: 'updated_at',
                title: 'UpdatedAt',
                dt: 'datetime',
                dtx: 'specificType',
                ct: 'datetime',
                nrqd: true,
                rqd: false,
                ck: false,
                pk: false,
                un: false,
                ai: false,
                au: true,
                clen: 45,
                np: null,
                ns: null,
                dtxp: '',
                dtxs: '',
                altered: 1,
                uidt: UITypes_1.default.LastModifiedTime,
                uip: '',
                uicn: '',
                system: true,
            },
            {
                column_name: 'created_by',
                title: 'nc_created_by',
                dt: 'varchar',
                dtx: 'specificType',
                ct: 'varchar(45)',
                nrqd: true,
                rqd: false,
                ck: false,
                pk: false,
                un: false,
                ai: false,
                clen: 45,
                np: null,
                ns: null,
                dtxp: '45',
                dtxs: '',
                altered: 1,
                uidt: UITypes_1.default.CreatedBy,
                uip: '',
                uicn: '',
                system: true,
            },
            {
                column_name: 'updated_by',
                title: 'nc_updated_by',
                dt: 'varchar',
                dtx: 'specificType',
                ct: 'varchar(45)',
                nrqd: true,
                rqd: false,
                ck: false,
                pk: false,
                un: false,
                ai: false,
                clen: 45,
                np: null,
                ns: null,
                dtxp: '45',
                dtxs: '',
                altered: 1,
                uidt: UITypes_1.default.LastModifiedBy,
                uip: '',
                uicn: '',
                system: true,
            },
            {
                column_name: 'nc_order',
                title: 'nc_order',
                dt: 'decimal',
                dtx: 'specificType',
                ct: 'decimal(38,19)',
                nrqd: true,
                rqd: false,
                ck: false,
                pk: false,
                un: false,
                ai: false,
                cdf: null,
                clen: null,
                np: 38,
                ns: 19,
                dtxp: '38,19',
                dtxs: '',
                altered: 1,
                uidt: UITypes_1.default.Order,
                uip: '',
                uicn: '',
                system: true,
            },
        ];
    }
    static getNewColumn(suffix) {
        return {
            column_name: 'title' + suffix,
            dt: 'TEXT',
            dtx: 'specificType',
            ct: null,
            nrqd: true,
            rqd: false,
            ck: false,
            pk: false,
            un: false,
            ai: false,
            cdf: null,
            clen: null,
            np: null,
            ns: null,
            dtxp: '',
            dtxs: '',
            altered: 1,
            uidt: 'SingleLineText',
            uip: '',
            uicn: '',
        };
    }
    static getDefaultLengthForDatatype(type) {
        switch (type) {
            case 'decimal':
                return 10;
            case 'varchar':
                return 255;
            default:
                return '';
        }
    }
    static getDefaultLengthIsDisabled(type) {
        switch (type) {
            case 'nvarchar':
            case 'numeric':
            case 'decimal':
            case 'varchar':
                return false;
            default:
                return true;
        }
    }
    static getDefaultValueForDatatype(type) {
        switch (type) {
            case 'bigint':
            case 'binary':
            case 'bit':
            case 'char':
            case 'date':
            case 'datetime':
            case 'datetime2':
            case 'datetimeoffset':
            case 'decimal':
            case 'float':
            case 'geography':
            case 'geometry':
            case 'heirarchyid':
            case 'image':
            case 'int':
            case 'money':
            case 'nchar':
            case 'ntext':
            case 'numeric':
            case 'nvarchar':
            case 'real':
            case 'json':
            case 'smalldatetime':
            case 'smallint':
            case 'smallmoney':
            case 'sql_variant':
            case 'sysname':
            case 'text':
            case 'time':
            case 'timestamp':
            case 'tinyint':
            case 'uniqueidentifier':
            case 'varbinary':
            case 'xml':
            case 'varchar':
                return 'eg: ';
            default:
                return '';
        }
    }
    static getDefaultScaleForDatatype(type) {
        switch (type) {
            case 'decimal':
            case 'numeric':
                return '2';
            default:
                return '';
        }
    }
    static colPropAIDisabled(col, columns) {
        // console.log(col);
        if (col.dt === 'int4' ||
            col.dt === 'integer' ||
            col.dt === 'bigint' ||
            col.dt === 'smallint') {
            for (let i = 0; i < columns.length; ++i) {
                if (columns[i].cn !== col.cn && columns[i].ai) {
                    return true;
                }
            }
            return false;
        }
        else {
            return true;
        }
    }
    static colPropUNDisabled(_col) {
        return true;
    }
    static onCheckboxChangeAI(col) {
        console.log(col);
        if (col.dt === 'int' ||
            col.dt === 'bigint' ||
            col.dt === 'smallint' ||
            col.dt === 'tinyint') {
            col.altered = col.altered || 2;
        }
    }
    static showScale(columnObj) {
        return columnObj.dt === 'decimal' || columnObj.dt === 'numeric';
    }
    static removeUnsigned(columns) {
        for (let i = 0; i < columns.length; ++i) {
            if (columns[i].altered === 1 &&
                !(columns[i].dt === 'int' ||
                    columns[i].dt === 'bigint' ||
                    columns[i].dt === 'tinyint' ||
                    columns[i].dt === 'smallint' ||
                    columns[i].dt === 'mediumint')) {
                columns[i].un = false;
                console.log('>> resetting unsigned value', columns[i].cn);
            }
            console.log(columns[i].cn);
        }
    }
    static columnEditable(colObj) {
        return colObj.tn !== '_evolutions' || colObj.tn !== 'nc_evolutions';
    }
    /*
  
    static extractFunctionName(query) {
      const reg =
        /^\s*CREATE\s+(?:OR\s+REPLACE\s*)?\s*FUNCTION\s+(?:[\w\d_]+\.)?([\w_\d]+)/i;
      const match = query.match(reg);
      return match && match[1];
    }
  
    static extractProcedureName(query) {
      const reg =
        /^\s*CREATE\s+(?:OR\s+REPLACE\s*)?\s*PROCEDURE\s+(?:[\w\d_]+\.)?([\w_\d]+)/i;
      const match = query.match(reg);
      return match && match[1];
    }
  
    static handleRawOutput(result, headers) {
      console.log(result);
  
      if (Array.isArray(result) && result[0]) {
        const keys = Object.keys(result[0]);
        // set headers before settings result
        for (let i = 0; i < keys.length; i++) {
          const text = keys[i];
          headers.push({ text, value: text, sortable: false });
        }
      } else if (result === undefined) {
        headers.push({ text: 'Message', value: 'message', sortable: false });
        result = [{ message: 'Success' }];
      }
      return result;
    }
  
    static splitQueries(query) {
      /!***
       * we are splitting based on semicolon
       * there are mechanism to escape semicolon within single/double quotes(string)
       *!/
      return query.match(/\b("[^"]*;[^"]*"|'[^']*;[^']*'|[^;])*;/g);
    }
  
    /!**
     * if sql statement is SELECT - it limits to a number
     * @param args
     * @returns {string|*}
     *!/
    sanitiseQuery(args) {
      let q = args.query.trim().split(';');
  
      if (q[0].startsWith('Select')) {
        q = q[0] + ` LIMIT 0,${args.limit ? args.limit : 100};`;
      } else if (q[0].startsWith('select')) {
        q = q[0] + ` LIMIT 0,${args.limit ? args.limit : 100};`;
      } else if (q[0].startsWith('SELECT')) {
        q = q[0] + ` LIMIT 0,${args.limit ? args.limit : 100};`;
      } else {
        return args.query;
      }
  
      return q;
    }
  
    static getColumnsFromJson(json, tn) {
      const columns = [];
  
      try {
        if (typeof json === 'object' && !Array.isArray(json)) {
          const keys = Object.keys(json);
          for (let i = 0; i < keys.length; ++i) {
            const column = {
              dp: null,
              tn,
              column_name: keys[i],
              cno: keys[i],
              np: 10,
              ns: 0,
              clen: null,
              cop: 1,
              pk: false,
              nrqd: false,
              rqd: false,
              un: false,
              ct: 'int(11) unsigned',
              ai: false,
              unique: false,
              cdf: null,
              cc: '',
              csn: null,
              dtx: 'specificType',
              dtxp: null,
              dtxs: 0,
              altered: 1,
            };
  
            switch (typeof json[keys[i]]) {
              case 'number':
                if (Number.isInteger(json[keys[i]])) {
                  if (MssqlUi.isValidTimestamp(keys[i], json[keys[i]])) {
                    Object.assign(column, {
                      dt: 'timestamp',
                    });
                  } else {
                    Object.assign(column, {
                      dt: 'int',
                      np: 10,
                      ns: 0,
                    });
                  }
                } else {
                  Object.assign(column, {
                    dt: 'float',
                    np: 10,
                    ns: 2,
                    dtxp: '11',
                    dtxs: 2,
                  });
                }
                break;
              case 'string':
                if (MssqlUi.isValidDate(json[keys[i]])) {
                  Object.assign(column, {
                    dt: 'datetime',
                  });
                } else if (json[keys[i]].length <= 255) {
                  Object.assign(column, {
                    dt: 'varchar',
                    np: 255,
                    ns: 0,
                    dtxp: '255',
                  });
                } else {
                  Object.assign(column, {
                    dt: 'text',
                  });
                }
                break;
              case 'boolean':
                Object.assign(column, {
                  dt: 'bit',
                  np: null,
                  ns: 0,
                });
                break;
              case 'object':
                Object.assign(column, {
                  dt: 'varchar',
                  np: 255,
                  ns: 0,
                  dtxp: '255',
                });
                break;
              default:
                break;
            }
            columns.push(column);
          }
        }
      } catch (e) {
        console.log('Error in getColumnsFromJson', e);
      }
  
      return columns;
    }
  
    static isValidTimestamp(key, value) {
      if (typeof value !== 'number') {
        return false;
      }
      return new Date(value).getTime() > 0 && /(?:_|(?=A))[aA]t$/.test(key);
    }
  
    static isValidDate(value) {
      return new Date(value).getTime() > 0;
    }
  */
    static onCheckboxChangeAU(col) {
        console.log(col);
        // if (1) {
        col.altered = col.altered || 2;
        // }
        if (col.au) {
            col.cdf = 'GETDATE()';
        }
        // if (!col.ai) {
        //   col.dtx = 'specificType'
        // } else {
        //   col.dtx = ''
        // }
    }
    static colPropAuDisabled(col) {
        if (col.altered !== 1) {
            return true;
        }
        switch (col.dt) {
            case 'date':
            case 'datetime':
            case 'datetime2':
            case 'datetimeoffset':
            case 'time':
            case 'timestamp':
                return false;
            default:
                return true;
        }
    }
    static getAbstractType(col) {
        var _a;
        switch ((_a = col.dt) === null || _a === void 0 ? void 0 : _a.toLowerCase()) {
            case 'bigint':
            case 'smallint':
            case 'bit':
            case 'tinyint':
            case 'int':
                return 'integer';
            case 'binary':
                return 'string';
            case 'char':
                return 'string';
            case 'date':
                return 'date';
            case 'datetime':
            case 'datetime2':
            case 'smalldatetime':
            case 'datetimeoffset':
                return 'datetime';
            case 'decimal':
            case 'float':
                return 'float';
            case 'geography':
            case 'geometry':
            case 'heirarchyid':
            case 'image':
                return 'string';
            case 'money':
            case 'nchar':
                return 'string';
            case 'ntext':
                return 'text';
            case 'numeric':
                return 'float';
            case 'nvarchar':
                return 'string';
            case 'real':
                return 'float';
            case 'json':
                return 'json';
            case 'smallmoney':
            case 'sql_variant':
            case 'sysname':
                return 'string';
            case 'text':
                return 'text';
            case 'time':
                return 'time';
            case 'timestamp':
                return 'timestamp';
            case 'uniqueidentifier':
            case 'varbinary':
            case 'xml':
                return 'string';
            case 'varchar':
                return 'string';
        }
        return 'string';
    }
    static getUIType(col) {
        switch (this.getAbstractType(col)) {
            case 'integer':
                return 'Number';
            case 'boolean':
                return 'Checkbox';
            case 'float':
                return 'Decimal';
            case 'date':
                return 'Date';
            case 'datetime':
                return 'CreatedTime';
            case 'time':
                return 'Time';
            case 'year':
                return 'Year';
            case 'string':
                return 'SingleLineText';
            case 'text':
                return 'LongText';
            case 'blob':
                return 'Attachment';
            case 'enum':
                return 'SingleSelect';
            case 'set':
                return 'MultiSelect';
            case 'json':
                return 'LongText';
        }
    }
    static getDataTypeForUiType(col, idType) {
        const colProp = {};
        switch (col.uidt) {
            case 'ID':
                {
                    const isAutoIncId = idType === 'AI';
                    const isAutoGenId = idType === 'AG';
                    colProp.dt = isAutoGenId ? 'varchar' : 'int';
                    colProp.pk = true;
                    colProp.un = isAutoIncId;
                    colProp.ai = isAutoIncId;
                    colProp.rqd = true;
                    colProp.meta = isAutoGenId ? { ag: 'nc' } : undefined;
                }
                break;
            case 'ForeignKey':
                colProp.dt = 'varchar';
                break;
            case 'SingleLineText':
                colProp.dt = 'text';
                break;
            case 'LongText':
                colProp.dt = 'text';
                break;
            case 'Attachment':
                colProp.dt = 'text';
                break;
            case 'Checkbox':
                colProp.dt = 'tinyint';
                colProp.dtxp = 1;
                colProp.cdf = '0';
                break;
            case 'MultiSelect':
                colProp.dt = 'text';
                break;
            case 'SingleSelect':
                colProp.dt = 'text';
                break;
            case 'Collaborator':
                colProp.dt = 'varchar';
                break;
            case 'GeoData':
                colProp.dt = 'varchar';
                break;
            case 'Date':
                colProp.dt = 'date';
                break;
            case 'Year':
                colProp.dt = 'int';
                break;
            case 'Time':
                colProp.dt = 'time';
                break;
            case 'PhoneNumber':
                colProp.dt = 'varchar';
                colProp.validate = {
                    func: ['isMobilePhone'],
                    args: [''],
                    msg: ['Validation failed : isMobilePhone'],
                };
                break;
            case 'Email':
                colProp.dt = 'varchar';
                colProp.validate = {
                    func: ['isEmail'],
                    args: [''],
                    msg: ['Validation failed : isEmail'],
                };
                break;
            case 'URL':
                colProp.dt = 'text';
                colProp.validate = {
                    func: ['isURL'],
                    args: [''],
                    msg: ['Validation failed : isURL'],
                };
                break;
            case 'Number':
                colProp.dt = 'int';
                break;
            case 'Decimal':
                colProp.dt = 'decimal';
                break;
            case 'Currency':
                colProp.dt = 'decimal';
                colProp.validate = {
                    func: ['isCurrency'],
                    args: [''],
                    msg: ['Validation failed : isCurrency'],
                };
                break;
            case 'Percent':
                colProp.dt = 'double';
                break;
            case 'Duration':
                colProp.dt = 'decimal';
                break;
            case 'Rating':
                colProp.dt = 'int';
                colProp.cdf = '0';
                break;
            case 'Formula':
                colProp.dt = 'varchar';
                break;
            case 'Rollup':
                colProp.dt = 'varchar';
                break;
            case 'Count':
                colProp.dt = 'int';
                break;
            case 'Lookup':
                colProp.dt = 'varchar';
                break;
            case 'DateTime':
                colProp.dt = 'datetimeoffset';
                break;
            case 'CreatedTime':
                colProp.dt = 'datetime';
                break;
            case 'LastModifiedTime':
                colProp.dt = 'datetime';
                break;
            case 'AutoNumber':
                colProp.dt = 'int';
                break;
            case 'Barcode':
                colProp.dt = 'varchar';
                break;
            case 'Button':
                colProp.dt = 'varchar';
                break;
            default:
                colProp.dt = 'varchar';
                break;
        }
        return colProp;
    }
    static getDataTypeListForUiType(col, idType) {
        switch (col.uidt) {
            case 'ID':
                if (idType === 'AG') {
                    return ['char', 'ntext', 'text', 'varchar', 'nvarchar'];
                }
                else if (idType === 'AI') {
                    return ['int', 'bigint', 'bit', 'smallint', 'tinyint'];
                }
                else {
                    return dbTypes;
                }
            case 'ForeignKey':
                return dbTypes;
            case 'SingleLineText':
            case 'LongText':
            case 'Attachment':
            case 'Collaborator':
            case 'GeoData':
                return ['text', 'varchar', 'nvarchar', 'char', 'ntext'];
            case 'JSON':
                return ['text', 'ntext'];
            case 'Checkbox':
                return ['bigint', 'bit', 'int', 'tinyint'];
            case 'MultiSelect':
                return ['text', 'ntext'];
            case 'SingleSelect':
                return ['text', 'ntext'];
            case 'Year':
                return ['int'];
            case 'Time':
                return ['time'];
            case 'PhoneNumber':
            case 'Email':
                return ['varchar'];
            case 'URL':
                return ['text', 'varchar'];
            case 'Number':
                return [
                    'int',
                    'bigint',
                    'bit',
                    'decimal',
                    'float',
                    'numeric',
                    'real',
                    'smallint',
                    'tinyint',
                ];
            case 'Decimal':
                return ['decimal', 'float'];
            case 'Currency':
                return [
                    'int',
                    'bigint',
                    'bit',
                    'decimal',
                    'float',
                    'numeric',
                    'real',
                    'smallint',
                    'tinyint',
                    'money',
                ];
            case 'Percent':
                return [
                    'int',
                    'bigint',
                    'bit',
                    'decimal',
                    'float',
                    'numeric',
                    'real',
                    'smallint',
                    'tinyint',
                ];
            case 'Duration':
                return [
                    'int',
                    'bigint',
                    'bit',
                    'decimal',
                    'float',
                    'numeric',
                    'real',
                    'smallint',
                    'tinyint',
                ];
            case 'Rating':
                return [
                    'int',
                    'bigint',
                    'bit',
                    'decimal',
                    'float',
                    'numeric',
                    'real',
                    'smallint',
                    'tinyint',
                ];
            case 'Formula':
            case 'Button':
                return ['text', 'ntext', 'varchar', 'nvarchar'];
            case 'Rollup':
                return ['varchar'];
            case 'Count':
                return ['int', 'bigint', 'smallint', 'tinyint'];
            case 'Lookup':
                return ['varchar'];
            case 'Date':
                return ['date'];
            case 'DateTime':
            case 'CreatedTime':
            case 'LastModifiedTime':
                return [
                    'datetimeoffset',
                    'datetime2',
                    // 'datetime'
                ];
            case 'AutoNumber':
                return ['int', 'bigint', 'smallint', 'tinyint'];
            case 'Barcode':
                return ['varchar'];
            case 'Geometry':
                return ['geometry'];
            default:
                return dbTypes;
        }
    }
    static getUnsupportedFnList() {
        return [
            'XOR',
            'REGEX_MATCH',
            'REGEX_EXTRACT',
            'REGEX_REPLACE',
            'VALUE',
            'COUNTA',
            'COUNT',
            'ROUNDDOWN',
            'ROUNDUP',
            'DATESTR',
        ];
    }
    static getCurrentDateDefault(_col) {
        return null;
    }
    static isEqual(dataType1, dataType2) {
        if (dataType1 === dataType2)
            return true;
        const abstractType1 = this.getAbstractType({ dt: dataType1 });
        const abstractType2 = this.getAbstractType({ dt: dataType2 });
        if (abstractType1 &&
            abstractType1 === abstractType2 &&
            ['integer', 'float'].includes(abstractType1))
            return true;
        return false;
    }
    //#endregion statics
    //#region methods
    getNewTableColumns() {
        return MssqlUi.getNewTableColumns();
    }
    getNewColumn(suffix) {
        return MssqlUi.getNewColumn(suffix);
    }
    getDefaultLengthForDatatype(type) {
        return MssqlUi.getDefaultLengthForDatatype(type);
    }
    getDefaultLengthIsDisabled(type) {
        return MssqlUi.getDefaultLengthIsDisabled(type);
    }
    getDefaultValueForDatatype(type) {
        return MssqlUi.getDefaultValueForDatatype(type);
    }
    getDefaultScaleForDatatype(type) {
        return MssqlUi.getDefaultScaleForDatatype(type);
    }
    colPropAIDisabled(col, columns) {
        return MssqlUi.colPropAIDisabled(col, columns);
    }
    colPropUNDisabled(col) {
        return MssqlUi.colPropUNDisabled(col);
    }
    onCheckboxChangeAI(col) {
        return MssqlUi.onCheckboxChangeAI(col);
    }
    showScale(columnObj) {
        return MssqlUi.showScale(columnObj);
    }
    removeUnsigned(columns) {
        return MssqlUi.removeUnsigned(columns);
    }
    columnEditable(colObj) {
        return MssqlUi.columnEditable(colObj);
    }
    onCheckboxChangeAU(col) {
        return MssqlUi.onCheckboxChangeAU(col);
    }
    colPropAuDisabled(col) {
        return MssqlUi.colPropAuDisabled(col);
    }
    getAbstractType(col) {
        return MssqlUi.getAbstractType(col);
    }
    getUIType(col) {
        return MssqlUi.getUIType(col);
    }
    getDataTypeForUiType(col, idType) {
        return MssqlUi.getDataTypeForUiType(col, idType);
    }
    getDataTypeListForUiType(col, idType) {
        return MssqlUi.getDataTypeListForUiType(col, idType);
    }
    getUnsupportedFnList() {
        return MssqlUi.getUnsupportedFnList();
    }
    getCurrentDateDefault(_col) {
        return MssqlUi.getCurrentDateDefault(_col);
    }
    isEqual(dataType1, dataType2) {
        return MssqlUi.isEqual(dataType1, dataType2);
    }
    adjustLengthAndScale(newColumn, oldColumn) {
        var _a, _b;
        if (newColumn.dt === 'decimal') {
            // get old column length and default length
            const defaultDtxp = (0, numberUtils_1.numberize)(this.getDefaultLengthForDatatype(newColumn.dt));
            let lastDtxp = defaultDtxp;
            if (oldColumn) {
                lastDtxp = (_a = (0, numberUtils_1.numberize)(oldColumn.dtxp)) !== null && _a !== void 0 ? _a : lastDtxp;
            }
            // get default and new column scale
            const defaultDtxs = (0, numberUtils_1.numberize)(this.getDefaultScaleForDatatype(newColumn.dt));
            const newDtxs = (_b = (0, numberUtils_1.numberize)(newColumn.dtxs)) !== null && _b !== void 0 ? _b : defaultDtxs;
            // get new column length based on scale and old length
            // get whichever is the highest, old column length,
            // default column length or default + precision - default if precision > default
            const newDtxp = Math.max(defaultDtxp, lastDtxp, defaultDtxp + Math.max(newDtxs - defaultDtxs, 0));
            newColumn.dtxp = newDtxp;
            newColumn.dtxs = newDtxs;
        }
    }
    isParsedJsonReturnType(_col) {
        return false;
    }
}
exports.MssqlUi = MssqlUi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXNzcWxVaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvc3FsVWkvTXNzcWxVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx5REFBaUM7QUFJakMsZ0RBQTJDO0FBRTNDLE1BQU0sT0FBTyxHQUFHO0lBQ2QsUUFBUTtJQUNSLFFBQVE7SUFDUixLQUFLO0lBQ0wsTUFBTTtJQUNOLE1BQU07SUFDTixVQUFVO0lBQ1YsV0FBVztJQUNYLGdCQUFnQjtJQUNoQixTQUFTO0lBQ1QsT0FBTztJQUNQLFdBQVc7SUFDWCxVQUFVO0lBQ1YsYUFBYTtJQUNiLE9BQU87SUFDUCxLQUFLO0lBQ0wsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsU0FBUztJQUNULFVBQVU7SUFDVixNQUFNO0lBQ04sTUFBTTtJQUNOLGVBQWU7SUFDZixVQUFVO0lBQ1YsWUFBWTtJQUNaLGFBQWE7SUFDYixTQUFTO0lBQ1QsTUFBTTtJQUNOLE1BQU07SUFDTixXQUFXO0lBQ1gsU0FBUztJQUNULGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsS0FBSztJQUNMLFNBQVM7Q0FDVixDQUFDO0FBRUYsTUFBYSxPQUFPO0lBQ2xCLGlCQUFpQjtJQUNqQixNQUFNLENBQUMsa0JBQWtCO1FBQ3ZCLE9BQU87WUFDTDtnQkFDRSxXQUFXLEVBQUUsSUFBSTtnQkFDakIsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsR0FBRyxFQUFFLFNBQVM7Z0JBQ2QsRUFBRSxFQUFFLFNBQVM7Z0JBQ2IsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLElBQUk7Z0JBQ1IsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLElBQUk7Z0JBQ1IsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsRUFBRSxFQUFFLElB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