import { Length, Min } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";
import { ObjectType, Field, Int } from "type-graphql";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column({ length: 100})
    @Field()
    title: string;

    @Column({ nullable: true, type: "text"})
    @Field()
    description: string;

    @Column({ length: 100})
    @Length(2, 100, {message: "Entre 2 et 100 caractères"})
    @Field()
    author: string;

    @Column({ type: 'float' })
    @Min(0)
    @Field()
    price: number;

    @Column()
    @Field()
    picture: string;

    @Column({ length: 100 })
    @Length(2, 100, {message: "Entre 2 et 100 caractères"})
    @Field()
    city: string;

    @CreateDateColumn()
    @Field()
    createdAt: string;

    @ManyToOne(() => Category, category => category.ads, { cascade: true, onDelete: "CASCADE"})
    @Field()
    category: Category;

    @ManyToMany(() => Tag, tag => tag.ads, { cascade: true })
    @JoinTable()
    @Field()
    tags: Tag[];

};