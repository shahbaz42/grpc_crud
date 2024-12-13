import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AuthModule);
  const configService = appContext.get(ConfigService);

  const grpcUrl = configService.get<string>('GRPC_URL', 'localhost:5000');

  console.log('GRPC_URL', grpcUrl);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        url: grpcUrl,
        protoPath: join(__dirname, '../auth.proto'),
        package: AUTH,
      },
    },
  );

  await app.listen();
}
bootstrap();
