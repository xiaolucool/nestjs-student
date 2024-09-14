import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/response'
import { HttpFilter } from './common/filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 响应拦截器
  app.useGlobalInterceptors(new Response())
  // 错误过滤器
  app.useGlobalFilters(new HttpFilter())
  await app.listen(process.env.APP_PORT);
}
bootstrap();
