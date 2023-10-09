import { Producto } from "src/productos/entities/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proveedor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50, unique:true})
    nombre: string;

    @Column({nullable: true})
    contacto: string;

    @Column({nullable: true})
    telefono: number;

    @Column({nullable: true})
    email: string;

    //RELACIONES
    @OneToMany(()=> Producto,(producto)=> producto.proveedor)
    productos: Producto[];
}
