import { Length, Min } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100})
    title: string;

    @Column({ nullable: true, type: "text"})
    description: string;

    @Column({ length: 100})
    @Length(2, 100, {message: "Entre 2 et 100 caractères"})
    author: string;

    @Column({ type: 'float' })
    @Min(0)
    price: number;

    @Column()
    picture: string;

    @Column({ length: 100 })
    @Length(2, 100, {message: "Entre 2 et 100 caractères"})
    city: string;

    @CreateDateColumn()
    createdAt: string;

};