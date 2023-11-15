import { Venta } from 'src/ventas/entities/venta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @OneToMany(() => Venta, (venta) => venta.cliente)
  ventas: Venta[];
}
