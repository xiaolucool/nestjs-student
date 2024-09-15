import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UserGuard } from './user/user.guard'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql', // 数据库类型
    host: 'localhost', // 数据库主机
    port: 3306, // 数据库端口
    username: 'root', // 数据库用户名
    password: '123456', // 数据库密码
    database: 'nest_demo', // 数据库名称
    entities: [__dirname + '/**/*.entity{.ts,.js}'], // 数据库实体文件
    synchronize: true, // 是否自动同步实体
    // logging: true, // 是否打印日志
    retryDelay: 500, // 重试连接间隔
    retryAttempts: 10, // 重试连接次数
    autoLoadEntities: true, // 自动加载实体

  }), ConfigModule.forRoot({
    // 加载特定环境的 .env 文件
    envFilePath: `.env`,
    // 使配置服务在所有模块中可用
    isGlobal: true,
  }), JwtModule.registerAsync({
    global:true, // 是否全局注册模块
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
