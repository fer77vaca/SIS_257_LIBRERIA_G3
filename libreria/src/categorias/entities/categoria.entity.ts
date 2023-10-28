import { Producto } from "src/productos/entities/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    nombre: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    marca: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    descripcion: string;

    @OneToMany(() => Producto, (producto) => producto.categoria)
    productos: Producto
}
