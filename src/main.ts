import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/response'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 响应拦截器
  app.useGlobalInterceptors(new Response())
  await app.listen(3000);
}
bootstrap();
