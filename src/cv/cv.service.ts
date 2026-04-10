import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Injectable()
export class CvService {
  constructor(@InjectRepository(Cv) private cvRepository: Repository<Cv>,) {}

  async create(createCvDto: CreateCvDto, userId: number): Promise<Cv> {
    const { skills, ...cvData } = createCvDto ; 
    const cv = this.cvRepository.create({ 
      ...cvData, 
      user: { id: userId }, 
      skills: skills ? skills.map(id => ({ id })) : [] 
  });
    
    return await this.cvRepository.save(cv);
  }

  async findAll(): Promise<Cv[]> {
    return this.cvRepository.find({ relations: ['user', 'skills'] });
  }

  async findOne(id: number): Promise<Cv> {
    const cv = await this.cvRepository.findOne({ 
      where: { id }, 
      relations: ['user', 'skills'] 
    });
    
    if (!cv) {
      throw new NotFoundException(`CV with ID ${id} not found`);
    }
    return cv;
  }

  async update(id: number, updateCvDto: UpdateCvDto, userId: number): Promise<Cv> {
    const cv = await this.findOne(id);
    if(!cv) {
      throw new NotFoundException(`CV with ID ${id} not found`);
    }
    if (cv.user?.id !== userId) {
      throw new ForbiddenException('You are not authorized to update this CV');
    }

    const { skills, ...updateData } = updateCvDto as any;
    
    const cvToUpdate = await this.cvRepository.preload({
      id,
      ...updateData,
      ...(skills && { skills: skills.map(skillId => ({ id: skillId })) }),
    });

    if (!cvToUpdate) {
      throw new NotFoundException(`CV with ID ${id} not found`);
    }

    return this.cvRepository.save(cvToUpdate);
  }

  async remove(id: number, userId: number): Promise<void> {
    const cv = await this.findOne(id);

    if (cv.user?.id !== userId) {
      throw new ForbiddenException('You are not authorized to delete this CV');
    }
    await this.cvRepository.delete(id);
  }
}