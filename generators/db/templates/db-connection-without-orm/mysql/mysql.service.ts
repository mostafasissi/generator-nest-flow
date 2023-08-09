// src/mysql/mysql.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';

@Injectable()
export class MysqlService {
    constructor(@Inject('MYSQL_CONNECTION') private readonly connection: Connection) {}

    async query(sql: string, values?: any): Promise<any> {
        const [rows, fields] = await this.connection.execute(sql, values);
        return rows;
    }
}
