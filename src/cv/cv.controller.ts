import { Controller, Post, Get, Body, Req, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { User } from '../user/entities/user.entity';

@Controller('cvs')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) 
  create(@Body() createCvDto: CreateCvDto, @Req() req: Request) {
    const user = req.user as User; 
    return this.cvService.create(createCvDto, user); 
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
  @UseGuards(AuthGuard('jwt')) 
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto, @Req() req: Request) {
    const user = req.user as User;
    return this.cvService.update(+id, updateCvDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt')) 
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    return this.cvService.remove(+id, user);
  }
}