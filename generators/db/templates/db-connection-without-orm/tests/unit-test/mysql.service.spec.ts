import { MysqlService } from './mysql.service';

// Mock the 'mysql2/promise' module
jest.mock('mysql2/promise', () => ({
    Connection: {
        execute: jest.fn(),
    },
}));

describe('MysqlService', () => {
    let mysqlService: MysqlService;
    let mockConnection: any; // Mocked Connection object

    beforeEach(() => {
        // Create an instance of MysqlService with a mock Connection
        mockConnection = {
            execute: jest.fn(),
        };
        mysqlService = new MysqlService(mockConnection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(mysqlService).toBeDefined();
    });

    it('should call connection.execute with the provided SQL and values', async () => {
        const sql = 'SELECT * FROM users';
        const values = [1, 'John'];

        // Mock the execute method of the Connection object to return a dummy result
        const expectedResult = [{ id: 1, name: 'John' }];
        mockConnection.execute.mockResolvedValue([expectedResult, null]);

        // Call the query method of the MysqlService
        const result = await mysqlService.query(sql, values);

        // Ensure that connection.execute was called with the correct arguments
        expect(mockConnection.execute).toHaveBeenCalledWith(sql, values);

        // Verify that the result matches the expected result
        expect(result).toEqual(expectedResult);
    });
});
