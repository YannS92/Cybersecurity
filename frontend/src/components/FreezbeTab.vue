<template>
<div class="table-container">
    <div class="search-bar">
        <label for="search">Rechercher un Freezbe:</label>
        <input type="text" id="search" name="search" placeholder="Entrez un nom...">
        <button @click="searchFreezbe()">Rechercher</button>
    </div>  
    <table id="freezbeTable">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Prix Unité HT</th>
                <th>Gamme</th>
                <th>Ingrédients</th>
                <th>Grammage</th>
                <th>Modifier</th>
                <th>Supprimer</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="freezbe in freezbeData" :key="freezbe.id">
              <td>{{ freezbe.nom }}</td>
              <td>{{ freezbe.description }}</td>
              <td>{{ freezbe.prix_UHT }}</td>
              <td>{{ freezbe.gamme }}</td>
              <td>{{ freezbe.ingredients }}</td>
              <td>{{ freezbe.grammage }}</td>
              <router-link :to="{name: 'editFreezbe', params: { id: freezbe.id } }">
                <button @click="modifierFreezbe(freezbe.id)">Modifier</button>
              </router-link>
              <button @click="supprimerFreezbe(freezbe.id)">Supprimer</button>
        </tr>
        </tbody>
    </table>
</div>
</template>

<script>

export default {
  data() {
    return {
        freezbeData: [],
        searchQuery: ''
    };
  },
  methods: {
    modifierFreezbe(id) {
      
      console.log(`Modifier Freezbe avec l'ID : ${id}`);
    },
    supprimerFreezbe(id) {
        fetch('http://localhost:2000/freezbe/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id })
    })
    .then(response => response.json())
    .then(data=> {
        // Gérer la réponse de suppression (par exemple, actualiser la liste des ingrédients)
        this.fetchData();
        console.log(data.message);
    })
    .catch(error => {
        console.error('Erreur de suppression :', error);
    });
    },
    fetchData(){
        fetch('http://localhost:2000/freezbe')
            .then(response => response.json())
            .then(response => {
            this.freezbeData = response.data; // Mettez à jour les données du composant
            })
            .catch(error => {
            console.error('Erreur de requête :', error);
            });
    },
    searchFreeze() {
      // Filtrer les procédés en fonction de la recherche
      if(this.searchQuery) {
        this.freezbeData = this.freezbeData.filter((procede) => {
        return procede.nom.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
      }
      else{
        this.fetchData();
      }
    },
  },
    mounted() {
        this.fetchData();
    },
};
</script>