import { CallHandler, HttpStatus, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
// import { RESPONSE_CODE, RESPONSE_MSG } from '../enums/response.enums.ts'

// 响应数据格式
interface Data<T> {
    data: T
}

// 响应拦截器
export class Response<T> implements NestInterceptor {
    // 拦截器拦截响应
    intercept(context, next: CallHandler): Observable<Data<T>> {
        return next.handle().pipe(map(data => {
            return {
                // code: RESPONSE_CODE.SUCCESS,
                // success: RESPONSE_MSG.SUCCESS,
                code: HttpStatus.OK,
                success: '请求成功',
                timestamp: new Date().toLocaleString(),
                data
            };
        }));
    }
}