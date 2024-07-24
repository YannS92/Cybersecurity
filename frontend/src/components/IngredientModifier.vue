<template>
    <div class="form-container">
    <form method="POST">
        <label for="nom">Nom:</label>
            <input type="text" id="nom" v-model="nom" required>

            <label for="description">Description:</label>
            <input type="text" id="description" v-model="description" required>

        <div class="button-container">
            <router-link :to="{name: 'ingredient' }">
                <button type="button" >Annuler</button>
            </router-link>
            <button type="button" @click="editIngredient()">Modifier</button>
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
        editIngredient(){
            const { nom, description } = this;
            const id = this.$route.params.id;

            fetch(`http://localhost:2000/ingredient/${id}`, {
            method: "PUT",
            body: JSON.stringify({ nom, description }),
            headers: {
                "Content-Type": "application/json"
            }
            })
            .then(response => response.json())
            .then(response => {
            window.alert("L'ingredient a bien été modifié");
            this.$router.push('/ingredient');
            })
            .catch(error => {
            console.error("Erreur :", error);
            });
        },
        fetchData(){
            const id = this.$route.params.id;
            fetch(`http://localhost:2000/ingredient/${id}`)
                .then(response => response.json())
                .then(response => {
                this.nom = response.data.nom;
                this.description = response.data.description; 
                })
                .catch(error => {
                console.error('Erreur de requête :', error);
                });
        }
    },
    mounted(){
        this.fetchData();
    }
}
</script>