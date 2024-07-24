const express = require("express");
const axios = require("axios");
const config = require("../config");
const router = express.Router();

const encryptMessage = require("../crypto/crypto")
const decryptMessage = require("../crypto/crypto")

// Get all freezbe
router.get("/", async (req, res) => {
    try {
      const response = await axios.get(`${config.freezbeMicroserviceURL}/freezbe`);
      const encryptedDataArray = response.data.data; // Supposons que les données sont sous forme de tableau

      // Créez un tableau pour stocker les données déchiffrées
      const decryptedDataArray = [];

      // Parcourez les données chiffrées
      for (const encryptedData of encryptedDataArray) {
        const { id, nom, description, prix_UHT, gamme, ingredients, grammage, Procedes_Fabrication_id } = encryptedData;
        const decryptedNom = decryptMessage.decryptMessage(nom);
        const decryptedDescription = decryptMessage.decryptMessage(description);
        const decryptedPrix = decryptMessage.decryptMessage(prix_UHT);
        const decryptedGamme = decryptMessage.decryptMessage(gamme);
        const decryptedIngredient = decryptMessage.decryptMessage(ingredients);
        const decryptedGrammage = decryptMessage.decryptMessage(grammage);
        const decryptedProcede = decryptMessage.decryptMessage(Procedes_Fabrication_id);
    
        const jsonData = {
          id: id,
          nom: decryptedNom,
          description: decryptedDescription,
          prix_UHT: decryptedPrix,
          gamme: decryptedGamme,
          ingredients: decryptedIngredient,
          grammage: decryptedGrammage,
          Procedes_Fabrication_id: decryptedProcede
        };
        decryptedDataArray.push(jsonData);
      }
      const finalData = { data : decryptedDataArray};
      res.status(response.status).json(finalData);
      } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(decryptMessage.decryptMessage(response.data));
      } else {
        console.error("Error retrieving freezbe:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
});

//Get specific freezbe
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${config.freezbeMicroserviceURL}/freezbe/${id}`
    );
    const encryptedData = response.data.data; 

    const { nom, description, prix_UHT, gamme, ingredients, grammage, Procedes_Fabrication_id } = encryptedData[0];
        const decryptedNom = decryptMessage.decryptMessage(nom);
        const decryptedDescription = decryptMessage.decryptMessage(description);
        const decryptedPrix = decryptMessage.decryptMessage(prix_UHT);
        const decryptedGamme = decryptMessage.decryptMessage(gamme);
        const decryptedIngredient = decryptMessage.decryptMessage(ingredients);
        const decryptedGrammage = decryptMessage.decryptMessage(grammage);
        const decryptedProcede = decryptMessage.decryptMessage(Procedes_Fabrication_id);
    
        const jsonData = {
          id: id,
          nom: decryptedNom,
          description: decryptedDescription,
          prix_UHT: decryptedPrix,
          gamme: decryptedGamme,
          ingredients: decryptedIngredient,
          grammage: decryptedGrammage,
          Procedes_Fabrication_id: decryptedProcede
        };
    const finalData = { data : jsonData};
    res.status(response.status).json(finalData);
    } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving freezbe:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Add freezbe
router.post("/", async (req, res) => {
  try {
    const nom = encryptMessage.encryptMessage(req.body.nom)
    const description = encryptMessage.encryptMessage(req.body.description)
    const prix_UHT = encryptMessage.encryptMessage(req.body.prix_UHT)
    const gamme = encryptMessage.encryptMessage(req.body.gamme)
    const ingredients = encryptMessage.encryptMessage(req.body.ingredients)
    const grammage = encryptMessage.encryptMessage(req.body.grammage)
    const Procedes_Fabrication_id = encryptMessage.encryptMessage(req.body.Procedes_Fabrication_id)
    const response = await axios.post(
      `${config.freezbeMicroserviceURL}/freezbe`,
      {
        "nom": nom,
        "description":description,
        "prix_UHT":prix_UHT,
        "gamme":gamme,
        "ingredients":ingredients,
        "grammage":grammage,
        "Procedes_Fabrication_id":Procedes_Fabrication_id
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error creating freezbe:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Update freezbe
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const nom = encryptMessage.encryptMessage(req.body.nom)
    const description = encryptMessage.encryptMessage(req.body.description)
    const prix_UHT = encryptMessage.encryptMessage(req.body.prix_UHT)
    const gamme = encryptMessage.encryptMessage(req.body.gamme)
    const ingredients = encryptMessage.encryptMessage(req.body.ingredients)
    const grammage = encryptMessage.encryptMessage(req.body.grammage)
    const Procedes_Fabrication_id = encryptMessage.encryptMessage(req.body.Procedes_Fabrication_id)
    const response = await axios.put(
      `${config.freezbeMicroserviceURL}/freezbe/${id}`,
      {
        "nom": nom,
        "description":description,
        "prix_UHT":prix_UHT,
        "gamme":gamme,
        "ingredients":ingredients,
        "grammage":grammage,
        "Procedes_Fabrication_id":Procedes_Fabrication_id
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error updating freezbe:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Delete freezbe
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(
      `${config.freezbeMicroserviceURL}/freezbe/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error deleting freezbe:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;