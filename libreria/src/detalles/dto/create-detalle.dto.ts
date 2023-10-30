import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDetalleDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo cantidad no debe ser vacio' })
    @IsNumber({}, { message: 'El campo cantidad debe ser de tipo numerico' })
    readonly cantidad: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo precioUnitario no debe ser vacio' })
    @IsNumber({}, { message: 'El campo precioUnitario debe ser de tipo numerico' })
    readonly precioUnitario: number;
}
