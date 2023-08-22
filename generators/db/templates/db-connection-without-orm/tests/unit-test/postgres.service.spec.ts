import { PostgresService } from './postgres.service';
import { Pool, QueryResult } from 'pg';

// Create a mock for the Pool class
jest.mock('pg', () => {
    const mockPool = {
        query: jest.fn(),
    };
    return {
        Pool: jest.fn(() => mockPool),
    };
});

describe('PostgresService', () => {
    let postgresService: PostgresService;
    let mockPool: { query: jest.Mock };

    beforeEach(() => {
        // Clear the mock function's call information before each test
        jest.clearAllMocks();

        // Create an instance of the PostgresService
        mockPool = new (Pool as jest.MockedClass<typeof Pool>)();
        postgresService = new PostgresService(mockPool);
    });

    it('should be defined', () => {
        expect(postgresService).toBeDefined();
    });

    it('should call pool.query with the provided SQL and values', async () => {
        const sql = 'SELECT * FROM users';
        const values = [1, 'John'];

        // Mock the query method of the pool to return a dummy result
        const expectedResult: QueryResult = {
            rows: [],
            rowCount: 0,
        };
        mockPool.query.mockResolvedValue(expectedResult);

        // Call the query method of the PostgresService
        const result = await postgresService.query(sql, values);

        // Ensure that pool.query was called with the correct arguments
        expect(mockPool.query).toHaveBeenCalledWith(sql, values);

        // Verify that the result matches the expected result
        expect(result).toEqual(expectedResult);
    });
});
