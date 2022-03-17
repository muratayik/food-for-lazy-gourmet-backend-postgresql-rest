import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './auth/auth.middleware';
import { CategoryModule } from './category/category.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { AdminCheckMiddleware } from './auth/admin-check.middleware';
import { CategoryController } from './category/category.controller';
import { IngredientModule } from './ingredient/ingredient.module';
import { MealModule } from './meal/meal.module';
import { FavouriteModule } from './favourite/favourite.module';
import { FavouriteController } from './favourite/favourite.controller';
import { MealController } from './meal/meal.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    CategoryModule,
    HttpModule,
    IngredientModule,
    MealModule,
    FavouriteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(FavouriteController);

    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/category', method: RequestMethod.GET },
        { path: '/category/:id', method: RequestMethod.GET },
      )
      .forRoutes(CategoryController);

    consumer
      .apply(AdminCheckMiddleware)
      .exclude(
        { path: '/category', method: RequestMethod.GET },
        { path: '/category/:id', method: RequestMethod.GET },
      )
      .forRoutes(CategoryController);

    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/meal', method: RequestMethod.GET },
        { path: '/meal/:id', method: RequestMethod.GET },
        { path: '/meal/byCategoryId/:categoryId', method: RequestMethod.GET },
      )
      .forRoutes(MealController);

    consumer
      .apply(AdminCheckMiddleware)
      .exclude(
        { path: '/meal', method: RequestMethod.GET },
        { path: '/meal/:id', method: RequestMethod.GET },
        { path: '/meal/byCategoryId/:categoryId', method: RequestMethod.GET },
      )
      .forRoutes(MealController);
  }
}
