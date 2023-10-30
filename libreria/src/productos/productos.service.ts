import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}
// CREAR PRODUCTOS
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const existeProducto = await this.productoRepository.findOneBy({ 
      nombre: createProductoDto.nombre,
      precio: createProductoDto.precio,
      unidadMonetaria: createProductoDto.unidadMonetaria,
      codigo: createProductoDto.codigo,
      descripcion: createProductoDto.descripcion
     });

    if (existeProducto) {
      throw new ConflictException('El producto ya existe');
    }
    return this.productoRepository.save({
      nombre: createProductoDto.nombre.trim(),
      precio: createProductoDto.precio,
      unidadMonetaria: createProductoDto.unidadMonetaria.trim(),
      codigo: createProductoDto.codigo.trim(),
      descripcion: createProductoDto.descripcion.trim()
    });
  }
  // OBTENER TODOS LOS PRODUCTOS
  findAll(): Promise<Producto[]> {
    return this.productoRepository.find({ relations: ['categoria'] });
  }
  // OBTENER POR UN id
  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`No existe el producto ${id}`);
    }
    return producto;
  }
  // ACTUALIZAR 
  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`No existe el producto ${id}`)
    }
    const productoUpdate = Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(productoUpdate);
  }
  // ELIMINAR
  async remove(id: number) {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`No existe el producto ${id}`)
    }
    return this.productoRepository.delete(id);
  }
}
