import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.apigateway'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
