<template>
  <div class="input-container">
    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="toto@email.com" v-model="bindDN" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Password" v-model="password" @keydown.enter="handleLogin" required>

    <button type="submit" @click="handleLogin">Login</button>

  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { parseJwt } from '@/assets/jwt';


export default {
  props: ['parseJwt'],
  data() {
    return {
        bindDN: '',
      password: '',
      error: null,
    }
  },
  methods: {
    handleLogin() {
      const { bindDN, password } = this;

      // Envoyez une requête POST à votre endpoint d'authentification de l'API
      fetch("http://localhost:2000/login", {
        method: "POST",
        body: JSON.stringify({ username: bindDN, password }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          // Authentification réussie, un token JWT a été renvoyé par l'API
          // Stockez ce token dans un cookie ou un emplacement sécurisé si nécessaire
          const jwtToken = data.token;
          // Par exemple, vous pouvez utiliser js-cookie pour stocker le token en tant que cookie HttpOnly
          Cookies.set('token', jwtToken, { expires: 1 }); // Expire après 1 jour (ajustez selon vos besoins)
          console.log(jwtToken);
          // Vous pouvez également extraire le rôle de l'utilisateur du token si nécessaire
          const decodedToken = parseJwt(jwtToken);
          const userRole = decodedToken.role;

          // Ensuite, redirigez l'utilisateur en fonction de son rôle
          if (userRole === "SCH_RD" || userRole === "SCH_PROD") {
            this.$router.push({ name: 'freezbe' });
          } else if (userRole === "SCH_TEST") {
            this.$router.push({ name: 'procede' });
          }
        } else {
          // L'authentification a échoué, affichez un message d'erreur
          this.error = 'Identifiants incorrects';
        }
      })
      .catch(error => {
        console.error("Erreur :", error);
      });
    },
  },
}
</script>

<style scoped>
/* Reset des marges et des rembourrages */
body, h2, p {
    margin: 0;
    padding: 0;
}

/* Styles de base */
body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #f2f2f2;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.login-box {
    max-width: 400px;
    width: 100%;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    text-align: center;
}

h2 {
    text-align: center;
    margin-top: 0;
}

.input-container {
    text-align: left;
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    color: #333;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 12px 1px; /* Ajustez la largeur du champ d'entrée ici */
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s;
}

button[type="submit"]:hover {
    background-color: #45a049;
}

input[type="checkbox"] {
    margin-right: 5px;
}

.psw {
    float: right;
    margin-top: 10px;
    color: #333;
}

footer {
    text-align: center;
    padding: 10px;
    color: #666;
    background-color: #f2f2f2;
}
</style>
