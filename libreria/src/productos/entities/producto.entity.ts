import { Categoria } from "src/categorias/entities/categoria.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('productos')
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    nombre: string;

    @Column({ name: 'Precio', type: 'int' })
    precio: number;

    @Column({ type: 'varchar', length: 10, nullable: false })
    codigo: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    descripcion: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.productos)
    @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
    categoria: Categoria; 
}
