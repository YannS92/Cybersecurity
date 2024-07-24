<template>
<div>
    <h1>Gestion des Ingrédients</h1>
    <div class="add-button">
        <router-link :to="{name: 'addIngredient'}">
          <button>Ajouter un ingrédient</button>
        </router-link>
    </div>

  <IngredientTab />
  
</div> 
</template>

<script>
import IngredientTab from '../components/IngredientTab.vue'

export default {
  components: {
    IngredientTab
    }
};
</script>