import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateVentaDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo fechaVenta no debe ser vacio' })
    @IsDateString({}, { message: 'El campo fechaVenta debe ser de tipo fecha' })
    readonly fechaVenta: Date;
}
