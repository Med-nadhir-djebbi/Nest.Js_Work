import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { User } from '../user/entities/user.entity';
@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ) {}
  async create(createCvDto: CreateCvDto, user: User | null): Promise<Cv> {
    const cv = this.cvRepository.create({ ...createCvDto, user });
    return this.cvRepository.save(cv);
  }
  findAll(): Promise<Cv[]> {
    return this.cvRepository.find({ relations: ['user', 'skills'] });
  }
  async findOne(id: number): Promise<Cv> {
    const cv = await this.cvRepository.findOne({ 
      where: { id }, 
      relations: ['user', 'skills'] 
    });
    if (!cv) throw new NotFoundException(`CV with ID ${id} not found`);
    return cv;
  }
  async update(id: number, updateCvDto: UpdateCvDto): Promise<Cv> {
    await this.cvRepository.update(id, updateCvDto);
    return this.findOne(id);
  }
  async remove(id: number): Promise<void> {
    const result = await this.cvRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`CV with ID ${id} not found`);
  }
}