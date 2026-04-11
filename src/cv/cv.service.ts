import { 
  Injectable, 
  NotFoundException, 
  ForbiddenException 
} from '@nestjs/common';
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

  async create(createCvDto: CreateCvDto, user: User): Promise<Cv> {
    const { skills, ...cvData } = createCvDto;
    const cv = this.cvRepository.create({ ...cvData, user });
    return this.cvRepository.save(cv);
  }

  async findAll(user?: User): Promise<Cv[]> {
    if (!user || user.role === 'admin') {
      return this.cvRepository.find({ relations: ['user', 'skills'] });
    }

    return this.cvRepository.find({ 
      where: { user: { id: user.id } },
      relations: ['user', 'skills'] 
    });
  }

  async findOne(id: number): Promise<Cv> {
    const cv = await this.cvRepository.findOne({ 
      where: { id }, 
      relations: ['user', 'skills'] 
    });
    if (!cv) throw new NotFoundException(`CV with ID ${id} not found`);
    return cv;
  }

  async update(id: number, updateCvDto: UpdateCvDto, user: User): Promise<Cv> {
    const cv = await this.findOne(id);

    if (cv.user?.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('Vous n\'êtes pas autorisé à modifier ce CV');
    }

    await this.cvRepository.update(id, updateCvDto);
    return this.findOne(id);
  }

  async remove(id: number, user: User): Promise<void> {
    const cv = await this.findOne(id);

    if (cv.user?.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('Vous n\'êtes pas autorisé à supprimer ce CV');
    }

    const result = await this.cvRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`CV with ID ${id} not found`);
  }
}