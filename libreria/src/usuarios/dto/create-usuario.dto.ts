import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateUsuarioDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre no debe ser vacio' })
    @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
    @MaxLength(50, { message: 'El campo nombre no debe ser mayor a 50 caracteres' } )
    readonly nombre: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo dni no debe ser vacio' })
    @IsNumber({}, { message: 'El campo dni debe ser de tipo numerico' })
    readonly dni: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo direccion no debe ser vacio' })
    @IsString({ message: 'El campo direccion debe ser de tipo cadena' })
    @MaxLength(200, { message: 'El campo direccion no debe ser mayor a 200 caracteres' } )
    readonly direccion: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo telefono no debe ser vacio' })
    @IsNumber({}, { message: 'El campo dni telefono ser de tipo numerico' })
    readonly telefono: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo cargo no debe ser vacio' })
    @IsString({ message: 'El campo cargo debe ser de tipo cadena' })
    @MaxLength(100, { message: 'El campo cargo no debe ser mayor a 100 caracteres' } )
    readonly cargo: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo email no debe ser vacio' })
    @IsString({ message: 'El campo email debe ser de tipo cadena' })
    @MaxLength(100, { message: 'El campo email no debe ser mayor a 100 caracteres' } )
    readonly email: string;
}

