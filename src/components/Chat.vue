<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col md="1">
          <v-btn @click="sendMessage()">Send</v-btn>
        </v-col>
        <v-col>
          <v-text-field v-model="message" outlined></v-text-field>
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
  data: () => ({
    socket: io(Api.getSocketUrl()),
    user: JSON.parse(localStorage.getItem('user')),
    message: ''
  }),
  methods: {
    sendMessage () {
      if (!this.message.trim()) return
      this.socket.emit('send_message_room', this.message, this.$route.params.room_id)
      this.message = ''
    }
  },
  created: function () {
    this.socket.on("connect", () => {
      console.log('Conexão feita com sucesso!');
    });
    this.socket.emit('join', this.user.username, this.$route.params.room_id)
  }  
};
</script>
