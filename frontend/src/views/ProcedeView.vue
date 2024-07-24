<template>
  <div>
      <h1>Gestion des Procédés</h1>
      <div class="add-button">
          <router-link :to="{name: 'addProcede'}">
            <button>Ajouter un procédé</button>
          </router-link>
      </div>

    <ProcedeTab />
    
  </div> 
  </template>
  
  <script>
  import ProcedeTab from '../components/ProcedeTab.vue'
  
  export default {
    components: {
      ProcedeTab
      }
  };
  </script>