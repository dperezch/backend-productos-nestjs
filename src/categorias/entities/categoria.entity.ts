import { Producto } from "src/productos/entities/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50, unique: true})
    nombre: string;

    //RELACIONES

    @OneToMany(()=>Producto , (producto)=> producto.categoria)
    productos: Producto[];
}
