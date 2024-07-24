<template>
<div class="table-container">
    
    <div class="search-bar">
        <label for="search">Rechercher un ingrédient:</label>
        <input type="text" id="search" name="search" placeholder="Entrez un nom...">
        <button @click="searchIngredient()">Rechercher</button>
    </div>  

    <table id="freezbeTable">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Modifier</th>
                <th>Supprimer</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="ingredient in ingredientData" :key="ingredient.id">
              <td>{{ ingredient.nom }}</td>
              <td>{{ ingredient.description }}</td>
              <router-link :to="{name: 'editIngredient', params: { id: ingredient.id } }">
                <button @click="modifierIngredient(ingredient.id)">Modifier</button>
              </router-link>
              <button @click="supprimerIngredient(ingredient.id)">Supprimer</button>
        </tr>
        </tbody>
    </table>
</div>
</template>

<script>

export default {
  data() {
    return {
        ingredientData: [],
        searchQuery: '',
    };
  },
  methods: {
    modifierIngredient(id) {
      
      console.log(`Modifier ingredient avec l'ID : ${id}`);
    },
    supprimerIngredient(id) {
        fetch('http://localhost:2000/ingredient/'+id, {
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
        fetch('http://localhost:2000/ingredient')
            .then(response => response.json())
            .then(response => {
            this.ingredientData = response.data; // Mettez à jour les données du composant
            })
            .catch(error => {
            console.error('Erreur de requête :', error);
            });
    },
    searchIngredient() {
      // Filtrer les procédés en fonction de la recherche
      if(this.searchQuery) {
        this.ingredientData = this.ingredientData.filter((procede) => {
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