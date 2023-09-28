import "reflect-metadata";
import express, { Request, Response } from "express";
import { validate } from "class-validator";
import { Ad } from "./entities/ad";
import db from "./config/db";
import { Category } from "./entities/category";
import { Tag } from "./entities/tag";
import { In, Like } from "typeorm";
import cors from 'cors';

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

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
  const title = req.query.title as string | undefined
  try {
    const ads = await Ad.find({
      relations: {
        category: true,
        tags: true
      },
      where: {
        tags: {
          // "localhost/ads?tagIds=1,2 => [1,2]"
          id: typeof tagIds === "string" && tagIds.length > 0 ? In(tagIds.split(",").map((t) => parseInt(t, 10))) : undefined
        },
        title: title ? Like(`%${title}%`) : undefined,
      }
    });
    res.send(ads);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/ads/:id", async (req: Request, res: Response) => {

  try {
    const adId = parseInt(req.params.id, 10); // Récupérer l'ID de l'annonce depuis les paramètres de l'URL

    // Rechercher l'annonce par ID avec des relations spécifiques
    const ad = await Ad.createQueryBuilder("ad")
      .leftJoinAndSelect("ad.category", "category")
      .leftJoinAndSelect("ad.tags", "tags")
      .where("ad.id = :id", { id: adId })
      .getOne();

    if (!ad) {
      // Si l'annonce n'est pas trouvée, renvoyer une réponse 404 (Not Found)
      return res.sendStatus(404);
    }

    // Envoyer l'annonce trouvée en réponse
    res.send(ad);
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // En cas d'erreur serveur, renvoyer une réponse 500 (Internal Server Error)
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
    if (errors.length !== 0) return res.status(422).send({ errors });
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

    res.send(await adToUpdate.save());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, async () => {
  await db.initialize();
  console.log(`Example app listening on port ${port}`);  
});
