import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  nombre: string;

  @Column({ name: 'telefono', type: 'int' })
  telefono: number;

  @Column({ name: 'NIT', type: 'int' })
  nit: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  razonSocial: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  direccion: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;
  // esto esGIGRIGJIGJRIGJRIGJ
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;
}
