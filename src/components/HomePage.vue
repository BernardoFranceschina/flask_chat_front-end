<template>
  <div>
    <span>Nome de usuário</span>
    <v-text-field dense v-model="userInfo.username" outlined></v-text-field>
    <span>Senha</span>
    <v-text-field dense v-model="userInfo.password" outlined></v-text-field>
    <v-btn @click="login()">Login</v-btn>
    <span v-if="error">{{error}}</span>
  </div>
</template>

<script>
import Api from '../../config/api.helper'
export default {
  /* eslint-disable no-console */
  data: () => ({
    userInfo: {
      username: '',
      password: ''
    },
    error: ''
  }),
  methods: {
    login () {
      Api.post('/login', this.userInfo)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          this.error = err.response.data.message.password || err.response.data.message.username
        })
    }
  },
};
</script>
