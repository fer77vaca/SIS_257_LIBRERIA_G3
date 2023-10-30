import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('detalles')
export class Detalle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'cantidad', type: 'int' })
    cantidad: number;

    @Column({ name: 'precio_unitario', type: 'int' })
    precioUnitario: number;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;
}
