import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.getOrThrow('TYPEORM_HOST'),
    port: configService.getOrThrow('TYPEORM_PORT'),
    database: configService.getOrThrow('TYPEORM_DATABASE'),
    username: configService.getOrThrow('TYPEORM_USERNAME'),
    password: configService.getOrThrow('TYPEORM_PASSWORD'),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js']
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;