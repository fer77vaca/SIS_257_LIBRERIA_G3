import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}
  // CREAR USUARIOS
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const existeUsuario = await this.usuarioRepository.findOneBy({
      nombre: createUsuarioDto.nombre,
      dni: createUsuarioDto.dni,
      direccion: createUsuarioDto.direccion,
      telefono: createUsuarioDto.telefono,
      cargo: createUsuarioDto.cargo,
      email: createUsuarioDto.email
    });

    if (existeUsuario) {
      throw new ConflictException('El usuario ya existe');
    }
    return this.usuarioRepository.save({
      nombre: createUsuarioDto.nombre.trim(),
      dni: createUsuarioDto.dni,
      direccion: createUsuarioDto.direccion.trim(),
      telefono: createUsuarioDto.telefono,
      cargo: createUsuarioDto.cargo.trim(),
      email: createUsuarioDto.email.trim()
    });
  }
  // OBTENER TODOS LOS USUARIOS
  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }
  // OBTENER POR UN id
  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`No existe el usuario ${id}`)
    }
    return usuario;
  }
  // ACTUALIZAR
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`No existe el usuario ${id}`)
    }
    const usuarioUpdate = Object.assign(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(usuarioUpdate);
  }
  // ELIMINAR
  async remove(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`No existe el usuario ${id}`)
    }
    return this.usuarioRepository.delete(id);
  }
}
