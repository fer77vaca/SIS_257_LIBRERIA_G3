<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const cantidad = ref('') 
const precioUnitario = ref('') 

async function crearDetalle() {
  await http
    .post(ENDPOINT, { cantidad: cantidad.value, precioUnitario: precioUnitario.value })
    .then(() => router.push('/detalles'))
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
          <RouterLink to="/detalles">Detalles</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear Detalle</li>
      </ol>
    </nav>
    <div class="row">
      <h2>Crear Nuevo Detalle</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearDetalle">
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="cantidad" placeholder="Cantidad" required />
          <label for="cantidad">Cantidad</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" class="form-control" v-model="precioUnitario" placeholder="Precio Unitario" required />
          <label for="precioUnitario">Precio Unitario</label>
        </div>
        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Crear Detalle
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
