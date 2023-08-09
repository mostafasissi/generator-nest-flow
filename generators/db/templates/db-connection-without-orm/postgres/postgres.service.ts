import { Injectable, Inject } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class PostgresService {
  constructor(
    @Inject('POSTGRES_CONNECTION') private readonly pool: Pool,
  ) {}

  async query(sql: string, values: any[] = []): Promise<QueryResult> {
    return this.pool.query(sql, values);
  }
}