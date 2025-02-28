import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        //For Local Development
        // host: configService.get('DB_HOST'),
        // port: configService.get('DB_PORT'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'production', // Be cautious with synchronize in production
        logging: process.env.NODE_ENV !== 'production',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
            require: true,
          },
          max: 20,
          min: 2,
          idleTimeoutMillis: 60000,
          connectionTimeoutMillis: 10000,
          acquireTimeoutMillis: 30000,
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
})
export class AppModule {}
