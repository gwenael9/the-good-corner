import { Resolver, Query } from "type-graphql";
import { Ad } from "../entities/ad";
import { GraphQLError } from "graphql";

@Resolver(Ad)
class AdsResolver {
    @Query(() => [Ad])
    async ads() {
        return Ad.find({ relations: { category: true, tags: true } });
    }

    @Query(() => Ad)
    async getAdById(_: any, args: { id: string }) {
        const ad = await Ad.findOne({
          where: { id: parseInt(args.id, 10) }, 
          relations: { category: true, tags: true },
        });
  
        if (!ad) throw new GraphQLError("NOT_FOUND");
        return ad;
    }
}

export default AdsResolver;