import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateProductoDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre no debe ser vacio' })
    @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
    @MaxLength(50, { message: 'El campo nombre no debe ser mayor a 50 caracteres' })
    readonly nombre: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo precio no debe ser vacio' })
    @IsNumber({}, { message: 'El campo precio debe ser de tipo numerico' })
    readonly precio: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo codigo no debe ser vacio' })
    @IsString({ message: 'El campo codigo debe ser de tipo cadena' })
    @MaxLength(10, { message: 'El campo codigo no debe ser mayor a 10 caracteres' })
    readonly codigo: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo descripcion no debe ser vacio' })
    @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
    @MaxLength(100, { message: 'El campo descripcion no debe ser mayor a 100 caracteres' })
    readonly descripcion: string;
}
