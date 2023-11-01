<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'


const props = defineProps<{
  ENDPOINT_API: string
}>()


const ENDPOINT = props.ENDPOINT_API ?? ''
const nombre = ref('')
const dni = ref('')
const direccion = ref('')
const telefono = ref('')
const cargo = ref('')
const email = ref('')

async function crearUsuario() {
  await http
    .post(ENDPOINT, {
      nombre: nombre.value,
      dni: dni.value,
      direccion: direccion.value,
      telefono: telefono.value,
      cargo: cargo.value,
      email: email.value
    })
    .then(() => router.push('/usuarios')) 
}

function goBack() {
  router.go(-1)
}
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/usuarios">Usuarios</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear Usuario</li>
      </ol>
    </nav>
    <div class="row">
      <h2>Crear Nuevo Usuario</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearUsuario()">
        <div class="form-floating mb-3">
          <input type="string" class="form-control" v-model="nombre" placeholder="Nombre" required />
          <label for="nombre">Nombre</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="dni" placeholder="DNI" required />
          <label for="dni">DNI</label>
        </div>
        <div class="form-floating mb-3">
          <input type="string" class="form-control" v-model="direccion" placeholder="Dirección" required />
          <label for="direccion">Dirección</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="telefono" placeholder="Teléfono" required />
          <label for="telefono">Teléfono</label>
        </div>
        <div class="form-floating mb-3">
          <input type="string" class="form-control" v-model="cargo" placeholder="Cargo" required />
          <label for="cargo">Cargo</label>
        </div>
        <div class="form-floating mb-3">
          <input type="string" class="form-control" v-model="email" placeholder="Email" required />
          <label for="email">Email</label>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Crear
          </button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-link" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style></style>
