import type { Request } from 'express';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
export declare class CvController {
    private readonly cvService;
    constructor(cvService: CvService);
    create(createCvDto: CreateCvDto, req: Request): Promise<import("./entities/cv.entity").Cv>;
    findAll(): Promise<import("./entities/cv.entity").Cv[]>;
    findOne(id: string): Promise<import("./entities/cv.entity").Cv>;
    update(id: string, updateCvDto: UpdateCvDto, req: Request): Promise<import("./entities/cv.entity").Cv>;
    remove(id: string, req: Request): Promise<void>;
}
