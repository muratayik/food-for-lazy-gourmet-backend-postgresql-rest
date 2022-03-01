import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './auth.middleware';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'food-for-lazy-gourmet',
    }),
    CategoryModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
