import "reflect-metadata";
import express, { Request, Response } from "express";
import { validate } from "class-validator";
import { Ad } from "./entities/ad";
import db from "./config/db";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Helloooooooooo");
});

app.get("/ads", async (req: Request, res: Response) => {
  try {
    const ads = await Ad.find();
    res.send(ads);
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// créer
app.post("/ads", async (req: Request, res: Response) => {
  try {
    const newAd = Ad.create(req.body);
    // const errors = await validate(newAd);
    // if (errors) return res.status(422).send({ errors });
    const newAdWithId = await newAd.save();
    res.send(newAdWithId);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// supprimer
app.delete('/ads/:id', async (req: Request, res: Response) => {
  try {
    const adToDelete = await Ad.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!adToDelete) return res.sendStatus(404);
    await adToDelete.remove();
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// modifier
app.patch('/ads/:id', async (req: Request, res: Response) => {
  try {
    const adToUpdate = await Ad.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!adToUpdate) return res.sendStatus(404);
    await Ad.update(parseInt(req.params.id, 10), req.body);    
    await Ad.merge(adToUpdate, req.body);
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
