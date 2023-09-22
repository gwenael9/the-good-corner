import db from "./db";
import { Ad } from "../entities/ad";
import { Category } from "../entities/category";
import { Tag } from "../entities/tag";

async function clearDB() {
  const runner = db.createQueryRunner();
  // supprimer les tables sans avoir de restriction. OFF -> ON
  await runner.query("PRAGMA foreign_keys=OFF");
  await Promise.all(
    db.entityMetadatas.map((entity) =>
      runner.query(`DROP TABLE IF EXISTS ${entity.tableName}`)
    )
  );
  await runner.query("PRAGMA foreign_keys=ON");
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await clearDB();

  const ad1 = await Ad.create({
    title: "Velo",
    description: "description of the velo...",
    author: "Gwen",
    price: 1500,
    picture:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-config-20220606?wid=820&hei=498&fmt=jpeg&qlt=90&.v=1654122880566",
    city: "Lyon",
  });

  const ad2 = await Ad.create({
    title: 'Television Samsung',
    description: 'Jolie television',
    author: "Bob",
    price: 180,
    picture:
      "https://images.lecho.be/view?iid=dc:113129566&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
    city: "Bordeaux",
  });

  const ad3 = await Ad.create({
    title: 'Console de jeux PS5',
    description: 'Console PS5 avec deux manettes et jeux inclus.',
    author: "Charlie",
    price: 550,
    picture:
      "https://images.lecho.be/view?iid=dc:113129567&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
    city: "Bordeaux",
  });

  const cat1 = await Category.create({ name: "loisir" });
  const cat2 = await Category.create({ name: "informatique"});
  // const cat3 = await Category.create({ name: "mobilier"});

  const tag1 = await Tag.create({ name: "velo"});
  const tag2 = await Tag.create({ name: "jeux"});
  const tag3 = await Tag.create({ name: "tv"});
  const tag4 = await Tag.create({ name: "numerique"});
  const tag5 = await Tag.create({ name: "loisir"});
  const tag6 = await Tag.create({ name: "transport"});

  ad1.category = cat1;
  ad1.tags = [tag1, tag6];

  ad2.category = cat2;
  ad2.tags = [tag3, tag4];

  ad3.category = cat2;
  ad3.tags = [tag2, tag4, tag5];

  // ne pas oublier await sinon cela va doubler les contenus de mes tables
  await ad1.save();
  await ad2.save();
  await ad3.save();
}

main();

// npm run resetDB