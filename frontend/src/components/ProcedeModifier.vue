<template>
    <div class="form-container">
    <form method="POST">
        <label for="nom">Nom:</label>
        <input type="text" id="nom" v-model="nom" required>

        <label for="description">Description:</label>
        <input type="text" id="description" v-model="description" required>

        <label for="modele">Modèle:</label>
        <input type="text" id="modele" v-model="modele_freezbe" required>

        <label for="etapes_et_description">Etapes et Description:</label>
        <input type="text" id="etapes_et_description" v-model="etapes_et_description" required>

        <div class="button-container">
            <router-link :to="{name: 'procede' }">
                <button type="button" >Annuler</button>
            </router-link>
            <button type="button" @click="editProcede()">Modifier</button>
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
            modele_freezbe: '',
            etapes_et_description: ''
        };
    },
    methods: {
        editProcede(){
            const { nom, description, modele_freezbe, etapes_et_description } = this;
            const id = this.$route.params.id;

            fetch(`http://localhost:2000/procede/${id}`, {
            method: "PUT",
            body: JSON.stringify({ nom, description, modele_freezbe, etapes_et_description }),
            headers: {
                "Content-Type": "application/json"
            }
            })
            .then(response => response.json())
            .then(response => {
            window.alert("Le procede a bien été modifié");
            this.$router.push('/procede');
            })
            .catch(error => {
            console.error("Erreur :", error);
            });
        },
        fetchData(){
            const id = this.$route.params.id;
            fetch(`http://localhost:2000/procede/${id}`)
                .then(response => response.json())
                .then(response => {
                this.nom = response.data.nom;
                this.description = response.data.description; 
                this.modele_freezbe = response.data.modele_freezbe;
                this.etapes_et_description = response.data.etapes_et_description;
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