<template>
<div class="table-container">
      
    <div class="search-bar">
          <label for="search">Rechercher un procédé:</label>
          <input type="text" id="search" name="search" v-model="searchQuery" placeholder="Entrez un nom...">
          <button @click="searchProcede()">Rechercher</button>
      </div>  
  
    <table id="procedeTable">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Modèle</th>
                <th>Etapes et description</th>
                <th>Modifier</th>
                <th>Supprimer</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="procede in procedeData" :key="procede.id">
              <td>{{ procede.nom }}</td>
              <td>{{ procede.description }}</td>
              <td>{{ procede.modele_freezbe }}</td>
              <td>{{ procede.etapes_et_description }}</td>
              <router-link :to="{name: 'editProcede', params: { id: procede.id } }">
                <button>Modifier</button>
              </router-link>
              <button @click="supprimerProcede(procede.id)">Supprimer</button>
        </tr>
        </tbody>
    </table>
</div>
</template>

<script>

export default {
  data() {
    return {
        procedeData: [],
        searchQuery: '', 
        filteredProcedes: [], 
    };
  },
  methods: {
    supprimerProcede(id) {
        fetch('http://localhost:2000/procede/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id })
    })
    .then(response => response.json())
    .then(data=> {
        this.fetchData();
        console.log(data.message);
    })
    .catch(error => {
        console.error('Erreur de suppression :', error);
    });
    },
    fetchData(){
        fetch('http://localhost:2000/procede')
            .then(response => response.json())
            .then(response => {
            this.procedeData = response.data; // Mettez à jour les données du composant
            })
            .catch(error => {
            console.error('Erreur de requête :', error);
            });
    },
    searchProcede() {
      // Filtrer les procédés en fonction de la recherche
      if(this.searchQuery) {
        this.procedeData = this.procedeData.filter((procede) => {
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