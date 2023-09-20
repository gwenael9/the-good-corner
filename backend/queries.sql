-- fichier contenant mes requêtes SQL

-- création de ma table
CREATE TABLE ad 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	author VARCHAR(100) NOT NULL,
	price INT,
    picture VARCHAR(100),
    city VARCHAR(100),
    category VARCHAR(100),
	createdAt DATE
);

-- j'insère mes annonces

-- 10 annonces Bordeaux
INSERT INTO ad (title, description, author, price, picture, city, category, createdAt) VALUES
    ('Vélo rouge', 'Vélo rouge en excellent état, idéal pour les balades en ville.', 'Alice', 120, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', 'Sports et loisirs', '2023-10-05T10:14:15.922Z'),
    ('Télévision Samsung', 'Télévision Samsung 50 pouces.', 'Bob', 350, 'https://images.lecho.be/view?iid=dc:113129566&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', 'Électronique', '2023-10-06T11:25:30.123Z'),
    ('Console de jeux PS5', 'Console PS5 avec deux manettes et jeux inclus.', 'Charlie', 550, 'https://images.lecho.be/view?iid=dc:113129567&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', 'Jeux vidéo', '2023-10-07T12:36:45.234Z'),
    ('Appareil photo Canon', 'Appareil photo reflex Canon avec objectif 50mm.', 'David', 300, 'https://images.lecho.be/view?iid=dc:113129568&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', 'Photo et vidéo', '2023-10-08T13:47:00.345Z'),
    ('Table à manger', 'Table à manger en bois massif pour 6 personnes.', 'Eva', 250, 'https://images.lecho.be/view?iid=dc:113129569&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', 'Mobilier', '2023-10-09T14:58:15.456Z'),
    ('Smartphone iPhone 13', 'iPhone 13 neuf, débloqué, couleur argent.', 'Frank', 800, 'https://images.lecho.be/view?iid=dc:113129570&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', 'Électronique', '2023-10-10T16:09:30.567Z'),
    ('Livre "Le Seigneur des Anneaux"', 'Édition collector du Seigneur des Anneaux.', 'Grace', 20, 'https://images.lecho.be/view?iid=dc:113129571&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', 'Livres', '2023-10-11T17:20:45.678Z'),
    ('Chaise de bureau', 'Chaise de bureau ergonomique, bon état.', 'Henry', 60, 'https://images.lecho.be/view?iid=dc:113129572&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', 'Mobilier', '2023-10-12T18:31:00.789Z'),
    ('Planche de surf', 'Planche de surf en excellent état, idéale pour les débutants.', 'Isabel', 150, 'https://images.lecho.be/view?iid=dc:113129573&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', 'Sports et loisirs', '2023-10-13T19:42:15.890Z'),
    ('Cafetière Nespresso', 'Cafetière Nespresso avec capsules incluses.', 'Jack', 80, 'https://images.lecho.be/view?iid=dc:113129574&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', 'Électroménager', '2023-10-14T20:53:30.901Z');

-- 5 annonces Paris 
INSERT INTO ad (title, description, author, price, picture, city, category, createdAt) VALUES
    ('Ordinateur portable Dell', 'Ordinateur portable Dell, processeur rapide, écran HD.', 'Lucas', 700, 'https://images.lecho.be/view?iid=dc:113129575&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Paris', 'Informatique', '2023-10-15T21:04:45.012Z'),
    ('Canapé en cuir', 'Canapé en cuir véritable, 3 places, couleur noire.', 'Sophie', 450, 'https://images.lecho.be/view?iid=dc:113129576&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Paris', 'Mobilier', '2023-10-16T22:15:00.123Z'),
    ('Guitare électrique Fender', 'Guitare électrique Fender Stratocaster, son exceptionnel.', 'Michael', 350, 'https://images.lecho.be/view?iid=dc:113129577&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Paris', 'Instruments de musique', '2023-10-17T23:26:15.234Z'),
    ('Machine à laver Bosch', 'Machine à laver Bosch, grande capacité, peu utilisée.', 'Emma', 250, 'https://images.lecho.be/view?iid=dc:113129578&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Paris', 'Électroménager', '2023-10-18T00:37:30.345Z'),
    ('Montre Rolex', 'Montre Rolex en acier inoxydable, modèle classique.', 'Oliver', 5000, 'https://images.lecho.be/view?iid=dc:113129579&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Paris', 'Accessoires de mode', '2023-10-19T01:48:45.456Z');

-- 5 annonces Lyon
INSERT INTO ad (title, description, author, price, picture, city, category, createdAt) VALUES
    ('Vélo de montagne', 'Vélo de montagne tout-terrain, suspension avant.', 'Paul', 300, 'https://images.lecho.be/view?iid=dc:113129580&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Lyon', 'Sports et loisirs', '2023-10-20T02:59:00.567Z'),
    ('Réfrigérateur Samsung', 'Réfrigérateur Samsung avec distributeur de glaçons.', 'Mia', 600, 'https://images.lecho.be/view?iid=dc:113129581&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Lyon', 'Électroménager', '2023-10-21T04:10:15.678Z'),
    ('Sofa', 'Sofa en tissu, confortable et spacieux.', 'Liam', 400, 'https://images.lecho.be/view?iid=dc:113129582&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Lyon', 'Mobilier', '2023-10-22T05:21:30.789Z'),
    ('Trottinette électrique', 'Trottinette électrique pliable, autonomie de 25 km.', 'Zoe', 250, 'https://images.lecho.be/view?iid=dc:113129583&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Lyon', 'Sports et loisirs', '2023-10-23T06:32:45.890Z'),
    ('Laptop ASUS', 'Laptop ASUS, écran tactile, processeur puissant.', 'Noah', 800, 'https://images.lecho.be/view?iid=dc:113129584&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Lyon', 'Informatique', '2023-10-24T07:44:00.901Z');

-- afficher toutes les annonces :
SELECT * FROM ad;

-- afficher les annonces bordelaises :
SELECT * FROM ad WHERE city = 'Bordeaux';

-- supprimer les annonces avec un prix > 40
DELETE FROM ad WHERE price > 40;

-- mettre à jour les annonces ayant une categorie Mobilier avec un prix de 0€
UPDATE ad SET price = 0 WHERE category = 'Mobilier';

-- afficher la moyenne des prix des annonces de la ville de Paris
SELECT SUM(price)/COUNT(*) FROM ad WHERE city = 'Paris';

-- afficher la moyenne des prix des annonces par ville
SELECT city, AVG(price) as 'prix moyen des annonces' FROM ad GROUP BY city;