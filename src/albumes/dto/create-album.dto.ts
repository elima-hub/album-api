import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAlbumDto {
  @IsString({ message: 'El titulo debe ser texto' })
  @IsNotEmpty({ message: 'El titulo es obligatorio' })
  @MaxLength(80, { message: 'El titulo no puede superar 80 caracteres' })
  nombre: string;
}