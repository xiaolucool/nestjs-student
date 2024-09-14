import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, verify } from '../utils/md5';

@Injectable()
export class UserService {
  // 注释：这里使用@InjectRepository 注解，注入User实体，使用Repository<User>
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    // 对密码进行加密
    createUserDto.password = hash(createUserDto.password, process.env.MD5_SALT)
    // 前端传入的数据，保存到数据库中
    const user = await this.usersRepository.save(createUserDto) // 保存到数据库中
    const { password, ...userWithoutPassword } = user; // 删除密码
    return userWithoutPassword
  }

  findAll() {
    // 查询所有用户
    return this.usersRepository.find();
  }

  findOne(id: number) {
    const user = this.usersRepository.findOneBy({ id })
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user =  this.usersRepository.update(id, updateUserDto) // 更新
    return user;
  }

  remove(id: number) {
    const user = this.usersRepository.delete(id)
    return user;
  }
}
