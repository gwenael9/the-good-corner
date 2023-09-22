import { Length, Min } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";

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

    @ManyToOne(() => Category, category => category.ads, { cascade: true, onDelete: "CASCADE"})
    category: Category;

    @ManyToMany(() => Tag, tag => tag.ads, { cascade: true })
    @JoinTable()
    tags: Tag[];

};