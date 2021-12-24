<template>
  <div class="login">
      <form @submit.prevent="handleLogin" class="login-form" action="submit">
            <h2>Connectez vous</h2>
            <div class="username">
                <label for="username">Nom d'utilisateur: </label>
                <input v-model="loginUsername" type="text" name="username" required>
            </div>
            <div class="password">
                <label for="password">Mot de passe: </label>
                <input v-model="loginPassword" type="text" name="password" required>
            </div>
            <button>Connexion</button>
            <p v-if="loginError">{{ loginError }}</p>
      </form>
      <form @submit.prevent="handleSignup" class="signup-form" action="submit">
            <h2>Nouveau? Créez un compte !</h2>

            <div class="username">
                <label for="username">Nom d'utilisateur: </label>
                <input v-model="signupUsername" type="text" name="username" required>
            </div>
            <div class="email">
                <label for="email">Votre adresse mail: </label>
                <input v-model="signupEmail" type="text" name="email" required>
            </div>
            <div class="password">
                <label for="password">Mot de passe: </label>
                <input v-model="signupPassword" type="text" name="password" required>
            </div>
            <button>Inscription</button>
            <p v-if="signupSuccess">{{ signupSuccess }}</p>
            <p v-if="signupError">{{ signupError }}</p>
      </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            loginUsername : '',
            loginPassword : '',
            signupUsername : '',
            signupEmail : '',
            signupPassword : '',
            signupSuccess: null,
            signupError: null,
            loginError: null
        }
    },
    methods: {
        async handleLogin() {
            try{
                const response = await axios.post('http://localhost:3000/users/login', {
                    username: this.loginUsername,
                    password: this.loginPassword
                })
                
                localStorage.setItem('token', response.data.token);
                this.$router.push('/home')
            
            } catch (error) {
                this.loginError = 'Connexion échouée !'
            }
        },
        async handleSignup() {
            try {
                const response = await axios.post('http://localhost:3000/users/signup', {
                    username: this.signupUsername,
                    email: this.signupEmail,
                    password: this.signupPassword
                })
                this.signupUsername = ''
                this.signupEmail = ''
                this.signupPassword = ''
                this.signupSuccess = 'Compte créé !'

            } catch (error) {
                this.signupError = 'Un erreur est survenu'
            }
        }
    }
}

</script>

<style scoped>
h2 {
    font-size: 16px;
}
.login {
    height: 800px;
    width: -webkit-fill-available;
    max-width: 700px;
}
form, .login, .username, .password, .email {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px 0 10px 0;
}
input {
    box-sizing: border-box;
    margin-top: 8px;
    border: none;
    border-bottom: 2px solid darkgray;
    background: cyan;
}
form {
    height: 300px;
    min-width: 290px;
    width: 90%;
    background: cyan;
    border-radius: 25px;
    box-shadow: 5px 5px 10px lightgrey;
}
button {
    background: lightskyblue;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
    box-shadow: 2px 2px 5px lightgrey;
    cursor: pointer;
}
button:active {
    transform: scale(0.9);
}
.password input {
    -webkit-text-security: disc;
}
</style>