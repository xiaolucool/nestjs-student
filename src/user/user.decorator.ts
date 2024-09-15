import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

/**
 * 获取当前用户信息
 * @param data 获取用户信息中的字段 key 值 例如：id username
 */
export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user[data];
})
