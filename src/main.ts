import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/response'
import { HttpFilter } from './common/filter'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 设置全局前缀
  app.setGlobalPrefix('api/v1')
  // 生成文档
  const options = new DocumentBuilder()
    .setTitle('Nestjs API 接口文档') // 文档标题
    .setDescription('Nestjs API 学习文档') // 文档描述
    .setVersion('1.0') // 文档版本
    .addBearerAuth() // 添加认证
    .setBasePath('api/v1') // 设置基础路径
    .build() // 生成文档配置
  // 创建 Swagger 文档
  const document = SwaggerModule.createDocument(app, options)
  // 挂载 Swagger 文档到 /api-docs 路由
  SwaggerModule.setup('/api-docs', app, document)
  // 响应拦截器
  app.useGlobalInterceptors(new Response())
  // 错误过滤器
  app.useGlobalFilters(new HttpFilter())
  await app.listen(process.env.APP_PORT);
}
bootstrap();
