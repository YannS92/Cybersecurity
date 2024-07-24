<template>
    <div class="form-container">
    <form method="POST">
        <label for="nom">Nom:</label>
            <input type="text" id="nom" v-model="nom" required>

            <label for="description">Description:</label>
            <input type="text" id="description" v-model="description" required>

            <label for="prix_uht">Prix_UHT:</label>
            <input type="text" id="prix_uht" v-model="prix_UHT" required>

            <label for="gamme">Gamme:</label>
            <input type="text" id="gamme" v-model="gamme" required>

            <label for="ingredients">Ingrédients:</label>
            <input type="text" id="ingredients" v-model="ingredients" required>

            <label for="grammage">Grammage:</label>
            <input type="text" id="grammage" v-model="grammage" required>

            <label for="procede">Procédé de fabrication:</label>
            <input type="text" id="procede" v-model="Procedes_Fabrication_id" required>



        <div class="button-container">
            <router-link :to="{name: 'freezbe' }">
                <button type="button" >Annuler</button>
            </router-link>
            <button type="button" @click="editFreezbe()">Modifier</button>
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
            prix_UHT: '',
            gamme: '',
            ingredients: '',
            grammage: '',
            Procedes_Fabrication_id: '',
        };
    },
    methods: {
        editFreezbe(){
            const { nom, description, prix_UHT, gamme, ingredients, grammage, Procedes_Fabrication_id } = this;
            const id = this.$route.params.id;

            fetch(`http://localhost:2000/freezbe/${id}`, {
            method: "PUT",
            body: JSON.stringify({ nom, description, prix_UHT, gamme, ingredients, grammage, Procedes_Fabrication_id }),
            headers: {
                "Content-Type": "application/json"
            }
            })
            .then(response => response.json())
            .then(response => {
            window.alert("Le freezbe a bien été modifié");
            this.$router.push('/freezbe');
            })
            .catch(error => {
            console.error("Erreur :", error);
            });
        },
        fetchData(){
            const id = this.$route.params.id;
            fetch(`http://localhost:2000/freezbe/${id}`)
                .then(response => response.json())
                .then(response => {
                this.nom = response.data.nom;
                this.description = response.data.description;
                this.prix_UHT = response.data.prix_UHT;
                this.gamme = response.data.gamme;
                this.ingredients = response.data.ingredients;
                this.grammage = response.data.grammage;
                this.Procedes_Fabrication_id = response.data.Procedes_Fabrication_id;
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