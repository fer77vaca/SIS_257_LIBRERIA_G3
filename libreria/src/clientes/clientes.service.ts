import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}
  // CREAR CLIENTES
  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const existeCliente = await this.clienteRepository.findOneBy({
      nombre: createClienteDto.nombre,
      telefono: createClienteDto.telefono,
      nit: createClienteDto.nit,
      razonSocial: createClienteDto.razonSocial,
      direccion: createClienteDto.direccion,
      email: createClienteDto.email
    });

    if (existeCliente) {
      throw new ConflictException('El cliente ya existe');
    }
    return this.clienteRepository.save({
      nombre: createClienteDto.nombre.trim(),
      telefono: createClienteDto.telefono,
      nit: createClienteDto.nit,
      razonSocial: createClienteDto.razonSocial.trim(),
      direccion: createClienteDto.direccion.trim(),
      email: createClienteDto.email.trim()
    });
  }
  // OBTENER TODOS LOS CLIENTES
  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }
  // OBTENER POR UN id
  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`No existe el cliente ${id}`);
    }
    return cliente;
  }
  //ACTUALIZAR
  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`No existe el cliente ${id}`)
    }
    const clienteUpdate = Object.assign(cliente, updateClienteDto);
    return this.clienteRepository.save(clienteUpdate);
  }
  // ELMINAR
  async remove(id: number) {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`No existe el cliente ${id}`)
    }
    return this.clienteRepository.delete(id);
  }
}
