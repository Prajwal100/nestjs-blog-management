import { Injectable } from '@nestjs/common';
import { CreateCommnetInput } from './dto/create-commnet.input';
import { UpdateCommnetInput } from './dto/update-commnet.input';

@Injectable()
export class CommnetService {
  create(createCommnetInput: CreateCommnetInput) {
    return 'This action adds a new commnet';
  }

  findAll() {
    return `This action returns all commnet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commnet`;
  }

  update(id: number, updateCommnetInput: UpdateCommnetInput) {
    return `This action updates a #${id} commnet`;
  }

  remove(id: number) {
    return `This action removes a #${id} commnet`;
  }
}
