import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category, NewCategoryInput, UpdateCategoryInput } from "../entities/category";
import { Like } from "typeorm";
import { GraphQLError } from "graphql";

@Resolver(Category) 
export default class CatsResolver {

    // get
    @Query(() => [Category])
    async cats(@Arg("name", { nullable: true }) name: string) {
        return await Category.find({
            where: { name: name ? Like(`%${name}%`) : undefined },
            order: { id: "desc"},
        });
    }

    // create
    @Mutation(() => Category)
    async createCategory(@Arg("data", { validate: true }) data: NewCategoryInput) {
        const newCategory = new Category();
        Object.assign(newCategory, data);
        return await newCategory.save();
    }

    // update
    @Mutation(() => Category)
    async updateCategory(
        @Arg("categoryId") id: number,
        @Arg("data", { validate: true }) data: UpdateCategoryInput  
    ) {
        const categoryToUpdate = await Category.findOneBy({ id });
        if (!categoryToUpdate) throw new GraphQLError("not found");
        Object.assign(categoryToUpdate, data);
        return await categoryToUpdate.save();
    }

    // delete
    @Mutation(() => String)
    async deleteCategory(@Arg("categoryId") id: number) {
        const categoryToDelete = await Category.findOneBy({ id });
        if (!categoryToDelete) throw new GraphQLError("not found");
        await categoryToDelete.remove();
        return "ok";
    }
}