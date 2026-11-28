import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, Min, Max, IsUrl, IsInt, IsArray} from "class-validator";

export class CreateFotoDto {
    @IsString() @IsNotEmpty({ message: 'El título es obligatorio' }) @MaxLength(100)
    titulo: string;

    @IsOptional() @IsString()
    descripcion?: string;

    @IsNumber() @Min(0) @Max(5)
    calificacion: number;

    @IsUrl()
    ruta: string;
    
    @IsOptional() @IsInt()
    albumId?: number;

    @IsOptional() @IsArray() @IsString({ each: true })
    etiquetas?: string[]

}