import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
export class LoginUserDto {
    @IsNotEmpty({
        message: '用户名不能为空'
    })
    @MinLength(4, {
        message: '用户名长度不能小于4位'
    })
    @MaxLength(20, {
        message: '用户名长度不能大于20位'
    })
    @Matches(/^[A-Za-z0-9_]+$/, {
        message: '用户名只能包含字母、数字和下划线'
    })
    @ApiProperty({
        example: 'admin',
        description: '用户名'
    })
    username: string;
    @IsNotEmpty({
        message: '密码不能为空'
    })
    @MinLength(6, {
        message: '密码长度不能小于6位'
    })
    @MaxLength(20, {
        message: '密码长度不能大于20位'
    })
    @Matches(/^(?=.*\d)(?=.*[A-Z])|(?=.*\d)(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z\d])|(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[^A-Za-z\d])|(?=.*[A-Z])(?=.*[^A-Za-z\d])/, {
        message: '密码必须至少包含数字、特殊符号、大小写字母中任意两个'
    })
    // 正则表达式确保特殊字符仅限于 !@#$%^&*
    @Matches(/^[A-Za-z\d!@#$%^&*]+$/, {
        message: '密码只能包含字母、数字和特殊字符(!@#$%^&*)'
    })
    @ApiProperty({
        example: 'Pwd123456',
        description: '密码'
    })
    password: string;
}