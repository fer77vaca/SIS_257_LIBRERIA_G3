<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const nombre = ref('')
const nit = ref('')
const id = router.currentRoute.value.params['id']

async function editarCliente() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      nombre: nombre.value,
      nit: nit.value,
    })
    .then(() => router.push('/clientes'))
}

async function getCliente() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    nombre.value = response.data.nombre
    nit.value = response.data.nit
  })
}

function goBack() {
  router.go(-1)
}

onMounted(() => {
  getCliente()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/clientes">Clientes</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Cliente</h2>
    </div>

    <div class = "row">
      <form @submit.prevent="editarCliente">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="nombre" placeholder="Nombre" pattern="[A-Za-záéíóúÁÉÍÓÚñÑ\s]+"
            title="No se Puede Ingresar Numeros" required />
          <label for="nombre">Nombre</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="nit" placeholder="NIT" required />
          <label for="nit">NIT</label>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Guardar
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
