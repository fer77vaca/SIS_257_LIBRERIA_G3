<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/index";

const usuario = ref("");
const clave = ref("");
const error = ref(false);

function onSubmit() {
  const authStore = useAuthStore();
  authStore.login(usuario.value, clave.value).catch(() => (error.value = true));
}
</script>

<template>
  <div class="login-container">
    <h1 class="login-title">Iniciar Sesión</h1>
    <form class="login-form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label class="form-label">Usuario:</label>
        <input
          v-model="usuario"
          type="text"
          class="form-input"
          placeholder="Nombre de usuario"
          autofocus
        />
      </div>

      <div class="form-group">
        <label class="form-label">Contraseña:</label>
        <input
          v-model="clave"
          type="password"
          class="form-input"
          placeholder="Contraseña"
        />
      </div>

      <p v-if="error" class="error-message">Datos Erroneos. Por favor, intenta de nuevo.</p>
      <button type="submit" class="form-submit">Ingresar</button>
    </form>
  </div>
</template>

<style>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.login-form {
  width: 80%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.error-message {
  color: #ff4136;
  margin-top: 0.5rem;
}

.form-submit {
  background: #ff5722;
  border: none;
  border-radius: 20px;
  color: #fff;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 1rem; 
}

.form-submit:hover {
  background: #ff6d38;
}
</style>
