import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepository: Repository<Venta>,
  ) {}
  // CREAR
  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    const existeVenta = await this.ventaRepository.findOneBy({
      fechaVenta: createVentaDto.fechaVenta
    });

    if (existeVenta) {
      throw new ConflictException('La venta ya existe');
    }

    return this.ventaRepository.save({
      fechaVenta: createVentaDto.fechaVenta,
    });
  }
  // OBTENER TODAS LAS VENTAS
  findAll(): Promise<Venta[]> {
    return this.ventaRepository.find();
  }
  // OBTENER POR UN id
  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventaRepository.findOneBy({ id });
    if (!venta) {
      throw new NotFoundException(`No existe la venta ${id}`);
    }
    return venta;
  }
  // ACTUALIZAR
  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.ventaRepository.findOneBy({ id });
    if (!venta) {
      throw new NotFoundException(`No existe la venta ${id}`)
    }
    const ventaUpdate = Object.assign(venta, updateVentaDto);
    return this.ventaRepository.save(ventaUpdate);
  }
  // ELIMINAR
  async remove(id: number) {
    const venta = await this.ventaRepository.findOneBy({ id })
    if (!venta) {
      throw new NotFoundException(`No existe la venta ${id}`)
    }
    return this.ventaRepository.delete(id);
  }
}
