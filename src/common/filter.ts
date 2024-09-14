import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express'
@Catch(HttpException) // 捕获HttpException异常
// 自定义异常过滤器
export class HttpFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()

        const request = ctx.getRequest<Request>()

        const response = ctx.getResponse<Response>()

        const status = exception.getStatus()

        response.status(status).json({
            success: false,
            // time: Date.now(),
            timestamp: new Date().toLocaleString(),
            // data: exception,
            message: exception.message || '服务器错误',
            code: status,
            path: request.url,
        })
    }
}