import { Marca } from "src/marcas/entities/marca.entity";
import { Proveedor } from "src/proveedores/entities/proveedore.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sku: number;

    @Column()
    nombre: string;

    @Column()
    cantidad: number;

    @Column()
    precio_venta: number;

    @Column()
    precio_compra: number;

    @Column({ type: "date", default: () => "CURRENT_DATE"})
    fecha_compra: Date;

    @Column({nullable: true })
    fecha_vencimiento: Date;

    //RELACIONES

    @ManyToOne(()=> Marca, (marca)=> marca.id, {
        nullable: true,
        eager: true // para que traiga la marca al hacer un findOne
    })
    marca: Marca;  //se le pasa la entidad completa

    @ManyToOne(()=> Proveedor,(proveedor)=> proveedor.id, {
        nullable: true,
        eager: true // para que traiga el proveedor al hacer un findOne
    })
    proveedor: Proveedor;

}

