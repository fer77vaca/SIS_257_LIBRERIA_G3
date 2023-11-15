import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacio' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo nombre no debe ser mayor a 50 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo telefono no debe ser vacio' })
  @IsNumber({}, { message: 'El campo telefono debe ser de tipo numerico' })
  readonly telefono: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nit no debe ser vacio' })
  @IsNumber({}, { message: 'El campo nit debe ser de tipo numerico' })
  readonly nit: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo razonSocial no debe ser vacio' })
  @IsString({ message: 'El campo razonSocial debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo razonSocial no debe ser mayor a 100 caracteres',
  })
  readonly razonSocial: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo direccion no debe ser vacio' })
  @IsString({ message: 'El campo direccion debe ser de tipo cadena' })
  @MaxLength(200, {
    message: 'El campo direccion no debe ser mayor a 200 caracteres',
  })
  readonly direccion: string;
}
