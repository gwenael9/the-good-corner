import { Length, Min } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { ObjectId } from "./utils";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column({ length: 50})
    @Length(5, 50, { message: "Le titre doit contenir entre 5 et 50 caractères" })
    @Field()
    title: string;

    @Column({ nullable: true, type: "text"})
    @Field()
    description: string;

    @Column({ length: 50})
    @Field()
    author: string;

    @Column({ type: 'float' })
    @Min(0)
    @Field()
    price: number;

    @Column()
    @Field()
    picture: string;

    @Column({ length: 50 })
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
    @Field(() => [Tag])
    tags: Tag[];
}

@InputType()
export class NewAdInput {
  @Field()
  @Length(5, 50, { message: "Le titre doit contenir entre 5 et 50 caractères" })
  title: string;

  @Field()
  description: string;

  @Field()
  author: string;

  @Field()
  @Min(0, { message: "le prix doit être positif" })
  price: number;

  @Field()
  city: string;

  @Field()
  picture: string;

  @Field(() => ObjectId)
  category: ObjectId;

  @Field(() => [ObjectId], { nullable: true })
  tags?: ObjectId[];
}

@InputType()
export class UpdateAdInput {
  @Field({ nullable: true })
  @Length(5, 50, { message: "Le titre doit contenir entre 5 et 50 caractères" })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  @Min(0, { message: "le prix doit être positif" })
  price?: number;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  picture?: string;

  @Field(() => ObjectId, { nullable: true })
  category?: ObjectId;

  @Field(() => [ObjectId], { nullable: true })
  tags?: ObjectId[];
}