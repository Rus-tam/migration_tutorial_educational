import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.getOrThrow('TYPEORM_HOST'),
                    port: configService.getOrThrow('TYPEORM_PORT'),
                    database: configService.getOrThrow('TYPEORM_DATABASE'),
                    username: configService.getOrThrow('TYPEORM_USERNAME'),
                    password: configService.getOrThrow('TYPEORM_PASSWORD'),
                    autoLoadEntities: true,
                    synchronize: true
                }
            }
        })
    ]
})
export class DatabaseModule { }
