import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Detalle } from './entities/detalle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetallesService {
  constructor(
    @InjectRepository(Detalle)
    private detalleRepository: Repository<Detalle>,
  ) {}
  // CREAR
  async create(createDetalleDto: CreateDetalleDto): Promise<Detalle> {
    const existeDetalle = await this.detalleRepository.findOneBy({
      cantidad: createDetalleDto.cantidad,
      precioUnitario: createDetalleDto.precioUnitario
    });

    if (existeDetalle) {
      throw new ConflictException('La venta detalle ya existe')
    }
    return this.detalleRepository.save({
      cantidad: createDetalleDto.cantidad,
      precioUnitario: createDetalleDto.precioUnitario
    });
  }
  // OBTENER TODOS LOS DETALLES
  findAll(): Promise<Detalle[]> {
    return this.detalleRepository.find();
  }
  // OBTENER POR UN id
  async findOne(id: number): Promise<Detalle> {
    const detalle = await this.detalleRepository.findOneBy({ id });
    if (!detalle) {
      throw new NotFoundException(`No existe la venta detalle ${id}`)
    }
    return detalle;
  }
  // ACTUALIZAR
  async update(id: number, updateDetalleDto: UpdateDetalleDto): Promise<Detalle> {
    const detalle = await this.detalleRepository.findOneBy({ id });
    if (!detalle) {
      throw new NotFoundException(`No existe la venta detalle ${id}`)
    }
    const detalleUpdate = Object.assign(detalle, updateDetalleDto)
    return this.detalleRepository.save(detalleUpdate);
  }
  // ELIMINAR
  async remove(id: number) {
    const detalle = await this.detalleRepository.findOneBy({ id });
    if (!detalle) {
      throw new NotFoundException(`No existe la venta detalle ${id}`)
    }
    return this.detalleRepository.delete(id);
  }
}
