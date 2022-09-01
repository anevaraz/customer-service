import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      database: process.env.TYPEORM_DATABASE,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      synchronize: process.env.NODE_ENV === 'development' ? true : false,
      logging: process.env.NODE_ENV === 'development' ? true : false,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
    } as TypeOrmModuleOptions),
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
