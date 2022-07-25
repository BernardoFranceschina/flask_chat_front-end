<template>
  <div>
    <v-container>
      <div ref="chatbox" style="max-height: 700px; overflow: auto; max-width: 100%;">
        <p v-show="messages.length" :class="msg.user_id == user.id ? 'text-right' : 'text-left'" style="'width: 100%'" class="pa-1 rounded-pill grey lighten-2" v-for="(msg, index) in messages" :key="index">
          <span :class="msg.user_id == user.id ? 'mr-5' : 'ml-5'" class=" caption">{{msg.username}}</span><br>
          <span :class="msg.user_id == user.id ? 'mr-5' : 'ml-5'">{{msg.msg}}</span>
        </p>
      </div>
      <v-row no-gutters>
        <v-col class="mb-n4" md="12">
          <v-text-field v-model="message" outlined></v-text-field>
        </v-col>
        <v-col>
          <v-btn @click="sendMessage()">Send</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import Api from '../../config/api.helper'
export default {
  /* eslint-disable no-console */
  props: ['chatId'],
  data: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    socket: null,
    message: '',
    messages: []
  }),
  methods: {
    sendMessage () {
      if (!this.message.trim()) return
      this.socket.emit('send_message_room', this.message, this.chatId, this.user.id)
      this.message = ''
    }
  },
  created: function () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.socket = io(Api.getSocketUrl())
    this.socket.on("connect", () => {
      console.log('Conexão feita com sucesso!');
    });
    this.socket.emit('join', this.user, this.chatId, () =>{
      if (this.$refs.chatbox) {
        var chatbox = this.$refs.chatbox;
        chatbox.scrollTop = chatbox.scrollHeight;
      }
    })
    this.socket.on("message", (data) => {
      if (typeof data == "object") {
        this.messages = data
      } else {
        this.socket.emit('join', this.user, this.chatId)
      }
      if (this.$refs.chatbox) {
        var chatbox = this.$refs.chatbox;
        chatbox.scrollTop = chatbox.scrollHeight;
      }
    });
  }  
};
</script>
