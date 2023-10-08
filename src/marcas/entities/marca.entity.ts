import { Producto } from "src/productos/entities/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Marca {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    nombre: string;

    //RELACIONES
    
    @OneToMany(()=> Producto, (producto)=> producto.marca)
    productos: Producto[];
}
