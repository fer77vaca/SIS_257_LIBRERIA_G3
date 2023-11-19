import { Venta } from 'src/ventas/entities/venta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Chino aca vamos a hacer los cambios para el JWT

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  usuario: string;

  @Column({ length: 150, select: false })
  clave: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ length: 20 })
  rol: string;

  @Column()
  premium: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @OneToMany(() => Venta, (venta) => venta.usuario)
  ventas: Venta;
}
