<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const nombre = ref('')
const telefono = ref('')
const nit = ref('')
const razonSocial = ref('')
const direccion = ref('')

async function crearCliente() {
  await http
    .post(ENDPOINT, {
      nombre: nombre.value,
      telefono: telefono.value,
      nit: nit.value,
      razonSocial: razonSocial.value,
      direccion: direccion.value
    })
    .then(() => router.push('/clientes'))
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
          <RouterLink to="/clientes">Clientes</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear Cliente</li>
      </ol>
    </nav>
    <div class="row">
      <h2>Crear Nuevo Cliente</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearCliente()">
        <div class="form-floating mb-3">
          <input type="string" class="form-control" v-model="nombre" placeholder="Nombre" required />
          <label for="nombre">Nombre</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="telefono" placeholder="Teléfono" required />
          <label for="telefono">Teléfono</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="nit" placeholder="NIT" required />
          <label for="nit">NIT</label>
        </div>
        <div class="form-floating mb-3">
          <input type="string" class="form-control" v-model="razonSocial" placeholder="Razón Social" required />
          <label for="razonSocial">Razón Social</label>
        </div>
        <div class="form-floating mb-3">
          <input type="string" class="form-control" v-model="direccion" placeholder="Dirección" required />
          <label for="direccion">Dirección</label>
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
