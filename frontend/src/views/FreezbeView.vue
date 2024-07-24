<template>
<div>
    <h1>Gestion des Freezbe</h1>
    <div class="add-button">
        <router-link :to="{name: 'addFreezbe'}">
          <button>Ajouter un Freezbe</button>
        </router-link>
    </div>

  <FreezbeTab />
  
</div>    
</template>

<script>
import FreezbeTab from '../components/FreezbeTab.vue'

export default {
  components: {
    FreezbeTab
    }
};

</script>