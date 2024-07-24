<template>
    <div class="form-container">
        <form >
            <label for="nom">Nom:</label>
            <input type="text" id="nom" v-model="nom" required>
    
            <label for="description">Description:</label>
            <input type="text" id="description" v-model="description" required>
    
            <label for="modele_freezbe">Modèle:</label>
            <input type="text" id="modele_freezbe" v-model="modele_freezbe" required>
    
            <label for="etapes_et_description">Etapes et Description:</label>
            <input type="text" id="etapes_et_description" v-model="etapes_et_description" required>
    
            <div class="button-container">
                <router-link :to="{name: 'procede' }">
                    <button type="button" >Annuler</button>
                </router-link>
                <button type="button" @click="addProcede()">Ajouter</button>
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
                etapes_et_description: '',
            };
        },
        methods: {
            addProcede(){
                const { nom, description, modele_freezbe, etapes_et_description } = this;
    
                fetch("http://localhost:2000/procede", {
                method: "POST",
                body: JSON.stringify({ nom, description, modele_freezbe, etapes_et_description }),
                headers: {
                    "Content-Type": "application/json"
                }
                })
                .then(response => response.json())
                .then(response => {
                window.alert("Le procede a bien été ajouté");
                this.$router.push('/procede');
                })
                .catch(error => {
                console.error("Erreur :", error);
                });
            }
        }
    }
    </script>
    