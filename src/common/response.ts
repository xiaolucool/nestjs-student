import { CallHandler, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { RESPONSE_CODE, RESPONSE_MSG } from '../enums'

interface Data<T> {
    data: T
}

export class Response<T> implements NestInterceptor {
    intercept(context, next: CallHandler): Observable<Data<T>> {
        return next.handle().pipe(map(data => {
            return {
                data,
                code: RESPONSE_CODE.SUCCESS,
                success: RESPONSE_MSG.SUCCESS,
                timestamp: new Date().toLocaleString()
            };
        }));
    }
}