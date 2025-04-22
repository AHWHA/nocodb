"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_filter_parser_1 = require("./query-filter-parser");
describe('query-filter-parser', () => {
    it('will parse eq expression with double quote', async () => {
        const text = `(field1, eq, "hello, 'world")`;
        const expectedParsedCst = {
            is_group: true,
            logical_op: 'and',
            children: [
                {
                    is_group: false,
                    field: 'field1',
                    comparison_op: 'eq',
                    value: "hello, 'world",
                },
            ],
        };
        const result = query_filter_parser_1.QueryFilterParser.parse(text);
        expect(result.parsedCst).toEqual(expectedParsedCst);
    });
    it('will parse eq expression with single quote', async () => {
        const text = `(field1, eq, 'hello, "world')`;
        const expectedParsedCst = {
            is_group: true,
            logical_op: 'and',
            children: [
                {
                    is_group: false,
                    field: 'field1',
                    comparison_op: 'eq',
                    value: 'hello, "world',
                },
            ],
        };
        const result = query_filter_parser_1.QueryFilterParser.parse(text);
        expect(result.parsedCst).toEqual(expectedParsedCst);
    });
    it('will parse eq expression with mandarin, japanese and cryillic', async () => {
        const text = `(Тест, eq, "新年快乐おはよう")`;
        const expectedParsedCst = {
            is_group: true,
            logical_op: 'and',
            children: [
                {
                    is_group: false,
                    field: 'Тест',
                    comparison_op: 'eq',
                    value: '新年快乐おはよう',
                },
            ],
        };
        const result = query_filter_parser_1.QueryFilterParser.parse(text);
        expect(result.parsedCst).toEqual(expectedParsedCst);
    });
    it('will parse wrong expression', async () => {
        const text = '(field1)';
        const result = query_filter_parser_1.QueryFilterParser.parse(text);
        expect(result.parseErrors.length).toBeGreaterThan(0);
    });
    it('will parse blank expression', async () => {
        const text = '(field1, blank)';
        const result = query_filter_parser_1.QueryFilterParser.parse(text);
        const expectedParsedCst = {
            is_group: true,
            logical_op: 'and',
            children: [
                {
                    is_group: false,
                    field: 'field1',
                    comparison_op: 'blank',
                },
            ],
        };
        expect(result.parsedCst).toEqual(expectedParsedCst);
    });
    it('will parse blank value', async () => {
        const text = '(Category,gb_eq,)';
        const result = query_filter_parser_1.QueryFilterParser.parse(text);
        const expectedParsedCst = {
            is_group: true,
            logical_op: 'and',
            children: [
                {
                    is_group: false,
                    field: 'Category',
                    comparison_op: 'gb_eq',
                    value: '',
                },
            ],
        };
        expect(result.parsedCst).toEqual(expectedParsedCst);
    });
    it('will parse value and field with parentheses', async () => {
        const text = '("field(1)",eq,"(hello)")';
        const result = query_filter_parser_1.QueryFilterParser.parse(text);
        const expectedParsedCst = {
            is_group: true,
            logical_op: 'and',
            children: [
                {
                    is_group: false,
                    field: 'field(1)',
                    comparison_op: 'eq',
                    value: '(hello)',
                },
            ],
        };
        expect(result.parsedCst).toEqual(expectedParsedCst);
    });
    it('will parse value separated by comma', async () => {
        const text = '("field(1)",eq, hello, world,  baby!)';
        const result = query_filter_parser_1.QueryFilterParser.parse(text);
        const expectedParsedCst = {
            is_group: true,
            logical_op: 'and',
            children: [
                {
                    is_group: false,
                    field: 'field(1)',
                    comparison_op: 'eq',
                    value: 'hello,world,baby!',
                },
            ],
        };
        expect(result.parsedCst).toEqual(expectedParsedCst);
    });
    it('will parse complex nested logic', async () => {
        const text = '~not(field1, isWithin, nextNumberOfDays, 10)~and((field2, eq, 2)~or(field2, eq, 3))~or(field3, not, 4)';
        const result = query_filter_parser_1.QueryFilterParser.parse(text);
        const expectedParsedCst = {
            is_group: true,
            logical_op: 'and',
            children: [
                {
                    is_group: false,
                    field: 'field1',
                    comparison_op: 'isWithin',
                    logical_op: 'not',
                    comparison_sub_op: undefined,
                    value: ['nextNumberOfDays', '10'],
                },
                {
                    is_group: true,
                    logical_op: 'and',
                    children: [
                        {
                            is_group: false,
                            field: 'field2',
                            comparison_op: 'eq',
                            value: '2',
                        },
                        {
                            is_group: false,
                            field: 'field2',
                            comparison_op: 'eq',
                            logical_op: 'or',
                            value: '3',
                        },
                    ],
                },
                {
                    is_group: false,
                    field: 'field3',
                    comparison_op: 'not',
                    logical_op: 'or',
                    value: '4',
                },
            ],
        };
        expect(result.parsedCst).toEqual(expectedParsedCst);
    });
    it('will parse keyword as value', async () => {
        const text = '(Category,is,blank)';
        const result = query_filter_parser_1.QueryFilterParser.parse(text);
        const expectedParsedCst = {
            is_group: true,
            logical_op: 'and',
            children: [
                {
                    is_group: false,
                    field: 'Category',
                    comparison_op: 'blank',
                    value: undefined,
                },
            ],
        };
        expect(result.parsedCst).toEqual(expectedParsedCst);
    });
    it('will parse empty quote as value', async () => {
        const text = "(Category,eq,'')";
        const result = query_filter_parser_1.QueryFilterParser.parse(text);
        const expectedParsedCst = {
            is_group: true,
            logical_op: 'and',
            children: [
                {
                    is_group: false,
                    field: 'Category',
                    comparison_op: 'eq',
                    value: '',
                },
            ],
        };
        expect(result.parsedCst).toEqual(expectedParsedCst);
    });
    it('will parse null as null', async () => {
        const text = '("field(1)",eq, null)';
        const result = query_filter_parser_1.QueryFilterParser.parse(text);
        const expectedParsedCst = {
            is_group: true,
            logical_op: 'and',
            children: [
                {
                    is_group: false,
                    field: 'field(1)',
                    comparison_op: 'eq',
                    value: null,
                },
            ],
        };
        expect(result.parsedCst).toEqual(expectedParsedCst);
    });
    it('will parse empty string as empty', async () => {
        const text = `("field(1)",eq,'')`;
        const result = query_filter_parser_1.QueryFilterParser.parse(text);
        const expectedParsedCst = {
            is_group: true,
            logical_op: 'and',
            children: [
                {
                    is_group: false,
                    field: 'field(1)',
                    comparison_op: 'eq',
                    value: '',
                },
            ],
        };
        expect(result.parsedCst).toEqual(expectedParsedCst);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktZmlsdGVyLXBhcnNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xpYi9wYXJzZXIvcXVlcnlGaWx0ZXIvcXVlcnktZmlsdGVyLXBhcnNlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQTBEO0FBRTFELFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7SUFDbkMsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQzFELE1BQU0sSUFBSSxHQUFHLCtCQUErQixDQUFDO1FBQzdDLE1BQU0saUJBQWlCLEdBQUc7WUFDeEIsUUFBUSxFQUFFLElBQUk7WUFDZCxVQUFVLEVBQUUsS0FBSztZQUNqQixRQUFRLEVBQUU7Z0JBQ1I7b0JBQ0UsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsYUFBYSxFQUFFLElBQUk7b0JBQ25CLEtBQUssRUFBRSxlQUFlO2lCQUN2QjthQUNGO1NBQ0YsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLHVDQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQzFELE1BQU0sSUFBSSxHQUFHLCtCQUErQixDQUFDO1FBQzdDLE1BQU0saUJBQWlCLEdBQUc7WUFDeEIsUUFBUSxFQUFFLElBQUk7WUFDZCxVQUFVLEVBQUUsS0FBSztZQUNqQixRQUFRLEVBQUU7Z0JBQ1I7b0JBQ0UsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsYUFBYSxFQUFFLElBQUk7b0JBQ25CLEtBQUssRUFBRSxlQUFlO2lCQUN2QjthQUNGO1NB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