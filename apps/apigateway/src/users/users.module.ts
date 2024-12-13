import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constants';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        imports: [ConfigModule], // Ensure ConfigModule is imported
        useFactory: async (configService: ConfigService) => {
          console.log(
            'GRPC_URL',
            configService.get<string>('AUTH_GRPC_URL', 'localhost:5000'),
          );

          return {
            transport: Transport.GRPC,
            options: {
              url: configService.get<string>('AUTH_GRPC_URL', 'localhost:5000'), // Fetch GRPC_URL or default to 'auth:50001'
              package: AUTH_PACKAGE_NAME,
              protoPath: join(__dirname, '../auth.proto'),
            },
          };
        },
        inject: [ConfigService], // Inject ConfigService
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
