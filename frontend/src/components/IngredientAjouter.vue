<template>
    <div class="form-container">
        <form >
            <label for="nom">Nom:</label>
            <input type="text" id="nom" v-model="nom" required>
    
            <label for="description">Description:</label>
            <input type="text" id="description" v-model="description" required>
    
            <div class="button-container">
                <router-link :to="{name: 'ingredient' }">
                    <button type="button" >Annuler</button>
                </router-link>
                <button type="button" @click="addIngredient()">Ajouter</button>
            </div>
        </form>
    </div>
</template>

<script>
export default{
    data(){
        return{
            nom: '',
            description: '',
        };
    },
    methods: {
        addIngredient(){
            const { nom, description } = this;

            fetch("http://localhost:2000/ingredient", {
            method: "POST",
            body: JSON.stringify({ nom, description }),
            headers: {
                "Content-Type": "application/json"
            }
            })
            .then(response => response.json())
            .then(response => {
            window.alert("L'ingredient a bien été ajouté");
            this.$router.push('/ingredient');
            })
            .catch(error => {
            console.error("Erreur :", error);
            });
        }
    }
}
</script>
    