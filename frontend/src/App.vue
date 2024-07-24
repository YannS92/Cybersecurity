<template>
  <div id="app">
    <nav v-if="!isLoginPage">
      <router-link v-if="hasAccess('SCH_RD', 'SCH_PROD')" to="/freezbe">Freezbe</router-link> |
      <router-link v-if="hasAccess('SCH_RD')" to="/ingredient">Ingredient</router-link> |
      <router-link v-if="hasAccess('SCH_RD', 'SCH_TEST')" to="/procede">Procédés</router-link>
    </nav>
    <button @click="handleLogout" v-if="!isLoginPage">Déconnexion</button>
    <router-view/>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { parseJwt } from '@/assets/jwt';

export default {
  computed: {
    isLoginPage() {
      // Vérifiez si la route actuelle est la page LoginView.vue
      return this.$route.path === '/login';
    },
  },
  data() {
    return {
      userRole: null,
    };
  },
  methods: {
    hasAccess(...allowedRoles) {
      const jwtToken = Cookies.get('token');
      if (jwtToken) {
        const userRole = jwtToken ? parseJwt(jwtToken).role : null;
        return allowedRoles.includes(userRole);
      }
      return false;
    },
    handleLogout() {
      // Supprimez le cookie de votre choix (par exemple, 'jwtToken')
      Cookies.remove('jwtToken');
      
      // Redirigez l'utilisateur vers la page de connexion
      this.$router.push('/login');
    }
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
