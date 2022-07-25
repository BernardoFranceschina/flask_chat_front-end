<template>
  <div>
    <v-container>
      <v-row justify="start" no-gutters align="center" class="pt-4">
        <h2 class="mb-2" v-if="!criarConta">Login</h2>
        <h2 class="mb-2" v-else>Criar conta</h2>
        <v-col md="12">
          <v-text-field dense outlined label="Nome" v-model="userInfo.username"></v-text-field>
        </v-col>
        <v-col md="12" class="mt-n2">
          <v-text-field dense outlined label="Senha" v-model="userInfo.password"></v-text-field>
        </v-col>
        <v-btn @click="login()" v-if="!criarConta">Entrar</v-btn>
        <v-btn @click="signup()" v-else>Cadastrar</v-btn>
        <v-btn @click="switchOpcoes()" class="ml-3" v-if="!criarConta">Criar conta</v-btn>
        <v-btn @click="switchOpcoes()" class="ml-3" v-else>Já possuo conta</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Api from '../../config/api.helper'
export default {
  /* eslint-disable no-console */
  data: () => ({
    criarConta: false,
    userInfo: {
      username: '',
      password: ''
    },
    error: ''
  }),
  created () {
    this.userSession = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).session : null
  },
  methods: {
    switchOpcoes () {
      this.userInfo = {
        username: '',
        password: ''
      }
      this.criarConta = !this.criarConta
    },
    login () {
      Api.post('/login', this.userInfo)
        .then(res => {
          if (res.data.user) {
            localStorage.setItem('user', JSON.stringify(res.data.user))
            this.userSession = res.data.user.session
            this.$router.go('/')
          }
        })
        .catch(err => {
          this.error = err.response.data.message.password || err.response.data.message.username
        })
    },
    signup () {
      Api.post('/signup', this.userInfo)
        .then(res => {
          console.log(res.data)
          this.$router.go('/login')
        })
        .catch(err => {
          this.error = err.response.data.message.password || err.response.data.message.username
        })
    }
  },
};
</script>

<style>
body {
    background-color: rgb(235, 235, 235);
}
</style>