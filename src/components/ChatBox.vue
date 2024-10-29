<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Chat with Admin</h1>

    <!-- Message List -->
    <div
      id="messages"
      class="border rounded p-3"
      style="height: 300px; overflow-y: scroll"
    >
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="[
          'mb-2',
          'p-2',
          message.sender === 'User' ? 'user-message' : 'admin-message',
        ]"
        :style="message.sender === 'User' ? 'margin-left: auto;' : ''"
      >
        <strong>{{ message.sender }}:</strong> {{ message.text }}
      </div>
    </div>

    <!-- Input and Send Button -->
    <div class="mt-3">
      <textarea
        v-model="newMessage"
        class="form-control mb-2"
        rows="3"
        placeholder="Type your message..."
      ></textarea>
      <button class="btn btn-primary w-100" @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
      newMessage: "",
      userId: "", // initially empty
    };
  },
  mounted() {
    // Get userId from route parameters
    this.userId = this.$route.params.userId;

    // Load the messages after setting the userId
    this.loadMessages();

    // Optionally reload messages every 3 seconds
    setInterval(this.loadMessages, 3000);
  },
  methods: {
    loadMessages() {
      axios
        .get(`http://127.0.0.1:8000/api/chat/messages/${this.userId}`)
        .then((response) => {
          this.messages = response.data;
        })
        .catch((error) => {
          console.error("Error loading messages:", error);
        });
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        axios
          .post(`http://127.0.0.1:8000/api/chat/send`, {
            userId: this.userId,
            message: this.newMessage,
          })
          .then(() => {
            this.newMessage = ""; // Clear the input field
            this.loadMessages(); // Reload messages
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
      }
    },
  },
};
</script>

<style scoped>
#messages {
  background-color: #f9f9f9;
}

.admin-message {
  background-color: #d1ffe8 !important;
  color: #000000;
  text-align: left;
  width: auto;
  max-width: 75%;
  border-radius: 25px;
  margin-bottom: 5px;
}

.user-message {
  background-color: #007bff;
  text-align: right;
  width: auto;
  max-width: 75%;
  border-radius: 25px;
  margin-left: auto;
  margin-bottom: 5px;
  color: #ffffff;
}

@media (max-width: 576px) {
  .admin-message,
  .user-message {
    max-width: 100%; /* Ensure the messages take up full width on small screens */
  }
}

textarea {
  resize: none;
}
</style>
