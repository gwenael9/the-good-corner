import express, { Request, Response } from "express";
import { Ad } from "./types";
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('the_good_corner.sqlite');
const app = express();
const port = 3000;


let ads: Ad[] = [
  {
    id: 1,
    title: "Bike to sell",
    description:
      "My bike is blue, working fine. I'm selling it because I've got a new one",
    owner: "bike.seller@gmail.com",
    price: 100,
    picture:
      "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
    location: "Paris",
    createdAt: "2023-09-05T10:13:14.755Z",
  },
  {
    id: 2,
    title: "Car to sell",
    description:
      "My car is blue, working fine. I'm selling it because I've got a new one",
    owner: "car.seller@gmail.com",
    price: 10000,
    picture:
      "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
    location: "Paris",
    createdAt: "2023-10-05T10:14:15.922Z",
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Helloooooooooo");
});

app.get("/ads", (req: Request, res: Response) => {
  db.all('SELECT * FROM ad', (err, rows) => {
    if(!err) return res.send(rows);
    else res.sendStatus(500)
  })
});

app.post("/ads", (req: Request, res: Response) => {

  // cela va nous générer automatiquement l'id de chaque annonce
  const id = ads.length + 1;

  // ..req.body reprend toute les propriété de mon objet
  const newAd: Ad = { 
    ...req.body,
    id,
    createAt: new Date().toISOString() 
  };

  ads.push(req.body);
  res.send(newAd);
});

// supprimer
app.delete('/ads/:id', (req: Request, res: Response) => {

  // base numérique 10 : de 0 à 9
  // permet de transformer notre id en nombre
  const idOfAdToDelete = parseInt(req.params.id, 10);

  // si l'id qu'on cherche est différent que l'id
  if(!ads.find((ad) => ad.id === idOfAdToDelete)) return res.sendStatus(404);
  
  // on garde tout les id différent de l'id à supprimer. On remplace le tableau actuelle par le nouveau 

  // // manière déclarative
  // ads = ads.filter((ad) => ad.id !== idOfAdToDelete);

  // manière impérative
  ads.splice(ads.findIndex((ad) => ad.id === idOfAdToDelete), 1);


  // 204 sert à dire que cela s'est bien passé
  res.sendStatus(204).send({ message: "ad deleted !"});
});

// modifier
app.patch('/ads/:id', (req: Request, res: Response) => {
  const idOfAdToUpdate = parseInt(req.params.id, 10);

  const adToUpdate = ads.find((ad) => ad.id === idOfAdToUpdate);
  if(!adToUpdate) return res.sendStatus(404);

  const indexOfAdToUpdate = ads.findIndex((ad) => ad.id === idOfAdToUpdate);

  // méthode impérative
  // ads[indexOfAdToUpdate] = {
  //   ...adToUpdate,
  //   ...req.body,
  // }

  // méthode déclarative
  ads = ads.map((ad) => {
    if(ad.id === idOfAdToUpdate) return { ...ad, ...req.body };
    else return ad;
  });

  res.send(ads[indexOfAdToUpdate]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);  
});