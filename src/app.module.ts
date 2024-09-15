import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UserGuard } from './user/user.guard'

@Module({
  imports: [TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: 500,
      retryAttempts: 10,
      autoLoadEntities: true,
    }),
  }), ConfigModule.forRoot({
    // 加载特定环境的 .env 文件
    envFilePath: `.env`,
    // 使配置服务在所有模块中可用
    isGlobal: true,
  }), JwtModule.registerAsync({
    global: true, // 是否全局注册模块
    useFactory: async () => {
      return {
        secret: process.env.JWT_SECRET, // 密钥
        signOptions: { expiresIn: process.env.JWT_EXP }, // 过期时间
      }
    }
  }), UserModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_GUARD',
    useClass: UserGuard
  }],
})
export class AppModule { }