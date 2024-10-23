import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class PeopleCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  height: string;

  @IsNotEmpty()
  @IsString()
  mass: string;

  @IsNotEmpty()
  @IsString()
  hair_color: string;

  @IsNotEmpty()
  @IsString()
  skin_color: string;

  @IsNotEmpty()
  @IsString()
  birth_year: string;

  @IsNotEmpty()
  @IsString()
  eye_color: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  homeworld: string;

  @IsNotEmpty()
  @IsArray()
  films: string[];

  @IsNotEmpty()
  @IsArray()
  species: string[];

  @IsNotEmpty()
  @IsArray()
  vehicles: string[];

  @IsNotEmpty()
  @IsArray()
  starships: string[];

  @IsNotEmpty()
  @IsString()
  url: string;

  // Las propiedades created y edited no se incluyen aquí, ya que se asignan en el constructor de People
}