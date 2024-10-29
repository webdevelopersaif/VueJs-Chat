<template>
  <div
    class="login-container d-flex justify-content-center align-items-center"
    style=""
  >
    <div class="card" style="max-width: 400px; width: 100%">
      <div class="card-header text-center">
        <h2>Login</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              v-model="name"
              class="form-control"
              id="name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserLogin",
  data() {
    return {
      name: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/login", {
          name: this.name,
          password: this.password,
        });

        if (response.data.success) {
          this.$router.push(`/ChatBox/${response.data.data.user_key}`);
        } else {
          this.errorMessage =
            response.data.message || "Login failed. Please try again.";
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Login failed. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: #f4f6f9;
}

.card {
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #007bff;
  color: white;
}

.form-label {
  font-weight: bold;
}

.text-danger {
  font-size: 0.875rem;
}
</style>
