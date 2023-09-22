import "reflect-metadata";
import express, { Request, Response } from "express";
import { validate } from "class-validator";
import { Ad } from "./entities/ad";
import db from "./config/db";
import { Category } from "./entities/category";
import { Tag } from "./entities/tag";
import { In, Like } from "typeorm";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Helloooooooooo");
});

/*---------------------GET-------------------*/

// categories
app.get("/categories", async (req: Request, res: Response) => {
  try {
    const cat = await Category.find({
      relations: {
        ads: true
      }
    });
    res.send(cat);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// annonces
app.get("/ads", async (req: Request, res: Response) => {
  const { tagIds } = req.query;
  try {
    const ads = await Ad.find({
      relations: {
        category: true,
        tags: true
      },
      where: {
        tags: {
          id: typeof tagIds === "string" && tagIds.length > 0 ? In(tagIds.split(",").map((t) => parseInt(t, 10))) : undefined
        }
      }
    });
    res.send(ads);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// tags
app.get("/tags", async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const tag = await Tag.find({
      where: { name: name ? Like(`%${name}`) : undefined}
    });
    res.send(tag);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/*------------------FIN GET-------------------*/

/*------------------POST----------------------*/

// annonces
app.post("/ads", async (req: Request, res: Response) => {
  try {
    const newAd = Ad.create(req.body);
    const errors = await validate(newAd);
    // if (errors) return res.status(422).send({ errors });

    if (errors.length !== 0) return res.status(422).send({ errors });
    const { tagIds = [] } = req.body;
    const tagsToAssociate = await Tag.find({ where: { id: In(tagIds) } });
    newAd.tags = tagsToAssociate;

    const newAdWithId = await newAd.save();
    res.send(newAdWithId);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// tags
app.post("/tags", async (req: Request, res: Response) => {
  try {
    const newTag = Tag.create(req.body);
    const errors = await validate(newTag);
    if (errors.length !== 0) return res.status(422).send({ errors });
    res.send(await newTag.save());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/*------------------FIN POST-------------------*/

/*------------------DELETE-------------------*/

// annonces
app.delete('/ads/:id', async (req: Request, res: Response) => {
  try {
    const adToDelete = await Ad.findOneBy({ 
      id: parseInt(req.params.id, 10) 
    });
    if (!adToDelete) return res.sendStatus(404);
    await adToDelete.remove();
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// tags
app.delete("/tags/:id", async (req: Request, res: Response) => {
  try {
    const tagToDelete = await Tag.findOneBy({
      id: parseInt(req.params.id, 10),
    });
    if (!tagToDelete) return res.sendStatus(404);
    await tagToDelete.remove();
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

/*------------------FIN DELETE-------------------*/

// modifier
app.patch('/ads/:id', async (req: Request, res: Response) => {
  try {
    const adToUpdate = await Ad.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!adToUpdate) return res.sendStatus(404);

    await Ad.merge(adToUpdate, req.body);
    const errors = await validate(adToUpdate);
    if(errors.length !== 0) return res.status(422).send({ errors });

    const { tagIds } = req.body;
    if (Array.isArray(tagIds)) {
      const tagsToAssociate = await Tag.find({ where: { id: In(tagIds) } });
      adToUpdate.tags = tagsToAssociate;
    }

    res.send(await adToUpdate.save());
  } 
  catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, async () => {
  await db.initialize();
  console.log(`Example app listening on port ${port}`);  
});
