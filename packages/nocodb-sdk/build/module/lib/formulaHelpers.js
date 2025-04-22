var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsep from 'jsep';
import UITypes from './UITypes';
import dayjs from 'dayjs';
import { SqlUiFactory } from './sqlUi';
import { dateFormats } from './dateTimeHelper';
export const StringOperators = ['||', '&'];
export const ArithmeticOperators = ['+', '-', '*', '/'];
export const ComparisonOperators = [
    '==',
    '=',
    '<',
    '>',
    '<=',
    '>=',
    '!=',
];
// opening and closing string code
const OCURLY_CODE = 123; // '{'
const CCURLY_CODE = 125; // '}'
export const jsepCurlyHook = {
    name: 'curly',
    init(jsep) {
        // Match identifier in following pattern: {abc-cde}
        jsep.hooks.add('gobble-token', function escapedIdentifier(env) {
            // check if the current token is an opening curly bracket
            if (this.code === OCURLY_CODE) {
                const patternIndex = this.index;
                // move to the next character until we find a closing curly bracket
                while (this.index < this.expr.length) {
                    ++this.index;
                    if (this.code === CCURLY_CODE) {
                        let identifier = this.expr.slice(patternIndex, ++this.index);
                        // if starting with double curley brace then check for ending double curley brace
                        // if found include with the identifier
                        if (identifier.startsWith('{{') &&
                            this.expr.slice(patternIndex, this.index + 1).endsWith('}')) {
                            identifier = this.expr.slice(patternIndex, ++this.index);
                        }
                        env.node = {
                            type: jsep.IDENTIFIER,
                            name: /^{{.*}}$/.test(identifier)
                                ? // start would be the position of the first curly bracket
                                    // add 2 to point to the first character for expressions like {{col1}}
                                    identifier.slice(2, -2)
                                : // start would be the position of the first curly bracket
                                    // add 1 to point to the first character for expressions like {col1}
                                    identifier.slice(1, -1),
                            raw: identifier,
                        };
                        // env.node = this.gobbleTokenProperty(env.node);
                        return env.node;
                    }
                }
                this.throwError('Unclosed }');
            }
        });
    },
};
function validateDateWithUnknownFormat(v) {
    for (const format of dateFormats) {
        if (dayjs(v, format, true).isValid()) {
            return true;
        }
        for (const timeFormat of ['HH:mm', 'HH:mm:ss', 'HH:mm:ss.SSS']) {
            if (dayjs(v, `${format} ${timeFormat}`, true).isValid()) {
                return true;
            }
        }
    }
    return false;
}
export function substituteColumnAliasWithIdInFormula(formula, columns) {
    return __awaiter(this, void 0, void 0, function* () {
        const substituteId = (pt) => __awaiter(this, void 0, void 0, function* () {
            if (pt.type === 'CallExpression') {
                for (const arg of pt.arguments || []) {
                    yield substituteId(arg);
                }
            }
            else if (pt.type === 'Literal') {
                return;
            }
            else if (pt.type === 'Identifier') {
                const colNameOrId = pt.name;
                const column = columns.find((c) => c.id === colNameOrId ||
                    c.column_name === colNameOrId ||
                    c.title === colNameOrId);
                pt.name = '{' + column.id + '}';
            }
            else if (pt.type === 'BinaryExpression') {
                yield substituteId(pt.left);
                yield substituteId(pt.right);
            }
        });
        // register jsep curly hook
        jsep.plugins.register(jsepCurlyHook);
        const parsedFormula = jsep(formula);
        yield substituteId(parsedFormula);
        return jsepTreeToFormula(parsedFormula);
    });
}
export var FormulaErrorType;
(function (FormulaErrorType) {
    FormulaErrorType["NOT_AVAILABLE"] = "NOT_AVAILABLE";
    FormulaErrorType["NOT_SUPPORTED"] = "NOT_SUPPORTED";
    FormulaErrorType["MIN_ARG"] = "MIN_ARG";
    FormulaErrorType["MAX_ARG"] = "MAX_ARG";
    FormulaErrorType["TYPE_MISMATCH"] = "TYPE_MISMATCH";
    FormulaErrorType["INVALID_ARG"] = "INVALID_ARG";
    FormulaErrorType["INVALID_ARG_TYPE"] = "INVALID_ARG_TYPE";
    FormulaErrorType["INVALID_ARG_VALUE"] = "INVALID_ARG_VALUE";
    FormulaErrorType["INVALID_ARG_COUNT"] = "INVALID_ARG_COUNT";
    FormulaErrorType["CIRCULAR_REFERENCE"] = "CIRCULAR_REFERENCE";
    FormulaErrorType["INVALID_FUNCTION_NAME"] = "INVALID_FUNCTION_NAME";
    FormulaErrorType["INVALID_COLUMN"] = "INVALID_COLUMN";
})(FormulaErrorType || (FormulaErrorType = {}));
export function substituteColumnIdWithAliasInFormula(formula, columns, rawFormula) {
    const substituteId = (pt, ptRaw) => {
        var _a;
        if (pt.type === 'CallExpression') {
            let i = 0;
            for (const arg of pt.arguments || []) {
                substituteId(arg, (_a = ptRaw === null || ptRaw === void 0 ? void 0 : ptRaw.arguments) === null || _a === void 0 ? void 0 : _a[i++]);
            }
        }
        else if (pt.type === 'Literal') {
            return;
        }
        else if (pt.type === 'Identifier') {
            const colNameOrId = pt === null || pt === void 0 ? void 0 : pt.name;
            const column = columns.find((c) => c.id === colNameOrId ||
                c.column_name === colNameOrId ||
                c.title === colNameOrId);
            pt.name = (column === null || column === void 0 ? void 0 : column.title) || (ptRaw === null || ptRaw === void 0 ? void 0 : ptRaw.name) || (pt === null || pt === void 0 ? void 0 : pt.name);
        }
        else if (pt.type === 'BinaryExpression') {
            substituteId(pt.left, ptRaw === null || ptRaw === void 0 ? void 0 : ptRaw.left);
            substituteId(pt.right, ptRaw === null || ptRaw === void 0 ? void 0 : ptRaw.right);
        }
    };
    // register jsep curly hook
    jsep.plugins.register(jsepCurlyHook);
    const parsedFormula = jsep(formula);
    const parsedRawFormula = rawFormula && jsep(rawFormula);
    substituteId(parsedFormula, parsedRawFormula);
    return jsepTreeToFormula(parsedFormula);
}
// isCallExpId - is the identifier part of a call expression
// in case of call expression, we don't want to wrap the identifier in curly brackets
export function jsepTreeToFormula(node, isCallExpId = false) {
    if (node.type === 'BinaryExpression' || node.type === 'LogicalExpression') {
        return ('(' +
            jsepTreeToFormula(node.left) +
            ' ' +
            node.operator +
            ' ' +
            jsepTreeToFormula(node.right) +
            ')');
    }
    if (node.type === 'UnaryExpression') {
        return node.operator + jsepTreeToFormula(node.argument);
    }
    if (node.type === 'MemberExpression') {
        return (jsepTreeToFormula(node.object) +
            '[' +
            jsepTreeToFormula(node.property) +
            ']');
    }
    if (node.type === 'Identifier') {
        if (!isCallExpId)
            return '{' + node.name + '}';
        return node.name;
    }
    if (node.type === 'Literal') {
        if (typeof node.value === 'string') {
            return String.raw `"${escapeLiteral(node.raw.slice(1, -1))}"`;
        }
        return '' + node.value;
    }
    if (node.type === 'CallExpression') {
        return (jsepTreeToFormula(node.callee, true) +
            '(' +
            node.arguments.map((argPt) => jsepTreeToFormula(argPt)).join(', ') +
            ')');
    }
    if (node.type === 'ArrayExpression') {
        return ('[' +
            node.elements.map((elePt) => jsepTreeToFormula(elePt)).join(', ') +
            ']');
    }
    if (node.type === 'Compound') {
        return node.body.map((e) => jsepTreeToFormula(e)).join(' ');
    }
    if (node.type === 'ConditionalExpression') {
        return (jsepTreeToFormula(node.test) +
            ' ? ' +
            jsepTreeToFormula(node.consequent) +
            ' : ' +
            jsepTreeToFormula(node.alternate));
    }
    return '';
}
function escapeLiteral(v) {
    return (v
        // replace \ to \\, escape only unescaped \
        .replace(/([^\\]|^)\\(?!\\)/g, `$1\\\\`)
        // replace " to \"
        .replace(/([^\\]|^)"/g, `$1\\"`)
        // replace ' to \'
        .replace(/([^\\]|^)'/g, `$1\\'`));
}
export var FormulaDataTypes;
(function (FormulaDataTypes) {
    FormulaDataTypes["NUMERIC"] = "numeric";
    FormulaDataTypes["STRING"] = "string";
    FormulaDataTypes["DATE"] = "date";
    FormulaDataTypes["LOGICAL"] = "logical";
    FormulaDataTypes["COND_EXP"] = "conditional_expression";
    FormulaDataTypes["NULL"] = "null";
    FormulaDataTypes["BOOLEAN"] = "boolean";
    FormulaDataTypes["INTERVAL"] = "interval";
    FormulaDataTypes["UNKNOWN"] = "unknown";
})(FormulaDataTypes || (FormulaDataTypes = {}));
export var JSEPNode;
(function (JSEPNode) {
    JSEPNode["COMPOUND"] = "Compound";
    JSEPNode["IDENTIFIER"] = "Identifier";
    JSEPNode["MEMBER_EXP"] = "MemberExpression";
    JSEPNode["LITERAL"] = "Literal";
    JSEPNode["THIS_EXP"] = "ThisExpression";
    JSEPNode["CALL_EXP"] = "CallExpression";
    JSEPNode["UNARY_EXP"] = "UnaryExpression";
    JSEPNode["BINARY_EXP"] = "BinaryExpression";
    JSEPNode["ARRAY_EXP"] = "ArrayExpression";
})(JSEPNode || (JSEPNode = {}));
export const formulas = {
    AVG: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#avg',
        validation: {
            args: {
                min: 1,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Average of input parameters',
        syntax: 'AVG(value1, [value2, ...])',
        examples: [
            'AVG(10, 5) => 7.5',
            'AVG({column1}, {column2})',
            'AVG({column1}, {column2}, {column3})',
        ],
        returnType: FormulaDataTypes.NUMERIC,
    },
    ADD: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#add',
        validation: {
            args: {
                min: 1,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Sum of input parameters',
        syntax: 'ADD(value1, [value2, ...])',
        examples: [
            'ADD(5, 5) => 10',
            'ADD({column1}, {column2})',
            'ADD({column1}, {column2}, {column3})',
        ],
        returnType: FormulaDataTypes.NUMERIC,
    },
    DATEADD: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/date-functions#dateadd',
        validation: {
            args: {
                rqd: 3,
                type: FormulaDataTypes.DATE,
            },
            custom: (_argTypes, parsedTree) => {
                if (parsedTree.arguments[0].type === JSEPNode.LITERAL) {
                    if (!validateDateWithUnknownFormat(parsedTree.arguments[0].value)) {
                        throw new FormulaError(FormulaErrorType.TYPE_MISMATCH, { key: 'msg.formula.firstParamDateAddHaveDate' }, 'First parameter of DATEADD should be a date');
                    }
                }
                if (parsedTree.arguments[1].type === JSEPNode.LITERAL) {
                    if (typeof parsedTree.arguments[1].value !== 'number') {
                        throw new FormulaError(FormulaErrorType.TYPE_MISMATCH, { key: 'msg.formula.secondParamDateAddHaveNumber' }, 'Second parameter of DATEADD should be a number');
                    }
                }
                if (parsedTree.arguments[2].type === JSEPNode.LITERAL) {
                    if (!['day', 'week', 'month', 'year'].includes(parsedTree.arguments[2].value)) {
                        throw new FormulaError(FormulaErrorType.TYPE_MISMATCH, { key: 'msg.formula.thirdParamDateAddHaveDate' }, "Third parameter of DATEADD should be one of 'day', 'week', 'month', 'year'");
                    }
                }
            },
        },
        description: 'Adds "count" units to Datetime.',
        syntax: 'DATEADD(date | datetime, count, ["day" | "week" | "month" | "year"])',
        examples: [
            'DATEADD({column1}, 2, "day")',
            'DATEADD({column1}, -2, "day")',
            'DATEADD({column1}, 2, "week")',
            'DATEADD({column1}, -2, "week")',
            'DATEADD({column1}, 2, "month")',
            'DATEADD({column1}, -2, "month")',
            'DATEADD({column1}, 2, "year")',
            'DATEADD({column1}, -2, "year")',
        ],
        returnType: FormulaDataTypes.DATE,
    },
    DATESTR: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/date-functions#datestr',
        validation: {
            args: {
                rqd: 1,
            },
        },
        syntax: 'DATESTR(date | datetime)',
        description: 'Formats input field into a string in "YYYY-MM-DD" format',
        examples: ['DATESTR({column1})'],
        returnType: FormulaDataTypes.STRING,
    },
    DAY: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/date-functions#day',
        validation: {
            args: {
                rqd: 1,
            },
        },
        syntax: 'DAY(date | datetime)',
        description: 'Extract day from a date field (1-31)',
        examples: ['DAY({column1})'],
        returnType: FormulaDataTypes.STRING,
    },
    MONTH: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/date-functions#month',
        validation: {
            args: {
                rqd: 1,
            },
        },
        syntax: 'MONTH(date | datetime)',
        description: 'Extract month from a date field (1-12)',
        examples: ['MONTH({column1})'],
        returnType: FormulaDataTypes.STRING,
    },
    YEAR: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/date-functions#year',
        validation: {
            args: {
                rqd: 1,
            },
        },
        syntax: 'YEAR(date | datetime)',
        description: 'Extract year from a date field',
        examples: ['YEAR({column1})'],
        returnType: FormulaDataTypes.STRING,
    },
    HOUR: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/date-functions#hour',
        validation: {
            args: {
                rqd: 1,
            },
        },
        syntax: 'DAY(time | datetime)',
        description: 'Extract hour from a time field (0-23)',
        examples: ['HOUR({column1})'],
        returnType: FormulaDataTypes.STRING,
    },
    DATETIME_DIFF: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/date-functions#datetime_diff',
        validation: {
            args: {
                min: 2,
                max: 3,
                type: FormulaDataTypes.DATE,
            },
            custom: (_argTypes, parsedTree) => {
                if (parsedTree.arguments[0].type === JSEPNode.LITERAL) {
                    if (!validateDateWithUnknownFormat(parsedTree.arguments[0].value)) {
                        throw new FormulaError(FormulaErrorType.TYPE_MISMATCH, { key: 'msg.formula.firstParamDateDiffHaveDate' }, 'First parameter of DATETIME_DIFF should be a date');
                    }
                }
                if (parsedTree.arguments[1].type === JSEPNode.LITERAL) {
                    if (!validateDateWithUnknownFormat(parsedTree.arguments[1].value)) {
                        throw new FormulaError(FormulaErrorType.TYPE_MISMATCH, { key: 'msg.formula.secondParamDateDiffHaveDate' }, 'Second parameter of DATETIME_DIFF should be a date');
                    }
                }
                if (parsedTree.arguments[2] &&
                    parsedTree.arguments[2].type === JSEPNode.LITERAL) {
                    if (![
                        'milliseconds',
                        'ms',
                        'seconds',
                        's',
                        'minutes',
                        'm',
                        'hours',
                        'h',
                        'days',
                        'd',
                        'weeks',
                        'w',
                        'months',
                        'M',
                        'quarters',
                        'Q',
                        'years',
                        'y',
                    ].includes(parsedTree.arguments[2].value)) {
                        throw new FormulaError(FormulaErrorType.TYPE_MISMATCH, { key: 'msg.formula.thirdParamDateDiffHaveDate' }, "Third parameter of DATETIME_DIFF should be one of 'milliseconds', 'ms', 'seconds', 's', 'minutes', 'm', 'hours', 'h', 'days', 'd', 'weeks', 'w', 'months', 'M', 'quarters', 'Q', 'years', 'y'");
                    }
                }
            },
        },
        description: 'Calculate the difference of two given date / datetime fields in specified units.',
        syntax: 'DATETIME_DIFF(date | datetime, date | datetime, ["milliseconds" | "ms" | "seconds" | "s" | "minutes" | "m" | "hours" | "h" | "days" | "d" | "weeks" | "w" | "months" | "M" | "quarters" | "Q" | "years" | "y"])',
        examples: [
            'DATEDIFF({column1}, {column2})',
            'DATEDIFF({column1}, {column2}, "seconds")',
            'DATEDIFF({column1}, {column2}, "s")',
            'DATEDIFF({column1}, {column2}, "years")',
            'DATEDIFF({column1}, {column2}, "y")',
            'DATEDIFF({column1}, {column2}, "minutes")',
            'DATEDIFF({column1}, {column2}, "m")',
            'DATEDIFF({column1}, {column2}, "days")',
            'DATEDIFF({column1}, {column2}, "d")',
        ],
        returnType: FormulaDataTypes.NUMERIC,
    },
    AND: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/conditional-expressions#and',
        validation: {
            args: {
                min: 1,
            },
        },
        description: 'Result is TRUE if all conditions are met',
        syntax: 'AND(expr1, [expr2, ...])',
        examples: ['AND(5 > 2, 5 < 10) => 1', 'AND({column1} > 2, {column2} < 10)'],
        returnType: FormulaDataTypes.COND_EXP,
    },
    OR: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/conditional-expressions#or',
        validation: {
            args: {
                min: 1,
            },
        },
        description: 'Result is TRUE if at least one condition is met',
        syntax: 'OR(expr1, [expr2, ...])',
        examples: ['OR(5 > 2, 5 < 10) => 1', 'OR({column1} > 2, {column2} < 10)'],
        returnType: FormulaDataTypes.COND_EXP,
    },
    CONCAT: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#concat',
        validation: {
            args: {
                min: 1,
            },
        },
        description: 'Concatenate input parameters into a single string',
        syntax: 'CONCAT(str1, [str2, ...])',
        examples: [
            'CONCAT("AA", "BB", "CC") => "AABBCC"',
            'CONCAT({column1}, {column2}, {column3})',
        ],
        returnType: FormulaDataTypes.STRING,
    },
    TRIM: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#trim',
        validation: {
            args: {
                rqd: 1,
                type: FormulaDataTypes.STRING,
            },
        },
        description: 'Remove trailing and leading whitespaces from input parameter',
        syntax: 'TRIM(str)',
        examples: [
            'TRIM("         HELLO WORLD  ") => "HELLO WORLD"',
            'TRIM({column1})',
        ],
        returnType: FormulaDataTypes.STRING,
    },
    UPPER: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#upper',
        validation: {
            args: {
                rqd: 1,
                type: FormulaDataTypes.STRING,
            },
        },
        description: 'Converts the input parameter to an upper-case string.',
        syntax: 'UPPER(str)',
        examples: ['UPPER("nocodb") => "NOCODB"', 'UPPER({column1})'],
        returnType: FormulaDataTypes.STRING,
    },
    LOWER: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#lower',
        validation: {
            args: {
                rqd: 1,
                type: FormulaDataTypes.STRING,
            },
        },
        description: 'Converts the input parameter to an lower-case string.',
        syntax: 'LOWER(str)',
        examples: ['LOWER("NOCODB") => "nocodb"', 'LOWER({column1})'],
        returnType: FormulaDataTypes.STRING,
    },
    LEN: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#len',
        validation: {
            args: {
                rqd: 1,
                type: FormulaDataTypes.STRING,
            },
        },
        description: 'Calculate the character length of the input parameter.',
        syntax: 'LEN(value)',
        examples: ['LEN("NocoDB") => 6', 'LEN({column1})'],
        returnType: FormulaDataTypes.NUMERIC,
    },
    MIN: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#min',
        validation: {
            args: {
                min: 1,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Find the minimum value among the input parameters.',
        syntax: 'MIN(value1, [value2, ...])',
        examples: ['MIN(1000, 2000) => 1000', 'MIN({column1}, {column2})'],
        returnType: FormulaDataTypes.NUMERIC,
    },
    MAX: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#max',
        validation: {
            args: {
                min: 1,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Find the maximum value among the input parameters.',
        syntax: 'MAX(value1, [value2, ...])',
        examples: ['MAX(1000, 2000) => 2000', 'MAX({column1}, {column2})'],
        returnType: FormulaDataTypes.NUMERIC,
    },
    CEILING: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#ceiling',
        validation: {
            args: {
                rqd: 1,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Rounds the input parameter to the next largest integer value.',
        syntax: 'CEILING(value)',
        examples: ['CEILING(1.01) => 2', 'CEILING({column1})'],
        returnType: FormulaDataTypes.NUMERIC,
    },
    FLOOR: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#floor',
        validation: {
            args: {
                rqd: 1,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Round down the input parameter to the nearest integer.',
        syntax: 'FLOOR(value)',
        examples: ['FLOOR(3.1415) => 3', 'FLOOR({column1})'],
        returnType: FormulaDataTypes.NUMERIC,
    },
    ROUND: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#round',
        validation: {
            args: {
                min: 1,
                max: 2,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Rounds the number to a specified decimal places or the nearest integer if precision is not specified',
        syntax: 'ROUND(value, precision), ROUND(value)',
        examples: [
            'ROUND(3.1415) => 3',
            'ROUND(3.1415, 2) => 3.14',
            'ROUND({column1}, 3)',
        ],
        returnType: FormulaDataTypes.NUMERIC,
    },
    MOD: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#mod',
        validation: {
            args: {
                rqd: 2,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Calculate the remainder resulting from integer division of input parameters.',
        syntax: 'MOD(value1, value2)',
        examples: ['MOD(1024, 1000) => 24', 'MOD({column}, 2)'],
        returnType: FormulaDataTypes.NUMERIC,
    },
    REPEAT: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#repeat',
        validation: {
            args: {
                rqd: 2,
            },
            custom(argTypes, parsedTree) {
                var _a, _b;
                if (argTypes[1] !== FormulaDataTypes.NUMERIC) {
                    throw new FormulaError(FormulaErrorType.INVALID_ARG, {
                        key: 'msg.formula.typeIsExpected',
                        type: 'Numeric',
                        calleeName: (_b = (_a = parsedTree.callee) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.toUpperCase(),
                        position: 2,
                    }, 'The REPEAT function requires a numeric as the parameter at position 2');
                }
            },
        },
        description: 'Concatenate the specified number of copies of the input parameter string.',
        syntax: 'REPEAT(str, count)',
        examples: ['REPEAT("A", 5) => "AAAAA"', 'REPEAT({column}, 5)'],
        returnType: FormulaDataTypes.STRING,
    },
    LOG: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#log',
        validation: {
            args: {
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Compute the logarithm of the input parameter to the specified base (default = e).',
        syntax: 'LOG([base], value)',
        examples: ['LOG(2, 1024) => 10', 'LOG(2, {column1})'],
        returnType: FormulaDataTypes.NUMERIC,
    },
    EXP: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#exp',
        validation: {
            args: {
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Compute the exponential value of the input parameter (e raised to the power specified)',
        syntax: 'EXP(power)',
        examples: ['EXP(1) => 2.718281828459045', 'EXP({column1})'],
        returnType: FormulaDataTypes.NUMERIC,
    },
    POWER: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#power',
        validation: {
            args: {
                rqd: 2,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Compute base raised to the exponent power.',
        syntax: 'POWER(base, exponent)',
        examples: ['POWER(2, 10) => 1024', 'POWER({column1}, 10)'],
        returnType: FormulaDataTypes.NUMERIC,
    },
    SQRT: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#sqrt',
        validation: {
            args: {
                rqd: 1,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Calculate the square root of the input parameter.',
        syntax: 'SQRT(value)',
        examples: ['SQRT(100) => 10', 'SQRT({column1})'],
        returnType: FormulaDataTypes.NUMERIC,
    },
    ABS: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#abs',
        validation: {
            args: {
                rqd: 1,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Obtain the absolute value of the input parameter.',
        syntax: 'ABS(value)',
        examples: ['ABS({column1})'],
        returnType: FormulaDataTypes.NUMERIC,
    },
    NOW: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/date-functions#now',
        validation: {
            args: {
                rqd: 0,
                type: FormulaDataTypes.DATE,
            },
        },
        description: 'Retrieve the current time and day.',
        syntax: 'NOW()',
        examples: ['NOW() => 2022-05-19 17:20:43'],
        returnType: FormulaDataTypes.DATE,
    },
    REPLACE: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#replace',
        validation: {
            args: {
                rqd: 3,
                type: FormulaDataTypes.STRING,
            },
        },
        description: 'Replace all occurrences of "searchStr" with "replaceStr" in the given string.',
        syntax: 'REPLACE(str, searchStr, replaceStr)',
        examples: [
            'REPLACE("AABBCC", "AA", "BB") => "BBBBCC"',
            'REPLACE({column1}, {column2}, {column3})',
        ],
        returnType: FormulaDataTypes.STRING,
    },
    SEARCH: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#search',
        validation: {
            args: {
                rqd: 2,
                type: FormulaDataTypes.STRING,
            },
        },
        description: 'Retrieve the index of the specified "searchStr" if found; otherwise, returns 0.',
        syntax: 'SEARCH(str, searchStr)',
        examples: [
            'SEARCH("HELLO WORLD", "WORLD") => 7',
            'SEARCH({column1}, "abc")',
        ],
        returnType: FormulaDataTypes.NUMERIC,
    },
    INT: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#int',
        validation: {
            args: {
                rqd: 1,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Obtain the integer value of the input parameter',
        syntax: 'INT(value)',
        examples: ['INT(3.1415) => 3', 'INT({column1})'],
        returnType: FormulaDataTypes.NUMERIC,
    },
    RIGHT: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#right',
        validation: {
            args: {
                rqd: 2,
                type: [FormulaDataTypes.STRING, FormulaDataTypes.NUMERIC],
            },
        },
        description: 'Retrieve the last n characters from the input string.',
        syntax: 'RIGHT(str, n)',
        examples: ['RIGHT("HELLO WORLD", 5) => WORLD', 'RIGHT({column1}, 3)'],
        returnType: FormulaDataTypes.STRING,
    },
    LEFT: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#left',
        validation: {
            args: {
                rqd: 2,
                type: [FormulaDataTypes.STRING, FormulaDataTypes.NUMERIC],
            },
        },
        description: 'Retrieve the first n characters from the input string.',
        syntax: 'LEFT(str, n)',
        examples: ['LEFT({column1}, 2)', 'LEFT("ABCD", 2) => "AB"'],
        returnType: FormulaDataTypes.STRING,
    },
    SUBSTR: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#substr',
        validation: {
            args: {
                min: 2,
                max: 3,
                type: [
                    FormulaDataTypes.STRING,
                    FormulaDataTypes.NUMERIC,
                    FormulaDataTypes.NUMERIC,
                ],
            },
        },
        description: 'Extracts a substring of length "n" from the input string, starting from the specified position.',
        syntax: '	SUBTR(str, position, [n])',
        examples: [
            'SUBSTR("HELLO WORLD", 7) => WORLD',
            'SUBSTR("HELLO WORLD", 7, 3) => WOR',
            'SUBSTR({column1}, 7, 5)',
        ],
        returnType: FormulaDataTypes.STRING,
    },
    MID: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#mid',
        validation: {
            args: {
                rqd: 3,
                type: [
                    FormulaDataTypes.STRING,
                    FormulaDataTypes.NUMERIC,
                    FormulaDataTypes.NUMERIC,
                ],
            },
        },
        description: 'Extracts a substring; an alias for SUBSTR.',
        syntax: 'MID(str, position, [count])',
        examples: ['MID("NocoDB", 3, 2) => "co"', 'MID({column1}, 3, 2)'],
        returnType: FormulaDataTypes.STRING,
    },
    ISBLANK: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#isblank',
        validation: {
            args: {
                rqd: 1,
            },
        },
        description: 'Check if the input parameter is blank.',
        syntax: 'ISBLANK(value)',
        examples: ['ISBLANK({column1}) => false', 'ISBLANK("") => true'],
        returnType: FormulaDataTypes.BOOLEAN,
    },
    ISNOTBLANK: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#isnotblank',
        validation: {
            args: {
                rqd: 1,
            },
        },
        description: 'Check if the input parameter is not blank.',
        syntax: 'ISNOTBLANK(value)',
        examples: ['ISNOTBLANK({column1}) => true', 'ISNOTBLANK("") => false'],
        returnType: FormulaDataTypes.BOOLEAN,
    },
    IF: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/conditional-expressions#if',
        validation: {
            args: {
                min: 2,
                max: 3,
            },
        },
        description: 'Evaluate successCase if the expression is TRUE, else the failureCase.',
        syntax: 'IF(expr, successCase, failureCase)',
        examples: [
            'IF(5 > 1, "YES", "NO") => "YES"',
            'IF({column} > 1, "YES", "NO")',
        ],
        returnType: (argTypes) => {
            // extract all return types except NULL, since null can be returned by any type
            const returnValueTypes = new Set(argTypes.slice(1).filter((type) => type !== FormulaDataTypes.NULL));
            // if there are more than one return types or if there is a string return type
            // return type as string else return the type
            if (returnValueTypes.size > 1 ||
                returnValueTypes.has(FormulaDataTypes.STRING)) {
                return FormulaDataTypes.STRING;
            }
            else if (returnValueTypes.has(FormulaDataTypes.NUMERIC)) {
                return FormulaDataTypes.NUMERIC;
            }
            else if (returnValueTypes.has(FormulaDataTypes.BOOLEAN)) {
                return FormulaDataTypes.BOOLEAN;
            }
            else if (returnValueTypes.has(FormulaDataTypes.DATE)) {
                return FormulaDataTypes.DATE;
            }
            // if none of the above conditions are met, return the first return argument type
            return argTypes[1];
        },
    },
    SWITCH: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/conditional-expressions#switch',
        validation: {
            args: {
                min: 3,
            },
            custom: (_argTypes, _parseTree) => {
                // Todo: Add validation for switch
            },
        },
        description: 'Evaluate case value based on expression output; if no match is found, evaluate default case.',
        syntax: 'SWITCH(expr, [pattern, value, ..., default])',
        examples: [
            'SWITCH(1, 1, "One", 2, "Two", "N/A") => "One""',
            'SWITCH(2, 1, "One", 2, "Two", "N/A") => "Two"',
            'SWITCH(3, 1, "One", 2, "Two", "N/A") => "N/A"',
            'SWITCH({column1}, 1, "One", 2, "Two", "N/A")',
        ],
        returnType: (argTypes) => {
            // extract all return types except NULL, since null can be returned by any type
            const returnValueTypes = new Set(argTypes.slice(2).filter((_, i) => i % 2 === 0));
            // if there are more than one return types or if there is a string return type
            // return type as string else return the type
            if (returnValueTypes.size > 1 ||
                returnValueTypes.has(FormulaDataTypes.STRING)) {
                return FormulaDataTypes.STRING;
            }
            else if (returnValueTypes.has(FormulaDataTypes.NUMERIC)) {
                return FormulaDataTypes.NUMERIC;
            }
            else if (returnValueTypes.has(FormulaDataTypes.BOOLEAN)) {
                return FormulaDataTypes.BOOLEAN;
            }
            else if (returnValueTypes.has(FormulaDataTypes.DATE)) {
                return FormulaDataTypes.DATE;
            }
            // if none of the above conditions are met, return the first return argument type
            return argTypes[1];
        },
    },
    URL: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#url',
        validation: {
            args: {
                min: 1,
                max: 2,
                type: [FormulaDataTypes.STRING, FormulaDataTypes.STRING],
            },
        },
        description: 'Verify and convert to a hyperlink if the input is a valid URL.',
        syntax: 'URL(string, [label])',
        examples: [
            'URL("https://github.com/nocodb/nocodb")',
            'URL({column1})',
            'URL("https://github.com/nocodb/nocodb", "NocoDB")',
            'URL({column1}, {column1})',
        ],
        returnType: FormulaDataTypes.STRING,
    },
    URLENCODE: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#urlencode',
        validation: {
            args: {
                rqd: 1,
                type: FormulaDataTypes.STRING,
            },
        },
        description: 'Percent-encode the input parameter for use in URLs',
        syntax: 'URLENCODE(str)',
        examples: [
            'URLENCODE("Hello, world") => "Hello%2C%20world"',
            'URLENCODE({column1})',
        ],
        returnType: FormulaDataTypes.STRING,
    },
    WEEKDAY: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/date-functions#weekday',
        validation: {
            args: {
                min: 1,
                max: 2,
                type: FormulaDataTypes.NUMERIC,
            },
            custom(_argTypes, parsedTree) {
                if (parsedTree.arguments[0].type === JSEPNode.LITERAL) {
                    if (!validateDateWithUnknownFormat(parsedTree.arguments[0].value)) {
                        throw new FormulaError(FormulaErrorType.TYPE_MISMATCH, { key: 'msg.formula.firstParamWeekDayHaveDate' }, 'First parameter of WEEKDAY should be a date');
                    }
                }
                // if second argument is present and literal then validate it
                if (parsedTree.arguments[1] &&
                    parsedTree.arguments[1].type === JSEPNode.LITERAL) {
                    const value = parsedTree.arguments[1].value;
                    if (typeof value !== 'string' ||
                        ![
                            'sunday',
                            'monday',
                            'tuesday',
                            'wednesday',
                            'thursday',
                            'friday',
                            'saturday',
                        ].includes(value.toLowerCase())) {
                        throw new FormulaError(FormulaErrorType.TYPE_MISMATCH, { key: 'msg.formula.secondParamWeekDayHaveDate' }, 'Second parameter of WEEKDAY should be day of week string');
                    }
                }
            },
        },
        description: 'Retrieve the day of the week as an integer (0-6), starting from Monday by default.',
        syntax: 'WEEKDAY(date, [startDayOfWeek])',
        examples: ['WEEKDAY("2021-06-09")', 'WEEKDAY(NOW(), "sunday")'],
        returnType: FormulaDataTypes.NUMERIC,
    },
    TRUE: {
        validation: {
            args: {
                max: 0,
            },
        },
        description: 'Returns 1',
        syntax: 'TRUE()',
        examples: ['TRUE()'],
        returnType: FormulaDataTypes.NUMERIC,
        // TODO: Add docs url
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/logical-functions#true',
    },
    FALSE: {
        validation: {
            args: {
                max: 0,
            },
        },
        description: 'Returns 0',
        syntax: 'FALSE()',
        examples: ['FALSE()'],
        returnType: FormulaDataTypes.NUMERIC,
        // TODO: Add docs url
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/logical-functions#false',
    },
    REGEX_MATCH: {
        validation: {
            args: {
                rqd: 2,
                type: FormulaDataTypes.STRING,
            },
        },
        description: 'Verifies whether the input text matches a regular expression, returning 1 for a match and 0 otherwise.',
        syntax: 'REGEX_MATCH(string, regex)',
        examples: ['REGEX_MATCH({title}, "abc.*")'],
        returnType: FormulaDataTypes.NUMERIC,
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#regex_match',
    },
    REGEX_EXTRACT: {
        validation: {
            args: {
                rqd: 2,
                type: FormulaDataTypes.STRING,
            },
        },
        description: 'Retrieve the first match of a regular expression in a string.',
        syntax: 'REGEX_EXTRACT(string, regex)',
        examples: ['REGEX_EXTRACT({title}, "abc.*")'],
        returnType: FormulaDataTypes.STRING,
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#regex_extract',
    },
    REGEX_REPLACE: {
        validation: {
            args: {
                rqd: 3,
                type: FormulaDataTypes.STRING,
            },
        },
        description: 'Replace all occurrences of a regular expression in a string with a specified replacement string.',
        syntax: 'REGEX_MATCH(string, regex, replacement)',
        examples: ['REGEX_EXTRACT({title}, "abc.*", "abcd")'],
        returnType: FormulaDataTypes.STRING,
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/string-functions#regex_replace',
    },
    BLANK: {
        validation: {
            args: {
                rqd: 0,
            },
        },
        description: 'Yields a null value.',
        syntax: 'BLANK()',
        examples: ['BLANK()'],
        returnType: FormulaDataTypes.NULL,
        // TODO: Add docs url
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/logical-functions#blank',
    },
    XOR: {
        validation: {
            args: {
                min: 1,
            },
            // todo: validation for boolean
        },
        description: 'Verifies whether an odd number of arguments are true, returning true if so, and false otherwise.',
        syntax: 'XOR(expression, [exp2, ...])',
        examples: ['XOR(TRUE(), FALSE(), TRUE())'],
        returnType: FormulaDataTypes.BOOLEAN,
        // TODO: Add docs url
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/logical-functions#xor',
    },
    EVEN: {
        validation: {
            args: {
                rqd: 1,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Rounds up the specified value to the nearest even integer that is greater than or equal to the specified value',
        syntax: 'EVEN(value)',
        examples: ['EVEN({column})'],
        returnType: FormulaDataTypes.NUMERIC,
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#even',
    },
    ODD: {
        validation: {
            args: {
                rqd: 1,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Rounds up the specified value to the nearest odd integer that is greater than or equal to the specified value',
        syntax: 'ODD(value)',
        examples: ['ODD({column})'],
        returnType: FormulaDataTypes.NUMERIC,
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#odd',
    },
    RECORD_ID: {
        validation: {
            args: {
                rqd: 0,
            },
        },
        description: 'Retrieve the record ID of the current record.',
        syntax: 'RECORD_ID()',
        examples: ['RECORD_ID()'],
        // todo: resolve return type based on the args
        returnType: () => {
            return FormulaDataTypes.STRING;
        },
    },
    COUNTA: {
        validation: {
            args: {
                min: 1,
            },
        },
        description: 'Counts non-empty arguments',
        syntax: 'COUNTA(value1, [value2, ...])',
        examples: ['COUNTA({field1}, {field2})'],
        returnType: FormulaDataTypes.NUMERIC,
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#counta',
    },
    COUNT: {
        validation: {
            args: {
                min: 1,
            },
        },
        description: 'Counts numerical arguments',
        syntax: 'COUNT(value1, [value2, ...])',
        examples: ['COUNT({field1}, {field2})'],
        returnType: FormulaDataTypes.NUMERIC,
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#count',
    },
    COUNTALL: {
        validation: {
            args: {
                min: 1,
            },
        },
        description: 'Counts the number of arguments',
        syntax: 'COUNTALL(value1, [value2, ...])',
        examples: ['COUNTALL({field1}, {field2})'],
        returnType: FormulaDataTypes.NUMERIC,
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#countall',
    },
    ROUNDDOWN: {
        validation: {
            args: {
                min: 1,
                max: 2,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Rounds down the value after the decimal point to the specified number of decimal places given by "precision" (default is 0).',
        syntax: 'ROUNDDOWN(value, [precision])',
        examples: ['ROUNDDOWN({field1})', 'ROUNDDOWN({field1}, 2)'],
        returnType: FormulaDataTypes.NUMERIC,
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#rounddown',
    },
    ROUNDUP: {
        validation: {
            args: {
                min: 1,
                max: 2,
                type: FormulaDataTypes.NUMERIC,
            },
        },
        description: 'Rounds up the value after the decimal point to the specified number of decimal places given by "precision" (default is 0).',
        syntax: 'ROUNDUP(value, [precision])',
        examples: ['ROUNDUP({field1})', 'ROUNDUP({field1}, 2)'],
        returnType: FormulaDataTypes.NUMERIC,
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#roundup',
    },
    VALUE: {
        validation: {
            args: {
                rqd: 1,
            },
        },
        description: 'Extracts the numeric value from a string, handling % or - appropriately, and returns the resulting numeric value.',
        syntax: 'VALUE(value)',
        examples: ['VALUE({field})', 'VALUE("abc10000%")', 'VALUE("$10000")'],
        returnType: FormulaDataTypes.NUMERIC,
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/numeric-functions#value',
    },
    JSON_EXTRACT: {
        docsUrl: 'https://docs.nocodb.com/fields/field-types/formula/json-functions#json_extract',
        validation: {
            args: {
                min: 2,
                max: 2,
                type: [FormulaDataTypes.STRING, FormulaDataTypes.STRING],
            },
        },
        description: 'Extracts a value from a JSON string using a jq-like syntax',
        syntax: 'JSON_EXTRACT(json_string, path)',
        examples: [
            'JSON_EXTRACT(\'{"a": {"b": "c"}}\', \'.a.b\') => "c"',
            "JSON_EXTRACT({json_column}, '.key')",
        ],
        returnType: FormulaDataTypes.STRING,
    },
    // Disabling these functions for now; these act as alias for CreatedAt & UpdatedAt fields;
    // Issue: Error noticed if CreatedAt & UpdatedAt fields are removed from the table after creating these formulas
    //
    // CREATED_TIME: {
    //   validation: {
    //     args: {
    //       rqd: 0,
    //     },
    //   },
    //   description: 'Returns the created time of the current record if it exists',
    //   syntax: 'CREATED_TIME()',
    //   examples: ['CREATED_TIME()'],
    // },
    // LAST_MODIFIED_TIME: {
    //   validation: {
    //     args: {
    //       rqd: 0,
    //     },
    //   },
    //   description: 'Returns the last modified time of the current record if it exists',
    //   syntax: ' LAST_MODIFIED_TIME()',
    //   examples: [' LAST_MODIFIED_TIME()'],
    // },
};
export class FormulaError extends Error {
    constructor(type, extra, message = 'Formula Error') {
        super(message);
        this.type = type;
        this.extra = extra;
    }
}
function extractColumnIdentifierType(_a) {
    return __awaiter(this, arguments, void 0, function* ({ col, columns, getMeta, clientOrSqlUi, }) {
        const res = {};
        const sqlUI = typeof clientOrSqlUi === 'string'
            ? SqlUiFactory.create({ client: clientOrSqlUi })
            : clientOrSqlUi;
        switch (col === null || col === void 0 ? void 0 : col.uidt) {
            // string
            case UITypes.SingleLineText:
            case UITypes.LongText:
            case UITypes.MultiSelect:
            case UITypes.SingleSelect:
            case UITypes.PhoneNumber:
            case UITypes.Email:
            case UITypes.URL:
            case UITypes.User:
            case UITypes.CreatedBy:
            case UITypes.LastModifiedBy:
                res.dataType = FormulaDataTypes.STRING;
                break;
            // numeric
            case UITypes.Year:
            case UITypes.Number:
            case UITypes.Decimal:
            case UITypes.Rating:
            case UITypes.Count:
            case UITypes.AutoNumber:
                res.dataType = FormulaDataTypes.NUMERIC;
                break;
            // date
            case UITypes.Date:
            case UITypes.DateTime:
            case UITypes.CreatedTime:
            case UITypes.LastModifiedTime:
                res.dataType = FormulaDataTypes.DATE;
                break;
            case UITypes.Currency:
            case UITypes.Percent:
            case UITypes.Duration:
            case UITypes.Links:
                res.dataType = FormulaDataTypes.NUMERIC;
                break;
            case UITypes.Rollup:
                {
                    const rollupFunction = col.colOptions.rollup_function;
                    if ([
                        'count',
                        'avg',
                        'sum',
                        'countDistinct',
                        'sumDistinct',
                        'avgDistinct',
                    ].includes(rollupFunction)) {
                        // these functions produce a numeric value, which can be used in numeric functions
                        res.dataType = FormulaDataTypes.NUMERIC;
                    }
                    else {
                        const relationColumnOpt = columns.find((column) => column.id === col.colOptions.fk_relation_column_id);
                        // the value is based on the foreign rollup column type
                        const refTableMeta = yield getMeta(relationColumnOpt.colOptions
                            .fk_related_model_id);
                        const refTableColumns = refTableMeta.columns;
                        const childFieldColumn = refTableColumns.find((column) => column.id === col.colOptions.fk_rollup_column_id);
                        // extract type and add to res
                        Object.assign(res, yield extractColumnIdentifierType({
                            col: childFieldColumn,
                            columns: refTableColumns,
                            getMeta,
                            clientOrSqlUi,
                        }));
                    }
                }
                break;
            case UITypes.Attachment:
                res.dataType = FormulaDataTypes.STRING;
                break;
            case UITypes.Checkbox:
                if (col.dt === 'boolean' || col.dt === 'bool') {
                    res.dataType = FormulaDataTypes.BOOLEAN;
                }
                else {
                    res.dataType = FormulaDataTypes.NUMERIC;
                }
                break;
            case UITypes.Time:
                res.dataType = FormulaDataTypes.INTERVAL;
                break;
            case UITypes.ID:
            case UITypes.ForeignKey:
            case UITypes.SpecificDBType:
                {
                    if (sqlUI) {
                        const abstractType = sqlUI.getAbstractType(col);
                        if (['integer', 'float', 'decimal'].includes(abstractType)) {
                            res.dataType = FormulaDataTypes.NUMERIC;
                        }
                        else if (['boolean'].includes(abstractType)) {
                            res.dataType = FormulaDataTypes.BOOLEAN;
                        }
                        else if (['date', 'datetime', 'time', 'year'].includes(abstractType)) {
                            res.dataType = FormulaDataTypes.DATE;
                        }
                        else {
                            res.dataType = FormulaDataTypes.STRING;
                        }
                    }
                    else {
                        res.dataType = FormulaDataTypes.UNKNOWN;
                    }
                }
                break;
            // not supported
            case UITypes.Lookup:
            case UITypes.Barcode:
            case UITypes.Button:
            case UITypes.Collaborator:
            case UITypes.QrCode:
            default:
                res.dataType = FormulaDataTypes.UNKNOWN;
                break;
        }
        return res;
    });
}
export function validateFormulaAndExtractTreeWithType(_a) {
    return __awaiter(this, arguments, void 0, function* ({ formula, column, columns, clientOrSqlUi, getMeta, }) {
        const sqlUI = typeof clientOrSqlUi === 'string'
            ? SqlUiFactory.create({ client: clientOrSqlUi })
            : clientOrSqlUi;
        const colAliasToColMap = {};
        const colIdToColMap = {};
        for (const col of columns) {
            colAliasToColMap[col.title] = col;
            colIdToColMap[col.id] = col;
        }
        const validateAndExtract = (parsedTree) => __awaiter(this, void 0, void 0, function* () {
            var _b, _c, _d, _e, _f, _g, _h;
            const res = Object.assign({}, parsedTree);
            if (parsedTree.type === JSEPNode.CALL_EXP) {
                const calleeName = parsedTree.callee.name.toUpperCase();
                // validate function name
                if (!formulas[calleeName]) {
                    throw new FormulaError(FormulaErrorType.INVALID_FUNCTION_NAME, {}, `Function ${calleeName} is not available`);
                }
                else if (sqlUI === null || sqlUI === void 0 ? void 0 : sqlUI.getUnsupportedFnList().includes(calleeName)) {
                    throw new FormulaError(FormulaErrorType.INVALID_FUNCTION_NAME, {}, `Function ${calleeName} is unavailable for your database`);
                }
                // validate arguments
                const validation = formulas[calleeName] && formulas[calleeName].validation;
                if (validation && validation.args) {
                    if (validation.args.rqd !== undefined &&
                        validation.args.rqd !== parsedTree.arguments.length) {
                        throw new FormulaError(FormulaErrorType.INVALID_ARG, {
                            key: 'msg.formula.requiredArgumentsFormula',
                            requiredArguments: validation.args.rqd,
                            calleeName,
                        }, 'Required arguments missing');
                    }
                    else if (validation.args.min !== undefined &&
                        validation.args.min > parsedTree.arguments.length) {
                        throw new FormulaError(FormulaErrorType.MIN_ARG, {
                            key: 'msg.formula.minRequiredArgumentsFormula',
                            minRequiredArguments: validation.args.min,
                            calleeName,
                        }, 'Minimum arguments required');
                    }
                    else if (validation.args.max !== undefined &&
                        validation.args.max < parsedTree.arguments.length) {
                        throw new FormulaError(FormulaErrorType.INVALID_ARG, {
                            key: 'msg.formula.maxRequiredArgumentsFormula',
                            maxRequiredArguments: validation.args.max,
                            calleeName,
                        }, 'Maximum arguments missing');
                    }
                }
                // get args type and validate
                const validateResult = (res.arguments =
                    yield Promise.all(parsedTree.arguments.map((arg) => {
                        return validateAndExtract(arg);
                    })));
                const argTypes = validateResult.map((v) => v.dataType);
                // if validation function is present, call it
                if ((_b = formulas[calleeName].validation) === null || _b === void 0 ? void 0 : _b.custom) {
                    (_c = formulas[calleeName].validation) === null || _c === void 0 ? void 0 : _c.custom(argTypes, parsedTree);
                }
                // validate against expected arg types if present
                else if ((_e = (_d = formulas[calleeName].validation) === null || _d === void 0 ? void 0 : _d.args) === null || _e === void 0 ? void 0 : _e.type) {
                    for (let i = 0; i < validateResult.length; i++) {
                        const argPt = validateResult[i];
                        // if type
                        const expectedArgType = Array.isArray(formulas[calleeName].validation.args.type)
                            ? formulas[calleeName].validation.args.type[i]
                            : formulas[calleeName].validation.args.type;
                        if (argPt.dataType !== expectedArgType &&
                            argPt.dataType !== FormulaDataTypes.NULL &&
                            argPt.dataType !== FormulaDataTypes.UNKNOWN &&
                            expectedArgType !== FormulaDataTypes.STRING) {
                            if (argPt.type === JSEPNode.IDENTIFIER) {
                                const name = ((_f = columns === null || columns === void 0 ? void 0 : columns.find((c) => c.id === argPt.name || c.title === argPt.name)) === null || _f === void 0 ? void 0 : _f.title) || argPt.name;
                                throw new FormulaError(FormulaErrorType.INVALID_ARG, {
                                    key: 'msg.formula.columnWithTypeFoundButExpected',
                                    columnName: name,
                                    columnType: argPt.dataType,
                                    expectedType: expectedArgType,
                                }, `Field ${name} with ${argPt.dataType} type is found but ${expectedArgType} type is expected`);
                            }
                            else {
                                let key = '';
                                const position = i + 1;
                                let type = '';
                                if (expectedArgType === FormulaDataTypes.NUMERIC) {
                                    key = 'msg.formula.typeIsExpected';
                                    type = 'numeric';
                                }
                                else if (expectedArgType === FormulaDataTypes.BOOLEAN) {
                                    key = 'msg.formula.typeIsExpected';
                                    type = 'boolean';
                                }
                                else if (expectedArgType === FormulaDataTypes.DATE) {
                                    key = 'msg.formula.typeIsExpected';
                                    type = 'date';
                                }
                                throw new FormulaError(FormulaErrorType.INVALID_ARG, {
                                    type,
                                    key,
                                    position,
                                    calleeName,
                                }, `${calleeName === null || calleeName === void 0 ? void 0 : calleeName.toUpperCase()} requires a ${type || expectedArgType} at position ${position}`);
                            }
                        }
                        // if expected type is string and arg type is not string, then cast it to string
                        if (expectedArgType === FormulaDataTypes.STRING &&
                            expectedArgType !== argPt.dataType) {
                            argPt.cast = FormulaDataTypes.STRING;
                        }
                    }
                }
                if (typeof formulas[calleeName].returnType === 'function') {
                    res.dataType = (_h = (_g = formulas[calleeName]).returnType) === null || _h === void 0 ? void 0 : _h.call(_g, argTypes);
                }
                else if (formulas[calleeName].returnType) {
                    res.dataType = formulas[calleeName].returnType;
                }
            }
            else if (parsedTree.type === JSEPNode.IDENTIFIER) {
                const col = (colIdToColMap[parsedTree.name] ||
                    colAliasToColMap[parsedTree.name]);
                if (!col) {
                    throw new FormulaError(FormulaErrorType.INVALID_COLUMN, {
                        key: 'msg.formula.columnNotAvailable',
                        columnName: parsedTree.name,
                    }, `Invalid column name/id ${JSON.stringify(parsedTree.name)} in formula`);
                }
                res.name = col.id;
                if ((col === null || col === void 0 ? void 0 : col.uidt) === UITypes.Formula) {
                    if (column) {
                        // check for circular reference when column is present(only available when calling root formula)
                        yield checkForCircularFormulaRef(column, parsedTree, columns, getMeta);
                    }
                    const formulaRes = col.colOptions.parsed_tree ||
                        (yield validateFormulaAndExtractTreeWithType(
                        // formula may include double curly brackets in previous version
                        // convert to single curly bracket here for compatibility
                        {
                            formula: col.colOptions.formula
                                .replaceAll('{{', '{')
                                .replaceAll('}}', '}'),
                            columns,
                            clientOrSqlUi,
                            getMeta,
                        }));
                    res.dataType = formulaRes === null || formulaRes === void 0 ? void 0 : formulaRes.dataType;
                }
                else {
                    if ((col === null || col === void 0 ? void 0 : col.uidt) === UITypes.Lookup ||
                        (col === null || col === void 0 ? void 0 : col.uidt) === UITypes.LinkToAnotherRecord) {
                        // check for circular reference when column is present(only available when calling root formula)
                        if (column) {
                            yield checkForCircularFormulaRef(column, parsedTree, columns, getMeta);
                        }
                    }
                    // extract type and add to res
                    Object.assign(res, yield extractColumnIdentifierType({
                        col,
                        columns,
                        getMeta,
                        clientOrSqlUi,
                    }));
                }
            }
            else if (parsedTree.type === JSEPNode.LITERAL) {
                if (typeof parsedTree.value === 'number') {
                    res.dataType = FormulaDataTypes.NUMERIC;
                }
                else if (typeof parsedTree.value === 'string') {
                    res.dataType = FormulaDataTypes.STRING;
                }
                else if (typeof parsedTree.value === 'boolean') {
                    res.dataType = FormulaDataTypes.BOOLEAN;
                }
                else {
                    res.dataType = FormulaDataTypes.STRING;
                }
            }
            else if (parsedTree.type === JSEPNode.UNARY_EXP) {
                // only support -ve values
                if (['-'].includes(parsedTree.operator) &&
                    parsedTree.argument.type === JSEPNode.LITERAL &&
                    typeof parsedTree.argument.value === 'number') {
                    res.dataType = FormulaDataTypes.NUMERIC;
                }
                else {
                    throw new FormulaError(FormulaErrorType.NOT_SUPPORTED, {}, `Unary expression '${parsedTree.operator}' is not supported`);
                }
            }
            else if (parsedTree.type === JSEPNode.BINARY_EXP) {
                res.left = yield validateAndExtract(parsedTree.left);
                res.right = yield validateAndExtract(parsedTree.right);
                const dateAndTimeParsedNode = handleBinaryExpressionForDateAndTime({
                    sourceBinaryNode: res,
                });
                if (dateAndTimeParsedNode) {
                    Object.assign(res, handleBinaryExpressionForDateAndTime({ sourceBinaryNode: res }));
                    if (res.type !== JSEPNode.BINARY_EXP) {
                        res.left = undefined;
                        res.right = undefined;
                        res.operator = undefined;
                    }
                }
                else if (['==', '<', '>', '<=', '>=', '!='].includes(parsedTree.operator)) {
                    res.dataType = FormulaDataTypes.COND_EXP;
                }
                else if (parsedTree.operator === '+') {
                    res.dataType = FormulaDataTypes.NUMERIC;
                    // if any side is string/date/other type, then the result will be concatenated string
                    // e.g. 1 + '2' = '12'
                    if ([
                        res.left,
                        res.right,
                    ].some((r) => ![
                        FormulaDataTypes.NUMERIC,
                        FormulaDataTypes.BOOLEAN,
                        FormulaDataTypes.NULL,
                        FormulaDataTypes.UNKNOWN,
                    ].includes(r.dataType))) {
                        res.dataType = FormulaDataTypes.STRING;
                    }
                }
                else if (['&'].includes(parsedTree.operator)) {
                    res.dataType = FormulaDataTypes.STRING;
                }
                else {
                    res.dataType = FormulaDataTypes.NUMERIC;
                }
            }
            else if (parsedTree.type === JSEPNode.MEMBER_EXP) {
                throw new FormulaError(FormulaErrorType.NOT_SUPPORTED, {}, 'Bracket notation is not supported');
            }
            else if (parsedTree.type === JSEPNode.ARRAY_EXP) {
                throw new FormulaError(FormulaErrorType.NOT_SUPPORTED, {}, 'Array is not supported');
            }
            else if (parsedTree.type === JSEPNode.COMPOUND) {
                throw new FormulaError(FormulaErrorType.NOT_SUPPORTED, {}, 'Compound statement is not supported');
            }
            return res;
        });
        // register jsep curly hook
        jsep.plugins.register(jsepCurlyHook);
        const parsedFormula = jsep(formula);
        // TODO: better jsep expression handling
        const result = yield validateAndExtract(parsedFormula);
        return result;
    });
}
function handleBinaryExpressionForDateAndTime(params) {
    const { sourceBinaryNode } = params;
    let res;
    if ([FormulaDataTypes.DATE, FormulaDataTypes.INTERVAL].includes(sourceBinaryNode.left.dataType) &&
        [FormulaDataTypes.DATE, FormulaDataTypes.INTERVAL].includes(sourceBinaryNode.right.dataType) &&
        sourceBinaryNode.operator === '-') {
        // when it's interval and interval, we return diff in minute (numeric)
        if ([FormulaDataTypes.INTERVAL].includes(sourceBinaryNode.left.dataType) &&
            [FormulaDataTypes.INTERVAL].includes(sourceBinaryNode.right.dataType)) {
            res = {
                type: JSEPNode.CALL_EXP,
                arguments: [
                    sourceBinaryNode.left,
                    sourceBinaryNode.right,
                    {
                        type: 'Literal',
                        value: 'minutes',
                        raw: '"minutes"',
                        dataType: 'string',
                    },
                ],
                callee: {
                    type: 'Identifier',
                    name: 'DATETIME_DIFF',
                },
                dataType: FormulaDataTypes.NUMERIC,
            };
        }
        // when it's date - date, show the difference in minute
        else if ([FormulaDataTypes.DATE].includes(sourceBinaryNode.left.dataType) &&
            [FormulaDataTypes.DATE].includes(sourceBinaryNode.right.dataType)) {
            res = {
                type: JSEPNode.CALL_EXP,
                arguments: [
                    sourceBinaryNode.left,
                    sourceBinaryNode.right,
                    {
                        type: 'Literal',
                        value: 'minutes',
                        raw: '"minutes"',
                        dataType: 'string',
                    },
                ],
                callee: {
                    type: 'Identifier',
                    name: 'DATETIME_DIFF',
                },
                dataType: FormulaDataTypes.NUMERIC,
            };
        }
        // else interval and date can be addedd seamlessly A - B
        // with result as DATE
        // may be changed if we find other db use case
        else if ([FormulaDataTypes.INTERVAL, FormulaDataTypes.DATE].includes(sourceBinaryNode.left.dataType) &&
            [FormulaDataTypes.INTERVAL, FormulaDataTypes.DATE].includes(sourceBinaryNode.right.dataType) &&
            sourceBinaryNode.left.dataType != sourceBinaryNode.right.dataType) {
            res = {
                type: JSEPNode.BINARY_EXP,
                left: sourceBinaryNode.left,
                right: sourceBinaryNode.right,
                operator: '-',
                dataType: FormulaDataTypes.DATE,
            };
        }
    }
    else if ([FormulaDataTypes.DATE, FormulaDataTypes.INTERVAL].includes(sourceBinaryNode.left.dataType) &&
        [FormulaDataTypes.DATE, FormulaDataTypes.INTERVAL].includes(sourceBinaryNode.right.dataType) &&
        sourceBinaryNode.operator === '+') {
        // when it's interval and interval, we return addition in minute (numeric)
        if ([FormulaDataTypes.INTERVAL].includes(sourceBinaryNode.left.dataType) &&
            [FormulaDataTypes.INTERVAL].includes(sourceBinaryNode.right.dataType)) {
            const left = {
                type: JSEPNode.CALL_EXP,
                arguments: [
                    sourceBinaryNode.left,
                    {
                        type: 'Literal',
                        value: '00:00:00',
                        raw: '"00:00:00"',
                        dataType: FormulaDataTypes.INTERVAL,
                    },
                    {
                        type: 'Literal',
                        value: 'minutes',
                        raw: '"minutes"',
                        dataType: 'string',
                    },
                ],
                callee: {
                    type: 'Identifier',
                    name: 'DATETIME_DIFF',
                },
                dataType: FormulaDataTypes.NUMERIC,
            };
            const right = {
                type: JSEPNode.CALL_EXP,
                arguments: [
                    sourceBinaryNode.right,
                    {
                        type: 'Literal',
                        value: '00:00:00',
                        raw: '"00:00:00"',
                        dataType: FormulaDataTypes.INTERVAL,
                    },
                    {
                        type: 'Literal',
                        value: 'minutes',
                        raw: '"minutes"',
                        dataType: 'string',
                    },
                ],
                callee: {
                    type: 'Identifier',
                    name: 'DATETIME_DIFF',
                },
                dataType: FormulaDataTypes.NUMERIC,
            };
            return {
                type: JSEPNode.BINARY_EXP,
                left,
                right,
                operator: '+',
                dataType: FormulaDataTypes.NUMERIC,
            };
        }
        // else interval and date can be addedd seamlessly A + B
        // with result as DATE
        // may be changed if we find other db use case
        else if ([FormulaDataTypes.INTERVAL, FormulaDataTypes.DATE].includes(sourceBinaryNode.left.dataType) &&
            [FormulaDataTypes.INTERVAL, FormulaDataTypes.DATE].includes(sourceBinaryNode.right.dataType) &&
            sourceBinaryNode.left.dataType != sourceBinaryNode.right.dataType) {
            res = {
                type: JSEPNode.BINARY_EXP,
                left: sourceBinaryNode.left,
                right: sourceBinaryNode.right,
                operator: '+',
                dataType: FormulaDataTypes.DATE,
            };
        }
    }
    return res;
}
function checkForCircularFormulaRef(formulaCol, parsedTree, columns, getMeta) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract formula references
        const formulaPaths = yield columns.reduce((promiseRes, c) => __awaiter(this, void 0, void 0, function* () {
            const res = yield promiseRes;
            if (c.id !== formulaCol.id && c.uidt === UITypes.Formula) {
                const neighbours = [
                    ...new Set((c.colOptions.formula.match(/c_?\w{14,15}/g) || []).filter((colId) => columns.some((col) => col.id === colId && col.uidt === UITypes.Formula))),
                ];
                if (neighbours.length)
                    res.push({ [c.id]: neighbours });
            }
            else if (c.uidt === UITypes.Lookup ||
                c.uidt === UITypes.LinkToAnotherRecord) {
                const neighbours = yield processLookupOrLTARColumn(c);
                if (neighbours === null || neighbours === void 0 ? void 0 : neighbours.length)
                    res.push({ [c.id]: neighbours });
            }
            return res;
        }), Promise.resolve([]));
        function processLookupFormula(col, columns) {
            return __awaiter(this, void 0, void 0, function* () {
                const neighbours = [];
                if (formulaCol.fk_model_id === col.fk_model_id) {
                    return [col.id];
                }
                // Extract columns used in the formula and check for cycles
                const referencedColumns = col.colOptions.formula.match(/c_?\w{14,15}/g) || [];
                for (const refColId of referencedColumns) {
                    const refCol = columns.find((c) => c.id === refColId);
                    if (refCol.uidt === UITypes.Formula) {
                        neighbours.push(...(yield processLookupFormula(refCol, columns)));
                    }
                    else if (refCol.uidt === UITypes.Lookup ||
                        refCol.uidt === UITypes.LinkToAnotherRecord) {
                        neighbours.push(...(yield processLookupOrLTARColumn(refCol)));
                    }
                }
                return neighbours;
            });
        }
        // Function to process lookup columns recursively
        function processLookupOrLTARColumn(lookupOrLTARCol) {
            return __awaiter(this, void 0, void 0, function* () {
                const neighbours = [];
                let ltarColumn;
                let lookupFilterFn;
                if (lookupOrLTARCol.uidt === UITypes.Lookup) {
                    const relationColId = lookupOrLTARCol.colOptions
                        .fk_relation_column_id;
                    const lookupColId = lookupOrLTARCol.colOptions
                        .fk_lookup_column_id;
                    ltarColumn = columns.find((c) => c.id === relationColId);
                    lookupFilterFn = (column) => column.id === lookupColId;
                }
                else if (lookupOrLTARCol.uidt === UITypes.LinkToAnotherRecord) {
                    ltarColumn = lookupOrLTARCol;
                    lookupFilterFn = (column) => !!column.pv;
                }
                if (ltarColumn) {
                    const relatedTableMeta = yield getMeta(ltarColumn.colOptions.fk_related_model_id);
                    const lookupTarget = relatedTableMeta.columns.find(lookupFilterFn);
                    if (lookupTarget) {
                        if (lookupTarget.uidt === UITypes.Formula) {
                            neighbours.push(...(yield processLookupFormula(lookupTarget, relatedTableMeta.columns)));
                        }
                        else if (lookupTarget.uidt === UITypes.Lookup ||
                            lookupTarget.uidt === UITypes.LinkToAnotherRecord) {
                            neighbours.push(...(yield processLookupOrLTARColumn(lookupTarget)));
                        }
                    }
                }
                return [...new Set(neighbours)];
            });
        }
        // include target formula column (i.e. the one to be saved if applicable)
        const targetFormulaCol = columns.find((c) => c.title === parsedTree.name &&
            [UITypes.Formula, UITypes.LinkToAnotherRecord, UITypes.Lookup].includes(c.uidt));
        if (targetFormulaCol && (formulaCol === null || formulaCol === void 0 ? void 0 : formulaCol.id)) {
            formulaPaths.push({
                [formulaCol === null || formulaCol === void 0 ? void 0 : formulaCol.id]: [targetFormulaCol.id],
            });
        }
        const vertices = formulaPaths.length;
        if (vertices > 0) {
            // perform kahn's algo for cycle detection
            const adj = new Map();
            const inDegrees = new Map();
            // init adjacency list & indegree
            for (const [_, v] of Object.entries(formulaPaths)) {
                const src = Object.keys(v)[0];
                const neighbours = v[src];
                inDegrees.set(src, inDegrees.get(src) || 0);
                for (const neighbour of neighbours) {
                    adj.set(src, (adj.get(src) || new Set()).add(neighbour));
                    inDegrees.set(neighbour, (inDegrees.get(neighbour) || 0) + 1);
                }
            }
            const queue = [];
            // put all vertices with in-degree = 0 (i.e. no incoming edges) to queue
            inDegrees.forEach((inDegree, col) => {
                if (inDegree === 0) {
                    // in-degree = 0 means we start traversing from this node
                    queue.push(col);
                }
            });
            // init count of visited vertices
            let visited = 0;
            // BFS
            while (queue.length !== 0) {
                // remove a vertex from the queue
                const src = queue.shift();
                // if this node has neighbours, increase visited by 1
                const neighbours = adj.get(src) || new Set();
                if (neighbours.size > 0) {
                    visited += 1;
                }
                // iterate each neighbouring nodes
                neighbours.forEach((neighbour) => {
                    // decrease in-degree of its neighbours by 1
                    inDegrees.set(neighbour, inDegrees.get(neighbour) - 1);
                    // if in-degree becomes 0
                    if (inDegrees.get(neighbour) === 0) {
                        // then put the neighboring node to the queue
                        queue.push(neighbour);
                    }
                });
            }
            // vertices not same as visited = cycle found
            if (vertices !== visited) {
                throw new FormulaError(FormulaErrorType.CIRCULAR_REFERENCE, {
                    key: 'msg.formula.cantSaveCircularReference',
                }, 'Circular reference detected');
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXVsYUhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2Zvcm11bGFIZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQVV4QixPQUFPLE9BQU8sTUFBTSxXQUFXLENBQUM7QUFDaEMsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBZS9DLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQVUsQ0FBQztBQUNwRCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBVSxDQUFDO0FBQ2pFLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHO0lBQ2pDLElBQUk7SUFDSixHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7Q0FDSSxDQUFDO0FBbUVYLGtDQUFrQztBQUNsQyxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNO0FBQy9CLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU07QUFFL0IsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHO0lBQzNCLElBQUksRUFBRSxPQUFPO0lBQ2IsSUFBSSxDQUFDLElBQUk7UUFDUCxtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFNBQVMsaUJBQWlCLENBQUMsR0FBRztZQUMzRCx5REFBeUQ7WUFDekQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRSxDQUFDO2dCQUM5QixNQUFNLFlBQVksR0FBRyxJ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