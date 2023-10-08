import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proveedor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    nombre: string;

    @Column({nullable: true})
    contacto: string;

    @Column({nullable: true})
    telefono: number;

    @Column({nullable: true})
    email: string;
}
