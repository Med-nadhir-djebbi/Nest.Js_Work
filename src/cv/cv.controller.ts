import { Controller, Post, Get, Body, Req, Patch, Param, Delete } from '@nestjs/common';
import type { Request } from 'express';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller('cvs')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  create(@Body() createCvDto: CreateCvDto, @Req() req: Request) {
    const userId = req['userId']; 
    return this.cvService.create(createCvDto, userId); 
  }

  @Get()
  findAll() {
    return this.cvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, @Body() updateCvDto: UpdateCvDto, @Req() req: Request ) {
    const userId = req['userId']; 
    return this.cvService.update(+id, updateCvDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Req() req: Request) {
    const userId = req['userId']; 
    // Pass the userId to the service
    return this.cvService.remove(+id, userId); 
  }
}