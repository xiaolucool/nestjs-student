import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, verify } from '../utils/md5'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
  // 注释：这里使用@InjectRepository 注解，注入User实体，使用Repository<User>
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }
  async create(createUserDto: CreateUserDto) {
    // 对密码进行加密
    createUserDto.password = hash(createUserDto.password, process.env.MD5_SALT)
    // 前端传入的数据，保存到数据库中
    const user = await this.usersRepository.save(createUserDto) // 保存到数据库中
    const { password, ...userWithoutPassword } = user; // 删除密码
    return userWithoutPassword
  }

  // 登录
  async login(loginDto: CreateUserDto) {
    const { username, password } = loginDto
    const user = await this.findByUsername(username)
    if (!user) return '用户不存在'
    if (!verify(password, user.password, process.env.MD5_SALT)) {
      return '密码错误'
    }
    const payload = { username: user.username, id: user.id };
    return await this.jwtService.signAsync(payload);
  }

  // 修改密码
  async updatePassword(id: number, body: { oldPassword: string, newPassword: string }) {
    // 根据id查询用户
    const user: CreateUserDto = await this.findOne(id)
    console.log(user.password)
    // 对比密码
    if (!verify(body.oldPassword, user.password, process.env.MD5_SALT)) return '原密码错误'
    // 对密码进行加密
    const password = hash(body.newPassword, process.env.MD5_SALT)
    // 更新密码
    await this.usersRepository.update(id, { password })
    return {
      message: '修改成功',
    }
  }

  async findAll() {
    // 查询所有用户
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    // 根据id查询用户
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username', 'password']
    })
    return user
  }
  // 根据用户名查询用户
  async findByUsername(username: string) {
    // const user = await this.usersRepository.findOneBy({ username })
    const user = await this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password']
    })
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.update(id, updateUserDto) // 更新
    return user;
  }

  async remove(id: number) {
    const user = await this.usersRepository.delete(id)
    return user;
  }
}
