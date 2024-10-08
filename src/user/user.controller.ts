import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, UseGuards, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserGuard } from './user.guard';
import { Public } from 'src/public/public.decorator';
import { User } from './user.decorator';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
@ApiTags('用户') // 标记路由
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Public()
  @Post()
  @ApiOperation({ summary: '创建用户' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '用户登录' })
  login(@Body() body: LoginUserDto) {
    return this.userService.login(body)
  }

  // 修改密码
  @Post('updatePassword')
  @ApiOperation({ summary: '修改密码' })
  updatePassword(@User('id') id: number, @Body() body: { oldPassword: string, newPassword: string }) {
    return this.userService.updatePassword(id, body)
  }

  @Get()
  @ApiOperation({ summary: '查询所有用户' })
  findAll() {
    const a = process.env.SALT
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '根据id查询用户' })
  findOne(@Param('id') id: string) {
    // 根据id查询用户
    const user = this.userService.findOne(+id)
    return user
  }

  @Patch(':id')
  @ApiOperation({ summary: '根据id更新用户' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '根据id删除用户' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
