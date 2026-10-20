const express = require("express");
const cors = require("cors");

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

const garderie = {
  nom: "Ma Garderie",
  slogan: "Grandir, apprendre et s'épanouir ensemble",
  description:
    "Un environnement chaleureux et sécurisé où chaque enfant découvre le monde, développe sa créativité et apprend à son rythme.",
  adresse: "Tozeur, Tunisie",
  horaires: "Du lundi au vendredi, de 7 h 30 à 17 h 30"
};

const services = [
  {
    id: 1,
    titre: "Éveil et apprentissage",
    description:
      "Des activités adaptées à l'âge des enfants pour développer leur curiosité et leur autonomie.",
    icone: "📚"
  },
  {
    id: 2,
    titre: "Repas équilibrés",
    description:
      "Des repas variés et équilibrés pour accompagner la croissance des enfants.",
    icone: "🍎"
  },
  {
    id: 3,
    titre: "Jeux et créativité",
    description:
      "Des jeux, des activités artistiques et des moments de découverte en groupe.",
    icone: "🎨"
  }
];

const activites = [
  {
    id: 1,
    nom: "Atelier de dessin",
    description: "Développer l'imagination et l'expression artistique."
  },
  {
    id: 2,
    nom: "Éveil musical",
    description: "Découvrir les sons, les rythmes et les chansons."
  },
  {
    id: 3,
    nom: "Jeux en plein air",
    description: "Bouger, coopérer et développer la motricité."
  }
];

app.get("/api/garderie", (_req, res) => {
  res.json(garderie);
});

app.get("/api/services", (_req, res) => {
  res.json(services);
});

app.get("/api/activites", (_req, res) => {
  res.json(activites);
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API Ma Garderie démarrée sur le port ${PORT}`);
});
