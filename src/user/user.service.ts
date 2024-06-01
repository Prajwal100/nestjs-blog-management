import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
    const { email } = createUserInput;
    const existingUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new ConflictException('This email is already exists.');
    }
    const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    await this.userRepository.update(id, updateUserInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
