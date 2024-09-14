import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    id?: number;
    @ApiProperty({
        description: '用户名',
        default: '王二',
        type: String
    })
    username: string;
    @ApiProperty({
        description: '密码',
        default: '123456',
        type: String
    })
    password: string;
    @ApiProperty({
        description: '年龄',
        default: 18,
        type: Number
    })
    age: number;
}
