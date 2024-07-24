<template>
    <div class="login-box">
      <h2>Welcome to Freezbee Company</h2>
      <LoginForm />
    </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
export default {
    components: {
        LoginForm
    }
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


h2 {
    text-align: center;
    margin-top: 0;
}

footer {
    text-align: center;
    padding: 10px;
    color: #666;
    background-color: #f2f2f2;
}
</style>
