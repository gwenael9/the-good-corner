import { Resolver } from "type-graphql";
import { GraphQLError } from "graphql";
import { Tag } from "../entities/tag";
import { validate } from "class-validator";

@Resolver(Tag)
class TagsResolver {
    async createTag(_: any, args: { data: { name: string } }) {
        const newTag = Tag.create({ name: args.data.name });
        const errors = await validate(newTag);
        if (errors.length !== 0) 
          throw new GraphQLError('INVALID_DATA', { extensions: { errors } });
        const newTagWithId = await newTag.save();
        return newTagWithId;
    }
}

export default TagsResolver;