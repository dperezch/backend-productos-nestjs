import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VentaDiaria {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha: Date;

    @Column()
    venta_efectivo: number;

    @Column()
    venta_tarjeta: number;

    @Column()
    venta_total: number;

}
