// import express, { Request, Response } from "express";
// import { Ad } from "./types";

// const app = express();
// const port = 3000;

// const ads: Ad[] = [

// ]

// app.use(express.json());

// app.get("/", (req: Request, res: Response) => {
//     res.send("test");
// });





// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });

import express, { Request, Response } from "express";

const app = express();
const port = 3000;

const ads = [
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

app.get("/", (req, res) => {
    res.send("Helloooooooooo");
});

app.get("/ads", (req: Request, res: Response) => {
    res.send(ads);
});

app.post("/ads", (req: Request, res: Response) => {

    // cela va nous générer automatiquement l'id de chaque annonce
    const id = ads.length + 1;

    // ..req.body reprend toute les propriété de mon objet
    const newAd = { 
        ...req.body,
        id,
        createAt: new Date().toISOString() 
    };

    ads.push(req.body);
    res.send("test ads");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);  
});