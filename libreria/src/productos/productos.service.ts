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
// Codigo para crear
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const existeProducto = await this.productoRepository.findOneBy({ 
      nombre: createProductoDto.nombre,
      precio: createProductoDto.precio,
      codigo: createProductoDto.codigo,
      descripcion: createProductoDto.descripcion
     });

    if (existeProducto) {
      throw new ConflictException('El producto ya existe');
    }
    return this.productoRepository.save({
      nombre: createProductoDto.nombre.trim(),
      precio: createProductoDto.precio,
      codigo: createProductoDto.codigo.trim(),
      descripcion: createProductoDto.descripcion.trim()
    });
  }
  // Para obtener o encontrar todos los productos
  findAll(): Promise<Producto[]> {
    return this.productoRepository.find({ relations: ['categoria'] });
  }
  // Para obtener un pproducto por un id
  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`No existe el producto ${id}`);
    }
    return producto;
  }
  // Para actualizar 
  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`No existe el producto ${id}`)
    }
    const productoUpdate = Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(productoUpdate);
  }
  // Para eliminiar
  async remove(id: number) {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`No existe el producto ${id}`)
    }
    return this.productoRepository.delete(id);
  }
}
