import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./ad";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Length } from "class-validator";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @OneToMany(() => Ad, ad => ad.category)
    ads: Ad[];
}

// ajouter une nouvelle catégorie
InputType()
export class NewCategoryInput {
    @Field()
    @Length(2, 30,{ message: "Le nom doit contenir entre 2 et 30 caractères."})
    name: string;
}

// modifier une catégorie
InputType()
export class UpdateCategoryInput {
    @Field({ nullable: true})
    @Length(2, 30,{ message: "Le nom doit contenir entre 2 et 30 caractères."})
    name?: string;
}