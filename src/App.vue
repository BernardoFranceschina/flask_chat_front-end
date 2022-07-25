<template>
  <v-app>
    <div v-if="mustAppear">
      <v-app-bar app color="deep-purple" dark>
        <v-toolbar-title>Chat</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn plain @click="logout()">Sair</v-btn>
      </v-app-bar>
      <template>
        <v-card>
          <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent app>
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img :src="randomPerson"></v-img>
              </v-list-item-avatar>
              <v-list-item-title>{{this.user.name}}</v-list-item-title>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-list-item>
            <v-list-item @click="nova = true">
              <v-list-item-icon>
                <v-icon>mdi-chat-plus-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Nova conversa</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item v-for="item in items" :key="item.id" link @click="chatId = item.id">
                <v-list-item-icon>
                  <v-icon>mdi-chat-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </template>
    </div>
    <v-main>
      <v-fade-transition>
        <router-view v-if="!mustAppear"/>
      </v-fade-transition>
      <Chat v-if="mustAppear && chatId" :chatId="chatId" :user="user" :key="chatId"/>
      <v-row v-if="mustAppear && !chatId" justify="center" no-gutters class="mt-6 mx-5 pa-4 rounded-pill grey lighten-2">
        <span>Selecione um chat</span>
      </v-row>
    </v-main>
    <v-dialog v-model="nova" width="400">
      <v-card>
        <v-card-title>
          Nova conversa
        </v-card-title>
        <v-card-text>
          <v-list-item-group multiple>
            <v-list-item v-for="(user, index) in users" :key="index" @click="addUser(user)">
              <template v-slot:default="{ active, }">
                <v-list-item-action>
                  <v-checkbox :input-value="active" color="primary"></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{user.username}}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-card-text>
        <v-divider class="mb-4"></v-divider>
        <v-card-actions>
          <v-btn plain outlined @click="nova = false">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn plain outlined @click="novaConversa()">Criar conversa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="novaNome" width="320">
      <v-card>
        <v-card-title>
          Nome do grupo
        </v-card-title>
        <v-card-text>
          <v-text-field dense outlined maxlength=25 class="mb-n5" v-model="nomeGrupo"></v-text-field>
        </v-card-text>
        <v-divider class="mb-4"></v-divider>
        <v-card-actions>
          <v-btn plain outlined @click="novaNome = false">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn plain outlined @click="criarConversa()">Criar grupo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Api from '../config/api.helper'
import { validToken } from '../config/token'
import Chat from './components/Chat.vue'
export default {
  components: {
    Chat
  },
  data: () => ({
    chatId: '',
    nomeGrupo: '',
    novaNome: false,
    usersSelecionados: [],
    users: [],
    nova: false,
    mustAppear: false,
    drawer: false,
    group: null,
    items: [],
    mini: false,
    randomPerson: null,
    user: ''
  }),
  methods: {
    getConversas () {
      Api.post('/room', {user: this.user.id})
        .then(res => {
          this.items = res.data
        })
    },
    criarConversa () {
      if (this.usersSelecionados.length > 0) {
        let send = {
          nome: this.nomeGrupo ? this.nomeGrupo : false,
          users: this.usersSelecionados,
          session: this.user.id
        }
        Api.post('/create-room', send)
          .then(() => {
            this.getConversas()
            this.nova = false
            this.novaNome = false
          })
          .catch(err => {
            this.error = err.response.data.message.password || err.response.data.message.username
          })
      }
    },
    novaConversa () {
      if (this.usersSelecionados.length > 1) this.novaNome = true
      else this.criarConversa()
    },
    addUser(user) {
      if (this.usersSelecionados.indexOf(user) >= 0) this.usersSelecionados.splice(this.usersSelecionados.indexOf(user), 1)
      else this.usersSelecionados.push(user)
    },
    getUsers() {
      Api.get('/users')
        .then(res => {
          this.users = res.data
          this.users.map(u => {
            if (u.id == this.user.id) {
              this.users.splice(this.users.indexOf(u), 1)
            }
          })
        })
    },
    logout() {
      Api.get('/logout')
        .then(() => {
          localStorage.removeItem('user')
          this.$router.push('/login')
          this.mustAppear = false
        })
        .catch(err => {
          this.error = err.response.data.message.password || err.response.data.message.username
        })
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (validToken()) {
      if (this.$route.name != 'Login') this.$router.push('/')
      this.mustAppear = true
      this.getUsers()
      this.getConversas()
    } else {
      this.$router.push('/login')
    }
  },
  mounted() {
    this.randomPerson = 'https://randomuser.me/api/portraits/lego/' + (Math.floor(Math.random() * 9) + 1) + '.jpg'
  },
};
</script>

<style lang="scss">
</style>
