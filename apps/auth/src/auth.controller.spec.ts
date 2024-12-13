import { Test, TestingModule } from '@nestjs/testing';

describe('AuthController', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [],
    }).compile();
  });
});
