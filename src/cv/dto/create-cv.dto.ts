import { IsString, IsInt, IsNotEmpty } from 'class-validator';
export class CreateCvDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsInt()
  @IsNotEmpty()
  age: number;
  @IsString()
  @IsNotEmpty()
  cin: string;
  @IsString()
  @IsNotEmpty()
  job: string;
  @IsString()
  @IsNotEmpty()
  path: string;
}