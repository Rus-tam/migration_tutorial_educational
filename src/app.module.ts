import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: []
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.getOrThrow('DB_HOST'),
          port: configService.getOrThrow('DB_PORT'),
          database: configService.getOrThrow('POSTGRES_DATABASE'),
          username: configService.getOrThrow('POSTGRES_USERNAME'),
          password: configService.getOrThrow('POSTGRES_PASSWORD'),
          autoLoadEntities: true,
          synchronize: true
        }
      }
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
