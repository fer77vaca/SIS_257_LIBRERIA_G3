import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoriaDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre no debe ser vacio' })
    @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
    @MaxLength(50, { message: 'El campo nombre no debe ser mayor a 50 caracteres' })
    readonly nombre;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo marca no debe ser vacio' })
    @IsString({ message: 'El campo marca debe ser de tipo cadena' })
    @MaxLength(50, { message: 'El campo marca no debe ser mayor a 50 caracteres' })
    readonly marca;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo descripcion no debe ser vacio' })
    @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
    @MaxLength(200, { message: 'El campo descripcion no debe ser mayor a 50 caracteres' })
    readonly descripcion;
}
