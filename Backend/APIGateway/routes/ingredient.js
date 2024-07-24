const express = require("express");
const axios = require("axios");
const config = require("../config");
const router = express.Router();
//const cors = require("cors");
//router.use(cors());

const encryptMessage = require("../crypto/crypto")
const decryptMessage = require("../crypto/crypto")


// Get all ingredients
router.get("/", async (req, res) => {
    try {
      const response = await axios.get(`${config.ingredientMicroserviceURL}/ingredient`);
      const encryptedDataArray = response.data.data; // Supposons que les données sont sous forme de tableau

        // Créez un tableau pour stocker les données déchiffrées
        const decryptedDataArray = [];

        // Parcourez les données chiffrées
        for (const encryptedData of encryptedDataArray) {
            const { id, nom, description } = encryptedData;
            const decryptedNom = decryptMessage.decryptMessage(nom);
            const decryptedDescription = decryptMessage.decryptMessage(description);

          const jsonData = {
            id: id,
            nom: decryptedNom,
            description: decryptedDescription
          };
          decryptedDataArray.push(jsonData);
        }
        const finalData = { data : decryptedDataArray};
        res.status(response.status).json(finalData);
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error("Error retrieving ingredients:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
});

//Get specific ingredient
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${config.ingredientMicroserviceURL}/ingredient/${id}`
    );
    const encryptedData = response.data.data; 

    const { nom, description } = encryptedData[0];
    const decryptedNom = decryptMessage.decryptMessage(nom);
    const decryptedDescription = decryptMessage.decryptMessage(description);

    const jsonData = {
      id: id,
      nom: decryptedNom,
      description: decryptedDescription
    };
    const finalData = { data : jsonData};
    res.status(response.status).json(finalData);  
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving ingredient:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Get specific ingredient
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${config.ingredientMicroserviceURL}/ingredient/${id}`
    );
    res.status(response.status).json(decryptMessage.decryptMessage(response.data));
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving ingredient:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Add ingredient
router.post("/", async (req, res) => {
  try {
    const nom = encryptMessage.encryptMessage(req.body.nom)
    const description = encryptMessage.encryptMessage(req.body.description)

    const response = await axios.post(
      `${config.ingredientMicroserviceURL}/ingredient`,{
        "nom": nom,
        "description":description
      }

    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error creating ingredient:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Update ingredient
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const nom = encryptMessage.encryptMessage(req.body.nom)
    const description = encryptMessage.encryptMessage(req.body.description)
    const response = await axios.put(
      `${config.ingredientMicroserviceURL}/ingredient/${id}`,{
        "nom": nom,
        "description":description
      }
      
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error updating ingredient:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Delete ingredient
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(
      `${config.ingredientMicroserviceURL}/ingredient/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error deleting ingredient:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;