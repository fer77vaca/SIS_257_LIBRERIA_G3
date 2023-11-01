import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: false  })
    nombre: string;

    @Column({ name: 'DNI', type: 'int' })
    dni: number;

    @Column({ type: 'varchar', length: 200, nullable: false  })
    direccion: string;

    @Column({ name: 'telefono', type: 'int' })
    telefono: number;

    @Column({ type: 'varchar', length: 100, nullable: false  })
    cargo: string;

    @Column({ type: 'varchar', length: 100, nullable: false  })
    email: string;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;
}
