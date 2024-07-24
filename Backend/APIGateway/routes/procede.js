const express = require("express");
const axios = require("axios");
const config = require("../config");
const router = express.Router();
const encryptMessage = require("../crypto/crypto")
const decryptMessage = require("../crypto/crypto")

// Get all procedes
router.get("/", async (req, res) => {
    try {
      const response = await axios.get(`${config.procedeMicroserviceURL}/procede`);
      const encryptedDataArray = response.data.data; // Supposons que les données sont sous forme de tableau

      // Créez un tableau pour stocker les données déchiffrées
      const decryptedDataArray = [];

      // Parcourez les données chiffrées
      for (const encryptedData of encryptedDataArray) {
        const { id, nom, description, modele_freezbe, etapes_et_description } = encryptedData;
        const decryptedNom = decryptMessage.decryptMessage(nom);
        const decryptedDescription = decryptMessage.decryptMessage(description);
        const decryptedModele = decryptMessage.decryptMessage(modele_freezbe);
        const decryptedEtape = decryptMessage.decryptMessage(etapes_et_description);
    
        const jsonData = {
          id: id,
          nom: decryptedNom,
          description: decryptedDescription,
          modele_freezbe: decryptedModele,
          etapes_et_description: decryptedEtape
        };
        decryptedDataArray.push(jsonData);
      }
      const finalData = { data : decryptedDataArray};
      res.status(response.status).json(finalData);    
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error("Error retrieving procedes:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
});

//Get specific procede
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${config.procedeMicroserviceURL}/procede/${id}`
    );
    const encryptedData = response.data.data; 

    const { nom, description, modele_freezbe, etapes_et_description } = encryptedData[0];
    const decryptedNom = decryptMessage.decryptMessage(nom);
    const decryptedDescription = decryptMessage.decryptMessage(description);
    const decryptedModele = decryptMessage.decryptMessage(modele_freezbe);
    const decryptedEtape = decryptMessage.decryptMessage(etapes_et_description);

    const jsonData = {
      id: id,
      nom: decryptedNom,
      description: decryptedDescription,
      modele_freezbe: decryptedModele,
      etapes_et_description: decryptedEtape
    };
    const finalData = { data : jsonData};
    res.status(response.status).json(finalData);
    } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error retrieving procede:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Add procede
router.post("/", async (req, res) => {
  try {
    const nom = encryptMessage.encryptMessage(req.body.nom)
    const description = encryptMessage.encryptMessage(req.body.description)
    const modele_freezbe = encryptMessage.encryptMessage(req.body.modele_freezbe)
    const etapes_et_description = encryptMessage.encryptMessage(req.body.etapes_et_description)
    const response = await axios.post(
      `${config.procedeMicroserviceURL}/procede`,
      {
        "nom": nom,
        "description":description,
        "modele_freezbe":modele_freezbe,
        "etapes_et_description":etapes_et_description
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error creating procede:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

//Update procede
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const nom = encryptMessage.encryptMessage(req.body.nom)
    const description = encryptMessage.encryptMessage(req.body.description)
    const modele_freezbe = encryptMessage.encryptMessage(req.body.modele_freezbe)
    const etapes_et_description = encryptMessage.encryptMessage(req.body.etapes_et_description)
    const response = await axios.put(
      `${config.procedeMicroserviceURL}/procede/${id}`,
      {
        "nom": nom,
        "description":description,
        "modele_freezbe":modele_freezbe,
        "etapes_et_description":etapes_et_description
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error updating procede:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Delete procede
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(
      `${config.procedeMicroserviceURL}/procede/${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error deleting procede:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;