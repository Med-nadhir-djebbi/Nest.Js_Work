import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
export declare class CvService {
    private cvRepository;
    constructor(cvRepository: Repository<Cv>);
    create(createCvDto: CreateCvDto, userId: number): Promise<Cv>;
    findAll(): Promise<Cv[]>;
    findAllByUser(userId: number): Promise<Cv[]>;
    findOne(id: number): Promise<Cv>;
    update(id: number, updateCvDto: UpdateCvDto, userId: number): Promise<Cv>;
    remove(id: number, userId: number): Promise<void>;
    private findOneByIdAndUser;
}
